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
        // Fallback para desenvolvimento local
        return "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";
    }

    try
    {
        // Remove o prefixo postgres:// ou postgresql://
        databaseUrl = databaseUrl.Replace("postgres://", "").Replace("postgresql://", "");

        // Parse da URL
        var parts = databaseUrl.Split('@');
        var credentials = parts[0].Split(':');
        var username = credentials[0];
        var password = credentials[1];

        var serverParts = parts[1].Split('/');
        var hostAndPort = serverParts[0].Split(':');
        var host = hostAndPort[0];
        var port = hostAndPort.Length > 1 ? hostAndPort[1] : "5432";
        var database = serverParts[1];

        var connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true";

        Console.WriteLine($"? Connection string configured for host: {host}");
        return connectionString;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"? Error parsing DATABASE_URL: {ex.Message}");
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
    Console.WriteLine($"Stack Trace: {ex.StackTrace}");
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