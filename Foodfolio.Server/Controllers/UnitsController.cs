using Foodfolio.Server.Data;
using Foodfolio.Server.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Foodfolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitsController : ControllerBase
    {
        private readonly FoodfolioDbContext _context;
        public UnitsController(FoodfolioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Unit>>> GetAllUnits()
        {
            return await _context.Units
               .ToListAsync();
        }
    }
}
