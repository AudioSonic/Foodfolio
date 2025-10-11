using Foodfolio.MVVM.Views;
using System.Windows.Input;

namespace Foodfolio
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
                // Navigiere zur gewünschten Seite innerhalb des bestehenden Navigationskontexts
                await Shell.Current.GoToAsync(route, animate: true);
            });

            BindingContext = this;

        }


    }
}
