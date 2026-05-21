
    using global::psidly_backend.DTOs;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Psidly.Shared.Data.Data;
    using Psidly.Shared.Models.Models;

    namespace psidly_backend.Controllers
    {
        
        [ApiController]
        [Route("api/avaliation")]
        public class AvaliationController : ControllerBase
        {
            private readonly PsidlyContext _context;

            public AvaliationController(PsidlyContext context)
            {
                _context = context;
            }

            [AllowAnonymous]
            [HttpGet("find")]
            public async Task<IActionResult> FindAvaliation([FromQuery] string date)
            {


            if (!DateOnly.TryParseExact(date, "dd/MM/yyyy", out var parsedDate))
            {
                return BadRequest(new { Message = "Formato de data inválido. Use DD/MM/YYYY" });
            }

            var avaliation = await _context.Avaliations
                .Include(a => a.AvaliationEmocoes)
                    .ThenInclude(ae => ae.Emocao)
                .FirstOrDefaultAsync(a => a.Date == parsedDate);

            if (avaliation == null)
                {
                    return NotFound(new
                    { Message = "Avaliação não encontrada" });
                }

            var result = new
            {
                avaliation.Id,
                avaliation.ObsPaciente,
                avaliation.ObsPsicologo,
                Emocoes = avaliation.AvaliationEmocoes.Select(ae => new
                {
                    Nome = ae.Emocao != null ? ae.Emocao.Name : "Desconhecido",
                    Estrelas = ae.NivelEmocao
                }).ToList()
            };

            return Ok(result);
            }
            [Authorize]
            [HttpPost("create-avaliation")]
            public async Task<IActionResult> CreateAvaliation([FromBody] AvaliationCreateDto dto)
            {
                try
                {
                    var avaliation = new Avaliation
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now),
                        Hour = TimeOnly.FromDateTime(DateTime.Now),
                        ObsPaciente = dto.ObsPaciente,
                        ObsPsicologo = dto.ObsPsicologo,
                        PatientId = dto.PatientId
                    };

                    _context.Avaliations.Add(avaliation);
                    await _context.SaveChangesAsync();

                    var emocoesDb = await _context.Emocoes.ToListAsync();
                    var emocoesDict = emocoesDb.ToDictionary(e => e.Name!.ToLower(), e => e.Id);

                    void AddEmocao(string nomeEmocao, int nivel)
                    {
                        if (emocoesDict.TryGetValue(nomeEmocao.ToLower(), out int emocaoId))
                        {
                            _context.AvaliationEmocoes.Add(new AvaliationEmocao
                            {
                                AvaliationId = avaliation.Id,
                                EmocaoId = emocaoId,
                                NivelEmocao = nivel
                            });
                        }
                    }

                    AddEmocao("alegria", dto.Alegria);
                    AddEmocao("tristeza", dto.Tristeza);
                    AddEmocao("raiva", dto.Raiva);
                    AddEmocao("estresse", dto.Estresse);
                    AddEmocao("ansiedade", dto.Ansiedade);

                    await _context.SaveChangesAsync();

                    return Ok(new { Success = true });
                }
                catch
                {
                    return Ok(new { Success = false });
                }
            }
        }
    }

