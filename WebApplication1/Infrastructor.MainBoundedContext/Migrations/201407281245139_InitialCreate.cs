namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CategoryParentId = c.Int(),
                        ParentCategory_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.ParentCategory_Id)
                .Index(t => t.ParentCategory_Id);
            
            CreateTable(
                "dbo.Reports",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ReportStatus_Id = c.Int(),
                        ReportType_Id = c.Int(),
                        TeamSite_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Status", t => t.ReportStatus_Id)
                .ForeignKey("dbo.ReportTypes", t => t.ReportType_Id)
                .ForeignKey("dbo.TeamSites", t => t.TeamSite_Id)
                .Index(t => t.ReportStatus_Id)
                .Index(t => t.ReportType_Id)
                .Index(t => t.TeamSite_Id);
            
            CreateTable(
                "dbo.Status",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ReportTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TagName = c.String(nullable: false, maxLength: 50),
                        TeamSiteId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TeamSites", t => t.TeamSiteId, cascadeDelete: true)
                .Index(t => t.TeamSiteId);
            
            CreateTable(
                "dbo.TeamSites",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TeamGuid = c.Guid(nullable: false),
                        TeamName = c.String(nullable: false, maxLength: 50),
                        TeamDescription = c.String(nullable: false),
                        TeamOwnerId = c.Int(nullable: false),
                        TeamLogo = c.String(),
                        CreatedDateTime = c.DateTime(nullable: false),
                        SegmentId = c.Int(),
                        TeamOwner_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Segments", t => t.SegmentId)
                .ForeignKey("dbo.Users", t => t.TeamOwner_Id)
                .Index(t => t.SegmentId)
                .Index(t => t.TeamOwner_Id);
            
            CreateTable(
                "dbo.Segments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        SegmentGuid = c.Guid(nullable: false),
                        DivisionId = c.Int(nullable: false),
                        ParentId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Divisions", t => t.DivisionId, cascadeDelete: true)
                .ForeignKey("dbo.Segments", t => t.ParentId)
                .Index(t => t.DivisionId)
                .Index(t => t.ParentId);
            
            CreateTable(
                "dbo.Divisions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DivisionGuid = c.Guid(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(),
                        Sex = c.Boolean(),
                        HeadPhoto = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.IdentityUserClaims",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        Id = c.Int(nullable: false),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                        IdentityUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Users", t => t.IdentityUser_Id)
                .Index(t => t.IdentityUser_Id);
            
            CreateTable(
                "dbo.IdentityUserLogins",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        LoginProvider = c.String(),
                        ProviderKey = c.String(),
                        IdentityUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Users", t => t.IdentityUser_Id)
                .Index(t => t.IdentityUser_Id);
            
            CreateTable(
                "dbo.PersonalInformations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BirthDay = c.DateTime(nullable: false),
                        From_Province = c.String(),
                        From_City = c.String(),
                        From_District = c.String(),
                        LiveIn_Province = c.String(),
                        LiveIn_City = c.String(),
                        LiveIn_District = c.String(),
                        Favorates_FavorateMusic = c.String(),
                        Favorates_FavorateBook = c.String(),
                        Favorates_FavoratePeople = c.String(),
                        Favorates_FavorateSports = c.String(),
                        Favorates_FavorateFilms = c.String(),
                        Favorates_FavorateBrands = c.String(),
                        Favorates_FavorateOthers = c.String(),
                        BloodStyle = c.String(),
                        PersonnalDescription = c.String(),
                        UserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.IdentityUserRoles",
                c => new
                    {
                        RoleId = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                        IdentityUser_Id = c.String(maxLength: 128),
                        IdentityRole_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.RoleId, t.UserId })
                .ForeignKey("dbo.Users", t => t.IdentityUser_Id)
                .ForeignKey("dbo.IdentityRoles", t => t.IdentityRole_Id)
                .Index(t => t.IdentityUser_Id)
                .Index(t => t.IdentityRole_Id);
            
            CreateTable(
                "dbo.Tiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 50),
                        RowNumber = c.Int(nullable: false),
                        IsCustomized = c.Boolean(nullable: false),
                        OwnerTeamSiteId = c.Int(),
                        TileType = c.Int(nullable: false),
                        SystemDefinedTile = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TeamSites", t => t.OwnerTeamSiteId)
                .Index(t => t.OwnerTeamSiteId);
            
            CreateTable(
                "dbo.UsefulLinks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParentId = c.Int(),
                        LinkName = c.String(),
                        URL = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UsefulLinks", t => t.ParentId)
                .Index(t => t.ParentId);
            
            CreateTable(
                "dbo.IdentityRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ReportCategories",
                c => new
                    {
                        ReportId = c.Int(nullable: false),
                        CategoryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ReportId, t.CategoryId })
                .ForeignKey("dbo.Reports", t => t.ReportId, cascadeDelete: true)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.ReportId)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.ReportTags",
                c => new
                    {
                        ReportId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ReportId, t.TagId })
                .ForeignKey("dbo.Reports", t => t.ReportId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ReportId)
                .Index(t => t.TagId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.IdentityUserRoles", "IdentityRole_Id", "dbo.IdentityRoles");
            DropForeignKey("dbo.IdentityUserRoles", "IdentityUser_Id", "dbo.Users");
            DropForeignKey("dbo.IdentityUserLogins", "IdentityUser_Id", "dbo.Users");
            DropForeignKey("dbo.IdentityUserClaims", "IdentityUser_Id", "dbo.Users");
            DropForeignKey("dbo.UsefulLinks", "ParentId", "dbo.UsefulLinks");
            DropForeignKey("dbo.ReportTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.ReportTags", "ReportId", "dbo.Reports");
            DropForeignKey("dbo.Tiles", "OwnerTeamSiteId", "dbo.TeamSites");
            DropForeignKey("dbo.TeamSites", "TeamOwner_Id", "dbo.Users");
            DropForeignKey("dbo.PersonalInformations", "UserId", "dbo.Users");
            DropForeignKey("dbo.Tags", "TeamSiteId", "dbo.TeamSites");
            DropForeignKey("dbo.TeamSites", "SegmentId", "dbo.Segments");
            DropForeignKey("dbo.Segments", "ParentId", "dbo.Segments");
            DropForeignKey("dbo.Segments", "DivisionId", "dbo.Divisions");
            DropForeignKey("dbo.Reports", "TeamSite_Id", "dbo.TeamSites");
            DropForeignKey("dbo.Reports", "ReportType_Id", "dbo.ReportTypes");
            DropForeignKey("dbo.Reports", "ReportStatus_Id", "dbo.Status");
            DropForeignKey("dbo.ReportCategories", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.ReportCategories", "ReportId", "dbo.Reports");
            DropForeignKey("dbo.Categories", "ParentCategory_Id", "dbo.Categories");
            DropIndex("dbo.ReportTags", new[] { "TagId" });
            DropIndex("dbo.ReportTags", new[] { "ReportId" });
            DropIndex("dbo.ReportCategories", new[] { "CategoryId" });
            DropIndex("dbo.ReportCategories", new[] { "ReportId" });
            DropIndex("dbo.UsefulLinks", new[] { "ParentId" });
            DropIndex("dbo.Tiles", new[] { "OwnerTeamSiteId" });
            DropIndex("dbo.IdentityUserRoles", new[] { "IdentityRole_Id" });
            DropIndex("dbo.IdentityUserRoles", new[] { "IdentityUser_Id" });
            DropIndex("dbo.PersonalInformations", new[] { "UserId" });
            DropIndex("dbo.IdentityUserLogins", new[] { "IdentityUser_Id" });
            DropIndex("dbo.IdentityUserClaims", new[] { "IdentityUser_Id" });
            DropIndex("dbo.Segments", new[] { "ParentId" });
            DropIndex("dbo.Segments", new[] { "DivisionId" });
            DropIndex("dbo.TeamSites", new[] { "TeamOwner_Id" });
            DropIndex("dbo.TeamSites", new[] { "SegmentId" });
            DropIndex("dbo.Tags", new[] { "TeamSiteId" });
            DropIndex("dbo.Reports", new[] { "TeamSite_Id" });
            DropIndex("dbo.Reports", new[] { "ReportType_Id" });
            DropIndex("dbo.Reports", new[] { "ReportStatus_Id" });
            DropIndex("dbo.Categories", new[] { "ParentCategory_Id" });
            DropTable("dbo.ReportTags");
            DropTable("dbo.ReportCategories");
            DropTable("dbo.IdentityRoles");
            DropTable("dbo.UsefulLinks");
            DropTable("dbo.Tiles");
            DropTable("dbo.IdentityUserRoles");
            DropTable("dbo.PersonalInformations");
            DropTable("dbo.IdentityUserLogins");
            DropTable("dbo.IdentityUserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.Divisions");
            DropTable("dbo.Segments");
            DropTable("dbo.TeamSites");
            DropTable("dbo.Tags");
            DropTable("dbo.ReportTypes");
            DropTable("dbo.Status");
            DropTable("dbo.Reports");
            DropTable("dbo.Categories");
        }
    }
}
