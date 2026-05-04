namespace Psidly.Shared.Models.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public DateOnly BirthDate { get; set; }
        public string Insurance { get; set; }
        public string? Photo { get; set; }
        public bool IsHidden { get; set; } = false;

        public int PsychologistId { get; set; }
        public virtual User? Psychologist { get; set; }

        public virtual ICollection<Avaliation> Avaliations { get; set; } = new List<Avaliation>();
    }
}