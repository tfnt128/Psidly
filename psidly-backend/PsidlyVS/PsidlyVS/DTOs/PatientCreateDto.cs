namespace psidly_backend.DTOs
{
    public class PatientCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        public DateOnly BirthDate { get; set; }
        public string Insurance { get; set; } = string.Empty;
    }
}
