using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Car
    {
        public int CarId { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string color { get; set; }
        public int year { get; set; }
        public int kilometers { get; set; }
        public virtual ICollection<Borrow> Borrows { get; set; }
    }
}
