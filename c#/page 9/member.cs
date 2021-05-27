using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_9
{
    public class member
    {
        private string name;
        private Node<string> songname;
        public member(string name)
        {
            this.Name = name;
        }

        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }

        public Node<string> Songname
        {
            get
            {
                return songname;
            }

            set
            {
                songname = value;
            }
        }

        public void addsong(string s)
        {
            if (Songname == null)
            {
                Songname = new Node<string>(s);
            }
            else
            {
                Node<string> pos = Songname;
                while (pos.next != null)
                {
                    pos = pos.next;
                }
                pos.next = new Node<string>(s);
            }
        }
    }
}
