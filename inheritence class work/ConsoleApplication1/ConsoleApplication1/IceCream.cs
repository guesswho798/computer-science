using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class IceCream : FrozenDessert
    {
        private bool sprinkles;
        public IceCream(string name, int cost, int amount, bool sprinkles) : base(name, cost, amount)
        {
            this.Name = name;
            this.Cost = cost;
            this.Amount = amount;
            this.sprinkles = sprinkles;
        }


        public override string ToString()
        {
            if (sprinkles)
            {
                return base.ToString() + " sprinkles are free";
            }
            else
            {
                return base.ToString();
            }
        }
    }
}
