namespace psidly_backend.DTOs
{
    public class AuthResponseDto
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public Object? User { get; set; }
        public string? Token { get; set; }
        public string? UserType { get; set; }      
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string? Crp { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public DateOnly? BirthDate { get; set; }
    }
}
