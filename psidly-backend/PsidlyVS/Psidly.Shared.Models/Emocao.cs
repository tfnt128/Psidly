namespace Psidly.Shared.Models.Models
{
    public class Emocao
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<AvaliationEmocao> AvaliationEmocoes { get; set; } = new List<AvaliationEmocao>();
    }
}