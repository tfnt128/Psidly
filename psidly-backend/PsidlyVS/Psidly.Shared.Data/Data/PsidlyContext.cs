using Microsoft.EntityFrameworkCore;
using Psidly.Shared.Models.Models;
using System.Collections.Generic;

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

        
    }
}