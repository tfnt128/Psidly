using psidly_backend.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace psidly_backend.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendPasswordResetCodeAsync(string toEmail, string resetCode, string userName)
        {
            try
            {
                var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");

                if (string.IsNullOrEmpty(apiKey))
                {
                    Console.WriteLine("❌ SENDGRID_API_KEY não configurada!");
                    throw new Exception("API Key do SendGrid não configurada");
                }

                var client = new SendGridClient(apiKey);

                var from = new EmailAddress("psidly.app@gmail.com", "Psidly");
                var to = new EmailAddress(toEmail, userName);
                var subject = "Código de Recuperação de Senha - Psidly";

                var plainTextContent = $"Olá {userName},\n\nSeu código de recuperação é: {resetCode}\n\nEste código expira em 15 minutos.\n\nSe você não solicitou isso, ignore este email.";

                var htmlContent = $@"
                    <h2>Olá {userName}</h2>
                    <p>Seu código de recuperação é:</p>
                    <h1 style='color: #4F46E5; font-size: 32px;'>{resetCode}</h1>
                    <p>Este código expira em 15 minutos.</p>
                    <p>Se você não solicitou isso, ignore este email.</p>
                ";

                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

                Console.WriteLine($"📧 Enviando email via SendGrid para: {toEmail}");
                var response = await client.SendEmailAsync(msg);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"✅ Email enviado com sucesso!");
                }
                else
                {
                    var body = await response.Body.ReadAsStringAsync();
                    Console.WriteLine($"❌ Erro ao enviar: {response.StatusCode} - {body}");
                    throw new Exception($"Erro ao enviar email: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Erro ao enviar email: {ex.Message}");
                throw;
            }
        }
    }
}