namespace Foodfolio.API.Models
{
    public class PantryItem
    {
        public int Id { get; set; }              // Primärschlüssel
        public string Name { get; set; }         // Name des Lebensmittels
        public double Quantity { get; set; }     // Menge
        public string Unit { get; set; }         // Einheit (z. B. g, ml, Stück)
    }
}
