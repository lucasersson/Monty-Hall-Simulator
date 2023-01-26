namespace MontyHallAPI.Tests
{
    public class ProbabilityControllerTests
    {
        [Fact]
        public void GetProbabilityTest()
        {
            var userInput = new UserInput { Trials = 10, Decision = Decision.Keep };

            var simulation = new Simulation { UserInput = userInput };
            var simResult = simulation.StartSimulation();

            Assert.Equal(userInput, simulation.UserInput);
            Assert.IsType<Simulation>(simResult);
            Assert.IsType<Probability>(simResult.Probability);
            Assert.IsType<UserInput>(simResult.UserInput);
            Assert.InRange(simResult.Probability.Wins, 0, userInput.Trials);
            Assert.InRange(simResult.Probability.Losses, 0, userInput.Trials);

        }
    }
}