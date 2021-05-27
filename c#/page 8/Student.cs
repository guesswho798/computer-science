using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_8
{
    public class Student
    {
        public int id { get; set; }
        public string name { get; set; }
        public Node<int> g { get; set; }

        public Student(int id, string name)
        {
            this.id = id;
            this.name = name;
            g = new Node<int>(0);
            g = g.next;
        }

        public void add(int value)
        {
            if (g == null)
            {
                g = new Node<int>(value);
            }
            else
            {
                Node<int> pos = g;
                while (pos.next != null)
                {
                    pos = pos.next;
                }
                pos.next = new Node<int>(value);
            }
        }
        public int showavg()
        {
            int answer = 0;
            int counter = 0;

            while (g != null)
            {
                Console.WriteLine(g.value);
                counter++;
                answer += g.value;
                g = g.next;
            }

            Console.WriteLine("answer = " + answer);
            Console.WriteLine("counter = " + counter);

            if (counter != 0)
            {
                answer /= counter;
            }
            return answer;
        }
        public void show()
        {
            while (g != null)
            {
                Console.WriteLine(g.value);
                g = g.next;
            }
        }
    }

}
