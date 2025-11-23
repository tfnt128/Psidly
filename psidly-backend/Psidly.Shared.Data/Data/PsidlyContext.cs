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
                databaseUrl = databaseUrl.Replace("postgres://", "").Replace("postgresql://", "");

                var parts = databaseUrl.Split('@');
                var credentials = parts[0].Split(':');
                var username = credentials[0];
                var password = credentials[1];

                var serverParts = parts[1].Split('/');
                var hostAndPort = serverParts[0].Split(':');
                var host = hostAndPort[0];
                var port = hostAndPort.Length > 1 ? hostAndPort[1] : "5432";
                var database = serverParts[1];

                return $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true";
            }
            catch
            {
                return "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";
            }
        }
    }
}