namespace page_12
{
    public class Stack<T>
    {
        public Node<T> head;

        public Stack()
        {
            this.head = null;
        }

        public void Push(T x)
        {
            Node<T> temp = new Node<T>(x);
            temp.SetNext(head);
            head = temp;
        }

        public T Pop()
        {
            T x = head.GetValue();
            head = head.GetNext();
            return x;
        }

        public T top()
        {
            return head.GetValue();
        }

        public bool IsEmpty()
        {
            return head == null;
        }

        public override string ToString()
        {
            string temp = "[";
            Node<T> pos = this.head;
            while (pos != null)
            {
                temp += " " + pos.GetValue().ToString();
                pos = pos.GetNext();
            }
            return temp + " ]";
               
        }

 }
}