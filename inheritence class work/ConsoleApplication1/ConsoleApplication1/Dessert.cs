using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    public class Dessert
    {
        private string name;
        private int cost;
        private int amount;

        public Dessert(string name, int cost, int amount)
        {
            this.name = name;
            this.cost = cost;
            this.amount = amount;
        }

        public int TotalCost()
        {
            return cost * amount;
        }

        public override string ToString()
        {
            return "Name: " + this.name + ", cost: " + this.cost + ", amount: " + this.amount;
        }

        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }
        public int Cost
        {
            get
            {
                return cost;
            }

            set
            {
                cost = value;
            }
        }
        public int Amount
        {
            get
            {
                return amount;
            }

            set
            {
                amount = value;
            }
        }
    }
}
