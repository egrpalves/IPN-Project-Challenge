using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using BookApi.Data;
using BookApi.Models;

namespace Books.Controllers
{
    //[EnableCors("http://localhost:1337", "*", "*")]
    public class BooksController : ApiController
    {
        private BookApiContext db = new BookApiContext();

        // GET: api/Books
        [Authorize]
        public IQueryable<BookDto> GetBooks()
        {
            var books = from b in db.Books
                        select new BookDto()
                        {
                            Id = b.Id,
                            Title = b.Title,
                            AuthorName = b.Author.Name
                        };
            return books;
        }

        // GET: api/Books/5
        [Authorize]
        [ResponseType(typeof(BookDetailDto))]
        public async Task<IHttpActionResult> GetBook(int id)
        {
            var book = await db.Books.Include(b => b.Author).Select(b =>
                new BookDetailDto()
                {
                    Id = b.Id,
                    Title = b.Title,
                    Year = b.Year,
                    Price = b.Price,
                    AuthorName = b.Author.Name,
                    Genre = b.Genre
                }).SingleOrDefaultAsync(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Books/5
        [Authorize(Roles="Admin")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBook(int id, BookDetailDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dto.Id)
            {
                return BadRequest();
            }

            var book = (from b in db.Books where b.Id == id select b).FirstOrDefault();
            var author_name = (from a in db.Authors where a.Name == dto.AuthorName select a.Name).FirstOrDefault();

            book.Title = dto.Title;
            book.Year = dto.Year;
            book.Genre = dto.Genre;
            book.Price = dto.Price;

            if (dto.AuthorName == author_name)
            {
                book.AuthorId = (from a in db.Authors where a.Name == dto.AuthorName select a.Id).FirstOrDefault();
            }
            else
            {
                book.Author = new Author()
                {
                    Name = dto.AuthorName
                };
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Books
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(BookDetailDto))]
        public async Task<IHttpActionResult> PostBook(BookDetailDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var book = new Book()
            {
                Title = dto.Title,
                Year = dto.Year,
                Price = dto.Price,
                Genre = dto.Genre,

            };


            var author_name = (from a in db.Authors where a.Name == dto.AuthorName select a.Name).FirstOrDefault();

            if (dto.AuthorName == author_name)
            {
                book.AuthorId = (from a in db.Authors where a.Name == dto.AuthorName select a.Id).FirstOrDefault();
            }
            else
            {
                book.Author = new Author()
                {
                    Name = dto.AuthorName
                };
            }

            db.Books.Add(book);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> DeleteBook(int id)
        {
            Book book = await db.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            await db.SaveChangesAsync();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.Id == id) > 0;
        }
    }
}