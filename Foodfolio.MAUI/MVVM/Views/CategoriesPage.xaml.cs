using Foodfolio.MAUI.Helpers;
using Foodfolio.MAUI.MVVM.ViewModels;
using Foodfolio.MAUI.Services;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class CategoriesPage : ContentPage
{
	public CategoriesPage(CategoryViewModel viewModel)
	{
		InitializeComponent();
       BindingContext = viewModel;
       collectionView.ItemsSource = viewModel.CategoriesList;

    }

    private async void AddCategoryButton_Clicked(object sender, EventArgs e)
    {
        var addPage = ServiceHelper.GetService<AddCategoryPage>();
        await Navigation.PushAsync(addPage);
    }

    private async void OnItemTapped(object sender, TappedEventArgs e)
    {
        await DisplayAlert("Item tapped", "You tapped the Bell Pepper card!", "OK");
    }

    private async void FilterButton_Clicked(object sender, EventArgs e)
    {
        await this.DisplayAlert("Achtung", "Es kann noch nicht gefiltert werden", "OK");
    }

}