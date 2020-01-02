using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_9
{
    class Program
    {
        static void Main(string[] args)
        {
            member m1 = new member("guy 1");
            m1.addsong("song1");
            m1.addsong("song2");
            m1.addsong("song3");
            m1.addsong("song3");
            m1.addsong("song4");
            
            member m2 = new member("guy 2");
            m2.addsong("song5");
            m2.addsong("song6");
            m2.addsong("song7");
            m2.addsong("song8");

            member m3 = new member("guy 3");
            m3.addsong("song1");
            m3.addsong("song9");
            m3.addsong("song2");
            m3.addsong("song7");

            member m4 = new member("guy 4");
            m4.addsong("song1");
            m4.addsong("song2");
            m4.addsong("song3");
            m4.addsong("song4");
            m4.addsong("song2");
            m4.addsong("song7");

            member m5 = new member("guy 5");
            m5.addsong("song8");
            m5.addsong("song3");
            m5.addsong("song4");
            m5.addsong("song3");

            Node<member> members = null;
            members = add(members, m1);
            members = add(members, m2);
            members = add(members, m3);
            members = add(members, m4);
            members = add(members, m5);


            max(members);

            Console.ReadKey();
        }

        static Node<member> add(Node<member> members, member m) 
        {
            if (members == null)
            {
                members = new Node<member>(m);
            }
            else
            {
                Node<member> pos = members;
                while (pos.next != null)
                {
                    pos = pos.next;
                }
                pos.next = new Node<member>(m);
            }
            return members;
        }
    
        static void max(Node<member> chain)
        {
            Node<member> temp = chain;
            int max = 0;
            int tempnum = 0;
            string name = "";

            while (temp != null)
            {
                tempnum = 0;
                while (temp.value.Songname != null)
                {
                    tempnum++;
                    temp.value.Songname = temp.value.Songname.next;
                }

                if (tempnum > max)
                {
                    name = temp.value.Name;
                    max = tempnum;
                }
                else if (tempnum == max)
                {
                    name += ", " + temp.value.Name;

                }

                temp = temp.next;
            }

            Console.WriteLine("members with max num of songs: " + name);
        }

        static void once(Node<member> chain)
        {
            Node<member> temp = chain;
            while (temp != null)
            {
                while (temp.value.Songname != null)
                {
                    temp.value.Songname = temp.value.Songname.next;
                }
                
                temp = temp.next;
            }
        }
    }
}