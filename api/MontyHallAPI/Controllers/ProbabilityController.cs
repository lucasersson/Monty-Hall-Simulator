using Microsoft.AspNetCore.Mvc;

namespace MontyHallAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProbabilityController : ControllerBase
    {
        private readonly ILogger<ProbabilityController> _logger;
        private readonly IConfiguration _configuration;

        public ProbabilityController(ILogger<ProbabilityController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost(Name = "GetProbability")]
        public IResult GetProbability(UserInput userInput)
        {
            var limits = _configuration.GetSection("Limits").Get<Limits>();

            if (limits?.Min != null && limits?.Max != null)
            {
                if(userInput.Trials < int.Parse(limits.Min) || userInput.Trials > int.Parse(limits.Max)) {
                    return Results.BadRequest();
                }
            }

            try
            {
                var simulation = new Simulation { UserInput = userInput };
                var result = simulation.StartSimulation();
                return Results.Ok(result);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }
    }
}