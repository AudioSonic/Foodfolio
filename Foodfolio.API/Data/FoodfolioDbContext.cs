using Foodfolio.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Foodfolio.API.Data
{
    public class FoodfolioDbContext : DbContext
    {
        public FoodfolioDbContext(DbContextOptions<FoodfolioDbContext> options)
            : base(options)
        {
        }

        // Tabelle für PantryItems
        public DbSet<PantryItem> PantryItems { get; set; }
    }
}