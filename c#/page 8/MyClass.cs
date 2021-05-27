using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_8
{
    class MyClass
    {
        private string name { get; set; }
        private Node<Student> students;

        public MyClass(string name)
        {
            this.name = name;
        }
        public void addStudent(Student s)
        {
            if (students == null)
            {
                students = new Node<Student>(s);
            }
            else
            {
                Node<Student> pos = students;
                while (pos.next != null)
                {
                    pos = pos.next;
                }
                pos.next = new Node<Student>(s);
            }
        }
        public void addGrade(int id, int grade)
        {

        }
    }
}
