namespace psidly_backend.Interfaces
{
    public interface IEmailService
    {
        Task SendPasswordResetCodeAsync(string toEmail, string resetCode, string userName);
    }
}
