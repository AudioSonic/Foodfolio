using CommunityToolkit.Mvvm.ComponentModel;
using Foodfolio.MAUI.Services;
using Foodfolio.Core.Models;

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class PantryPageViewModel : ObservableObject
    {
        private readonly PantryService _pantryService;

        public PantryPageViewModel(PantryService pantryService)
        {
            _pantryService = pantryService;
            LoadPantryItemsAsync();
        }

        [ObservableProperty]
        private List<PantryItem> collectedItems;
        public List<string> testListe = new List<string> { "abc", "def", "ghi","a","a","a","a" };

        private async Task LoadPantryItemsAsync()
        {
            try
            {
                var items = await _pantryService.GetAllItemsAsync();

                if (items != null && items.Any())
                {
                    collectedItems = items;
                }
                else
                {
                    //collectedItems = "Keine Einträge vorhanden";
                }
            }
            catch (Exception ex)
            {
                //collectedItems = $"Fehler: {ex.Message}";
            }
        }
    }
}
