namespace Foodfolio.Server.Entities;

public class MealPlanItem
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string MealType { get; set; } = string.Empty;
    public string EntryType { get; set; } = string.Empty;
    public int? RecipeId { get; set; }
    public Recipe? Recipe { get; set; }
    public int? FoodId { get; set; }
    public Food? Food { get; set; }
    public decimal? Portions { get; set; }
    public decimal? Quantity { get; set; }
    public int? UnitId { get; set; }
    public Unit? Unit { get; set; }
}
