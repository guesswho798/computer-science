using System;
using System.Collections.Generic;
using System.Text;

namespace page_10
{
    class Task
    {
        private int code;
        public string task;

        public Task(string task, int code)
        {
            this.task = task;
            this.code = code;
        }
        public Task(int code)
        {
            this.code = code;
        }

        public int GetCode()
        {
            return code;
        }
    }
}
