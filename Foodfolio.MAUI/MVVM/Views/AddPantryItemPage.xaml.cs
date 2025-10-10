namespace Foodfolio.Views;
using Foodfolio.MVVM.ViewModels;

public partial class AddPantryItemPage : ContentPage
{
	public AddPantryItemPage()
	{
		InitializeComponent();
		BindingContext = new AddPantryItemViewModel();
	}
}