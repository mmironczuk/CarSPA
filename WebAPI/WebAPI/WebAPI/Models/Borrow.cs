using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Borrow
    {
        public int BorrowId { get; set; }
        public int CarId { get; set; }
        public int ClientId { get; set; }
        public DateTime date { get; set; }
        public virtual Client Client { get; set; }
        public virtual Car Car { get; set; }
    }
}
