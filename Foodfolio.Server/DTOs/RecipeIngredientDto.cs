using Foodfolio.Server.Entities;
using System.Text.Json.Serialization;

namespace Foodfolio.Server.DTOs
{
    public class RecipeIngredientDto
    {
        [JsonIgnore]
        public Recipe? Recipe { get; set; }

        public Food? Food { get; set; }

        public decimal Quantity { get; set; }
        public int UnitId { get; set; }
        public Unit? Unit { get; set; }
        public decimal NormalizedQuantity { get; set; }
        public decimal Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrates { get; set; }
        public decimal Fat { get; set; }
    }
}
