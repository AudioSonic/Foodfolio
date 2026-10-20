namespace Foodfolio.Server.DTOs;

public class ShoppingListItemDto
{
    public int FoodId { get; set; }
    public string FoodName { get; set; } = string.Empty;
    public string Unit { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Category { get; set; } = "Ohne Kategorie";
}
