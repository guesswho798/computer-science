using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Cake : Dessert
    {
        private int numpieces;
        public Cake(string name, int cost, int amount, int numpieces) : base(name, cost, amount)
        {
            this.Name = name;
            this.Cost = cost;
            this.Amount = amount;
            this.numpieces = numpieces;
        }

        public int piecePrice()
        {
            return this.Cost / this.numpieces;
        }
    }
}
