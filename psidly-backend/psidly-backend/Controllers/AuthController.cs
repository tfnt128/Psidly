using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Psidly.Shared.Data.Data;
using Psidly.Shared.Models.Models;
using psidly_backend.DTOs;


namespace psidly_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class AuthController : ControllerBase
    {
        private readonly PsidlyContext _context;

        public AuthController(PsidlyContext context)
        {
            _context = context;
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
                        Email = user.Email
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
                        Email = newUser.Email
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
    }
}
