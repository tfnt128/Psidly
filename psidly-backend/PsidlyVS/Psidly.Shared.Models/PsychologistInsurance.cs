using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psidly.Shared.Models.Models
{
    public class PsychologistInsurance
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PsychologistId { get; set; }
        public virtual User Psychologist { get; set; }
    }
}
