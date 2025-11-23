using Microsoft.EntityFrameworkCore;
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
                var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
                    ?? "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";

                optionsBuilder
                    .UseNpgsql(connectionString)
                    .UseLazyLoadingProxies();
            }
        }
    }
}