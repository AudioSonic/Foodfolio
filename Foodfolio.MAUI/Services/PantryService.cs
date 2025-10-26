using Foodfolio.Core.Models;
using Foodfolio.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.MAUI.Services
{
    public class PantryService
    {
        private readonly PantryRepository _repository;
        private bool _initialized = false;
        public PantryService(PantryRepository repository) 
        {
            // Initialisiere das Repository und erstelle die Tabelle, falls sie nicht existiert
            _repository = repository;
        }

        private async Task EnsureInitializedAsync()
        {
            if (!_initialized)
            {
                await _repository.CreateTableAsync();
                _initialized = true;
            }
        }
        public async Task InitializeAsync()
        {
            Console.WriteLine("PantryService.InitializeAsync() gestartet...");
            await _repository.CreateTableAsync();
            Console.WriteLine("Tabelle PantryItem angelegt.");
        }

        public async Task<int> CreateItemAsync(PantryItem item)
        {
            await EnsureInitializedAsync();
            return await _repository.CreateItemAsync(item);
        }

        //Liest ein Element anhand der ID
        public Task<PantryItem?> ReadItemAsync(Guid id)
        {
            return _repository.ReadItemAsync(id);
        }

        //Aktualisiert ein vorhandenes Element
        public Task<int> UpdateItemAsync(PantryItem item)
        {
            return _repository.UpdateItemAsync(item);
        }

        //Löscht ein Element anhand der ID
        public Task<int> DeleteItemAsync(Guid id)
        {
            return  _repository.DeleteItemAsync(id);
        }

        //Liest alle Elemente aus der Tabelle
        public Task<List<PantryItem>> GetAllItemsAsync()
        {
            return  _repository.GetAllItemsAsync();
        }
    }
}
