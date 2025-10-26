using Foodfolio.Core.Models;
using SQLite;


namespace Foodfolio.MAUI.Services
{
    public class CategoryService
    {
        private readonly SQLiteAsyncConnection _database;

        public CategoryService(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
        }

        public async Task InitializeAsync()
        {
            await _database.CreateTableAsync<Categories>();
        }

        public Task<List<Categories>> GetAllCategoriesAsync()
        {
            return _database.Table<Categories>().ToListAsync();
        }

        public Task<int> AddCategoryAsync(Categories category)
        {
            return _database.InsertAsync(category);
        }

        public Task<int> UpdateCategoryAsync(Categories category)
        {
            return _database.UpdateAsync(category);
        }

        public Task<int> DeleteCategoryAsync(Categories category)
        {
            return _database.DeleteAsync(category);
        }
    }
}
