using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.MVVM.Models;
using System.Collections.ObjectModel;
using System.Xml.Linq;

namespace Foodfolio.MVVM.ViewModels
{
    public partial class AddRecipeViewModel : ObservableObject
    {
        [ObservableProperty]
        private string source = string.Empty;

        [ObservableProperty]
        private string instructions = string.Empty;

        [ObservableProperty]
        private string notes = string.Empty;

        [ObservableProperty]
        private int totalCalories = 0;

        [ObservableProperty]
        private decimal totalCarbs = 0;

        [ObservableProperty]
        private decimal totalProteins = 0;

        [ObservableProperty]
        private decimal totalFats = 0;

        [ObservableProperty]
        private string? barcode = string.Empty;

        [ObservableProperty]
        private int rating = 0;

        [ObservableProperty]
        private int portionSize = 0;

        [ObservableProperty]
        private string title = string.Empty;

        [ObservableProperty]
        private string? description = string.Empty;

        [ObservableProperty]
        private List<PantryItem> availablePantryItems = new();

        [ObservableProperty]
        private ObservableCollection<PantryItem> ingredients = new();

        [ObservableProperty]
        private ObservableCollection<PantryItem> selectedIngredients = new();

        [ObservableProperty]
        private string selectedCategory = string.Empty;

        [ObservableProperty]
        private ObservableCollection<string> availableCategories = new()
        {
            "Obst", "Gemüse", "Fleisch", "Getreide"
        };

        [ObservableProperty]
        private int prepTimeMinutes;

        [ObservableProperty]
        private int cookTimeMinutes;

        [ObservableProperty]
        private string? photo;

        public AddRecipeViewModel()
        {
            // TODO: Lade PantryItems aus Repository
            availablePantryItems.Add(new PantryItem { Name = "Apfel", Quantity = 200, Calories = 52 });
            availablePantryItems.Add(new PantryItem { Name = "Banane", Quantity = 150, Calories = 89 });
        }

        [RelayCommand]
        private async Task AddRecipeAsync()
        {
            var newRecipe = new Recipe
            {
                Id = Guid.NewGuid(),
                Title = Title,
                Description = Description,
                Ingredients = SelectedIngredients.ToList(), // hier die Auswahl übernehmen
                Categories = new List<string> { SelectedCategory },
                PrepTimeMinutes = PrepTimeMinutes,
                CookTimeMinutes = CookTimeMinutes,
                PhotoUrl = Photo,
                Source = Source,
                Instructions = Instructions,
                Notes = Notes,
                Rating = Rating
            };

            // TODO: Repository speichern
            await Application.Current.MainPage.DisplayAlert(
                "Erstellt",
                $"Rezept '{Title}' wurde hinzugefügt!",
                "OK");

            // Eingaben zurücksetzen
            Title = string.Empty;
            Description = null;
            SelectedIngredients.Clear();
            SelectedCategory = string.Empty;
            PrepTimeMinutes = 0;
            CookTimeMinutes = 0;
            Photo = null;
            Source = string.Empty;
            Instructions = string.Empty;
            Notes = string.Empty;
            Rating = 0;
        }
    }
}
