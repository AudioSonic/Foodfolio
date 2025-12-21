using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.Core.Helpers;
using Foodfolio.Core.Models;
using Foodfolio.MAUI.Services;   

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class AddCategoryViewModel : ObservableObject, IResultProvider<CategoryModel>
    {
        [ObservableProperty]
        private string name;

        [ObservableProperty]
        private string colorHex = "#cccccc";

        public CategoryModel Result { get; private set; }

        private readonly CategoryService _categoryService;

        public AddCategoryViewModel(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [RelayCommand]
        private async Task SaveCategoryAsync()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                await Application.Current.MainPage.DisplayAlert("Fehler", "Bitte gib einen Namen ein.", "OK");
                return;
            }

            var newItem = new CategoryModel
            {
                Id = Guid.NewGuid(),
                Name = Name,
                ColorHex = ColorHex
            };

            try
            {
                // Item in die Datenbank speichern
                var result = await _categoryService.CreateItemAsync(newItem);

                if (result > 0)
                {
                    await Application.Current.MainPage.DisplayAlert("Hinweis", "Die Kategorie wurde erfolgreich gespeichert.", "OK");
                    await Shell.Current.Navigation.PopModalAsync();
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert("Fehler", "Die Kategorie konnte nicht gespeichert werden.", "OK");
                }
            }
            catch (Exception ex)
            {
                // Hier kannst du optional auch Logging einbauen
                await Application.Current.MainPage.DisplayAlert("Fehler", $"Beim Speichern ist ein Fehler aufgetreten: {ex.Message}", "OK");
            }
        }
        

        [RelayCommand]
        private async Task CancelAsync()
        {
            await Shell.Current.Navigation.PopModalAsync();
        }
    }
}
