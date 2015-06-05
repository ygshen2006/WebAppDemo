namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Reports", "ReportType_Id", "dbo.ReportTypes");
            DropIndex("dbo.Reports", new[] { "ReportType_Id" });
            AddColumn("dbo.Reports", "ReportContent", c => c.String());
            DropColumn("dbo.Reports", "ReportType_Id");
            DropTable("dbo.ReportTypes");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ReportTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Reports", "ReportType_Id", c => c.Int());
            DropColumn("dbo.Reports", "ReportContent");
            CreateIndex("dbo.Reports", "ReportType_Id");
            AddForeignKey("dbo.Reports", "ReportType_Id", "dbo.ReportTypes", "Id");
        }
    }
}
