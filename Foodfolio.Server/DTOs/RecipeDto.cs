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
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrates { get; set; }
        public decimal Fat { get; set; }
        public decimal CaloriesPerServing { get; set; }
        public decimal ProteinPerServing { get; set; }
        public decimal CarbohydratesPerServing { get; set; }
        public decimal FatPerServing { get; set; }

        public ICollection<RecipeIngredientDto> Ingredients { get; set; }
            = new List<RecipeIngredientDto>();
    }
}
