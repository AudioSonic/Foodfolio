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
            if (food.ReferenceUnit != "g" && food.ReferenceUnit != "ml")
                return BadRequest("ReferenceUnit muss g oder ml sein.");

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

            if (food.ReferenceUnit != "g" && food.ReferenceUnit != "ml")
                return BadRequest("ReferenceUnit muss g oder ml sein.");

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
