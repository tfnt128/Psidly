using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Psidly.Shared.Data.Data;
using Psidly.Shared.Models.Models;
using System.Security.Claims;
using psidly_backend.DTOs;

namespace psidly_backend.Controllers
{
    [Authorize] 
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase 
    {
        private readonly PsidlyContext _context;

        public PatientsController(PsidlyContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create(PatientCreateDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            var psychologistId = int.Parse(userIdClaim.Value);

            var patient = new Patient
            {
                Name = dto.Name,
                Email = dto.Email,
                Cpf = dto.Cpf,
                BirthDate = dto.BirthDate,
                Insurance = dto.Insurance,
                PsychologistId = psychologistId
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Paciente cadastrado com sucesso!" });
        }

      
    }
}
