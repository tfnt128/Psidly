namespace psidly_backend.DTOs
{
    public class AvaliationCreateDto
    {
        public int PatientId { get; set; }
        public int Alegria { get; set; }
        public int Tristeza { get; set; }
        public int Raiva { get; set; }
        public int Estresse { get; set; }
        public int Ansiedade { get; set; }
        public string? ObsPaciente { get; set; }
        public string? ObsPsicologo { get; set; }
    }
}
