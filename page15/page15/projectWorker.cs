using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page15
{
    class projectWorker : Worker
    {
        private Node<int> p = null;

        public projectWorker(string firstName, string lastName, string ID, int project) : base(firstName, lastName, ID)
        {
            this.p = new Node<int>(project);
        }

        public override string getSalary()
        {
            Node<int> tmp = p;
            int sum = 0;

            while(tmp != null)
            {
                sum += tmp.GetValue();
                tmp = tmp.GetNext();
            }

            return sum.ToString();
        }
    }
}
