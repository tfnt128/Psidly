namespace psidly_backend.DTOs
{
    public class RegisterDto
    {
        public string? Crp { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
    }
}
