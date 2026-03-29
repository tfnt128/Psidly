using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<User>()
                .Property(u => u.BirthDate)
                .HasColumnType("date");
        }
    }
}