using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Foodfolio.API.Data;
using Foodfolio.Core.Models;

namespace Foodfolio.API.Controllers
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

            // GET: api/Category
            [HttpGet]
            public async Task<ActionResult<IEnumerable<CategoryModel>>> GetCategories()
            {
                return await _context.Categories.ToListAsync();
            }

            // GET: api/Category/5
            [HttpGet("{id}")]
            public async Task<ActionResult<CategoryModel>> GetCategory(int id)
            {
                var category = await _context.Categories.FindAsync(id);

                if (category == null)
                    return NotFound();

                return category;
            }

            // POST: api/Category
            [HttpPost]
            public async Task<ActionResult<CategoryModel>> PostCategory(CategoryModel Category)
            {
                _context.Categories.Add(Category);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCategory), new { id = Category.Id }, Category);
            }

            // PUT: api/Category/5
            [HttpPut("{id}")]
            public async Task<IActionResult> PutCategory(Guid id, CategoryModel Category)
            {
                if (id != Category.Id)
                    return BadRequest();

                _context.Entry(Category).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }

            // DELETE: api/Category/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteCategory(int id)
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                    return NotFound();

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }
    }

