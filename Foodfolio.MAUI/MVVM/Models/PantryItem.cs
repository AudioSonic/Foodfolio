using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.MVVM.Models
{
    public class PantryItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public int Calories { get; set; }
        public decimal Quantity { get; set; }
        public decimal Carbs { get; set; }
        public decimal Proteins { get; set; }
        public decimal Fats { get; set; }
        public decimal AvailableQuantity { get; set; }
        public Dictionary<string,int> ExtraUnits { get; set; } 
        public DateTime? ExpiryDate { get; set; }
        public List<string> Categories { get; set; }
    }
}
