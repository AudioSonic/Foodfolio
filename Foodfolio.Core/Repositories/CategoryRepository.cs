using SQLite;
using Foodfolio.Core.Models;

namespace Foodfolio.Core.Repositories
{
    public class CategoryRepository
    {
        private readonly SQLiteAsyncConnection _database;

        public CategoryRepository(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
        }

        public async Task CreateTableAsync()
        {
            await _database.CreateTableAsync<Category>();
        }

        public async Task<int> CreateItemAsync(Category cat)
        {
            if(cat.Id == Guid.Empty)
            {
                cat.Id = Guid.NewGuid();
            }

            return await _database.InsertAsync(cat);
        }

        public async Task<Category?> ReadItemAsync(Guid id)
        {
            return await _database.FindAsync<Category>(id);
        }

        public async Task<int> UpdateItemAsync(Category cat)
        {
            return await _database.UpdateAsync(cat);
        }

        public async Task<int> DeleteItemAsync(Guid id)
        {
            var cat = await _database.FindAsync<Category>(id);
            if (cat != null)
            {
                return await _database.DeleteAsync(cat);
            }
            return 0;
        }

        public async Task<List<Category>> GetAllCategoryAsync()
        {
            return await _database.Table<Category>().ToListAsync();
        }
    }
}
