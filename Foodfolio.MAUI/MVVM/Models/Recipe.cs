using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.MVVM.Models
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public List<PantryItem> Ingredients { get; set; } = new();
        public NutritionSummary Nutrition { get; set; } = new();
        public string? PhotoUrl { get; set; }
        public int PrepMinutes { get; set; }
        public int CookMinutes { get; set; }
    }
}
