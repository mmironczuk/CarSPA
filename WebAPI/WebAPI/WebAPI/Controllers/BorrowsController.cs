using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DAL;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowsController : ControllerBase
    {
        private readonly DataContext _context;

        public BorrowsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Borrows
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Borrow>>> GetBorrow()
        {
            return await _context.Borrow.Include(x=>x.Car).Include(x=>x.Client).ToListAsync();
        }

        // GET: api/Borrows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Borrow>> GetBorrow(int id)
        {
            var borrow = await _context.Borrow.Include(x => x.Car).Include(x => x.Client).FirstOrDefaultAsync(x=>x.BorrowId==id);

            if (borrow == null)
            {
                return NotFound();
            }

            return borrow;
        }

        // PUT: api/Borrows/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBorrow(int id, Borrow borrow)
        {
            if (id != borrow.BorrowId)
            {
                return BadRequest();
            }

            _context.Entry(borrow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Borrows
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Borrow>> PostBorrow(Borrow borrow)
        {
            _context.Borrow.Add(borrow);
            await _context.SaveChangesAsync();

            var borr = await _context.Borrow.Include(x => x.Car).Include(x => x.Client).FirstOrDefaultAsync(x => x.BorrowId == borrow.BorrowId);

            return Ok("GetBorrow");
        }

        // DELETE: api/Borrows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBorrow(int id)
        {
            var borrow = await _context.Borrow.FindAsync(id);
            if (borrow == null)
            {
                return NotFound();
            }

            _context.Borrow.Remove(borrow);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BorrowExists(int id)
        {
            return _context.Borrow.Any(e => e.BorrowId == id);
        }
    }
}
