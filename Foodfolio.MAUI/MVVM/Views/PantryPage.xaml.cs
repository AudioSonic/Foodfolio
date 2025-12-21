using Foodfolio.MAUI.MVVM.ViewModels;
using Foodfolio.MAUI.Helpers;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class PantryPage : ContentPage
{
    public PantryPage(PantryPageViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
        collectionView.ItemsSource = viewModel.collectedItems;
    }

    private async void AddItemButton_Clicked(object sender, EventArgs e)
    {
        var addPage = ServiceHelper.GetService<AddPantryItemPage>();
        await Navigation.PushAsync(addPage);
    }

    private async void FilterButton_Clicked(object sender, EventArgs e)
    {
        await this.DisplayAlert("Achtung", "Es kann noch nicht gefiltert werden", "OK");
    }

    private async void OnItemTapped(object sender, TappedEventArgs e)
    {
        await DisplayAlert("Item tapped", "You tapped the Bell Pepper card!", "OK");
    }
}