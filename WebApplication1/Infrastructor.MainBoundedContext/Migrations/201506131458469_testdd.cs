namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testdd : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Reports", new[] { "TeamSite_Id" });
            DropIndex("dbo.Reports", new[] { "ReportStatus_Id" });
            RenameColumn(table: "dbo.Reports", name: "ReportStatus_Id", newName: "StatusId");
            RenameColumn(table: "dbo.Reports", name: "TeamSite_Id", newName: "TeamSiteId");
            AlterColumn("dbo.Reports", "TeamSiteId", c => c.Int(nullable: false));
            AlterColumn("dbo.Reports", "StatusId", c => c.Int(nullable: false));
            CreateIndex("dbo.Reports", "TeamSiteId");
            CreateIndex("dbo.Reports", "StatusId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Reports", new[] { "StatusId" });
            DropIndex("dbo.Reports", new[] { "TeamSiteId" });
            AlterColumn("dbo.Reports", "StatusId", c => c.Int());
            AlterColumn("dbo.Reports", "TeamSiteId", c => c.Int());
            RenameColumn(table: "dbo.Reports", name: "TeamSiteId", newName: "TeamSite_Id");
            RenameColumn(table: "dbo.Reports", name: "StatusId", newName: "ReportStatus_Id");
            CreateIndex("dbo.Reports", "ReportStatus_Id");
            CreateIndex("dbo.Reports", "TeamSite_Id");
        }
    }
}
