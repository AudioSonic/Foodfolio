using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.Core.Models;
using Foodfolio.MAUI.MVVM.Views;
using Foodfolio.MAUI.Services;
using System.Collections.ObjectModel;

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class CategoriesViewModel : ObservableObject
    {
        [ObservableProperty]
        private ObservableCollection<Categories> allCategories = new();

        [ObservableProperty]
        private ObservableCollection<Categories> selectedCategories = new();

        public CategoriesViewModel()
        {
            AllCategories.Add(new Categories { Id = Guid.NewGuid(), Name = "Italienisch", ColorHex = "#ff6600" });
            AllCategories.Add(new Categories { Id = Guid.NewGuid(), Name = "Mexikanisch", ColorHex = "#00cc66" });
        }

        [RelayCommand]
        private async Task AddCategoryAsync()
        {
            await Shell.Current.GoToAsync(nameof(AddCategoryPage));

        }

        [RelayCommand]
        private async Task EditCategoryAsync(Categories category)
        {
            await Application.Current.MainPage.DisplayAlert("Bearbeiten", $"Kategorie: {category.Name}", "OK");
        }

        [RelayCommand]
        private async Task CopyCategoryAsync(Categories category)
        {
            var copy = new Categories
            {
                Id = Guid.NewGuid(),
                Name = $"{category.Name} (Kopie)",
                ColorHex = category.ColorHex
            };
            AllCategories.Add(copy);
        }

        [RelayCommand]
        private async Task DeleteCategoryAsync(Categories category)
        {
            bool confirm = await Application.Current.MainPage.DisplayAlert("Löschen", $"Möchtest du {category.Name} löschen?", "Ja", "Nein");
            if (confirm)
                AllCategories.Remove(category);
        }
    }
}
