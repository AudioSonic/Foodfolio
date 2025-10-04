namespace Foodfolio.Views;

public partial class Pantry : ContentPage
{
	public Pantry()
	{
		InitializeComponent();
	}

    private async void AddItemButton_Clicked(object sender, EventArgs e)
    {
         await Shell.Current.GoToAsync("AddGroceriesPage");
    }
}