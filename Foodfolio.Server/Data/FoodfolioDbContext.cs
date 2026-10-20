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
        public DbSet<RecipeStep> RecipeSteps { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<MealPlanItem> MealPlanItems { get; set; }

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

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Unit)
                .WithMany()
                .HasForeignKey(ri => ri.UnitId);

            modelBuilder.Entity<RecipeStep>()
                .HasOne(step => step.Recipe)
                .WithMany(recipe => recipe.Steps)
                .HasForeignKey(step => step.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Unit>()
                .HasOne(u => u.Food)
                .WithMany(f => f.Units)
                .HasForeignKey(u => u.FoodId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MealPlanItem>()
                .HasOne(item => item.Recipe)
                .WithMany()
                .HasForeignKey(item => item.RecipeId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<MealPlanItem>()
                .HasOne(item => item.Food)
                .WithMany()
                .HasForeignKey(item => item.FoodId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<MealPlanItem>()
                .HasOne(item => item.Unit)
                .WithMany()
                .HasForeignKey(item => item.UnitId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<MealPlanItem>()
                .HasIndex(item => new { item.Date, item.MealType });

            modelBuilder.Entity<Unit>().HasData(
                new Unit
                {
                    Id = 1,
                    FoodId = null,
                    Name = "g",
                    Value = 1
                },
                new Unit
                {
                    Id = 2,
                    FoodId = null,
                    Name = "kg",
                    Value = 1000
                },
                new Unit
                {
                    Id = 3,
                    FoodId = null,
                    Name = "ml",
                    Value = 1
                },
                new Unit
                {
                    Id = 4,
                    FoodId = null,
                    Name = "l",
                    Value = 1000
                }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Frühstück", SortOrder = 1 },
                new Category { Id = 2, Name = "Mittagessen", SortOrder = 2 },
                new Category { Id = 3, Name = "Abendessen", SortOrder = 3 },
                new Category { Id = 4, Name = "Snack", SortOrder = 4 }
            );

        }
    }
}
