using System;
using System.Collections.Generic;
using System.Text;

namespace page_10
{
    class TaskManager
    {
        private stack<Task> tasks;
        private int num;

        public TaskManager()
        {
            tasks = new stack<Task>();
        }

        public void addtask(Task t)
        {
            if (num == 0 || t.GetCode() == 1)
            {
                tasks.push(t);
            }
            else
            {
                stack<Task> s1 = copy(tasks);
                stack<Task> temp = new stack<Task>();
                while (s1.Top().GetCode() < t.GetCode())
                {
                    temp.push(s1.Pop());
                    if (s1.Top() == null)
                    {
                        break;
                    }
                }
                s1.push(t);
                while (!temp.isEmpty())
                {
                    s1.push(temp.Pop());
                }
            }
            num++;
        }

        stack<Task> copy(stack<Task> s)
        {
            stack<Task> s1 = new stack<Task>();
            stack<Task> s2 = new stack<Task>();


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
    }
}
