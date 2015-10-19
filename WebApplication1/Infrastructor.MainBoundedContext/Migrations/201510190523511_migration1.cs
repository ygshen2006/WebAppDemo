namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migration1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reports", "FeaturedPicture", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Reports", "FeaturedPicture");
        }
    }
}
