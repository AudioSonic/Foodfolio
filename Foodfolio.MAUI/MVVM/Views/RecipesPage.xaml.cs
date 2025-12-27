using Foodfolio.MAUI.Helpers;
using Foodfolio.MAUI.MVVM.ViewModels;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class RecipesPage : ContentPage
{
	public RecipesPage(RecipesPageViewModel viewModel)
	{
		InitializeComponent();
        BindingContext = viewModel;
	}

    private async void AddItemButton_Clicked(object sender, EventArgs e)
    {
        var addPage = ServiceHelper.GetService<AddRecipePage>();
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