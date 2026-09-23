using System.Text.Json.Serialization;

namespace Foodfolio.Server.Entities
{
    public class RecipeIngredient
    {
        public int Id { get; set; }

        public int RecipeId { get; set; }

        [JsonIgnore]
        public Recipe? Recipe { get; set; }

        public int FoodId { get; set; }
        public Food? Food { get; set; }

        public decimal Quantity { get; set; }
    }
}