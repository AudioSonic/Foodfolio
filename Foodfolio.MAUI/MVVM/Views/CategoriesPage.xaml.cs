using Foodfolio.MAUI.Helpers;
using Foodfolio.MAUI.MVVM.ViewModels;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class CategoriesPage : ContentPage
{
	public CategoriesPage()
	{
		InitializeComponent();
		BindingContext = new CategoryViewModel();
	}

    private async void AddCategoryButton_Clicked(object sender, EventArgs e)
    {
        var addPage = ServiceHelper.GetService<AddCategoryPage>();
        await Navigation.PushAsync(addPage);
    }
}