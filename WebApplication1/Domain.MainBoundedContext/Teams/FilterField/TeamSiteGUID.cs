using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.FilterField;
using Domain.MainBoundedContext.Logics;
using Domain.MainBoundedContext.Reports.Logics.Aggregates;
using Domain.SeedWork;

namespace Domain.MainBoundedContext.Teams.FilterField
{
    public class TeamSiteGUID : AppFilterField<Guid>, IIN<Guid>, IEQUAL<Guid>
    {
        public TeamSiteGUID()
        {
            this.Name = "Team Site Guid";
        }

        #region IIN Interface implementation
        public IN<Guid> In(IEnumerable<Guid> values)
        {
            Constant<IEnumerable<Guid>> constants = new Constant<IEnumerable<Guid>>() { Value = values };
            return this.CreateIn(constants);
        }

        public IN<Guid> In(Constant<IEnumerable<Guid>> value)
        {
            return this.CreateIn(value);
        }

        public IN<Guid> In(Parameter<IEnumerable<Guid>> value)
        {
            return this.CreateIn(value);
        }


        #endregion

        #region IEQUAL implementation
        public Equal<Guid> Equal(Guid value)
        {
            return this.CreateEqual(new Constant<Guid>() { Value = value });
        }

        public Equal<Guid> Equal(Constant<Guid> value)
        {
            return this.CreateEqual(value);
        }

        public Equal<Guid> Equal(Parameter<Guid> value)
        {
            return this.CreateEqual(value);
        }

        #endregion

        #region Expression Part

        public Expression<Func<Report, Boolean>> GetEqualExpression(Guid value)
        {
            Expression<Func<Report, Boolean>> exp = _ => _.TeamSite.TeamGuid == value;
            return exp;
        }
        #endregion


        Expression<Func<Report, bool>> IIN<Guid>.GetINExpression(IEnumerable<Guid> values)
        {
            Expression<Func<Report, Boolean>> exp = _ => values.Contains(_.TeamSite.TeamGuid);
            return exp;
        }
    }
}
