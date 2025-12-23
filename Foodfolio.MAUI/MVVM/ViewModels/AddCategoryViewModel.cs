using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.Core.Helpers;
using Foodfolio.Core.Models;
using Foodfolio.Helpers;
using Foodfolio.MAUI.Services;
using Foodfolio.MVVM.Views;
using Microsoft.Maui.Controls;
using System.Net.Sockets;

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class AddCategoryViewModel : ObservableObject, IResultProvider<CategoryModel>
    {
        [ObservableProperty]
        private ColorPicker colorPicker = new ColorPicker();

        [ObservableProperty]
        private string name;

        [ObservableProperty]
        private string colorHex;

        public CategoryModel Result { get; private set; }

        private readonly CategoryService _categoryService;

        public AddCategoryViewModel(CategoryService categoryService)
        {
            _categoryService = categoryService;
            colorHex = colorPicker.SelectedColor;
        }

        [RelayCommand]
        public void GetCategoryColor(string color)
        {
            colorHex = color;
        }

        [RelayCommand]
        private async Task SaveCategoryAsync()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                await Application.Current.MainPage.DisplayAlert("Warning", "Please enter a name for the category.", "OK");
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
                    await Application.Current.MainPage.DisplayAlert("Success", "Category created", "OK");
                    await Shell.Current.Navigation.PopModalAsync();
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert("Warning", "Couldn't save the category", "OK");
                }
            }
            catch (Exception ex)
            {
                // Hier kannst du optional auch Logging einbauen
                await Application.Current.MainPage.DisplayAlert("Warning", $"An error occured: {ex.Message}", "OK");
            }
        }

        [RelayCommand]
        public async Task PickIconPopupAsync()
        {
            await Application.Current.MainPage.ShowPopupAsync(new PickIconPage());
        }

        [RelayCommand]
        public async Task PickColorPopupAsync()
        {
            var pickColorVM = new PickColorViewModel(colorPicker);
            await Application.Current.MainPage.ShowPopupAsync(new PickColorPage(pickColorVM));
        }

        [RelayCommand]
        private async Task CancelAsync()
        {
            await Shell.Current.Navigation.PopModalAsync();
        }
    }
}
