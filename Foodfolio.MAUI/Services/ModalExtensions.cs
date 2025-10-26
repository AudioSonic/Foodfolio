using System.Threading.Tasks;
using Foodfolio.Core.Helpers;

namespace Foodfolio.MAUI.Services
{
    public static class ModalExtensions
    {
        public static Task<T> WaitForResultAsync<T>(this Page page)
        {
            var tcs = new TaskCompletionSource<T>();

            page.Disappearing += (s, e) =>
            {
                if (page.BindingContext is IResultProvider<T> provider)
                    tcs.TrySetResult(provider.Result);
                else
                    tcs.TrySetResult(default);
            };

            return tcs.Task;
        }
    }
}