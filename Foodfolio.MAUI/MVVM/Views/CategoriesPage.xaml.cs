using Foodfolio.MAUI.MVVM.ViewModels;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class CategoriesPage : ContentPage
{
	public CategoriesPage()
	{
		InitializeComponent();
		BindingContext = new CategoriesViewModel();
	}
}