namespace page_12
{
    public class Queue<T>
    {
        private Node<T> first;
        private Node<T> last;


        public Queue()
        {
            this.first = null;
            this.last = null;
        }

        public void Insert(T x)
        {
            Node<T> temp = new Node<T>(x);
            if (first == null)
                first = temp;
            else
                last.SetNext(temp);
            last = temp;
        }

        public T Remove()
        {
            T x = first.GetValue();
            first = first.GetNext();
            if (first == null)
                last = null;
            return x;
        }

        public T head()
        {
            return first.GetValue();
        }

        public bool IsEmpty()
        {
            return first == null;
        }

        public override string ToString()
        {
            string temp = "[";
            Node<T> pos = this.first;
            while (pos != null)
            {
                temp +=" "+ pos.GetValue().ToString();
                pos = pos.GetNext();
            }
            return temp + " ]";
               
        }
    }
}