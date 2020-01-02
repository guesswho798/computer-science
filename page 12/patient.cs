using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_12
{
    class patient
    {
        private string id;
        private string name;
        private string birthday;
        private string gender;

        public string Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
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
        public string Birthday
        {
            get
            {
                return birthday;
            }

            set
            {
                birthday = value;
            }
        }
        public string Gender
        {
            get
            {
                return gender;
            }

            set
            {
                gender = value;
            }
        }

        public patient(string id, string name, string birthday, string gender)
        {
            this.Id = id;
            this.Name = name;
            this.Birthday = birthday;
            this.Gender = gender;
        }
    }
}
