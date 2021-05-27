using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_8
{
    class Program
    {
        static void Main(string[] args)
        {
            Student s = new Student(1, "me");
            s.add(100);
            s.add(50);
            Console.WriteLine(s.showavg());
            Console.ReadKey();
        }

    }
}
