using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page15
{
    class Worker
    {
        public string firstName { get; set;  }
        public string lastName { get; set; }
        public string ID { get; set; }

        public Worker(string firstName, string lastName, string ID)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.ID = ID;
        }

        public virtual string getSalary()
        {
            return "4500";
        }
    }
}
