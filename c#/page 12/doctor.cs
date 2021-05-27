using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_12
{
    class doctor
    {
        private string name;
        private string specialization;
        private Queue<treatment> treatments;

        public doctor(string name, string specialization)
        {
            Treatments = new Queue<treatment>();
            this.Name = name;
            this.Specialization = specialization;
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
        public string Specialization
        {
            get
            {
                return specialization;
            }

            set
            {
                specialization = value;
            }
        }
        internal Queue<treatment> Treatments
        {
            get
            {
                return treatments;
            }

            set
            {
                treatments = value;
            }
        }

        public void addtreat(patient p, DateTime d, string hour)
        {
            treatment t = new treatment(p, d, hour);
            Treatments.Insert(t);
        }
    }
}
