using Foodfolio.Server.Data;
using Foodfolio.Server.DTOs;
using Foodfolio.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Foodfolio.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly FoodfolioDbContext _context;

        public RecipesController(FoodfolioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeDto>>> GetAllRecipes()
        {
            var recipes = _context.Recipes
                .Include(r => r.Ingredients)
                    .ThenInclude(i => i.Food)
                .Include(r => r.Ingredients)
                    .ThenInclude(i => i.Unit)
                .Include(r => r.Steps)
                .ToListAsync();

            var recipeDtos = (await recipes).Select(ToDto).ToList();

            return recipeDtos;
        }

        private static decimal CalculateNutrient(
            RecipeIngredient ingredient,
            Func<Food, decimal> nutrientSelector)
        {
            if (ingredient.Food == null || ingredient.Unit == null || ingredient.Food.ReferenceAmount <= 0)
                return 0;

            var normalizedQuantity = ingredient.Quantity * ingredient.Unit.Value;
            return normalizedQuantity / ingredient.Food.ReferenceAmount * nutrientSelector(ingredient.Food);
        }

        private static RecipeDto ToDto(Recipe recipe)
        {
            var ingredients = recipe.Ingredients.Select(ingredient => new RecipeIngredientDto
            {
                Food = ingredient.Food,
                Quantity = ingredient.Quantity,
                UnitId = ingredient.UnitId,
                Unit = ingredient.Unit,
                NormalizedQuantity = ingredient.Quantity * (ingredient.Unit?.Value ?? 0),
                Calories = CalculateNutrient(ingredient, food => food.Calories),
                Protein = CalculateNutrient(ingredient, food => food.Protein),
                Carbohydrates = CalculateNutrient(ingredient, food => food.Carbohydrates),
                Fat = CalculateNutrient(ingredient, food => food.Fat)
            }).ToList();

            var servings = recipe.Servings > 0 ? recipe.Servings : 1;
            var calories = ingredients.Sum(i => i.Calories);
            var protein = ingredients.Sum(i => i.Protein);
            var carbohydrates = ingredients.Sum(i => i.Carbohydrates);
            var fat = ingredients.Sum(i => i.Fat);

            return new RecipeDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                ImageUrl = recipe.ImageUrl,
                Servings = recipe.Servings,
                Category = recipe.Category,
                Source = recipe.Source,
                SourceUrl = recipe.SourceUrl,
                Calories = calories,
                Protein = protein,
                Carbohydrates = carbohydrates,
                Fat = fat,
                CaloriesPerServing = calories / servings,
                ProteinPerServing = protein / servings,
                CarbohydratesPerServing = carbohydrates / servings,
                FatPerServing = fat / servings,
                Ingredients = ingredients
                ,Steps = recipe.Steps.OrderBy(step => step.Order).ToList()
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeDto>> GetRecipe(int id)
        {
            var recipe = await _context.Recipes
                .Include(r => r.Ingredients)
                    .ThenInclude(i => i.Food)
                .Include(r => r.Ingredients)
                    .ThenInclude(i => i.Unit)
                .Include(r => r.Steps)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (recipe == null)
            {
                return NotFound();
            }

            return ToDto(recipe);
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> CreateRecipe(Recipe recipe)
        {
            var validationError = await ValidateRecipe(recipe);
            if (validationError != null) return BadRequest(validationError);
            recipe.Steps = CleanAndOrderSteps(recipe.Steps);
            var unitIds = recipe.Ingredients.Select(i => i.UnitId).Distinct().ToList();
            var units = await _context.Units
                .Where(u => unitIds.Contains(u.Id))
                .ToListAsync();

            if (units.Count != unitIds.Count || recipe.Ingredients.Any(i => i.Quantity <= 0))
                return BadRequest("Ungültige Zutat oder Menge.");

            foreach (var ingredient in recipe.Ingredients)
            {
                var unit = units.Single(u => u.Id == ingredient.UnitId);
                var food = await _context.Foods.FindAsync(ingredient.FoodId);
                if (food == null || (unit.FoodId != null && unit.FoodId != food.Id) ||
                    (unit.FoodId == null && ((food.ReferenceUnit == "g" && unit.Name is "ml" or "l") ||
                                             (food.ReferenceUnit == "ml" && unit.Name is "g" or "kg"))))
                    return BadRequest("Die Unit ist für dieses Lebensmittel nicht zulässig.");
            }

            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetRecipe),
                new { id = recipe.Id },
                recipe);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            var existingRecipe = await _context.Recipes
                .Include(r => r.Ingredients)
                .Include(r => r.Steps)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (existingRecipe == null)
            {
                return NotFound();
            }

            var validationError = await ValidateRecipe(recipe);
            if (validationError != null) return BadRequest(validationError);

            existingRecipe.Name = recipe.Name;
            existingRecipe.Description = recipe.Description;
            existingRecipe.ImageUrl = recipe.ImageUrl;
            existingRecipe.Servings = recipe.Servings;
            existingRecipe.Category = recipe.Category;
            existingRecipe.Source = recipe.Source;
            existingRecipe.SourceUrl = recipe.SourceUrl;

            _context.RecipeSteps.RemoveRange(existingRecipe.Steps);
            existingRecipe.Steps = CleanAndOrderSteps(recipe.Steps);

            _context.RecipeIngredients.RemoveRange(existingRecipe.Ingredients);

            existingRecipe.Ingredients = recipe.Ingredients.Select(ingredient => new RecipeIngredient
            {
                FoodId = ingredient.FoodId,
                Quantity = ingredient.Quantity,
                UnitId = ingredient.UnitId
            }).ToList();

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<string?> ValidateRecipe(Recipe recipe)
        {
            if (string.IsNullOrWhiteSpace(recipe.Name)) return "Der Rezeptname darf nicht leer sein.";
            if (recipe.Servings <= 0) return "Die Portionsanzahl muss größer als null sein.";
            if (recipe.Ingredients.Any(ingredient => ingredient.Quantity <= 0)) return "Zutatenmengen müssen größer als null sein.";
            if (recipe.Steps.Any(step => string.IsNullOrWhiteSpace(step.Instruction))) return "Zubereitungsschritte dürfen nicht leer sein.";
            var units = await _context.Units.Where(unit => recipe.Ingredients.Select(i => i.UnitId).Contains(unit.Id)).ToListAsync();
            if (units.Count != recipe.Ingredients.Select(i => i.UnitId).Distinct().Count()) return "Eine verwendete Einheit wurde nicht gefunden.";
            foreach (var ingredient in recipe.Ingredients)
            {
                var food = await _context.Foods.FindAsync(ingredient.FoodId);
                var unit = units.SingleOrDefault(item => item.Id == ingredient.UnitId);
                if (food == null || unit == null || (unit.FoodId != null && unit.FoodId != food.Id) ||
                    (unit.FoodId == null && ((food.ReferenceUnit == "g" && unit.Name is "ml" or "l") ||
                                             (food.ReferenceUnit == "ml" && unit.Name is "g" or "kg"))))
                    return "Eine Zutat oder Einheit ist ungültig.";
            }
            return null;
        }

        private static List<RecipeStep> CleanAndOrderSteps(IEnumerable<RecipeStep>? steps)
        {
            return (steps ?? Enumerable.Empty<RecipeStep>())
                .Where(step => !string.IsNullOrWhiteSpace(step.Instruction))
                .Select((step, index) => new RecipeStep
                {
                    // Steps werden bei einem Update vollständig ersetzt; die Datenbank vergibt neue IDs.
                    Id = 0,
                    RecipeId = step.RecipeId,
                    Order = index + 1,
                    Instruction = step.Instruction.Trim()
                })
                .ToList();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes
                .Include(r => r.Ingredients)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
