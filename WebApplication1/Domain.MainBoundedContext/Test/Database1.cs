

// This file was automatically generated.
// Do not make changes directly to this file - edit the template instead.
// 
// The following connection settings were used to generate this file
// 
//     Configuration file:     "WebApplication1\Web.config"
//     Connection String Name: "MyDBConnectionString"
//     Connection String:      "Data Source=.;Initial Catalog=MYDB2;Integrated Security=True;MultipleActiveResultSets=true"

// ReSharper disable RedundantUsingDirective
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable RedundantNameQualifier

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Linq.Expressions;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
//using DatabaseGeneratedOption = System.ComponentModel.DataAnnotations.DatabaseGeneratedOption;

namespace Domain.MainBoundedContext.Test
{
    // ************************************************************************
    // Unit of work
    public interface IMyDbContext : IDisposable
    {
        IDbSet<Category> Categories { get; set; } // Categories
        IDbSet<Division> Divisions { get; set; } // Divisions
        IDbSet<IdentityRole> IdentityRoles { get; set; } // IdentityRoles
        IDbSet<IdentityUserClaim> IdentityUserClaims { get; set; } // IdentityUserClaims
        IDbSet<IdentityUserLogin> IdentityUserLogins { get; set; } // IdentityUserLogins
        IDbSet<IdentityUserRole> IdentityUserRoles { get; set; } // IdentityUserRoles
        IDbSet<PersonalInformation> PersonalInformations { get; set; } // PersonalInformations
        IDbSet<Report> Reports { get; set; } // Reports
        IDbSet<ReportType> ReportTypes { get; set; } // ReportTypes
        IDbSet<Segment> Segments { get; set; } // Segments
        IDbSet<Status> Status { get; set; } // Status
        IDbSet<Tag> Tags { get; set; } // Tags
        IDbSet<TeamSite> TeamSites { get; set; } // TeamSites
        IDbSet<TeamSiteTile> TeamSiteTiles { get; set; } // TeamSiteTiles
        IDbSet<Tile> Tiles { get; set; } // Tiles
        IDbSet<UsefulLink> UsefulLinks { get; set; } // UsefulLinks
        IDbSet<User> Users { get; set; } // Users

        int SaveChanges();
    }

    // ************************************************************************
    // Database context
    public class MyDbContext : DbContext, IMyDbContext
    {
        public IDbSet<Category> Categories { get; set; } // Categories
        public IDbSet<Division> Divisions { get; set; } // Divisions
        public IDbSet<IdentityRole> IdentityRoles { get; set; } // IdentityRoles
        public IDbSet<IdentityUserClaim> IdentityUserClaims { get; set; } // IdentityUserClaims
        public IDbSet<IdentityUserLogin> IdentityUserLogins { get; set; } // IdentityUserLogins
        public IDbSet<IdentityUserRole> IdentityUserRoles { get; set; } // IdentityUserRoles
        public IDbSet<PersonalInformation> PersonalInformations { get; set; } // PersonalInformations
        public IDbSet<Report> Reports { get; set; } // Reports
        public IDbSet<ReportType> ReportTypes { get; set; } // ReportTypes
        public IDbSet<Segment> Segments { get; set; } // Segments
        public IDbSet<Status> Status { get; set; } // Status
        public IDbSet<Tag> Tags { get; set; } // Tags
        public IDbSet<TeamSite> TeamSites { get; set; } // TeamSites
        public IDbSet<TeamSiteTile> TeamSiteTiles { get; set; } // TeamSiteTiles
        public IDbSet<Tile> Tiles { get; set; } // Tiles
        public IDbSet<UsefulLink> UsefulLinks { get; set; } // UsefulLinks
        public IDbSet<User> Users { get; set; } // Users

        static MyDbContext()
        {
            Database.SetInitializer<MyDbContext>(null);
        }

        public MyDbContext()
            : base("Name=MyDBConnectionString")
        {
        }

        public MyDbContext(string connectionString) : base(connectionString)
        {
        }

        public MyDbContext(string connectionString, System.Data.Entity.Infrastructure.DbCompiledModel model) : base(connectionString, model)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new CategoryConfiguration());
            modelBuilder.Configurations.Add(new DivisionConfiguration());
            modelBuilder.Configurations.Add(new IdentityRoleConfiguration());
            modelBuilder.Configurations.Add(new IdentityUserClaimConfiguration());
            modelBuilder.Configurations.Add(new IdentityUserLoginConfiguration());
            modelBuilder.Configurations.Add(new IdentityUserRoleConfiguration());
            modelBuilder.Configurations.Add(new PersonalInformationConfiguration());
            modelBuilder.Configurations.Add(new ReportConfiguration());
            modelBuilder.Configurations.Add(new ReportTypeConfiguration());
            modelBuilder.Configurations.Add(new SegmentConfiguration());
            modelBuilder.Configurations.Add(new StatusConfiguration());
            modelBuilder.Configurations.Add(new TagConfiguration());
            modelBuilder.Configurations.Add(new TeamSiteConfiguration());
            modelBuilder.Configurations.Add(new TeamSiteTileConfiguration());
            modelBuilder.Configurations.Add(new TileConfiguration());
            modelBuilder.Configurations.Add(new UsefulLinkConfiguration());
            modelBuilder.Configurations.Add(new UserConfiguration());
        }

        public static DbModelBuilder CreateModel(DbModelBuilder modelBuilder, string schema)
        {
            modelBuilder.Configurations.Add(new CategoryConfiguration(schema));
            modelBuilder.Configurations.Add(new DivisionConfiguration(schema));
            modelBuilder.Configurations.Add(new IdentityRoleConfiguration(schema));
            modelBuilder.Configurations.Add(new IdentityUserClaimConfiguration(schema));
            modelBuilder.Configurations.Add(new IdentityUserLoginConfiguration(schema));
            modelBuilder.Configurations.Add(new IdentityUserRoleConfiguration(schema));
            modelBuilder.Configurations.Add(new PersonalInformationConfiguration(schema));
            modelBuilder.Configurations.Add(new ReportConfiguration(schema));
            modelBuilder.Configurations.Add(new ReportTypeConfiguration(schema));
            modelBuilder.Configurations.Add(new SegmentConfiguration(schema));
            modelBuilder.Configurations.Add(new StatusConfiguration(schema));
            modelBuilder.Configurations.Add(new TagConfiguration(schema));
            modelBuilder.Configurations.Add(new TeamSiteConfiguration(schema));
            modelBuilder.Configurations.Add(new TeamSiteTileConfiguration(schema));
            modelBuilder.Configurations.Add(new TileConfiguration(schema));
            modelBuilder.Configurations.Add(new UsefulLinkConfiguration(schema));
            modelBuilder.Configurations.Add(new UserConfiguration(schema));
            return modelBuilder;
        }
    }

    // ************************************************************************
    // Fake Database context
    public class FakeMyDbContext : IMyDbContext
    {
        public IDbSet<Category> Categories { get; set; }
        public IDbSet<Division> Divisions { get; set; }
        public IDbSet<IdentityRole> IdentityRoles { get; set; }
        public IDbSet<IdentityUserClaim> IdentityUserClaims { get; set; }
        public IDbSet<IdentityUserLogin> IdentityUserLogins { get; set; }
        public IDbSet<IdentityUserRole> IdentityUserRoles { get; set; }
        public IDbSet<PersonalInformation> PersonalInformations { get; set; }
        public IDbSet<Report> Reports { get; set; }
        public IDbSet<ReportType> ReportTypes { get; set; }
        public IDbSet<Segment> Segments { get; set; }
        public IDbSet<Status> Status { get; set; }
        public IDbSet<Tag> Tags { get; set; }
        public IDbSet<TeamSite> TeamSites { get; set; }
        public IDbSet<TeamSiteTile> TeamSiteTiles { get; set; }
        public IDbSet<Tile> Tiles { get; set; }
        public IDbSet<UsefulLink> UsefulLinks { get; set; }
        public IDbSet<User> Users { get; set; }

        public FakeMyDbContext()
        {
            Categories = new FakeDbSet<Category>();
            Divisions = new FakeDbSet<Division>();
            IdentityRoles = new FakeDbSet<IdentityRole>();
            IdentityUserClaims = new FakeDbSet<IdentityUserClaim>();
            IdentityUserLogins = new FakeDbSet<IdentityUserLogin>();
            IdentityUserRoles = new FakeDbSet<IdentityUserRole>();
            PersonalInformations = new FakeDbSet<PersonalInformation>();
            Reports = new FakeDbSet<Report>();
            ReportTypes = new FakeDbSet<ReportType>();
            Segments = new FakeDbSet<Segment>();
            Status = new FakeDbSet<Status>();
            Tags = new FakeDbSet<Tag>();
            TeamSites = new FakeDbSet<TeamSite>();
            TeamSiteTiles = new FakeDbSet<TeamSiteTile>();
            Tiles = new FakeDbSet<Tile>();
            UsefulLinks = new FakeDbSet<UsefulLink>();
            Users = new FakeDbSet<User>();
        }

        public int SaveChanges()
        {
            return 0;
        }

        public void Dispose()
        {
            throw new NotImplementedException(); 
        }
    }

    // ************************************************************************
    // Fake DbSet
    public class FakeDbSet<T> : IDbSet<T> where T : class
    {
        private readonly HashSet<T> _data;

        public FakeDbSet()
        {
            _data = new HashSet<T>();
        }

        public virtual T Find(params object[] keyValues)
        {
            throw new NotImplementedException();
        }

        public T Add(T item)
        {
            _data.Add(item);
            return item;
        }

        public T Remove(T item)
        {
            _data.Remove(item);
            return item;
        }

        public T Attach(T item)
        {
            _data.Add(item);
            return item;
        }

        public void Detach(T item)
        {
            _data.Remove(item);
        }

        Type IQueryable.ElementType
        {
            get { return _data.AsQueryable().ElementType; }
        }

        Expression IQueryable.Expression
        {
            get { return _data.AsQueryable().Expression; }
        }

        IQueryProvider IQueryable.Provider
        {
            get { return _data.AsQueryable().Provider; }
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return _data.GetEnumerator();
        }

        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            return _data.GetEnumerator();
        }

        public T Create()
        {
            return Activator.CreateInstance<T>();
        }

        public ObservableCollection<T> Local
        {
            get
            {
                return new ObservableCollection<T>(_data);
            }
        }

        public TDerivedEntity Create<TDerivedEntity>() where TDerivedEntity : class, T
        {
            return Activator.CreateInstance<TDerivedEntity>();
        }
    }

    // ************************************************************************
    // POCO classes

    // Categories
    public class Category
    {
        public int Id { get; set; } // Id (Primary key)
        public string Name { get; set; } // Name
        public int? CategoryParentId { get; set; } // CategoryParentId

        // Reverse navigation
        public virtual ICollection<Category> Categories { get; set; } // Categories.FK_dbo.Categories_dbo.Categories_CategoryParentId
        public virtual ICollection<Report> Reports { get; set; } // Many to many mapping

        // Foreign keys
        public virtual Category Category_CategoryParentId { get; set; } // FK_dbo.Categories_dbo.Categories_CategoryParentId

        public Category()
        {
            Categories = new List<Category>();
            Reports = new List<Report>();
        }
    }

    // Divisions
    public class Division
    {
        public int Id { get; set; } // Id (Primary key)
        public Guid DivisionGuid { get; set; } // DivisionGuid
        public string Name { get; set; } // Name

        // Reverse navigation
        public virtual ICollection<Segment> Segments { get; set; } // Segments.FK_dbo.Segments_dbo.Divisions_DivisionId

        public Division()
        {
            Segments = new List<Segment>();
        }
    }

    // IdentityRoles
    public class IdentityRole
    {
        public string Id { get; set; } // Id (Primary key)
        public string Name { get; set; } // Name

        // Reverse navigation
        public virtual ICollection<IdentityUserRole> IdentityUserRoles { get; set; } // IdentityUserRoles.FK_dbo.IdentityUserRoles_dbo.IdentityRoles_IdentityRole_Id

        public IdentityRole()
        {
            IdentityUserRoles = new List<IdentityUserRole>();
        }
    }

    // IdentityUserClaims
    public class IdentityUserClaim
    {
        public string UserId { get; set; } // UserId (Primary key)
        public int Id { get; set; } // Id
        public string ClaimType { get; set; } // ClaimType
        public string ClaimValue { get; set; } // ClaimValue
        public string IdentityUserId { get; set; } // IdentityUser_Id

        // Foreign keys
        public virtual User User { get; set; } // FK_dbo.IdentityUserClaims_dbo.Users_IdentityUser_Id
    }

    // IdentityUserLogins
    public class IdentityUserLogin
    {
        public string UserId { get; set; } // UserId (Primary key)
        public string LoginProvider { get; set; } // LoginProvider
        public string ProviderKey { get; set; } // ProviderKey
        public string IdentityUserId { get; set; } // IdentityUser_Id

        // Foreign keys
        public virtual User User { get; set; } // FK_dbo.IdentityUserLogins_dbo.Users_IdentityUser_Id
    }

    // IdentityUserRoles
    public class IdentityUserRole
    {
        public string RoleId { get; set; } // RoleId (Primary key)
        public string UserId { get; set; } // UserId (Primary key)
        public string IdentityUserId { get; set; } // IdentityUser_Id
        public string IdentityRoleId { get; set; } // IdentityRole_Id

        // Foreign keys
        public virtual IdentityRole IdentityRole { get; set; } // FK_dbo.IdentityUserRoles_dbo.IdentityRoles_IdentityRole_Id
        public virtual User User { get; set; } // FK_dbo.IdentityUserRoles_dbo.Users_IdentityUser_Id
    }

    // PersonalInformations
    public class PersonalInformation
    {
        public int Id { get; set; } // Id (Primary key)
        public DateTime BirthDay { get; set; } // BirthDay
        public string FromProvince { get; set; } // From_Province
        public string FromCity { get; set; } // From_City
        public string FromDistrict { get; set; } // From_District
        public string LiveInProvince { get; set; } // LiveIn_Province
        public string LiveInCity { get; set; } // LiveIn_City
        public string LiveInDistrict { get; set; } // LiveIn_District
        public string FavoratesFavorateMusic { get; set; } // Favorates_FavorateMusic
        public string FavoratesFavorateBook { get; set; } // Favorates_FavorateBook
        public string FavoratesFavoratePeople { get; set; } // Favorates_FavoratePeople
        public string FavoratesFavorateSports { get; set; } // Favorates_FavorateSports
        public string FavoratesFavorateFilms { get; set; } // Favorates_FavorateFilms
        public string FavoratesFavorateBrands { get; set; } // Favorates_FavorateBrands
        public string FavoratesFavorateOthers { get; set; } // Favorates_FavorateOthers
        public string BloodStyle { get; set; } // BloodStyle
        public string PersonnalDescription { get; set; } // PersonnalDescription
        public string UserId { get; set; } // UserId

        // Foreign keys
        public virtual User User { get; set; } // FK_dbo.PersonalInformations_dbo.Users_UserId
    }

    // Reports
    public class Report
    {
        public int Id { get; set; } // Id (Primary key)
        public int? ReportStatusId { get; set; } // ReportStatus_Id
        public int? ReportTypeId { get; set; } // ReportType_Id
        public int? TeamSiteId { get; set; } // TeamSite_Id

        // Reverse navigation
        public virtual ICollection<Category> Categories { get; set; } // Many to many mapping
        public virtual ICollection<Tag> Tags { get; set; } // Many to many mapping

        // Foreign keys
        public virtual ReportType ReportType { get; set; } // FK_dbo.Reports_dbo.ReportTypes_ReportType_Id
        public virtual Status Status { get; set; } // FK_dbo.Reports_dbo.Status_ReportStatus_Id
        public virtual TeamSite TeamSite { get; set; } // FK_dbo.Reports_dbo.TeamSites_TeamSite_Id

        public Report()
        {
            Categories = new List<Category>();
            Tags = new List<Tag>();
        }
    }

    // ReportTypes
    public class ReportType
    {
        public int Id { get; set; } // Id (Primary key)

        // Reverse navigation
        public virtual ICollection<Report> Reports { get; set; } // Reports.FK_dbo.Reports_dbo.ReportTypes_ReportType_Id

        public ReportType()
        {
            Reports = new List<Report>();
        }
    }

    // Segments
    public class Segment
    {
        public int Id { get; set; } // Id (Primary key)
        public string Name { get; set; } // Name
        public Guid SegmentGuid { get; set; } // SegmentGuid
        public int? DivisionId { get; set; } // DivisionId
        public int? ParentId { get; set; } // ParentId

        // Reverse navigation
        public virtual ICollection<Segment> Segments { get; set; } // Segments.FK_dbo.Segments_dbo.Segments_ParentId
        public virtual ICollection<TeamSite> TeamSites { get; set; } // TeamSites.FK_dbo.TeamSites_dbo.Segments_SegmentId

        // Foreign keys
        public virtual Division Division { get; set; } // FK_dbo.Segments_dbo.Divisions_DivisionId
        public virtual Segment Segment_ParentId { get; set; } // FK_dbo.Segments_dbo.Segments_ParentId

        public Segment()
        {
            Segments = new List<Segment>();
            TeamSites = new List<TeamSite>();
        }
    }

    // Status
    public class Status
    {
        public int Id { get; set; } // Id (Primary key)

        // Reverse navigation
        public virtual ICollection<Report> Reports { get; set; } // Reports.FK_dbo.Reports_dbo.Status_ReportStatus_Id

        public Status()
        {
            Reports = new List<Report>();
        }
    }

    // Tags
    public class Tag
    {
        public int Id { get; set; } // Id (Primary key)
        public string TagName { get; set; } // TagName
        public int TeamSiteId { get; set; } // TeamSiteId

        // Reverse navigation
        public virtual ICollection<Report> Reports { get; set; } // Many to many mapping

        // Foreign keys
        public virtual TeamSite TeamSite { get; set; } // FK_dbo.Tags_dbo.TeamSites_TeamSiteId

        public Tag()
        {
            Reports = new List<Report>();
        }
    }

    // TeamSites
    public class TeamSite
    {
        public int Id { get; set; } // Id (Primary key)
        public Guid TeamGuid { get; set; } // TeamGuid
        public string TeamName { get; set; } // TeamName
        public string TeamDescription { get; set; } // TeamDescription
        public string TeamLogo { get; set; } // TeamLogo
        public DateTime CreatedDateTime { get; set; } // CreatedDateTime
        public int? SegmentId { get; set; } // SegmentId

        // Reverse navigation
        public virtual ICollection<Report> Reports { get; set; } // Reports.FK_dbo.Reports_dbo.TeamSites_TeamSite_Id
        public virtual ICollection<Tag> Tags { get; set; } // Tags.FK_dbo.Tags_dbo.TeamSites_TeamSiteId
        public virtual ICollection<Tile> Tiles { get; set; } // Tiles.FK_dbo.Tiles_dbo.TeamSites_OwnerTeamSiteId
        public virtual ICollection<User> Users { get; set; } // Many to many mapping

        // Foreign keys
        public virtual Segment Segment { get; set; } // FK_dbo.TeamSites_dbo.Segments_SegmentId

        public TeamSite()
        {
            Reports = new List<Report>();
            Tags = new List<Tag>();
            Tiles = new List<Tile>();
            Users = new List<User>();
        }
    }

    // TeamSiteTiles
    public class TeamSiteTile
    {
        public int Id { get; set; } // Id (Primary key)
        public string Title { get; set; } // Title
    }

    // Tiles
    public class Tile
    {
        public int Id { get; set; } // Id (Primary key)
        public string Title { get; set; } // Title
        public int RowNumber { get; set; } // RowNumber
        public bool IsCustomized { get; set; } // IsCustomized
        public int? OwnerTeamSiteId { get; set; } // OwnerTeamSiteId
        public int TileType { get; set; } // TileType
        public int? SystemDefinedTile { get; set; } // SystemDefinedTile

        // Foreign keys
        public virtual TeamSite TeamSite { get; set; } // FK_dbo.Tiles_dbo.TeamSites_OwnerTeamSiteId
    }

    // UsefulLinks
    public class UsefulLink
    {
        public int Id { get; set; } // Id (Primary key)
        public int? ParentId { get; set; } // ParentId
        public string LinkName { get; set; } // LinkName
        public string Url { get; set; } // URL

        // Reverse navigation
        public virtual ICollection<UsefulLink> UsefulLinks { get; set; } // UsefulLinks.FK_dbo.UsefulLinks_dbo.UsefulLinks_ParentId

        // Foreign keys
        public virtual UsefulLink UsefulLink_ParentId { get; set; } // FK_dbo.UsefulLinks_dbo.UsefulLinks_ParentId

        public UsefulLink()
        {
            UsefulLinks = new List<UsefulLink>();
        }
    }

    // Users
    public class User
    {
        public string Id { get; set; } // Id (Primary key)
        public string Email { get; set; } // Email
        public bool EmailConfirmed { get; set; } // EmailConfirmed
        public string PasswordHash { get; set; } // PasswordHash
        public string SecurityStamp { get; set; } // SecurityStamp
        public string PhoneNumber { get; set; } // PhoneNumber
        public bool PhoneNumberConfirmed { get; set; } // PhoneNumberConfirmed
        public bool TwoFactorEnabled { get; set; } // TwoFactorEnabled
        public DateTime? LockoutEndDateUtc { get; set; } // LockoutEndDateUtc
        public bool LockoutEnabled { get; set; } // LockoutEnabled
        public int AccessFailedCount { get; set; } // AccessFailedCount
        public string UserName { get; set; } // UserName
        public bool? Sex { get; set; } // Sex
        public string HeadPhoto { get; set; } // HeadPhoto
        public string Discriminator { get; set; } // Discriminator

        // Reverse navigation
        public virtual ICollection<IdentityUserClaim> IdentityUserClaims { get; set; } // IdentityUserClaims.FK_dbo.IdentityUserClaims_dbo.Users_IdentityUser_Id
        public virtual ICollection<IdentityUserLogin> IdentityUserLogins { get; set; } // IdentityUserLogins.FK_dbo.IdentityUserLogins_dbo.Users_IdentityUser_Id
        public virtual ICollection<IdentityUserRole> IdentityUserRoles { get; set; } // IdentityUserRoles.FK_dbo.IdentityUserRoles_dbo.Users_IdentityUser_Id
        public virtual ICollection<PersonalInformation> PersonalInformations { get; set; } // PersonalInformations.FK_dbo.PersonalInformations_dbo.Users_UserId
        public virtual ICollection<TeamSite> TeamSites { get; set; } // Many to many mapping

        public User()
        {
            IdentityUserClaims = new List<IdentityUserClaim>();
            IdentityUserLogins = new List<IdentityUserLogin>();
            IdentityUserRoles = new List<IdentityUserRole>();
            PersonalInformations = new List<PersonalInformation>();
            TeamSites = new List<TeamSite>();
        }
    }


    // ************************************************************************
    // POCO Configuration

    // Categories
    internal class CategoryConfiguration : EntityTypeConfiguration<Category>
    {
        public CategoryConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Categories");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.Name).HasColumnName("Name").IsOptional();
            Property(x => x.CategoryParentId).HasColumnName("CategoryParentId").IsOptional();

            // Foreign keys
            HasOptional(a => a.Category_CategoryParentId).WithMany(b => b.Categories).HasForeignKey(c => c.CategoryParentId); // FK_dbo.Categories_dbo.Categories_CategoryParentId
            HasMany(t => t.Reports).WithMany(t => t.Categories).Map(m => 
            {
                m.ToTable("ReportCategories", schema);
                m.MapLeftKey("CategoryId");
                m.MapRightKey("ReportId");
            });
        }
    }

    // Divisions
    internal class DivisionConfiguration : EntityTypeConfiguration<Division>
    {
        public DivisionConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Divisions");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.DivisionGuid).HasColumnName("DivisionGuid").IsRequired();
            Property(x => x.Name).HasColumnName("Name").IsOptional();
        }
    }

    // IdentityRoles
    internal class IdentityRoleConfiguration : EntityTypeConfiguration<IdentityRole>
    {
        public IdentityRoleConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".IdentityRoles");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasMaxLength(128).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            Property(x => x.Name).HasColumnName("Name").IsOptional();
        }
    }

    // IdentityUserClaims
    internal class IdentityUserClaimConfiguration : EntityTypeConfiguration<IdentityUserClaim>
    {
        public IdentityUserClaimConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".IdentityUserClaims");
            HasKey(x => x.UserId);

            Property(x => x.UserId).HasColumnName("UserId").IsRequired().HasMaxLength(128).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            Property(x => x.Id).HasColumnName("Id").IsRequired();
            Property(x => x.ClaimType).HasColumnName("ClaimType").IsOptional();
            Property(x => x.ClaimValue).HasColumnName("ClaimValue").IsOptional();
            Property(x => x.IdentityUserId).HasColumnName("IdentityUser_Id").IsOptional().HasMaxLength(128);

            // Foreign keys
            HasOptional(a => a.User).WithMany(b => b.IdentityUserClaims).HasForeignKey(c => c.IdentityUserId); // FK_dbo.IdentityUserClaims_dbo.Users_IdentityUser_Id
        }
    }

    // IdentityUserLogins
    internal class IdentityUserLoginConfiguration : EntityTypeConfiguration<IdentityUserLogin>
    {
        public IdentityUserLoginConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".IdentityUserLogins");
            HasKey(x => x.UserId);

            Property(x => x.UserId).HasColumnName("UserId").IsRequired().HasMaxLength(128).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            Property(x => x.LoginProvider).HasColumnName("LoginProvider").IsOptional();
            Property(x => x.ProviderKey).HasColumnName("ProviderKey").IsOptional();
            Property(x => x.IdentityUserId).HasColumnName("IdentityUser_Id").IsOptional().HasMaxLength(128);

            // Foreign keys
            HasOptional(a => a.User).WithMany(b => b.IdentityUserLogins).HasForeignKey(c => c.IdentityUserId); // FK_dbo.IdentityUserLogins_dbo.Users_IdentityUser_Id
        }
    }

    // IdentityUserRoles
    internal class IdentityUserRoleConfiguration : EntityTypeConfiguration<IdentityUserRole>
    {
        public IdentityUserRoleConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".IdentityUserRoles");
            HasKey(x => new { x.RoleId, x.UserId });

            Property(x => x.RoleId).HasColumnName("RoleId").IsRequired().HasMaxLength(128).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            Property(x => x.UserId).HasColumnName("UserId").IsRequired().HasMaxLength(128).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            Property(x => x.IdentityUserId).HasColumnName("IdentityUser_Id").IsOptional().HasMaxLength(128);
            Property(x => x.IdentityRoleId).HasColumnName("IdentityRole_Id").IsOptional().HasMaxLength(128);

            // Foreign keys
            HasOptional(a => a.User).WithMany(b => b.IdentityUserRoles).HasForeignKey(c => c.IdentityUserId); // FK_dbo.IdentityUserRoles_dbo.Users_IdentityUser_Id
            HasOptional(a => a.IdentityRole).WithMany(b => b.IdentityUserRoles).HasForeignKey(c => c.IdentityRoleId); // FK_dbo.IdentityUserRoles_dbo.IdentityRoles_IdentityRole_Id
        }
    }

    // PersonalInformations
    internal class PersonalInformationConfiguration : EntityTypeConfiguration<PersonalInformation>
    {
        public PersonalInformationConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".PersonalInformations");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.BirthDay).HasColumnName("BirthDay").IsRequired();
            Property(x => x.FromProvince).HasColumnName("From_Province").IsOptional();
            Property(x => x.FromCity).HasColumnName("From_City").IsOptional();
            Property(x => x.FromDistrict).HasColumnName("From_District").IsOptional();
            Property(x => x.LiveInProvince).HasColumnName("LiveIn_Province").IsOptional();
            Property(x => x.LiveInCity).HasColumnName("LiveIn_City").IsOptional();
            Property(x => x.LiveInDistrict).HasColumnName("LiveIn_District").IsOptional();
            Property(x => x.FavoratesFavorateMusic).HasColumnName("Favorates_FavorateMusic").IsOptional();
            Property(x => x.FavoratesFavorateBook).HasColumnName("Favorates_FavorateBook").IsOptional();
            Property(x => x.FavoratesFavoratePeople).HasColumnName("Favorates_FavoratePeople").IsOptional();
            Property(x => x.FavoratesFavorateSports).HasColumnName("Favorates_FavorateSports").IsOptional();
            Property(x => x.FavoratesFavorateFilms).HasColumnName("Favorates_FavorateFilms").IsOptional();
            Property(x => x.FavoratesFavorateBrands).HasColumnName("Favorates_FavorateBrands").IsOptional();
            Property(x => x.FavoratesFavorateOthers).HasColumnName("Favorates_FavorateOthers").IsOptional();
            Property(x => x.BloodStyle).HasColumnName("BloodStyle").IsOptional();
            Property(x => x.PersonnalDescription).HasColumnName("PersonnalDescription").IsOptional();
            Property(x => x.UserId).HasColumnName("UserId").IsOptional().HasMaxLength(128);

            // Foreign keys
            HasOptional(a => a.User).WithMany(b => b.PersonalInformations).HasForeignKey(c => c.UserId); // FK_dbo.PersonalInformations_dbo.Users_UserId
        }
    }

    // Reports
    internal class ReportConfiguration : EntityTypeConfiguration<Report>
    {
        public ReportConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Reports");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.ReportStatusId).HasColumnName("ReportStatus_Id").IsOptional();
            Property(x => x.ReportTypeId).HasColumnName("ReportType_Id").IsOptional();
            Property(x => x.TeamSiteId).HasColumnName("TeamSite_Id").IsOptional();

            // Foreign keys
            HasOptional(a => a.Status).WithMany(b => b.Reports).HasForeignKey(c => c.ReportStatusId); // FK_dbo.Reports_dbo.Status_ReportStatus_Id
            HasOptional(a => a.ReportType).WithMany(b => b.Reports).HasForeignKey(c => c.ReportTypeId); // FK_dbo.Reports_dbo.ReportTypes_ReportType_Id
            HasOptional(a => a.TeamSite).WithMany(b => b.Reports).HasForeignKey(c => c.TeamSiteId); // FK_dbo.Reports_dbo.TeamSites_TeamSite_Id
            HasMany(t => t.Tags).WithMany(t => t.Reports).Map(m => 
            {
                m.ToTable("ReportTags", schema);
                m.MapLeftKey("ReportId");
                m.MapRightKey("TagId");
            });
        }
    }

    // ReportTypes
    internal class ReportTypeConfiguration : EntityTypeConfiguration<ReportType>
    {
        public ReportTypeConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".ReportTypes");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    // Segments
    internal class SegmentConfiguration : EntityTypeConfiguration<Segment>
    {
        public SegmentConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Segments");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.Name).HasColumnName("Name").IsOptional();
            Property(x => x.SegmentGuid).HasColumnName("SegmentGuid").IsRequired();
            Property(x => x.DivisionId).HasColumnName("DivisionId").IsOptional();
            Property(x => x.ParentId).HasColumnName("ParentId").IsOptional();

            // Foreign keys
            HasOptional(a => a.Division).WithMany(b => b.Segments).HasForeignKey(c => c.DivisionId); // FK_dbo.Segments_dbo.Divisions_DivisionId
            HasOptional(a => a.Segment_ParentId).WithMany(b => b.Segments).HasForeignKey(c => c.ParentId); // FK_dbo.Segments_dbo.Segments_ParentId
        }
    }

    // Status
    internal class StatusConfiguration : EntityTypeConfiguration<Status>
    {
        public StatusConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Status");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }

    // Tags
    internal class TagConfiguration : EntityTypeConfiguration<Tag>
    {
        public TagConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Tags");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.TagName).HasColumnName("TagName").IsRequired().HasMaxLength(50);
            Property(x => x.TeamSiteId).HasColumnName("TeamSiteId").IsRequired();

            // Foreign keys
            HasRequired(a => a.TeamSite).WithMany(b => b.Tags).HasForeignKey(c => c.TeamSiteId); // FK_dbo.Tags_dbo.TeamSites_TeamSiteId
        }
    }

    // TeamSites
    internal class TeamSiteConfiguration : EntityTypeConfiguration<TeamSite>
    {
        public TeamSiteConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".TeamSites");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.TeamGuid).HasColumnName("TeamGuid").IsRequired();
            Property(x => x.TeamName).HasColumnName("TeamName").IsRequired().HasMaxLength(50);
            Property(x => x.TeamDescription).HasColumnName("TeamDescription").IsRequired();
            Property(x => x.TeamLogo).HasColumnName("TeamLogo").IsOptional();
            Property(x => x.CreatedDateTime).HasColumnName("CreatedDateTime").IsRequired();
            Property(x => x.SegmentId).HasColumnName("SegmentId").IsOptional();

            // Foreign keys
            HasOptional(a => a.Segment).WithMany(b => b.TeamSites).HasForeignKey(c => c.SegmentId); // FK_dbo.TeamSites_dbo.Segments_SegmentId
        }
    }

    // TeamSiteTiles
    internal class TeamSiteTileConfiguration : EntityTypeConfiguration<TeamSiteTile>
    {
        public TeamSiteTileConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".TeamSiteTiles");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.Title).HasColumnName("Title").IsOptional();
        }
    }

    // Tiles
    internal class TileConfiguration : EntityTypeConfiguration<Tile>
    {
        public TileConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Tiles");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.Title).HasColumnName("Title").IsRequired().HasMaxLength(50);
            Property(x => x.RowNumber).HasColumnName("RowNumber").IsRequired();
            Property(x => x.IsCustomized).HasColumnName("IsCustomized").IsRequired();
            Property(x => x.OwnerTeamSiteId).HasColumnName("OwnerTeamSiteId").IsOptional();
            Property(x => x.TileType).HasColumnName("TileType").IsRequired();
            Property(x => x.SystemDefinedTile).HasColumnName("SystemDefinedTile").IsOptional();

            // Foreign keys
            HasOptional(a => a.TeamSite).WithMany(b => b.Tiles).HasForeignKey(c => c.OwnerTeamSiteId); // FK_dbo.Tiles_dbo.TeamSites_OwnerTeamSiteId
        }
    }

    // UsefulLinks
    internal class UsefulLinkConfiguration : EntityTypeConfiguration<UsefulLink>
    {
        public UsefulLinkConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".UsefulLinks");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.ParentId).HasColumnName("ParentId").IsOptional();
            Property(x => x.LinkName).HasColumnName("LinkName").IsOptional();
            Property(x => x.Url).HasColumnName("URL").IsOptional();

            // Foreign keys
            HasOptional(a => a.UsefulLink_ParentId).WithMany(b => b.UsefulLinks).HasForeignKey(c => c.ParentId); // FK_dbo.UsefulLinks_dbo.UsefulLinks_ParentId
        }
    }

    // Users
    internal class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".Users");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName("Id").IsRequired().HasMaxLength(128).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            Property(x => x.Email).HasColumnName("Email").IsOptional();
            Property(x => x.EmailConfirmed).HasColumnName("EmailConfirmed").IsRequired();
            Property(x => x.PasswordHash).HasColumnName("PasswordHash").IsOptional();
            Property(x => x.SecurityStamp).HasColumnName("SecurityStamp").IsOptional();
            Property(x => x.PhoneNumber).HasColumnName("PhoneNumber").IsOptional();
            Property(x => x.PhoneNumberConfirmed).HasColumnName("PhoneNumberConfirmed").IsRequired();
            Property(x => x.TwoFactorEnabled).HasColumnName("TwoFactorEnabled").IsRequired();
            Property(x => x.LockoutEndDateUtc).HasColumnName("LockoutEndDateUtc").IsOptional();
            Property(x => x.LockoutEnabled).HasColumnName("LockoutEnabled").IsRequired();
            Property(x => x.AccessFailedCount).HasColumnName("AccessFailedCount").IsRequired();
            Property(x => x.UserName).HasColumnName("UserName").IsOptional();
            Property(x => x.Sex).HasColumnName("Sex").IsOptional();
            Property(x => x.HeadPhoto).HasColumnName("HeadPhoto").IsOptional();
            Property(x => x.Discriminator).HasColumnName("Discriminator").IsRequired().HasMaxLength(128);
            HasMany(t => t.TeamSites).WithMany(t => t.Users).Map(m => 
            {
                m.ToTable("UserTeams", schema);
                m.MapLeftKey("TeamId");
                m.MapRightKey("UserId");
            });
        }
    }

}

