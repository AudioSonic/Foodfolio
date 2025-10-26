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

            // GET: api/categories
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Categories>>> GetCategories()
            {
                return await _context.Categories.ToListAsync();
            }

            // GET: api/categories/5
            [HttpGet("{id}")]
            public async Task<ActionResult<Categories>> GetCategory(int id)
            {
                var category = await _context.Categories.FindAsync(id);

                if (category == null)
                    return NotFound();

                return category;
            }

            // POST: api/categories
            [HttpPost]
            public async Task<ActionResult<Categories>> PostCategory(Categories categories)
            {
                _context.Categories.Add(categories);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCategory), new { id = categories.Id }, categories);
            }

            // PUT: api/categories/5
            [HttpPut("{id}")]
            public async Task<IActionResult> PutCategory(Guid id, Categories categories)
            {
                if (id != categories.Id)
                    return BadRequest();

                _context.Entry(categories).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }

            // DELETE: api/categories/5
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

