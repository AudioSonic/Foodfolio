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
        private readonly CategoryService _categoryService;

        public CategoryViewModel(CategoryService categoryService)
        {
            _categoryService = categoryService;
            LoadAllCategoriesAsync();
        }

        [ObservableProperty]
        private ObservableCollection<CategoryModel> allCategory = new();

        [ObservableProperty]
        private ObservableCollection<CategoryModel> selectedCategory = new();

        [ObservableProperty]
        public List<CategoryModel> categoriesList;

        [RelayCommand]
        private async Task AddCategoryAsync()
        {
            await Shell.Current.GoToAsync(nameof(AddCategoryPage));

        }

        [RelayCommand]
        private async Task EditCategoryAsync(CategoryModel category)
        {
            await Application.Current.MainPage.DisplayAlert("Edit", $"Category: {category.Name}", "OK");
        }

        [RelayCommand]
        private async Task CopyCategoryAsync(CategoryModel category)
        {
            var copy = new CategoryModel
            {
                Id = Guid.NewGuid(),
                Name = $"{category.Name} (Copy)",
                ColorHex = category.ColorHex
            };
            allCategory.Add(copy);
        }

        [RelayCommand]
        private async Task DeleteCategoryAsync(CategoryModel category)
        {
            bool confirm = await Application.Current.MainPage.DisplayAlert("Delete Category", $"Do you really want to delete {category.Name}?", "Yes", "No");
            if (confirm)
                allCategory.Remove(category);
        }


        [RelayCommand]
        public async Task LoadAllCategoriesAsync()
        {
            try
            {
                var items = await _categoryService.GetAllCategoryAsync();

                if (items != null && items.Any())
                {
                    categoriesList = items;
                }
            }
            catch (Exception ex)
            {
                //collectedItems = $"Fehler: {ex.Message}"; 
            }

        }
    }
}
