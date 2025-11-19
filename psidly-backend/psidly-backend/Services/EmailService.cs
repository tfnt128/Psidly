using psidly_backend.Interfaces;
using System.Net.Mail;
using System.Net;

namespace psidly_backend.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendPasswordResetCodeAsync(string toEmail, string resetCode, string userName)
        {
            var smtpSettings = _configuration.GetSection("EmailSettings");

            using var client = new SmtpClient(smtpSettings["SmtpServer"])
            {
                Port = int.Parse(smtpSettings["Port"] ?? "587"),
                Credentials = new NetworkCredential(
                    smtpSettings["Username"],
                    smtpSettings["Password"]
                ),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpSettings["FromEmail"] ?? "", "Psidly"),
                Subject = "Código de Recuperação de Senha - Psidly",
                Body = $"Olá {userName},\n\nSeu código de recuperação é: {resetCode}\n\nEste código expira em 15 minutos.\n\nSe você não solicitou isso, ignore este email."
            };

            mailMessage.To.Add(toEmail);
            await client.SendMailAsync(mailMessage);
        }
    }
}
