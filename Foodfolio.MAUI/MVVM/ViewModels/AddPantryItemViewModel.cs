using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.MVVM.Models;
using System.Collections.ObjectModel;
using System.Xml.Linq;

namespace Foodfolio.MVVM.ViewModels
{
    public partial class AddPantryItemViewModel : ObservableObject
    {
        // 🔹 Eigenschaften mit automatischem PropertyChanged-Event
        [ObservableProperty]
        private string name = string.Empty;

        [ObservableProperty]
        private int calories;

        [ObservableProperty]
        private decimal quantity;

        [ObservableProperty]
        private decimal carbs;

        [ObservableProperty]
        private decimal proteins;

        [ObservableProperty]
        private decimal fats;

        [ObservableProperty]
        private decimal availableQuantity;

        [ObservableProperty]
        private Dictionary<string, int> extraUnits = new Dictionary<string, int>();

        [ObservableProperty]
        private string category = string.Empty;

        [ObservableProperty]
        private ObservableCollection<string> availableCategories = new ObservableCollection<string>
        {
            "Obst", "Gemüse", "Fleisch", "Getreide"
        };

        [ObservableProperty]
        private string icon = string.Empty;

        // 🔹 Command zum Erstellen eines Ingredients
        [RelayCommand]
        private async Task CreateIngredientAsync()
        {
            var newIngredient = new PantryItem
            {
                Id = Guid.NewGuid(),
                Name = Name,
                Quantity = Quantity,
                ExtraUnits = extraUnits
            };

            // TODO: später durch Repository speichern
            await Application.Current.MainPage.DisplayAlert(
                "Erstellt",
                $"Zutat '{Name}' wurde hinzugefügt!",
                "OK");

            // Eingabefelder zurücksetzen
            Name = string.Empty;
            Quantity = 0;
            Calories = 0;
            Carbs = Proteins = Fats = 0;
            Category = string.Empty;
            ExtraUnits.Clear();
        }
    }
}
