using MathNet.Numerics;
using static System.Convert;

namespace MontyHallAPI
{
    public readonly record struct Probability(int Wins, int Losses)
    {
        public decimal WinProbability => (ToDecimal(Wins) / ToDecimal(Wins + Losses)).Round(4);
    }
}
