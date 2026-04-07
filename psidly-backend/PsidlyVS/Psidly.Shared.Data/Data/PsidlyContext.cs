using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Psidly.Shared.Models.Models;

namespace Psidly.Shared.Data.Data
{
    public class PsidlyContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<PsychologistInsurance> PsychologistInsurances { get; set; }

        public PsidlyContext(DbContextOptions<PsidlyContext> options) : base(options)
        {
        }

        public PsidlyContext()
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PsychologistInsurance>().ToTable("convenio");

            modelBuilder.Entity<User>()
                .Property(u => u.BirthDate).HasColumnType("date");

            modelBuilder.Entity<Patient>()
                .Property(p => p.BirthDate).HasColumnType("date");
        }
    }
}