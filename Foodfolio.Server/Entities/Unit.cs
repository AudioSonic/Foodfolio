using System.Text.Json.Serialization;

namespace Foodfolio.Server.Entities
{
    public class Unit
    {
        public int Id {  get; set; }
        public int? FoodId { get; set; }

        [JsonIgnore]
        public Food? Food { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Value { get; set; }

    }
}
