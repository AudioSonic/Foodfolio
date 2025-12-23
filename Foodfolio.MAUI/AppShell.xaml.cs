using System.Windows.Input;
using Foodfolio.MAUI.Services;
using Foodfolio.MAUI.MVVM.Views;
using Foodfolio.MAUI.MVVM.ViewModels;

namespace Foodfolio.MAUI
{
    public partial class AppShell : Shell
    {
        public ICommand NavigateCommand { get; }

        public AppShell()
        {
            InitializeComponent();

            Routing.RegisterRoute(nameof(AddPantryItemPage), typeof(AddPantryItemPage));
            Routing.RegisterRoute(nameof(AddRecipePage), typeof(AddRecipePage));
            Routing.RegisterRoute(nameof(CategoriesPage), typeof(CategoriesPage));

            NavigateCommand = new Command<string>(async (route) =>
            {
                Shell.Current.FlyoutIsPresented = false;
                await Shell.Current.GoToAsync(route, animate: true);
            });

            BindingContext = this;
        }
    }
}
