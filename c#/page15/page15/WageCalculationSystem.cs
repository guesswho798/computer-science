using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page15
{
    class WageCalculationSystem
    {
        Node<Worker> wn = null;
        public WageCalculationSystem(Worker w)
        {
            wn = new Node<Worker>(w);
        }

        public void addWorker(Worker w)
        {
            Node<Worker> tmp = wn;

            while(tmp.HasNext())
            {
                tmp = tmp.GetNext();
            }

            tmp.SetNext(new Node<Worker>(w));
        }

        public void wage()
        {
            Node<Worker> tmp = wn;

            while (tmp != null)
            {
                Console.WriteLine(tmp.GetValue().firstName + " " + tmp.GetValue().lastName + "(" + tmp.GetValue().ID + "): " + tmp.GetValue().getSalary());
                tmp = tmp.GetNext();
            }
            Console.WriteLine("End\n===========");
        }
    }
}
