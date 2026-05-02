using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Psidly.Shared.Data.Data;
using Psidly.Shared.Models.Models;
using psidly_backend.DTOs;
using psidly_backend.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace psidly_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class AuthController : ControllerBase
    {
        private readonly PsidlyContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _config;

        public AuthController(PsidlyContext context, IEmailService emailService, IConfiguration config)
        {
            _context = context;
            _emailService = emailService;
            _config = config;
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email!),
        new Claim(ClaimTypes.Name, user.Name!)
    };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            try
            {
                var psychologist = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

                if (psychologist != null)
                {

                    if (BCrypt.Net.BCrypt.Verify(loginDto.Password, psychologist.PasswordHash))
                    {
                        var token = GenerateJwtToken(psychologist);
                        return Ok(new AuthResponseDto
                        {
                            Success = true,
                            Message = "Login como Psicólogo realizado",
                            Token = token,
                            UserType = "Psicólogo",
                            User = new UserDto 
                            {
                                Id = psychologist.Id,
                                Name = psychologist.Name,
                                Email = psychologist.Email,
                                Crp = psychologist.Crp,
                                BirthDate = psychologist.BirthDate
                            }
                        });
                    }
                }


                var patient = await _context.Patients
                    .FirstOrDefaultAsync(p => p.Email == loginDto.Email);

                if (patient != null)
                {
                    if (loginDto.Password == patient.Cpf)
                    {
                        return Ok(new AuthResponseDto
                        {
                            Success = true,
                            Message = "Login como Paciente realizado",
                            Token = null, 
                            UserType = "Paciente",
                            User = new 
                            {
                                Id = patient.Id,
                                Name = patient.Name,
                                Email = patient.Email,
                                Cpf = patient.Cpf
                            }
                        });
                    }
                }

                return Ok(new AuthResponseDto { Success = false, Message = "Credenciais inválidas" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto { Success = false, Message = "Erro interno no servidor" });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
        {
            try
            {
                if (registerDto.Password != registerDto.ConfirmPassword)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "As senhas não coincidem"
                    });
                }

                if (registerDto.Password.Length < 6)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "A senha deve ter pelo menos 6 caracteres"
                    });
                }

                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == registerDto.Email);

                if (existingUser != null)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Este email já está cadastrado"
                    });
                }

                var newUser = new User
                {
                    Name = registerDto.Name,
                    Email = registerDto.Email,
                    Crp = registerDto.Crp,
                    BirthDate = registerDto.BirthDate,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
                };

                if (registerDto.Insurances != null)
                {
                    foreach (var name in registerDto.Insurances)
                    {
                        newUser.Insurances.Add(new PsychologistInsurance { Name = name });
                    }
                }

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Usuário cadastrado com sucesso",
                    User = new UserDto
                    {
                        Id = newUser.Id,
                        Name = newUser.Name,
                        Email = newUser.Email,
                        Crp = newUser.Crp,
                        BirthDate = newUser.BirthDate
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro interno do servidor ao registrar usuário"
                });
            }
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult<AuthResponseDto>> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == forgotPasswordDto.Email);

                if (user == null)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = true,
                        Message = "Código de confirmação enviado para o email se existir"
                    });
                }

                var resetCode = RandomNumberGenerator.GetInt32(100000, 999999).ToString();
                var resetCodeExpiry = DateTime.UtcNow.AddMinutes(15);

                user.ResetPasswordCode = resetCode;
                user.ResetPasswordCodeExpiry = resetCodeExpiry;

                await _context.SaveChangesAsync();

                await _emailService.SendPasswordResetCodeAsync(user.Email!, resetCode, user.Name ?? "Usuário");

                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Código de confirmação enviado para o email"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro interno do servidor ao enviar o código de confirmação"
                });
            }
        }

        [HttpPost("verify-reset-code")]
        public async Task<ActionResult<AuthResponseDto>> VerifyResetCode(VerifyResetCodeDto verifyDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.ResetPasswordCode == verifyDto.Code);

                if (user == null)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Código inválido ou não encontrado."
                    });
                }

                // Verifica se expirou
                if (user.ResetPasswordCodeExpiry == null || user.ResetPasswordCodeExpiry < DateTime.UtcNow)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Código expirado."
                    });
                }

                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Código verificado com sucesso",
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro interno do servidor ao verificar o código de confirmação"
                });
            }
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<AuthResponseDto>> ResetPassword(ResetPasswordDto resetDto)
        {
            try
            {
                if (resetDto.NewPassword != resetDto.ConfirmPassword)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "As senhas não coincidem"
                    });
                }

                if (resetDto.NewPassword.Length < 6)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "A senha deve ter pelo menos 6 caracteres"
                    });
                }

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == resetDto.Email);

                if (user == null ||
                    user.ResetPasswordCode != resetDto.Code ||
                    user.ResetPasswordCodeExpiry == null ||
                    user.ResetPasswordCodeExpiry < DateTime.UtcNow)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Código inválido ou expirado"
                    });
                }

                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(resetDto.NewPassword);
                user.ResetPasswordCode = null;
                user.ResetPasswordCodeExpiry = null;

                await _context.SaveChangesAsync();

                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Senha redefinida com sucesso"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro interno do servidor ao alterar a senha"
                });
            }
        }
        [HttpDelete("delete-account")]
        public async Task<ActionResult<AuthResponseDto>> DeleteAccount(DeleteAccountDto deleteDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == deleteDto.Email);

                if (user == null)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Email ou senha inválidos"
                    });
                }

                if (!BCrypt.Net.BCrypt.Verify(deleteDto.Password, user.PasswordHash))
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Email ou senha inválidos"
                    });
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Conta excluída com sucesso"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro interno do servidor ao deletar conta"
                });
            }
        }
        [HttpGet("profile")]
        public async Task<ActionResult> GetProfile([FromQuery] string email)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound(new
                    {
                        Success = false,
                        Message = "Usuário não encontrado"
                    });
                }

                return Ok(new
                {
                    Success = true,
                    Nome = user.Name,
                    Email = user.Email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Success = false,
                    Message = "Erro interno do servidor ao consumir os dados da API"
                });
            }
        }
    }
}