namespace Foodfolio.Server.DTOs
{
    public class RecipeDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int Servings { get; set; }

        public string Category { get; set; } = "Mittagessen";

        public ICollection<RecipeIngredientDto> Ingredients { get; set; }
            = new List<RecipeIngredientDto>();
    }
}
