using System.Text.Json.Serialization;

namespace Foodfolio.Server.Entities
{
    public class RecipeStep
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }

        [JsonIgnore]
        public Recipe? Recipe { get; set; }

        public int Order { get; set; }
        public string Instruction { get; set; } = string.Empty;
    }
}
