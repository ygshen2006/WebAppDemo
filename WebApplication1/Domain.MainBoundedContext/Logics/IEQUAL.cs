﻿using Domain.SeedWork;
//using Microsoft.MSIT.ECO.UnifiedReporting.Domain.MainBoundedContext.ReportModule.Aggregates.ReportCatalogAgg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Logics
{
    public interface IEQUAL<T>
    {
        Equal<T> Equal(T value);
        Equal<T> Equal(Constant<T> value);
        Equal<T> Equal(Parameter<T> value);
        Expression<Func<Entity, Boolean>> GetEqualExpression(T value);
    }
}
