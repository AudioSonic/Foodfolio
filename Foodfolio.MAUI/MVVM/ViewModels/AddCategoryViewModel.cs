using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.Core.Helpers;
using Foodfolio.Core.Models;
using Foodfolio.MAUI.Services;   

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class AddCategoryViewModel : ObservableObject, IResultProvider<Categories>
    {
        [ObservableProperty]
        private string name;

        [ObservableProperty]
        private string colorHex = "#cccccc";

        public Categories Result { get; private set; }

        private readonly CategoryService _categoryService;

        public AddCategoryViewModel(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [RelayCommand]
        private async Task SaveAsync()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                await Application.Current.MainPage.DisplayAlert("Fehler", "Bitte gib einen Namen ein.", "OK");
                return;
            }

            var newCategory = new Categories
            {
                Id = Guid.NewGuid(),
                Name = Name,
                ColorHex = ColorHex
            };

            await _categoryService.AddCategoryAsync(newCategory);

            await Application.Current.MainPage.DisplayAlert("Gespeichert", "Kategorie erfolgreich hinzugefügt!", "OK");
            await Shell.Current.Navigation.PopModalAsync();
        }
        

        [RelayCommand]
        private async Task CancelAsync()
        {
            await Shell.Current.Navigation.PopModalAsync();
        }
    }
}
