using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Psidly.Shared.Data.Data;
using Psidly.Shared.Models.Models;
using psidly_backend.DTOs;
using System.Security.Claims;

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

        [HttpGet("list-patients")]
        public async Task<IActionResult> ListPatients()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            var psychologistId = int.Parse(userIdClaim.Value);

            var patients = await _context.Patients
                .Where(p => p.PsychologistId == psychologistId && !p.IsHidden)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Photo,
                    Age = DateTime.Today.Year - p.BirthDate.Year
                })
                .ToListAsync();

            return Ok(patients);
        }

        [HttpGet("find-pat-by-name")]
        public async Task<IActionResult> FindPatientByName([FromQuery] string name)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();
            var psychologistId = int.Parse(userIdClaim.Value);

            var patient = await _context.Patients
                .Where(p => p.PsychologistId == psychologistId && !p.IsHidden && p.Name.Contains(name))
                .Select(p => new
                {
                    p.Photo,
                    p.Name,
                    Age = DateTime.Today.Year - p.BirthDate.Year
                })
                .ToListAsync();

            if (patient == null) return NotFound(new { Success = false, Message = "Paciente não encontrado" });

            return Ok(patient);
        }


        [HttpGet("patient-infos")]
        public async Task<IActionResult> GetPatientInfos([FromQuery] int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();
            var psychologistId = int.Parse(userIdClaim.Value);

            var patient = await _context.Patients
                .Where(p => p.Id == id && p.PsychologistId == psychologistId)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Email,
                    p.Cpf,
                    p.BirthDate,
                    p.PhoneNumber,
                    p.Insurance,
                    p.Photo,
                    Age = DateTime.Today.Year - p.BirthDate.Year
                })
                .FirstOrDefaultAsync();

            if (patient == null) return NotFound(new { Success = false, Message = "Paciente não encontrado" });

            return Ok(patient);
        }

        [HttpPost("create-patient")]
        public async Task<IActionResult> CreatePatient(PatientCreateDto dto)
        {
            try
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
                    PhoneNumber = dto.PhoneNumber,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    Photo = dto.Photo,
                    PsychologistId = psychologistId
                };

                _context.Patients.Add(patient);
                await _context.SaveChangesAsync();

                return Ok(new { Success = true });
            }
            catch
            {
                return Ok(new { Success = false });
            }
        }

        [HttpGet("get-pat-psi")]
        public async Task<IActionResult> GetPatientPsychologist([FromQuery] int id)
        {
            var patient = await _context.Patients
                .Include(p => p.Psychologist)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (patient == null || patient.Psychologist == null)
                return NotFound(new { Success = false, Message = "Vínculo não encontrado" });

            return Ok(new
            {
                Name = patient.Psychologist.Name,
                Email = patient.Psychologist.Email
            });
        }

        [HttpGet("get-pat-photo")]
        public async Task<IActionResult> GetPatientPhoto([FromQuery] int id)
        {
            var patient = await _context.Patients
                .Select(p => new { p.Id, p.Photo })
                .FirstOrDefaultAsync(p => p.Id == id);

            if (patient == null) return NotFound(new { Success = false });

            return Ok(new { Photo = patient.Photo });
        }

        [HttpPatch("ocult/{patientId}")]
        public async Task<IActionResult> OcultPatient(int patientId)
        {
            var patient = await _context.Patients.FindAsync(patientId);

            if (patient == null)
            {
                return NotFound(new
                { Message = "Paciente não encontrado" });
            }

            patient.IsHidden = true;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Paciente ocultado com sucesso"
            });
        }

        [HttpGet("find-ocult/{patientId}")]
        public async Task<IActionResult> FindOcultPatient(int patientId)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == patientId && p.IsHidden);

            if (patient == null)
            {
                return NotFound(new
                { Message = "Paciente oculto não encontrado" });
            }

            return Ok(patient);
        }


        [HttpPatch("active/{patientId}")]
        public async Task<IActionResult> ActivePatient(int patientId)
        {
            var patient = await _context.Patients.FindAsync(patientId);

            if (patient == null)
            {
                return NotFound(new
                { Message = "Paciente não encontrado" });
            }

            patient.IsHidden = false;
            await _context.SaveChangesAsync();

            return Ok(new
            { Mmessage = "Paciente reativado com sucesso" });
        }

        [HttpGet("list-ocult")]
        public async Task<IActionResult> ListOcultPatients()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            var psychologistId = int.Parse(userIdClaim.Value);

            var patients = await _context.Patients
                .Where(p => p.PsychologistId == psychologistId && p.IsHidden)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Photo,
                    Age = DateTime.Today.Year - p.BirthDate.Year
                })
                .ToListAsync();

            return Ok(patients);
        }

        

        [HttpDelete("delete/{patientId}")]
        public async Task<ActionResult> DeletePatient(int patientId)
        {
            var patient = await _context.Patients.FindAsync(patientId);

            if (patient == null)
            {
                return NotFound(new
                { Message = "Paciente não encontrado" });
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return Ok(new
            { Mmessage = "Paciente deletado com sucesso" });
        }

        [HttpPut("{patientId}")]
        public async Task<IActionResult> UpdatePatient(int patientId, PatientUpdateDto dto)
        {
            var patient = await _context.Patients.FindAsync(patientId);

            if (patient == null)
            {
                return NotFound(new
                { Message = "Paciente não encontrado" });
            }

            patient.Name = dto.Name;
            patient.Email = dto.Email;
            patient.Cpf = dto.Cpf;
            patient.BirthDate = dto.BirthDate;
            patient.Insurance = dto.Insurance;
            patient.Photo = dto.Photo;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Paciente atualizado com sucesso",
                Patient = patient
            });
        }


    }
}
