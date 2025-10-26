using Foodfolio.MAUI.MVVM.ViewModels;	
using Foodfolio.MAUI.Services;
using Foodfolio.Core.Models;

namespace Foodfolio.MAUI.MVVM.Views;

public partial class AddCategoryPage : ContentPage
{
    public AddCategoryPage(AddCategoryViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel; 
    }
}
