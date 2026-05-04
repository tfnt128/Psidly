using Microsoft.EntityFrameworkCore;
using Psidly.Shared.Models.Models;

namespace Psidly.Shared.Data.Data
{
    public class PsidlyContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<PsychologistInsurance> PsychologistInsurances { get; set; }
        public DbSet<Avaliation> Avaliations { get; set; }
        public DbSet<Emocao> Emocoes { get; set; }
        public DbSet<AvaliationEmocao> AvaliationEmocoes { get; set; }

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

            modelBuilder.Entity<Avaliation>()
                .Property(a => a.Date).HasColumnType("date");

            modelBuilder.Entity<AvaliationEmocao>()
                .HasKey(ae => new { ae.AvaliationId, ae.EmocaoId });
        }
    }
}