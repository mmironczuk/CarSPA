using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string mail { get; set; }
        public int age { get; set; }
        public string gender { get; set; }
        public virtual ICollection<Borrow> Borrows { get; set; }
    }
}
