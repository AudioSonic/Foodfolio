using Foodfolio.MVVM.ViewModels;

namespace Foodfolio.MVVM.Views;

public partial class CategoriesPage : ContentPage
{
	public CategoriesPage()
	{
		InitializeComponent();
		BindingContext = new CategoriesViewModel();
	}
}