using Psidly.Shared.Data.Data;
using Microsoft.EntityFrameworkCore;
using psidly_backend.Interfaces;
using psidly_backend.Services;
using Microsoft.OpenApi.Models;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<PsidlyContext>(options =>
    options.UseNpgsql(connectionString)
           .UseSnakeCaseNamingConvention()
           .UseLazyLoadingProxies());

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddControllers();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Psidly API",
        Version = "v1",
        Description = "Documentação da API do Psidly para testes de autenticação e usuários."
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Psidly API V1");
    c.RoutePrefix = "swagger"; 
});

using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<PsidlyContext>();
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }
}


app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization(); 

app.MapControllers();

app.Run();