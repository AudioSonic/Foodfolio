using Foodfolio.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace Foodfolio.Server.Data
{
    public class FoodfolioDbContext : DbContext
    {
        public FoodfolioDbContext(DbContextOptions<FoodfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<Food> Foods { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.Ingredients)
                .HasForeignKey(ri => ri.RecipeId);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Food)
                .WithMany(f => f.RecipeIngredients)
                .HasForeignKey(ri => ri.FoodId);
        }
    }
}