using Foodfolio.Core.Models;
using Foodfolio.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.MAUI.Services
{
    public class PantryItemCategoryService
    {
        private readonly PantryItemCategoryRepository _repository;

        public PantryItemCategoryService(PantryItemCategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task InitializeAsync()
        {
            Console.WriteLine("PantryItemCategoryService.InitializeAsync() gestartet...");
            await _repository.CreateTableAsync();
            Console.WriteLine("Tabelle PantryItemCategory angelegt.");
        }

        // Fügt einen neuen Link zwischen PantryItem und Category hinzu, wenn dieser noch nicht existiert
        public async Task<int> AddCategoryLink(PantryItemCategory item)
        {
            if (!await LinkExists(item.PantryItemId, item.CategoryId))
                return await _repository.AddCategoryLink(item);
            return 0;
        }

        // Liest einen Link anhand der ID
        public Task<PantryItemCategory?> GetCategoryLink(Guid id)
        {
            return _repository.GetCategoryLink(id);
        }

        // Löscht einen Link zwischen PantryItem und Category
        public Task<int> DeleteCategoryLink(PantryItemCategory item)
        {
            return _repository.DeleteCategoryLink(item);
        }

        // Liest alle Kategorien für ein bestimmtes PantryItem
        public Task<List<PantryItemCategory>> GetCategoriesForItem(Guid pantryItemId)
        {
            return _repository.GetCategoriesForItem(pantryItemId);
        }

        // Liest alle PantryItems für eine bestimmte Kategorie
        public Task<List<PantryItemCategory>> GetItemsForCategory(Guid categoryId)
        {
            return _repository.GetItemsForCategory(categoryId);
        }

        // Überprüft, ob ein Link zwischen PantryItem und Category existiert
        public Task<bool> LinkExists(Guid pantryItemId, Guid categoryId)
        {
            return _repository.LinkExists(pantryItemId, categoryId);
        }
    }
}
