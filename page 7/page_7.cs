using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page7
{
    class Program
    {
        static void Main(string[] args)
        {
            CAR c1 = new CAR(1, "model", "comname", 2000, 5000);
            CAR c2 = new CAR(2, "model2", "comname", 2000, 7000);
            CAR c3 = new CAR(3, "model3", "comname2", 2000, 80000);
            CAR c4 = new CAR(4, "model4", "comname2", 2000, 90000);
            CAR c5 = new CAR(5, "model5", "comname", 2000, 100000);

            Node<CAR> chain = new Node<CAR>(c1);
            add(c2, chain);
            add(c3, chain);
            add(c4, chain);
            add(c5, chain);

            Node<string> n = newnode(chain, "comname");

            show(n);
            
            Console.ReadKey();
        }

        static void add<T>(T value, Node<T> t)
        {
            //o = n
            Node<T> pos = t;
            while (pos.next != null)
            {
                pos = pos.next;
            }
            pos.next = new Node<T>(value);
        }
        public static void show(Node<CAR> chain)
        {
            //o = n
            while (chain != null)
            {
                Console.WriteLine(chain.value.model);
                chain = chain.next;
            }
        }
        public static void show(Node<string> chain)
        {
            //o = n
            while (chain != null)
            {
                Console.WriteLine(chain.value);
                chain = chain.next;
            }
        }
        public static void showunder(Node<CAR> CAR)
        {
            //o = n
            Console.WriteLine("cars under 50000");
            while (CAR != null)
            {
                if (CAR.value.price < 50000)
                {
                    Console.WriteLine(CAR.value.carnum + ", " + CAR.value.model + ", " + CAR.value.compenyname);
                }
                CAR = CAR.next;
            }
        }
        static Node<string> newnode(Node<CAR> t, string companyname)
        {
            //o = n
            Node<string> n = new Node<string>("0");
            while (t.next != null)
            {
                if (t.value.compenyname == companyname)
                {
                    add(t.value.carnum.ToString(), n);
                }
                t = t.next;
            }
            add(t.value.carnum.ToString(), n);
            return n;
        }
    }

    class Node<T>
    {
        public T value { get; set; }
        public Node<T> next { get; set; }

        public Node(T x)
        {
            this.value = x;
            this.next = null;
        }
        public Node(T x, Node<T> next)
        {
            this.value = x;
            this.next = next;
        }
        

        public override string ToString()
        {
            return ("" + this.value);
        }

    }

    class CAR
    {
        public int carnum { get; set; }
        public string model { get; set; }
        public string compenyname { get; set; }
        public int price { get; set; }
        public int year { get; set; }
        public CAR(int carnum, string model, string companyname, int year, int price)
        {
            this.carnum = carnum;
            this.model = model;
            this.compenyname = companyname;
            this.year = year;
            this.price = price;
        }
        public override string ToString()
        {
            return this.carnum + "," + this.compenyname + "," + this.model + "," + this.price;
        }
    }   
}
