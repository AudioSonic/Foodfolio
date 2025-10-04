namespace Foodfolio.Views;

public partial class PantryPage : ContentPage
{
	public PantryPage()
	{
		InitializeComponent();
	}

    private async void AddItemButton_Clicked(object sender, EventArgs e)
    {
         await Shell.Current.GoToAsync("AddGroceriesPage");
    }
}