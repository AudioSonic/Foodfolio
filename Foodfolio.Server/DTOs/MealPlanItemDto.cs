namespace Foodfolio.Server.DTOs;

public class MealPlanItemDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string MealType { get; set; } = string.Empty;
    public string EntryType { get; set; } = string.Empty;
    public int? RecipeId { get; set; }
    public int? FoodId { get; set; }
    public decimal? Portions { get; set; }
    public decimal? Quantity { get; set; }
    public int? UnitId { get; set; }
    public string? Name { get; set; }
    public string? ImageUrl { get; set; }
    public string? UnitName { get; set; }
    public decimal Calories { get; set; }
    public decimal Protein { get; set; }
    public decimal Carbohydrates { get; set; }
    public decimal Fat { get; set; }
}
