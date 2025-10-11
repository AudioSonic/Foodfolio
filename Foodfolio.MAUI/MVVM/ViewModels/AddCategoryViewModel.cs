using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.Helpers;
using Foodfolio.MVVM.Models;

namespace Foodfolio.MVVM.ViewModels
{
    public partial class AddCategoryViewModel : ObservableObject, IResultProvider<Categories>
    {
        [ObservableProperty]
        private string name;

        [ObservableProperty]
        private string colorHex = "#cccccc";

        public Categories Result { get; private set; }

        [RelayCommand]
        private async Task SaveAsync()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                await Application.Current.MainPage.DisplayAlert("Fehler", "Bitte gib einen Namen ein.", "OK");
                return;
            }

            Result = new Categories
            {
                Id = Guid.NewGuid(),
                Name = Name,
                ColorHex = ColorHex
            };

            await Shell.Current.Navigation.PopModalAsync();
        }

        [RelayCommand]
        private async Task CancelAsync()
        {
            Result = null;
            await Shell.Current.Navigation.PopModalAsync();
        }
    }
}
