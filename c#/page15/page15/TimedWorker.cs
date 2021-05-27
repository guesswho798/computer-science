using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page15
{
    class TimedWorker : Worker
    {
        private int time;
        private int moneyPerTime;

        public TimedWorker(string firstName, string lastName, string ID, int time, int moneyPerTime) : base(firstName, lastName, ID)
        {
            this.time = time;
            this.moneyPerTime = moneyPerTime;
        }

        public override string getSalary()
        {
            int x = moneyPerTime * time;
            return x.ToString();
        }
    }
}