using BookApi.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BookApi.Data
{
    public class BookApiContext : IdentityDbContext<ApplicationUser>
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public BookApiContext() : base("name=BookApiContext")
        {
        }

        public static BookApiContext Create()
        {
            return new BookApiContext();
        }

        public System.Data.Entity.DbSet<BookApi.Models.Author> Authors { get; set; }

        public System.Data.Entity.DbSet<BookApi.Models.Book> Books { get; set; }
    }
}
