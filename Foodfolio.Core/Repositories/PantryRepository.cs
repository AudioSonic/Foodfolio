using Foodfolio.Core.Models;
using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.Core.Repositories
{
    public class PantryRepository
    {
        private readonly SQLiteAsyncConnection _database;

        public PantryRepository(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
        }

        //Erstellt Tabelle falls nicht vorhanden
        public async Task CreateTableAsync()
        {
            await _database.CreateTableAsync<PantryItem>();
        }

        //Fügt ein neues Element hinzu
        public async Task<int> CreateItemAsync(PantryItem item)
        {
            if(item.Id == Guid.Empty)
            {
                item.Id = Guid.NewGuid();
            }

            return await _database.InsertAsync(item);
        }

        //Liest ein Element anhand der ID
        public async Task<PantryItem?> ReadItemAsync(Guid id)
        {
            return await _database.FindAsync<PantryItem>(id);
        }

        //Aktualisiert ein vorhandenes Element
        public async Task<int> UpdateItemAsync(PantryItem item)
        {
            return await _database.UpdateAsync(item);
        }

        //Löscht ein Element anhand der ID
        public async Task<int> DeleteItemAsync(Guid id)
        {
            // SQLite benötigt das gesamte Objekt zum Löschen, daher wird es zuerst abgerufen
            var item = await _database.FindAsync<PantryItem>(id);
            if (item != null)
            {
                return await _database.DeleteAsync(item);
            }
            return 0; // Kein Element zum Löschen gefunden
        }

        //Liest alle Elemente aus der Tabelle
        public async Task<List<PantryItem>> GetAllItemsAsync()
        {
            return await _database.Table<PantryItem>().ToListAsync();
        }
    }
}
