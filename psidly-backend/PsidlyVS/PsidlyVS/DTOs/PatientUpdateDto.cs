namespace psidly_backend.DTOs
{
    public class PatientUpdateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public DateOnly BirthDate { get; set; }
        public string? Insurance { get; set; }
        public string? Photo { get; set; }
    }
}
