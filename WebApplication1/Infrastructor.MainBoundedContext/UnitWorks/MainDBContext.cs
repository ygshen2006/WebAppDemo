using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.TeamList;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks;
using Domain.MainBoundedContext.Users;
using Infrastructor.SeedWork;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using Domain.MainBoundedContext.Reports.Logics.Aggregates.Tiles;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Infrastructor.MainBoundedContext.UnitWorks
{
    public partial class MainDBUnitWorkContext : DbContext, IQueryableUnitOfWork
    {
        #region Constructs
        public MainDBUnitWorkContext() : base(ConfigurationManager.ConnectionStrings["MyDBConnectionString"].ConnectionString) { }
        public MainDBUnitWorkContext(string connectionString)
            : base(connectionString)
        {
            //this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = true;

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MainDBUnitWorkContext,
                Infrastructor.MainBoundedContext.Migrations.Configuration>("MyDBConnectionString"));
        }

        #endregion

        #region DataSets
        private IDbSet<Division> _divisions;
        public IDbSet<Division> Divisions
        {
            get { return _divisions ?? base.Set<Division>(); }
        }
        private IDbSet<TeamSite> _teamSites;
        public IDbSet<TeamSite> TeamSites
        {
            get { return _teamSites ?? base.Set<TeamSite>(); }
        }

        private IDbSet<Category> _categories;
        public IDbSet<Category> Categories
        {
            get { return _categories ?? base.Set<Category>(); }
        }

        private IDbSet<UsefulLinks> _usefulLinks;
        public IDbSet<UsefulLinks> UsefulLinks
        {
            get { return _usefulLinks ?? base.Set<UsefulLinks>(); }
        }
        private IDbSet<Tile> _Tiles;
        public IDbSet<Tile> Tiles
        {
            get { return _Tiles ?? base.Set<Tile>(); }
        }

        private IDbSet<User> _users;
        public IDbSet<User> Users
        {
            get { return _users ?? base.Set<User>(); }
        }

        private IDbSet<PersonalInformation> _PersonInformation;
        public IDbSet<PersonalInformation> PersonInformation
        {
            get { return _PersonInformation ?? base.Set<PersonalInformation>(); }
        }
        private IDbSet<Report> _reports;
        public IDbSet<Report> Reports
        {
            get { return _reports ?? base.Set<Report>(); }
        }
        private IDbSet<Tag> _tags;
        public IDbSet<Tag> Tags
        {
            get { return _tags ?? base.Set<Tag>(); }
        }
        private IDbSet<TeamSiteTile> _teamSiteTile;
        public IDbSet<TeamSiteTile> TeamSiteTile
        {
            get { return _teamSiteTile ?? base.Set<TeamSiteTile>(); }
        }
        private IDbSet<Status> _status;
        public IDbSet<Status> Status
        {
            get { return _status ?? base.Set<Status>(); }
        }

        private IDbSet<TileQueryLogic> _tileQueryLogic;
        public IDbSet<TileQueryLogic> TileQueryLogic
        {
            get { return _tileQueryLogic ?? base.Set<TileQueryLogic>(); }
        }
        #endregion
        #region Iquerable
        public IDbSet<TEntity> CreateSet<TEntity>()
           where TEntity : class
        {
            return base.Set<TEntity>();
        }

        public void Attach<TEntity>(TEntity item)
            where TEntity : class
        {
            //Attach and set as unchanged, same as register new
            base.Entry<TEntity>(item).State = System.Data.Entity.EntityState.Unchanged;
        }

        public void SetModified<TEntity>(TEntity item)
            where TEntity : class
        {
            //Register the entity as dirty. This operation attach item in object state manager
            base.Entry<TEntity>(item).State = System.Data.Entity.EntityState.Modified;
        }

        public void ApplyCurrentValues<TEntity>(TEntity original, TEntity current)
            where TEntity : class
        {
            //If it's not attached, attach original and set current values
            base.Entry<TEntity>(original).CurrentValues.SetValues(current);
        }

        public void Commit()
        {
            base.SaveChanges();
        }

        public void CommitAndRefreshChanges()
        {
            bool saveFailed = false;
            do
            {
                try
                {
                    base.SaveChanges();

                    saveFailed = false;
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;

                    ex.Entries.ToList()
                        .ForEach(entry =>
                        {
                            entry.OriginalValues.SetValues(entry.GetDatabaseValues()); ;
                        });
                }
            } while (saveFailed);
        }
        public void RollbackChanges()
        {
            // set all entities in change tracker
            // as 'unchanged state'
            base.ChangeTracker.Entries()
                .ToList()
                .ForEach(entry => entry.State = System.Data.Entity.EntityState.Unchanged);
        }
        #endregion

        #region ISql Members
        public IEnumerable<TEntity> ExecuteQuery<TEntity>(string sqlQuery, params object[] parameters)
        {
            return base.Database.SqlQuery<TEntity>(sqlQuery, parameters);
        }

        public int ExecuteCommand(string sqlCommand,  params object[] parameters)
        {
            return base.Database.ExecuteSqlCommand(sqlCommand, parameters);
        }
        /// <summary>
        /// Get the output value after calling an SP with output parameters
        /// </summary>
        /// <param name="sqlCommand">Sp Name</param>
        /// <param name="outParamNameRequired">Output parameters name such as @jobId</param>
        /// <param name="passedParameters">The parameters passed into SP</param>
        /// <returns>Returns the output Value</returns>
        public IDictionary<string, string> ExecuteCommand(string sqlCommand, string[] outParamNameRequired, IEnumerable<SqlParameter> passedParameters)
        {
            Dictionary<string, string> outPut = new Dictionary<string, string>();
            if (outParamNameRequired == null || outParamNameRequired.Length == 0)
            {
                return null;
            }
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["MyDBConnectionString"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(sqlCommand, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (var param in passedParameters)
                    {
                        cmd.Parameters.Add(param);
                    }

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();

                    foreach (var p in outParamNameRequired)
                    {
                        // Add the output dictionary 
                        outPut.Add(p, passedParameters.First(_ => _.ParameterName == p).Value.ToString());
                    }

                    return outPut;
                }
            }
        }
        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<IdentityUser>().ToTable("Users", "dbo").HasKey<string>(l => l.Id);
            modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityUserClaim>().HasKey<string>(l => l.UserId);

            modelBuilder.Entity<User>().HasMany(_ => _.TeamsOwn)
                .WithMany(_ => _.TeamOwners)
                .Map(_ =>
                {
                    _.ToTable("UserTeams");
                    _.MapLeftKey("TeamId");
                    _.MapRightKey("UserId");
                }
                );

            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });

            modelBuilder.Entity<Report>().HasMany(r=>r.Tags)
                .WithMany(t => t.Reports).Map(m => { m.ToTable("ReportTags"); m.MapLeftKey("ReportId"); m.MapRightKey("TagId"); });

            modelBuilder.Entity<Report>().HasMany(r => r.Catagories)
                .WithMany(t => t.Reports).Map(m => { m.ToTable("ReportCategories"); m.MapLeftKey("ReportId"); m.MapRightKey("CategoryId"); });

            modelBuilder.Entity<UsefulLinks>().
                HasOptional(_ => _.ParentUsefulLink).
                WithMany(_ => _.Childs).
                HasForeignKey(_ => _.ParentId).
                WillCascadeOnDelete(false);

            modelBuilder.Entity<Segment>()
                .HasOptional(_ => _.Divsion).
              WithMany(_ => _.Segements).
              HasForeignKey(_ => _.DivisionId).
              WillCascadeOnDelete(true);

            modelBuilder.Entity<Segment>().
              HasOptional(_ => _.ParentSegement).
              WithMany(_ => _.ChildSegements).
              HasForeignKey(_ => _.ParentId).
              WillCascadeOnDelete(false);

            modelBuilder.Entity<TeamSite>().
              HasOptional(_ => _.Segment).
              WithMany(_ => _.Teamsites).
              HasForeignKey(_ => _.SegmentId).
              WillCascadeOnDelete(false);

            modelBuilder.Entity<Category>()
                .HasOptional(_ => _.ParentCategory)
                .WithMany(_ => _.ChildCategory)
                .HasForeignKey(_ => _.CategoryParentId);

            // Tile and Team is a one to many logic
            //modelBuilder.Entity<Tile>()
            //    .HasOptional(_ => _.OwnerTeamSite).
            //    WithMany(_ => _.Tiles).
            //    HasForeignKey(_ => _.OwnerTeamSiteId).
            //    WillCascadeOnDelete(false);

            modelBuilder.Entity<Tile>().ToTable("Tiles");
        }
    }
}
