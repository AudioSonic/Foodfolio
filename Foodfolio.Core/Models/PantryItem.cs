using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.Core.Models
{
    public class PantryItem
    {
        [PrimaryKey]
        public Guid Id { get; set; }
        [NotNull]
        public string Name { get; set; } = "";
        public int Calories { get; set; } = 0;
        public decimal Quantity { get; set; } = 0;
        public decimal Carbs { get; set; } = 0;
        public decimal Proteins { get; set; } = 0;
        public decimal Fats { get; set; } = 0;
        
        /*
        public decimal AvailableQuantity { get; set; }
        public decimal ExtraUnits { get; set; } 
        public DateTime? ExpiryDate { get; set; }
        public List<string> Categories { get; set; }
        public string Icon { get; set; } = "";      
        public string? Barcode { get; set; }        
        */
    }
}
