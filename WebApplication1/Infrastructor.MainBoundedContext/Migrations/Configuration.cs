namespace Infrastructor.MainBoundedContext.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Domain.MainBoundedContext.Reports.Aggregates;
    using Domain.MainBoundedContext.Reports.Logics.Aggregates;

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
        }
    }
}
