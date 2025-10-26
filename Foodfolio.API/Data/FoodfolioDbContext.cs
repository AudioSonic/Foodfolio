using Microsoft.EntityFrameworkCore;
using Foodfolio.Core.Models;

namespace Foodfolio.API.Data
{
    public class FoodfolioDbContext : DbContext
    {
        public FoodfolioDbContext(DbContextOptions<FoodfolioDbContext> options)
            : base(options)
        {
        }

        //Erzeugt automatisch Tabellen in SQLite
        public DbSet<PantryItem> PantryItems { get; set; }
        public DbSet<Categories> Categories { get; set; }

        //Legt fest, wo die lokale SQLite-Datenbank gespeichert wird
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Falls noch keine Optionen über Dependency Injection übergeben wurden
            if (!optionsBuilder.IsConfigured)
            {
                var dbPath = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "foodfolio.db");
                optionsBuilder.UseSqlite($"Filename={dbPath}");
            }
        }
    }
}