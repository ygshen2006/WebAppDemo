using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.SeedWork
{
    public abstract class Entity
    {
        int _Id;
         [Key]
         [Column(Order = 1)] 

        public int Id
        {
            get
            {
                return _Id;
            }
             set
            {
                _Id = value;
            }
        }
        public Entity() { }
        public Entity(int id = default(int))
        {
            this.Id = id;
        }
    }
}
