using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.Core.Models;
using Foodfolio.MAUI.MVVM.Views;
using Foodfolio.MAUI.Services;
using System.Collections.ObjectModel;

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class CategoryViewModel : ObservableObject
    {
        [ObservableProperty]
        private ObservableCollection<Category> allCategory = new();

        [ObservableProperty]
        private ObservableCollection<Category> selectedCategory = new();

        public CategoryViewModel()
        {
            allCategory.Add(new Category { Id = Guid.NewGuid(), Name = "Italienisch", ColorHex = "#ff6600" });
            allCategory.Add(new Category { Id = Guid.NewGuid(), Name = "Mexikanisch", ColorHex = "#00cc66" });
        }

        [RelayCommand]
        private async Task AddCategoryAsync()
        {
            await Shell.Current.GoToAsync(nameof(AddCategoryPage));

        }

        [RelayCommand]
        private async Task EditCategoryAsync(Category category)
        {
            await Application.Current.MainPage.DisplayAlert("Bearbeiten", $"Kategorie: {category.Name}", "OK");
        }

        [RelayCommand]
        private async Task CopyCategoryAsync(Category category)
        {
            var copy = new Category
            {
                Id = Guid.NewGuid(),
                Name = $"{category.Name} (Kopie)",
                ColorHex = category.ColorHex
            };
            allCategory.Add(copy);
        }

        [RelayCommand]
        private async Task DeleteCategoryAsync(Category category)
        {
            bool confirm = await Application.Current.MainPage.DisplayAlert("Löschen", $"Möchtest du {category.Name} löschen?", "Ja", "Nein");
            if (confirm)
                allCategory.Remove(category);
        }
    }
}
