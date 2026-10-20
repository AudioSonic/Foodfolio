using Foodfolio.Server.Data;
using Foodfolio.Server.DTOs;
using Foodfolio.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Foodfolio.Server.Controllers;

[ApiController]
[Route("api/meal-plan")]
public class MealPlanController : ControllerBase
{
    private static readonly string[] MealTypes = ["breakfast", "snack1", "lunch", "snack2", "dinner"];
    private readonly FoodfolioDbContext context;

    public MealPlanController(FoodfolioDbContext context) => this.context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MealPlanItemDto>>> Get([FromQuery] DateTime date)
    {
        var day = date.Date;
        var items = await context.MealPlanItems
            .Where(item => item.Date == day)
            .Include(item => item.Recipe).ThenInclude(recipe => recipe!.Ingredients).ThenInclude(ingredient => ingredient.Food)
            .Include(item => item.Recipe).ThenInclude(recipe => recipe!.Ingredients).ThenInclude(ingredient => ingredient.Unit)
            .Include(item => item.Food)
            .Include(item => item.Unit)
            .ToListAsync();
        return items.Select(ToDto).ToList();
    }

    [HttpPost]
    public async Task<ActionResult<MealPlanItemDto>> Create(MealPlanItem input) => await Save(input, null);

    [HttpPut("{id}")]
    public async Task<ActionResult<MealPlanItemDto>> Update(int id, MealPlanItem input) => await Save(input, id);

    private async Task<ActionResult<MealPlanItemDto>> Save(MealPlanItem input, int? id)
    {
        if (!MealTypes.Contains(input.MealType) || input.Date == default)
            return BadRequest("Datum oder Mahlzeit ist ungültig.");
        var validation = await Validate(input);
        if (validation != null) return validation;

        MealPlanItem? item;
        if (id.HasValue)
        {
            item = await context.MealPlanItems.FindAsync(id.Value);
            if (item == null) return NotFound();
        }
        else
        {
            item = new MealPlanItem();
            context.MealPlanItems.Add(item);
        }
        item.Date = input.Date.Date;
        item.MealType = input.MealType;
        item.EntryType = input.EntryType;
        item.RecipeId = input.RecipeId;
        item.FoodId = input.FoodId;
        item.Portions = input.Portions;
        item.Quantity = input.Quantity;
        item.UnitId = input.UnitId;
        await context.SaveChangesAsync();
        item = await context.MealPlanItems
            .Include(x => x.Recipe).ThenInclude(recipe => recipe!.Ingredients).ThenInclude(ingredient => ingredient.Food)
            .Include(x => x.Recipe).ThenInclude(recipe => recipe!.Ingredients).ThenInclude(ingredient => ingredient.Unit)
            .Include(x => x.Food)
            .Include(x => x.Unit)
            .SingleAsync(x => x.Id == item.Id);
        return id.HasValue ? Ok(ToDto(item)) : CreatedAtAction(nameof(Get), new { date = item.Date }, ToDto(item));
    }

    private async Task<BadRequestObjectResult?> Validate(MealPlanItem input)
    {
        if (input.EntryType == "recipe")
        {
            if (input.RecipeId == null || input.FoodId != null || input.UnitId != null || input.Quantity != null || input.Portions is null or <= 0)
                return BadRequest("Rezeptplanung benötigt ein Rezept und eine positive Portionsanzahl.");
            if (!await context.Recipes.AnyAsync(recipe => recipe.Id == input.RecipeId)) return BadRequest("Das Rezept wurde nicht gefunden.");
        }
        else if (input.EntryType == "food")
        {
            if (input.FoodId == null || input.RecipeId != null || input.UnitId == null || input.Quantity is null or <= 0 || input.Portions != null)
                return BadRequest("Lebensmittelplanung benötigt Lebensmittel, Einheit und eine positive Menge.");
            var food = await context.Foods.Include(x => x.Units).FirstOrDefaultAsync(x => x.Id == input.FoodId);
            var unit = await context.Units.FindAsync(input.UnitId);
            if (food == null || unit == null || (unit.FoodId != null && unit.FoodId != food.Id) ||
                (unit.FoodId == null && ((food.ReferenceUnit == "g" && unit.Name is "ml" or "l") || (food.ReferenceUnit == "ml" && unit.Name is "g" or "kg"))))
                return BadRequest("Die Einheit ist für dieses Lebensmittel nicht zulässig.");
        }
        else return BadRequest("Der Eintragstyp ist ungültig.");
        return null;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await context.MealPlanItems.FindAsync(id);
        if (item == null) return NotFound();
        context.MealPlanItems.Remove(item);
        await context.SaveChangesAsync();
        return NoContent();
    }

    private static MealPlanItemDto ToDto(MealPlanItem item)
    {
        var dto = new MealPlanItemDto { Id = item.Id, Date = item.Date, MealType = item.MealType, EntryType = item.EntryType, RecipeId = item.RecipeId, FoodId = item.FoodId, Portions = item.Portions, Quantity = item.Quantity, UnitId = item.UnitId, UnitName = item.Unit?.Name };
        if (item.EntryType == "recipe" && item.Recipe != null)
        {
            dto.Name = item.Recipe.Name; dto.ImageUrl = item.Recipe.ImageUrl;
            var servings = Math.Max(1, item.Recipe.Servings);
            foreach (var ingredient in item.Recipe.Ingredients)
            {
                var value = ingredient.Food == null || ingredient.Unit == null || ingredient.Food.ReferenceAmount <= 0 ? 0 : ingredient.Quantity * ingredient.Unit.Value / ingredient.Food.ReferenceAmount;
                dto.Calories += value * (ingredient.Food?.Calories ?? 0);
                dto.Protein += value * (ingredient.Food?.Protein ?? 0);
                dto.Carbohydrates += value * (ingredient.Food?.Carbohydrates ?? 0);
                dto.Fat += value * (ingredient.Food?.Fat ?? 0);
            }
            dto.Calories = dto.Calories / servings * (item.Portions ?? 0);
            dto.Protein = dto.Protein / servings * (item.Portions ?? 0);
            dto.Carbohydrates = dto.Carbohydrates / servings * (item.Portions ?? 0);
            dto.Fat = dto.Fat / servings * (item.Portions ?? 0);
        }
        else if (item.EntryType == "food" && item.Food != null && item.Unit != null && item.Food.ReferenceAmount > 0)
        {
            dto.Name = item.Food.Name;
            var factor = item.Quantity!.Value * item.Unit.Value / item.Food.ReferenceAmount;
            dto.Calories = item.Food.Calories * factor; dto.Protein = item.Food.Protein * factor; dto.Carbohydrates = item.Food.Carbohydrates * factor; dto.Fat = item.Food.Fat * factor;
        }
        return dto;
    }
}
