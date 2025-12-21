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
            await _database.CreateTableAsync<CategoryModel>();
        }

        public async Task<int> CreateItemAsync(CategoryModel cat)
        {
            if(cat.Id == Guid.Empty)
            {
                cat.Id = Guid.NewGuid();
            }

            return await _database.InsertAsync(cat);
        }

        public async Task<CategoryModel?> ReadItemAsync(Guid id)
        {
            return await _database.FindAsync<CategoryModel>(id);
        }

        public async Task<int> UpdateItemAsync(CategoryModel cat)
        {
            return await _database.UpdateAsync(cat);
        }

        public async Task<int> DeleteItemAsync(Guid id)
        {
            var cat = await _database.FindAsync<CategoryModel>(id);
            if (cat != null)
            {
                return await _database.DeleteAsync(cat);
            }
            return 0;
        }

        public async Task<List<CategoryModel>> GetAllCategoryAsync()
        {
            return await _database.Table<CategoryModel>().ToListAsync();
        }
    }
}
