using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Covid.Models
{
    public class CovidContext : DbContext
    {
        public CovidContext(DbContextOptions<CovidContext> options)
            : base(options)

        {

        }
        public DbSet<Report> Reports { get; set; } 
    }
}
