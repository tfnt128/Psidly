using Microsoft.EntityFrameworkCore;
using System;
using Psidly.Shared.Models.Models;

namespace Psidly.Shared.Data.Data
{
    public class PsidlyContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public PsidlyContext(DbContextOptions<PsidlyContext> options) : base(options)
        {
        }

        public PsidlyContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = GetConnectionString();
                optionsBuilder
                    .UseNpgsql(connectionString)
                    .UseLazyLoadingProxies();
            }
        }

        private static string GetConnectionString()
        {
            var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (string.IsNullOrEmpty(databaseUrl))
            {
                return "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";
            }

            try
            {
                var uri = new Uri(databaseUrl);

                var host = uri.Host;
                var port = uri.Port > 0 ? uri.Port : 5432;
                var database = uri.LocalPath.TrimStart('/');

                string username = "";
                string password = "";

                if (!string.IsNullOrEmpty(uri.UserInfo))
                {
                    var userInfo = uri.UserInfo.Split(':');
                    username = userInfo[0];
                    password = userInfo.Length > 1 ? userInfo[1] : "";
                }

                return $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true";
            }
            catch
            {
                return "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";
            }
        }
    }
}