using Psidly.Shared.Data.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Pega a DATABASE_URL diretamente (já está no formato correto)
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";

Console.WriteLine("✓ Using DATABASE_URL from environment");

builder.Services.AddDbContext<PsidlyContext>(options =>
    options.UseNpgsql(connectionString).UseLazyLoadingProxies());

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Aplicar migrations
try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<PsidlyContext>();
    Console.WriteLine("📦 Applying migrations...");
    db.Database.Migrate();
    Console.WriteLine("✓ Migrations done!");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Error: {ex.Message}");
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowAll");
app.MapControllers();
app.Run();