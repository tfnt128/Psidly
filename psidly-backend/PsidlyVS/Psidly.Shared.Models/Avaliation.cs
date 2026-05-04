namespace Psidly.Shared.Models.Models
{
    public class Avaliation
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Hour { get; set; }
        public string? ObsPsicologo { get; set; }
        public string? ObsPaciente { get; set; }

        public int PatientId { get; set; }
        public virtual Patient? Patient { get; set; }

        public virtual ICollection<AvaliationEmocao> AvaliationEmocoes { get; set; } = new List<AvaliationEmocao>();
    }
}