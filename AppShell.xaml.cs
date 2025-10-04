using Foodfolio.Views;

namespace Foodfolio
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(AddGroceriesPage), typeof(AddGroceriesPage));
        }


    }
}
