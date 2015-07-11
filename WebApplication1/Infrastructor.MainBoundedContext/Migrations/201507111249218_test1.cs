namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reports", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Reports", "Description");
        }
    }
}
