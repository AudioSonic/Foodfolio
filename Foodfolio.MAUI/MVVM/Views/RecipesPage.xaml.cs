using Foodfolio.MAUI.MVVM.ViewModels;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class RecipesPage : ContentPage
{
	public RecipesPage()
	{
		InitializeComponent();
	}

    private async void AddRecipeButton_Clicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("AddRecipePage");
    }
}