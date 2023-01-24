using Microsoft.AspNetCore.Mvc;

namespace MontyHallAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LimitsController : ControllerBase
    {
        private readonly ILogger<LimitsController> _logger;
        private readonly IConfiguration _configuration;

        public LimitsController(ILogger<LimitsController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet(Name = "GetLimits")]
        public IResult GetLimits()
        {
            var limits = _configuration.GetSection("Limits").Get<Limits>();
            var endpoint = HttpContext.GetEndpoint();

            if(limits is not null)
            {
                _logger.LogInformation("endpoint {@endpoint} executed", endpoint?.DisplayName);
                return Results.Ok(limits);
            }

            return Results.NotFound();

        }
    }
}
