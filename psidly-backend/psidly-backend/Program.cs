using Psidly.Shared.Data.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Função para converter DATABASE_URL para connection string
string GetConnectionString()
{
    var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

    if (string.IsNullOrEmpty(databaseUrl))
    {
        Console.WriteLine("?? DATABASE_URL not found, using localhost");
        return "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";
    }

    try
    {
        Console.WriteLine($"?? Raw DATABASE_URL format: {databaseUrl.Substring(0, Math.Min(20, databaseUrl.Length))}...");

        // Parse usando Uri (mais robusto)
        var uri = new Uri(databaseUrl);

        var host = uri.Host;
        var port = uri.Port > 0 ? uri.Port : 5432;
        var database = uri.LocalPath.TrimStart('/');

        // Extrai usuário e senha
        string username = "";
        string password = "";

        if (!string.IsNullOrEmpty(uri.UserInfo))
        {
            var userInfo = uri.UserInfo.Split(':');
            username = userInfo[0];
            password = userInfo.Length > 1 ? userInfo[1] : "";
        }

        var connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true";

        Console.WriteLine($"? Connection configured:");
        Console.WriteLine($"  Host: {host}");
        Console.WriteLine($"  Port: {port}");
        Console.WriteLine($"  Database: {database}");
        Console.WriteLine($"  Username: {username}");

        return connectionString;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"? Error parsing DATABASE_URL: {ex.Message}");
        Console.WriteLine($"? Stack trace: {ex.StackTrace}");
        throw;
    }
}

var connectionString = GetConnectionString();

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

// Aplicar migrations automaticamente
try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<PsidlyContext>();
    Console.WriteLine("?? Applying migrations...");
    db.Database.Migrate();
    Console.WriteLine("? Migrations applied successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($"? Migration Error: {ex.Message}");
    Console.WriteLine($"? Inner Exception: {ex.InnerException?.Message}");
    Console.WriteLine($"? Stack Trace: {ex.StackTrace}");
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowAll");
app.MapControllers();

Console.WriteLine("?? Application starting...");
app.Run();