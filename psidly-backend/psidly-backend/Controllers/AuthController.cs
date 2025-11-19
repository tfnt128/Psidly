using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Psidly.Shared.Data.Data;
using Psidly.Shared.Models.Models;
using psidly_backend.DTOs;
using psidly_backend.Interfaces;
using System.Security.Cryptography;

namespace psidly_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class AuthController : ControllerBase
    {
        private readonly PsidlyContext _context;
        private readonly IEmailService _emailService; 

        public AuthController(PsidlyContext context, IEmailService emailService) 
        {
            _context = context;
            _emailService = emailService; 
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

                if (user == null)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Email ou senha inválidos"
                    });
                }

                if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Email ou senha inválidos"
                    });
                }

                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Login realizado com sucesso",
                    User = new UserDto
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Email = user.Email,
                        Crp = user.Crp,
                        BirthDate = user.BirthDate
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro interno do servidor"
                });
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
                    Message = "Erro interno do servidor"
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
                        Message = "Se o email existir, um código de confirmação será enviado"
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
                    Message = "Erro interno do servidor"
                });
            }
        }

        [HttpPost("verify-reset-code")]
        public async Task<ActionResult<AuthResponseDto>> VerifyResetCode(VerifyResetCodeDto verifyDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == verifyDto.Email);

                if (user == null ||
                    user.ResetPasswordCode != verifyDto.Code ||
                    user.ResetPasswordCodeExpiry == null ||
                    user.ResetPasswordCodeExpiry < DateTime.UtcNow)
                {
                    return Ok(new AuthResponseDto
                    {
                        Success = false,
                        Message = "Código inválido ou expirado"
                    });
                }

                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Código verificado com sucesso"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro interno do servidor"
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

                // Atualiza a senha
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
                    Message = "Erro interno do servidor"
                });
            }
        }
    }
}