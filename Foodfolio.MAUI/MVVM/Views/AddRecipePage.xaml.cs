using Foodfolio.MAUI.MVVM.ViewModels;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class AddRecipePage : ContentPage
{
	public AddRecipePage(AddRecipeViewModel viewModel)
	{
		InitializeComponent();
		BindingContext = viewModel;
    }
}