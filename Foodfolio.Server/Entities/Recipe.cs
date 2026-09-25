namespace Foodfolio.Server.Entities
{
    public class Recipe
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int Servings { get; set; }

        public string Category { get; set; } = "Mittagessen";

        public ICollection<RecipeIngredient> Ingredients { get; set; }
            = new List<RecipeIngredient>();
    }
}
