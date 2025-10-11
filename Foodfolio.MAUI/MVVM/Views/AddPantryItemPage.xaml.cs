using Foodfolio.MVVM.ViewModels;

namespace Foodfolio.MVVM.Views;
public partial class AddPantryItemPage : ContentPage
{
	public AddPantryItemPage()
	{
		InitializeComponent();
		BindingContext = new AddPantryItemViewModel();
	}
}