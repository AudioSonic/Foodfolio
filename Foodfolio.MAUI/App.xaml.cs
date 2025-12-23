using Foodfolio.MAUI.Services;
using Microsoft.Maui.Platform;

#if ANDROID
using Android.Views;
#endif

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

#if ANDROID
            // Statusleiste einfärben, sobald App startet
            SetAndroidStatusBarColor();
#endif
        }

#if ANDROID
        private void SetAndroidStatusBarColor()
        {
            var window = Platform.CurrentActivity?.Window;
            if (window == null)
                return;

            // 1. MAUI-Farbe aus Ressourcen holen
            if (Application.Current.Resources.TryGetValue("MainColor", out var mainColorObj)
                && mainColorObj is Color mauiColor)
            {
                // 2. In Android-Farbe umwandeln
                var androidColor = mauiColor.ToPlatform();

                // 3. Farbe setzen
                window.SetStatusBarColor(androidColor);

                // 4. Helle oder dunkle Symbole (je nach Hintergrund)
                window.DecorView.SystemUiVisibility = (StatusBarVisibility)SystemUiFlags.LightStatusBar;
            }
        }
#endif
    }
}
