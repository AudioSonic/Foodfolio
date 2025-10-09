using Foodfolio.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ? SQLite + DbContext registrieren
builder.Services.AddDbContext<FoodfolioDbContext>(options =>
    options.UseSqlite("Data Source=foodfolio.db"));

// Swagger + Controller
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ? Swagger aktivieren (zum Testen)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
