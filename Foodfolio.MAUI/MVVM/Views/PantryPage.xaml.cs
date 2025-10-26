using Foodfolio.MAUI.MVVM.ViewModels;
using Foodfolio.MAUI.Services;
using Microsoft.Maui.Hosting;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class PantryPage : ContentPage
{
    private readonly AddPantryItemPage _addPantryItemPage;

    public PantryPage(PantryPageViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }

    private async void AddItemButton_Clicked(object sender, EventArgs e)
    {
        var addPage = ServiceHelper.GetService<AddPantryItemPage>();
        await Navigation.PushAsync(addPage);
    }
}