namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Segments", new[] { "DivisionId" });
            AlterColumn("dbo.Segments", "DivisionId", c => c.Int());
            CreateIndex("dbo.Segments", "DivisionId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Segments", new[] { "DivisionId" });
            AlterColumn("dbo.Segments", "DivisionId", c => c.Int(nullable: false));
            CreateIndex("dbo.Segments", "DivisionId");
        }
    }
}
