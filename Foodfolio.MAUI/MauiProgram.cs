using Microsoft.Extensions.Logging;
using Foodfolio.Core.Repositories;
using Foodfolio.MAUI.Services;
using Foodfolio.MAUI.MVVM.ViewModels;
using Foodfolio.MAUI.MVVM.Views;
using Microsoft.Maui.Controls;

namespace Foodfolio.MAUI
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

            // Datenbankpfad
            string dbPath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "foodfolio.db3");

            // Categories Service und Pages registrieren
            builder.Services.AddSingleton(new CategoryService(dbPath));
            builder.Services.AddTransient<AddCategoryViewModel>();
            builder.Services.AddTransient<AddCategoryPage>();
            builder.Services.AddTransient<CategoriesPage>();

            // Pantry Service und Pages registrieren
            builder.Services.AddSingleton(new PantryRepository(dbPath));
            builder.Services.AddSingleton<PantryService>(sp =>
            {
                var repo = sp.GetRequiredService<PantryRepository>();
                var service = new PantryService(repo);
                service.InitializeAsync(); // oder async Factory Variante
                return service;
            });
            builder.Services.AddTransient<AddPantryItemViewModel>();
            builder.Services.AddTransient<AddPantryItemPage>();

            builder.Services.AddTransient<PantryPageViewModel>();
            builder.Services.AddTransient<PantryPage>();

#if DEBUG
            builder.Logging.AddDebug();
#endif

            var app = builder.Build();
            App.Services = app.Services;
            return app;
        }
    }
}
