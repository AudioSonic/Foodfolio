namespace Foodfolio.Views;
using Foodfolio.MVVM.ViewModels;

public partial class AddRecipePage : ContentPage
{
	public AddRecipePage()
	{
		InitializeComponent();
        BindingContext = new AddRecipeViewModel();
    }
}