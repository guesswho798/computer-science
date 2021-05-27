using System;

namespace page_10
{
    class Program
    {
        static void Main(string[] args)
        {
            //copying stack
            stack<int> s = new stack<int>();
            Random rand = new Random();

            for (int i = 0; i < 10; i++)
            {
                s.push(rand.Next(1, 25));
            }

            Console.WriteLine(s.ToString());

            stack<int> s1 = copy(s);

            Console.WriteLine(s1.ToString());

            //checking if palindrome

            stack<string> s2 = new stack<string>();

            s2.push("l");
            s2.push("e");
            s2.push("v");
            s2.push("e");
            s2.push("l");

            Console.WriteLine("palindrome: " + palindrome(s2));

            Console.WriteLine("normal: " + s2.ToString());
            Console.WriteLine("no dups: " + nodups(s2).ToString());
            Console.WriteLine("no dups with count: " + nodupscount(s2).ToString());

            TaskManager tm = new TaskManager();

            Task t1 = new Task(1);
            Task t2 = new Task(2);
            Task t3 = new Task(3);

            tm.addtask(t1);
            tm.addtask(t2);
            tm.addtask(t3);
            tm.addtask(t1);
            tm.addtask(t3);
            tm.addtask(t2);

            Console.ReadKey();
        }

        static stack<int> copy(stack<int> s)
        {
            stack<int> s1 = new stack<int>();
            stack<int> s2 = new stack<int>();


            while (!s.isEmpty())
            {
                s1.push(s.Pop());
            }
            while (!s1.isEmpty())
            {
                s.push(s1.Top());
                s2.push(s1.Pop());
            }

            return s2;
        }
        static stack<string> copy(stack<string> s)
        {
            stack<string> s1 = new stack<string>();
            stack<string> s2 = new stack<string>();


            while (!s.isEmpty())
            {
                s1.push(s.Pop());
            }
            while (!s1.isEmpty())
            {
                s.push(s1.Top());
                s2.push(s1.Pop());
            }

            return s2;
        }
        static bool palindrome(stack<string> s)
        {
            stack<string> st = copy(s);
            stack<string> s1 = copy(s);
            stack<string> s2 = new stack<string>();

            //crating a new stack
            while (!st.isEmpty())
            {
                s2.push(st.Pop());
            }

            //comparing the stack to the new reversed stack
            while (!s2.isEmpty())
            {
                if (s2.Pop() != s1.Pop())
                {
                    return false;
                }
            }

            return true;
        }
        static stack<string> nodups(stack<string> s)
        {
            stack<string> s1 = copy(s); //the one that is checking the stack one at a time
            stack<string> s2 = new stack<string>(); //new
            stack<string> s3 = new stack<string>(); //new temp

            while (!s1.isEmpty())
            {
                bool add = true;
                s3 = copy(s2);
                stack<string> s4 = copy(s1); //running thru it to compare
                while (!s4.isEmpty())
                {
                    while (!s2.isEmpty())
                    {
                        if (s2.Pop() == s4.Top())
                        {
                            add = false;
                        }
                    }
                    s4.Pop();
                }
                s2 = copy(s3);
                if (add)
                {
                    s2.push(s1.Top());
                }
                s1.Pop();
            }

            return s3;
        }
        static stack<string> nodupscount(stack<string> s)
        {
            stack<string> s1 = copy(s); //the one that is checking the stack one at a time
            stack<string> s2 = new stack<string>(); //new
            stack<string> s3 = new stack<string>(); //new temp
            stack<string> s5 = new stack<string>(); //answer

            while (!s1.isEmpty())
            {
                bool add = true;
                s3 = copy(s2);
                stack<string> s4 = copy(s1); //running thru it to compare
                while (!s4.isEmpty())
                {
                    while (!s2.isEmpty())
                    {
                        if (s2.Pop() == s4.Top())
                        {
                            add = false;
                        }
                    }
                    s4.Pop();
                }
                s2 = copy(s3);
                if (add)
                {
                    s2.push(s1.Top());

                    int counter = 0;
                    stack<string> temp = copy(s);
                    while (!temp.isEmpty())
                    {
                        if (s1.Top() == temp.Pop())
                        {
                            counter++;
                        }
                    }

                    s5.push(s1.Top() + "=" + counter.ToString() + ",");
                }
                s1.Pop();
            }

            return s5;
        }
    }
}