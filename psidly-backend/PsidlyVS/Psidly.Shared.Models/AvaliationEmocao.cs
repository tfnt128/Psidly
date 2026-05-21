namespace Psidly.Shared.Models.Models
{
    public class AvaliationEmocao
    {
        public int AvaliationId { get; set; }
        public virtual Avaliation? Avaliation { get; set; }

        public int EmocaoId { get; set; }
        public virtual Emocao? Emocao { get; set; }

        public int NivelEmocao { get; set; }
    }
}