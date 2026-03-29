using System.Net;
using System.Net.Mail;
using psidly_backend.Interfaces;

namespace psidly_backend.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendPasswordResetCodeAsync(string toEmail, string resetCode, string userName)
        {
            var smtpHost = "smtp.gmail.com";
            var smtpPort = 587;
            var myEmail = "psidapp@gmail.com";

            var myPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD");

            if (string.IsNullOrEmpty(myPassword))
            {
                Console.WriteLine("SMTP_PASSWORD não configurada");
                throw new Exception("Senha SMTP não configurada nas variáveis de ambiente");
            }

            try
            {
                using (var client = new SmtpClient(smtpHost, smtpPort))
                {
                    client.EnableSsl = true;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.UseDefaultCredentials = false;

                    client.Credentials = new NetworkCredential(myEmail, myPassword);

                    var mailMessage = new MailMessage();
                    mailMessage.From = new MailAddress(myEmail, "Psidly");
                    mailMessage.To.Add(new MailAddress(toEmail, userName));
                    mailMessage.Subject = "Código de Recuperação de Senha - Psidly";
                    mailMessage.IsBodyHtml = true;

                    mailMessage.Body = $@"
                        <div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>
                            <h2>Olá {userName}</h2>
                            <p>Seu código de recuperação é:</p>
                            <h1 style='color: #4F46E5; font-size: 32px; letter-spacing: 2px;'>{resetCode}</h1>
                            <p>Este código expira em 15 minutos.</p>
                            <hr>
                            <p style='font-size: 12px; color: #777;'>Se você não solicitou isso, ignore este email.</p>
                        </div>";

                    await client.SendMailAsync(mailMessage);

                    Console.WriteLine($"Email SMTP enviado com sucesso para {toEmail}!");
                }
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"Erro SMTP: {smtpEx.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro geral ao enviar email: {ex.Message}");
                throw;
            }
        }
    }
}