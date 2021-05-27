using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page15
{
    class fixedWageWorker : Worker
    {
        private int salary;
        public fixedWageWorker(string firstName, string lastName, string ID, int salary) : base(firstName, lastName, ID)
        {
            this.salary = salary;
        }
        public override string getSalary()
        {
            return salary.ToString();
        }
    }
}
