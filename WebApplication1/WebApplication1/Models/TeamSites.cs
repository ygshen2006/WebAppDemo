﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class TeamSites
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Tile> Tiles { get; set; }
    }
}