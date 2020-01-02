using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_12
{
    class Program
    {
        static void Main(string[] args)
        {
            office o = new office("name");

            o.adddoc("doc name", "heart");

            doctor doc = o.get_doc("heart");
            
            if (o.Doctors == null)
            {
                Console.WriteLine("test..");
            }

            Console.WriteLine(o.Doctors.GetValue().Specialization);

            Console.WriteLine(doc.Name);


            Console.ReadKey();
        }
    }
}
