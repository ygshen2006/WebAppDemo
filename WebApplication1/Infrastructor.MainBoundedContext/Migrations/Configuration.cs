namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Domain.MainBoundedContext.Reports.Aggregates;
    using Domain.MainBoundedContext.Reports.Logics.Aggregates;
    using Domain.MainBoundedContext.Tiles.Aggregates;

    internal sealed class Configuration : DbMigrationsConfiguration<Infrastructor.MainBoundedContext.UnitWorks.MainDBUnitWorkContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "Infrastructor.MainBoundedContext.UnitWorks.MainDBUnitWorkContext";
        }

        protected override void Seed(Infrastructor.MainBoundedContext.UnitWorks.MainDBUnitWorkContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Status.AddOrUpdate(p => p.Name,
                new Status { Name = "通过" },
                new Status { Name = "等待审批" }
                );
            context.Tiles.AddOrUpdate(p => new
            {
                p.Title,
                p.Top,
                p.Left,
                p.Width,
                p.Height,
                p.BackgroundColor,
                p.Icon,
                p.BackgroundImage,
                p.ImageOverlayColor,
                p.ReportCountStyle,
                p.IsCustomized,
                p.OwnerTeamSiteId,
                p.TileType,
                p.LogicStringType,
                p.LogicString
            },
                new Tile
                {
                    Title = "我的订阅",
                    Left = 0,
                    Top = 0,
                    Width = 1,
                    Height = 1,
                    BackgroundColor = null,
                    Icon = null,
                    BackgroundImage = null,
                    ImageOverlayColor = null,
                    ReportCountStyle = "Centered",
                    IsCustomized = false,
                    OwnerTeamSiteId = null,
                    TileType = 1,
                    LogicStringType = 2,
                    LogicString = "MySubscriptions"
                },
                new Tile
                {
                    Title = "我的文章",
                    Left = 1,
                    Top = 0,
                    Width = 1,
                    Height = 1,
                    BackgroundColor = null,
                    Icon = null,
                    BackgroundImage = null,
                    ImageOverlayColor = null,
                    ReportCountStyle = "Centered",
                    IsCustomized = false,
                    OwnerTeamSiteId = null,
                    TileType = 1,
                    LogicStringType = 2,
                    LogicString = "MyReports"
                },
                  new Tile
                {
                    Title = "我的推荐",
                    Left = 2,
                    Top = 0,
                    Width = 1,
                    Height = 1,
                    BackgroundColor = null,
                    Icon = null,
                    BackgroundImage = null,
                    ImageOverlayColor = null,
                    ReportCountStyle = "Centered",
                    IsCustomized = false,
                    OwnerTeamSiteId = null,
                    TileType = 1,
                    LogicStringType = 2,
                    LogicString = "MyRecommends"
                });
        }
    }
}
