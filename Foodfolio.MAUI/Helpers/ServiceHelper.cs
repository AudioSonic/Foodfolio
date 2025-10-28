using Foodfolio.MAUI;

namespace Foodfolio.Core.Helpers
{
    public static class ServiceHelper
    {
        public static T GetService<T>() =>
            App.Services.GetService<T>()
            ?? throw new InvalidOperationException($"Service '{typeof(T)}' wurde nicht gefunden.");
    }
}
