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
            LoadLastPantryItemAsync();
        }

        // Observable Property für XAML Binding
        [ObservableProperty]
        private string lastItemName = string.Empty; // Field-Name mit Kleinbuchstaben

        // Asynchrone Methode, um das letzte Item zu laden
        private async Task LoadLastPantryItemAsync()
        {
            try
            {
                var items = await _pantryService.GetAllItemsAsync();

                if (items != null && items.Any())
                {
                    LastItemName = items.Last().Name;
                }
                else
                {
                    LastItemName = "Keine Einträge vorhanden";
                }
            }
            catch (Exception ex)
            {
                LastItemName = $"Fehler: {ex.Message}";
            }
        }
    }
}
