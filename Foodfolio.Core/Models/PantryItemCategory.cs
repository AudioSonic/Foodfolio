using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLite;

namespace Foodfolio.Core.Models
{
    [Table("PantryItemCategory")]
    public class PantryItemCategory
    {
        [PrimaryKey]
        public Guid C2P_ID { get; set; }
        public Guid CategoryId { get; set; }
        public Guid PantryItemId { get; set; }
    }
}
