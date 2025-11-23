using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
                var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                string connectionString;

                if (!string.IsNullOrEmpty(databaseUrl))
                {
                    // Converter URL do Render para connection string
                    var uri = new Uri(databaseUrl);
                    var userInfo = uri.UserInfo.Split(':');

                    connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.LocalPath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
                }
                else
                {
                    connectionString = "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";
                }

                optionsBuilder
                    .UseNpgsql(connectionString)
                    .UseLazyLoadingProxies();
            }
        }
    }
}