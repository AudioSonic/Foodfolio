using Foodfolio.Server.Data;
using Foodfolio.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Foodfolio.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly FoodfolioDbContext _context;

        public CategoriesController(FoodfolioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories
                .OrderBy(category => category.SortOrder)
                .ThenBy(category => category.Name)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            category.Name = category.Name.Trim();
            if (string.IsNullOrWhiteSpace(category.Name))
                return BadRequest("Der Kategoriename darf nicht leer sein.");

            if (await _context.Categories.AnyAsync(item => item.Name == category.Name))
                return Conflict("Diese Kategorie existiert bereits.");

            category.Id = 0;
            category.SortOrder = await _context.Categories.Select(item => (int?)item.SortOrder).MaxAsync() ?? 0;
            category.SortOrder++;
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> RenameCategory(int id, Category input)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();

            var name = input.Name.Trim();
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest("Der Kategoriename darf nicht leer sein.");

            if (await _context.Categories.AnyAsync(item => item.Id != id && item.Name == name))
                return Conflict("Diese Kategorie existiert bereits.");

            category.Name = name;
            await _context.SaveChangesAsync();
            return category;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();

            var recipes = await _context.Recipes
                .Where(recipe => recipe.Category == category.Name)
                .ToListAsync();
            foreach (var recipe in recipes)
                recipe.Category = null;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
