using Foodfolio.Core.Models;
using Foodfolio.Core.Repositories;
using SQLite;


namespace Foodfolio.MAUI.Services
{
    public class CategoryService
    {
        private readonly CategoryRepository _repository;
        private bool _initialized = false;

        public CategoryService(CategoryRepository repository)
        {
            // Initialisiere das Repository und erstelle die Tabelle, falls sie nicht existiert
            _repository = repository;
        }

        public async Task InitializeAsync()
        {
            Console.WriteLine("PantryService.InitializeAsync() gestartet...");
            await _repository.CreateTableAsync();
            Console.WriteLine("Tabelle PantryItem angelegt.");
        }

        private async Task EnsureInitializedAsync()
        {
            if (!_initialized)
            {
                await _repository.CreateTableAsync();
                _initialized = true;
            }
        }

        public async Task<int> CreateItemAsync(CategoryModel cat)
        {
            await EnsureInitializedAsync();
            return await _repository.CreateItemAsync(cat);
        }

        //Liest ein Element anhand der ID
        public Task<CategoryModel?> ReadItemAsync(Guid id)
        {
            return _repository.ReadItemAsync(id);
        }
        //Aktualisiert ein vorhandenes Element
        public Task<int> UpdateItemAsync(CategoryModel cat)
        {
            return _repository.UpdateItemAsync(cat);
        }

        //Löscht ein Element anhand der ID
        public Task<int> DeleteItemAsync(Guid id)
        {
            return _repository.DeleteItemAsync(id);
        }

        //Liest alle Elemente aus der Tabelle
        public Task<List<CategoryModel>> GetAllCategoryAsync()
        {
            return _repository.GetAllCategoryAsync();
        }
    }
}
