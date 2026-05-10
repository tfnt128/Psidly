namespace psidly_backend.DTOs
{
    public class UserUpdateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Crp { get; set; }
        public DateOnly BirthDate { get; set; }
    }
}
