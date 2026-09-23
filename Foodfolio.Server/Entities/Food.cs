namespace Foodfolio.Server.Entities
{
    public class Food
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrates { get; set; }
        public decimal Fat { get; set; }

        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
            = new List<RecipeIngredient>();
    }
}
