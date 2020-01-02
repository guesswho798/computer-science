using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_12
{
    class office
    {
        private string name;
        private Node<doctor> doctors;

        internal Node<doctor> Doctors
        {
            get
            {
                return doctors;
            }

            set
            {
                doctors = value;
            }
        }

        public office(string name)
        {
            this.name = name;
            Doctors = null;
        }

        public void adddoc(string name, string specialization)
        {
            doctor d = new doctor(name, specialization);
            Node<doctor> temp = new Node<doctor>(d);
            if (Doctors == null)
            {
                Doctors = temp;
            }
            else
            {
                Doctors.SetNext(temp);
            }
        }

        public string showpat(string name)
        {
            Node<doctor> temp = Doctors;

            while (temp.GetNext() != null)
            {
                if (temp.GetValue().Name == name)
                {
                    return temp.GetValue().Treatments.head().P.Name;
                }
                temp = temp.GetNext();
            }

            return null;
        }

        public string tostring()
        {
            string answer = "[ ";
            Node<doctor> temp = Doctors;

            while (temp != null)
            {
                if (!temp.GetValue().Treatments.IsEmpty())
                {
                    answer += temp.GetValue().Name;
                }
                temp = temp.GetNext();
            }

            answer += " ]";

            return answer;
        }

        public doctor get_doc(string specialization)
        {
            Node<doctor> temp = Doctors;
            doctor answer = null;

            while (temp != null)
            {
                Console.WriteLine(".");
                if (temp.GetValue().Specialization == specialization)
                {
                    try
                    {
                        if (temp.GetValue().Treatments == null || l(temp.GetValue().Treatments) < l(answer.Treatments))
                        {
                            answer = temp.GetValue();
                        }
                    }
                    catch
                    {
                        answer = temp.GetValue();
                    }
                    
                }
                temp = temp.GetNext();
            }
            return answer;
        }

        public int l(Queue<treatment> temp)
        {
            int counter = 0;

            while (!temp.IsEmpty())
            {
                temp.Remove();
                counter++;
            }
            return counter;
        }

    }
}
