using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psidly.Shared.Models.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Crp { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public DateOnly? BirthDate { get; set; } 
        public string? PasswordHash { get; set; }

        public string? ResetPasswordCode { get; set; }
        public DateTime? ResetPasswordCodeExpiry { get; set; }

        public virtual ICollection<PsychologistInsurance> Insurances { get; set; } = new List<PsychologistInsurance>();
        public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();
    }

}
