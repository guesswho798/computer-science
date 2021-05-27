using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_8
{

    public class Node<T>
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
}
