using Foodfolio.Server.Data;
using Foodfolio.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Foodfolio.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodsController : ControllerBase
    {
        private readonly FoodfolioDbContext _context;

        public FoodsController(FoodfolioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Food>>> GetAllFoods()
        {
            return await _context.Foods
                .Include(o => o.Units)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Food>> GetFood(int id)
        {
            var food = await _context.Foods
                .Include(f => f.Units)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (food == null)
            {
                return NotFound();
            }

            return food;
        }

        [HttpPost]
        public async Task<ActionResult<Food>> CreateFood(Food food)
        {
            var validationError = ValidateFood(food);
            if (validationError != null) return BadRequest(validationError);

            foreach (var unit in food.Units)
            {
                if (string.IsNullOrWhiteSpace(unit.Name) || unit.Value <= 0)
                    return BadRequest("Optionale Units benötigen einen Namen und einen positiven Gewichtswert.");

                // Optional units gehören ausschließlich zu diesem Lebensmittel.
                unit.Food = food;
                unit.FoodId = null;
            }

            _context.Foods.Add(food);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetFood),
                new { id = food.Id },
                food);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFood(int id, Food food)
        {
            if (id != food.Id)
            {
                return BadRequest();
            }

            var existingFood = await _context.Foods
                .Include(f => f.Units)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (existingFood == null)
                return NotFound();

            var validationError = ValidateFood(food);
            if (validationError != null) return BadRequest(validationError);

            existingFood.Name = food.Name;
            existingFood.BrandName = food.BrandName;
            existingFood.Calories = food.Calories;
            existingFood.Protein = food.Protein;
            existingFood.Carbohydrates = food.Carbohydrates;
            existingFood.Fat = food.Fat;
            existingFood.ReferenceAmount = food.ReferenceAmount;
            existingFood.ReferenceUnit = food.ReferenceUnit;

            _context.Units.RemoveRange(existingFood.Units);
            foreach (var unit in food.Units)
            {
                if (string.IsNullOrWhiteSpace(unit.Name) || unit.Value <= 0)
                    return BadRequest("Optionale Units benötigen einen Namen und einen positiven Gewichtswert.");

                existingFood.Units.Add(new Unit { Name = unit.Name, Value = unit.Value });
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static string? ValidateFood(Food food)
        {
            if (string.IsNullOrWhiteSpace(food.Name)) return "Der Lebensmittelname darf nicht leer sein.";
            if (food.ReferenceAmount <= 0) return "Die Referenzmenge muss größer als null sein.";
            if (food.ReferenceUnit is not ("g" or "ml")) return "Die Referenzeinheit muss g oder ml sein.";
            if (food.Calories < 0 || food.Protein < 0 || food.Carbohydrates < 0 || food.Fat < 0)
                return "Nährwerte dürfen nicht negativ sein.";
            if (food.Units.Any(unit => string.IsNullOrWhiteSpace(unit.Name) || unit.Value <= 0))
                return "Optionale Einheiten benötigen einen Namen und einen positiven Wert.";
            return null;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFood(int id)
        {
            var food = await _context.Foods.FindAsync(id);

            if (food == null)
            {
                return NotFound();
            }

            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
