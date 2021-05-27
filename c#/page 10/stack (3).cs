using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_10
{
    public class stack<T>
    {
        public Node<T> head;
        public stack()
        {
            this.head = null;
        }

        public bool isEmpty()
        {
            return this.head == null;
        }
        public void push(T value)
        {
            this.head = new Node<T>(value, this.head);
        }
        public T Pop()
        {
            T x = this.head.value;

            this.head = this.head.next;

            return x;

        }
        public T Top()
        {
            Node<T> temp = head;
            while (temp.next != null)
            {
                temp = temp.next;
            }
            return head.value;
        }

        public override string ToString()
        {
            string temp = "[";

            Node<T> pos = this.head;
            while (pos != null)
            {
                temp += " " + pos.value.ToString();
                pos = pos.next;
            }
            return temp + " ]";
        }

    }
}
