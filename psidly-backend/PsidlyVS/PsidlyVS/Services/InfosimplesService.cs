namespace psidly_backend.Services
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Configuration;

    public class InfosimplesService
    {
        private readonly HttpClient _httpClient;
        private readonly string _token;
        private const string BaseUrl = "https://api.infosimples.com/api/v2/consultas/cfp/cadastro";

        public InfosimplesService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _token = configuration["Infosimples:Token"];
        }

        public async Task<string> ConsultarPsicologoPorCrp(string crp)
        {
            var values = new Dictionary<string, string>
    {
        { "token", _token },
        { "crp", crp } 
    };

            var content = new FormUrlEncodedContent(values);

            try
            {
                var response = await _httpClient.PostAsync(BaseUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }

                return $"Erro na consulta: {response.StatusCode}";
            }
            catch (Exception ex)
            {
                return $"Erro de conexão: {ex.Message}";
            }
        }
    }
}
