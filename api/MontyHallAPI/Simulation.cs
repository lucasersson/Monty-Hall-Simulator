using System;

namespace MontyHallAPI
{
    public class Simulation
    {
        private readonly Random random = new();
        private int wins;
        private int losses;

        public UserInput UserInput { get; set; } = new UserInput();
        public Probability Probability { get; set; }

        public Simulation StartSimulation()
        {
            for (int i = 0; i < UserInput.Trials; i++)
            {
                int car = random.Next(3);
                int firstChoice = random.Next(3);

                int hostChoice = ChoseAnotherDoor(car, firstChoice);

                if (UserInput.Decision == Decision.Keep)
                {
                    if (firstChoice == car)
                    {
                        wins++;
                    }
                    else
                    {
                        losses++;
                    }
                }
                else
                {
                    var secondChoice = ChoseAnotherDoor(firstChoice, hostChoice);
                    if (secondChoice == car)
                    {
                        wins++;
                    }
                    else
                    {
                        losses++;
                    }
                }
            }

            Probability = new Probability(wins, losses);

            return this;
        }

        private int ChoseAnotherDoor(int firstDoor, int secondDoor)
        {
            int result;

            do
            {
                result = random.Next(3);
            } while (result == firstDoor || result == secondDoor);

            return result;
        }
    }

    public enum Decision
    {
        Keep = 1,
        Change
    }

    
}
