using Foodfolio.Views;

namespace Foodfolio
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(AddPantryItemPage), typeof(AddPantryItemPage));
            Routing.RegisterRoute(nameof(AddRecipePage), typeof(AddRecipePage));
        }


    }
}
