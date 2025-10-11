using Foodfolio.MVVM.ViewModels;

namespace Foodfolio.MVVM.Views;

public partial class AddRecipePage : ContentPage
{
	public AddRecipePage()
	{
		InitializeComponent();
        BindingContext = new AddRecipeViewModel();
    }
}