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
        public int PortionSize { get; set; }
        public string? Description { get; set; }
        public List<PantryItem> Ingredients { get; set; } = new();
        public string? PhotoUrl { get; set; }
        public int PrepTimeMinutes { get; set; }
        public int CookTimeMinutes { get; set; }
        public string Source { get; set; } = "";
        public string Instructions { get; set; } = "";
        public string Notes { get; set; } = "";
        public int TotalCalories => Ingredients.Sum(i => i.Calories);
        public decimal TotalCarbs => Ingredients.Sum(i => i.Carbs);
        public decimal TotalProteins => Ingredients.Sum(i => i.Proteins);
        public decimal TotalFats => Ingredients.Sum(i => i.Fats);
        public string? Barcode { get; set; }
        public int Rating { get; set; }
        public List<string> Categories { get; set; }
    }
}
