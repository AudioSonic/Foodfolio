namespace Foodfolio.Server.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int SortOrder { get; set; }
    }
}
