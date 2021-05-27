using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page15
{
    class Program
    {
        static void Main(string[] args)
        {
            Worker w1 = new TimedWorker("Timed", "Worker", "212287510", 1, 999);
            Worker w2 = new fixedWageWorker("Mr", "Fixedwage", "8532", 874);
            Worker w3 = new projectWorker("project", "worker", "124134", 10);
            Worker w4 = new manager("Ms", "manager", "351141", 874, 1341);

            WageCalculationSystem WCS = new WageCalculationSystem(new Worker("Worker1", "lastName", "0101"));

            WCS.addWorker(w1);
            WCS.addWorker(w2);
            WCS.addWorker(w3);
            WCS.addWorker(w4);

            WCS.wage();

            Console.ReadKey();
        }
    }
}
