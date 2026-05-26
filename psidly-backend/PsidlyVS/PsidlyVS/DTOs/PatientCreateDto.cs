namespace psidly_backend.DTOs
{
    public class PatientCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        public DateOnly BirthDate { get; set; }
        public string Insurance { get; set; } = string.Empty;
        public string? Photo { get; set; }
    }
}
