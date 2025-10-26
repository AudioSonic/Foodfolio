using Foodfolio.MAUI.MVVM.ViewModels;
using Foodfolio.MAUI.Services;
using Microsoft.Maui.Controls;

namespace Foodfolio.MAUI.MVVM.Views;
public partial class AddPantryItemPage : ContentPage
{
    public AddPantryItemPage(AddPantryItemViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}