using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Psidly.Shared.Models.Models;
using Microsoft.EntityFrameworkCore.Proxies;

namespace Psidly.Shared.Data.Data
{
    public class PsidlyContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        // Construtor que aceita options (para injeção de dependência)
        public PsidlyContext(DbContextOptions<PsidlyContext> options) : base(options)
        {
        }

        // Construtor sem parâmetros (para migrations)
        public PsidlyContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Pega da variável de ambiente ou usa localhost para desenvolvimento
                var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
                    ?? "Host=localhost;Database=Psidly;Username=postgres;Password=postgres";

                optionsBuilder
                    .UseNpgsql(connectionString)
                    .UseLazyLoadingProxies();
            }
        }
    }
}