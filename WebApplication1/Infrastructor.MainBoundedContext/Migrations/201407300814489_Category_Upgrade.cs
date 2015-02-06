namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Category_Upgrade : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Categories", "CategoryParentId");
            RenameColumn(table: "dbo.Categories", name: "ParentCategory_Id", newName: "CategoryParentId");
            RenameIndex(table: "dbo.Categories", name: "IX_ParentCategory_Id", newName: "IX_CategoryParentId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Categories", name: "IX_CategoryParentId", newName: "IX_ParentCategory_Id");
            RenameColumn(table: "dbo.Categories", name: "CategoryParentId", newName: "ParentCategory_Id");
            AddColumn("dbo.Categories", "CategoryParentId", c => c.Int());
        }
    }
}
