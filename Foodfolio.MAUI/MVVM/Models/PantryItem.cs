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
        public decimal Quantity { get; set; }
        public string Unit { get; set; } = "";
        public DateTime? ExpiryDate { get; set; }
    }
}
