using Psidly.Shared.Data.Data;
using Microsoft.EntityFrameworkCore;
using psidly_backend.Interfaces;
using psidly_backend.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<PsidlyContext>(options =>
    options.UseNpgsql(connectionString)
           .UseSnakeCaseNamingConvention() 
           .UseLazyLoadingProxies());

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddControllers();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
app.MapControllers();
app.Run();