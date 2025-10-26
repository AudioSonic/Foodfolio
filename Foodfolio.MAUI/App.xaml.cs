using Foodfolio.MAUI.Services;

namespace Foodfolio.MAUI
{
    public partial class App : Application
    {
        public static IServiceProvider Services { get; internal set; }

        public App(IServiceProvider services)
        {
            InitializeComponent();
            Services = services;
            MainPage = new AppShell();
        }
    }
}
