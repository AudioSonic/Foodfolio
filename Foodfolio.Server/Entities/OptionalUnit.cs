namespace Foodfolio.Server.Entities
{
    public class OptionalUnit
    {
        public int Id {  get; set; }
        public int FoodId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Value { get; set; }
    }
}
