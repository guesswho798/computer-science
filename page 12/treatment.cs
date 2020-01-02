using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace page_12
{
    class treatment
    {
        private patient p;
        private DateTime date;
        private string hour;

        internal patient P
        {
            get
            {
                return p;
            }

            set
            {
                p = value;
            }
        }

        public DateTime Date
        {
            get
            {
                return date;
            }

            set
            {
                date = value;
            }
        }

        public string Hour
        {
            get
            {
                return hour;
            }

            set
            {
                hour = value;
            }
        }

        public treatment(patient p, DateTime date, string hour)
        {
            this.P = p;
            this.Date = date;
            this.Hour = hour;
        }
    }
}
