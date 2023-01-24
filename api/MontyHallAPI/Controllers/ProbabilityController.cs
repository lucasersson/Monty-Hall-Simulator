using Microsoft.AspNetCore.Mvc;

namespace MontyHallAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProbabilityController : ControllerBase
    {
        private readonly ILogger<ProbabilityController> _logger;

        public ProbabilityController(ILogger<ProbabilityController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "GetProbability")]
        public IResult GetProbability(UserInput userInput)
        {
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