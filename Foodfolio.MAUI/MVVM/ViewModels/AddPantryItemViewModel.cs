using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using Foodfolio.Core.Models;
using Foodfolio.MAUI.Services;

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class AddPantryItemViewModel : ObservableObject
    {
        private readonly PantryService _pantryService;
        public AddPantryItemViewModel(PantryService pantryService)
        {
            _pantryService = pantryService;
        }

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

        [RelayCommand]
        private async Task AddPantryItemAsync()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                await Application.Current.MainPage.DisplayAlert("Fehler", "Der Name des Artikels darf nicht leer sein.", "OK");
                return;
            }

            if (Quantity <= 0)
            {
                await Application.Current.MainPage.DisplayAlert("Fehler", "Die Menge muss größer als 0 sein.", "OK");
                return;
            }

            if (Calories < 0)
            {
                await Application.Current.MainPage.DisplayAlert("Fehler", "Die Kalorienanzahl darf nicht negativ sein.", "OK");
                return;
            }

            if (Carbs < 0 || Proteins < 0 || Fats < 0)
            {
                await Application.Current.MainPage.DisplayAlert("Fehler", "Die Nährwerte dürfen nicht negativ sein.", "OK");
                return;
            }

            var newItem = new PantryItem
            {
                Id = Guid.NewGuid(),
                Name = Name,
                Calories = Calories,
                Quantity = Quantity,
                Carbs = Carbs,
                Proteins = Proteins,
                Fats = Fats
            };

            try
            {
                // Item in die Datenbank speichern
                var result = await _pantryService.CreateItemAsync(newItem);

                if (result > 0)
                {
                    await Application.Current.MainPage.DisplayAlert("Hinweis", "Das Lebensmittel wurde erfolgreich gespeichert.", "OK");
                    await Shell.Current.Navigation.PopModalAsync();
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert("Fehler", "Das Lebensmittel konnte nicht gespeichert werden.", "OK");
                }
            }
            catch (Exception ex)
            {
                // Hier kannst du optional auch Logging einbauen
                await Application.Current.MainPage.DisplayAlert("Fehler", $"Beim Speichern ist ein Fehler aufgetreten: {ex.Message}", "OK");
            }
        }


        private async Task PickIconAsync()
        {
            await Microsoft.Maui.Controls.Application.Current.MainPage.DisplayAlert("Achtung", "Icons können noch nicht hinzugefügt werden", "OK");
        }

        private async Task EditAvailableAmountAsync()
        {
            await Microsoft.Maui.Controls.Application.Current.MainPage.DisplayAlert("Achtung", "Die vorhandene Menge kann noch nicht editiert werden", "OK");
        }

        private async Task ChooseCategoryAsync()
        {
            await Microsoft.Maui.Controls.Application.Current.MainPage.DisplayAlert("Achtung", "Neue Kategorien können noch nicht hinzugefügt werden", "OK");
        }

        private async Task AddExtraUnits()
        {
            await Microsoft.Maui.Controls.Application.Current.MainPage.DisplayAlert("Achtung", "Neue Einheiten können noch nicht hinzugefügt werden", "OK");
        }
    }
}
