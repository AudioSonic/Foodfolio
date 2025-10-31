using SQLite;
using Foodfolio.Core.Models;

namespace Foodfolio.Core.Repositories
{
    public class PantryItemCategoryRepository
    {
        private readonly SQLiteAsyncConnection _database;
        public PantryItemCategoryRepository(string dbPath) 
        {
            _database = new SQLiteAsyncConnection(dbPath);
        }

        public async Task CreateTableAsync()
        {
            await _database.CreateTableAsync<PantryItemCategory>();
        }

        // Fügt einen neuen Link zwischen PantryItem und Category hinzu
        public async Task<int> AddCategoryLink(PantryItemCategory item)
        {
            return await _database.InsertAsync(item);
        }

        // Liest einen Link anhand der ID
        public async Task<PantryItemCategory?> GetCategoryLink(Guid id)
        {
            return await _database.FindAsync<PantryItemCategory>(id);
        }

        // Löscht einen Link zwischen PantryItem und Category
        public async Task<int> DeleteCategoryLink(PantryItemCategory item)
        {
            return await _database.DeleteAsync(item);
        }

        // Liest alle Kategorien für ein bestimmtes PantryItem
        public async Task<List<PantryItemCategory>> GetCategoriesForItem(Guid pantryItemId)
        {
            return await _database.Table<PantryItemCategory>()
                                  .Where(x => x.PantryItemId == pantryItemId)
                                  .ToListAsync();
        }

        // Liest alle PantryItems für eine bestimmte Kategorie
        public async Task<List<PantryItemCategory>> GetItemsForCategory(Guid categoryId)
        {
            return await _database.Table<PantryItemCategory>()
                                  .Where(x => x.CategoryId == categoryId)
                                  .ToListAsync();
        }

        // Überprüft, ob ein Link zwischen PantryItem und Category existiert
        public async Task<bool> LinkExists(Guid pantryItemId, Guid categoryId)
        {
            var existing = await _database.Table<PantryItemCategory>()
                                          .Where(x => x.PantryItemId == pantryItemId && x.CategoryId == categoryId)
                                          .FirstOrDefaultAsync();
            return existing != null;
        }


    }
}
