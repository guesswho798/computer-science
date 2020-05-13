using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    public class FrozenDessert : Dessert
    {
        private int tempature;

        public FrozenDessert(string name, int cost, int amount) : base(name, cost, amount)
        {
            this.Name = name;
            this.Cost = cost;
            this.Amount = amount;
            this.tempature = -4;
        }

        public override string ToString()
        {
            return base.ToString() + ", tempature: " + this.tempature;
        }
    }
}
