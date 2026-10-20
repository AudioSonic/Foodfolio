using Foodfolio.Server.Data;
using Foodfolio.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Foodfolio.Server.Controllers;

[ApiController]
[Route("api/shopping-list")]
public class ShoppingListController : ControllerBase
{
    private readonly FoodfolioDbContext context;
    public ShoppingListController(FoodfolioDbContext context) => this.context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShoppingListItemDto>>> Get([FromQuery] DateTime from, [FromQuery] DateTime to)
    {
        if (from == default || to == default || to.Date < from.Date)
            return BadRequest("Der Wochenzeitraum ist ungültig.");

        var items = await context.MealPlanItems
            .Where(item => item.Date >= from.Date && item.Date <= to.Date && (item.EntryType == "food" || item.EntryType == "recipe"))
            .Include(item => item.Food)
            .Include(item => item.Unit)
            .Include(item => item.Recipe).ThenInclude(recipe => recipe!.Ingredients).ThenInclude(ingredient => ingredient.Food)
            .Include(item => item.Recipe).ThenInclude(recipe => recipe!.Ingredients).ThenInclude(ingredient => ingredient.Unit)
            .ToListAsync();

        var result = new Dictionary<string, ShoppingListItemDto>();
        foreach (var item in items)
        {
            if (item.EntryType == "food" && item.Food != null && item.Unit != null && item.Quantity > 0)
                Add(result, item.Food.Id, item.Food.Name, item.Quantity.Value * item.Unit.Value, item.Food.ReferenceUnit);
            else if (item.EntryType == "recipe" && item.Recipe != null && item.Portions > 0)
            {
                var servings = Math.Max(1, item.Recipe.Servings);
                foreach (var ingredient in item.Recipe.Ingredients)
                    if (ingredient.Food != null && ingredient.Unit != null && ingredient.Quantity > 0)
                        Add(result, ingredient.Food.Id, ingredient.Food.Name, ingredient.Quantity * ingredient.Unit.Value * item.Portions.Value / servings, ingredient.Food.ReferenceUnit);
            }
        }
        return result.Values.OrderBy(item => item.Category).ThenBy(item => item.FoodName).ToList();
    }

    private static void Add(Dictionary<string, ShoppingListItemDto> result, int foodId, string name, decimal quantity, string referenceUnit)
    {
        var key = $"{foodId}:{referenceUnit}";
        if (!result.TryGetValue(key, out var item))
            result[key] = item = new ShoppingListItemDto { FoodId = foodId, FoodName = name, Unit = referenceUnit, Category = "Ohne Kategorie" };
        item.Quantity += quantity;
    }
}
