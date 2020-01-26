using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page15
{
    class manager : Worker
    {
        private int salary;
        private int bonus;
        public manager(string firstName, string lastName, string ID, int salary, int bonus) : base(firstName, lastName, ID)
        {
            this.salary = salary;
            this.bonus = bonus;
        }

        public override string getSalary()
        {
            return salary.ToString() + ", bonus: " + bonus.ToString();
        }
    }
}
