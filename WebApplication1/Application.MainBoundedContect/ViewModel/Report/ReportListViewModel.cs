using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace EBIUnifiedReporting.Model.ViewModel
    {
        public class ReportListViewModel
        {
            public List<ReportItemViewModel> ReportList { get; set; }

            public ReportListViewModel()
            {
                this.ReportList = new List<ReportItemViewModel>();
            }
        }

        public class ReportItemViewModel
        {
            public int ID { get; set; }
            public string Title { get; set; }
            public string Image { get; set; }
            public string Descript { get; set; }
            public string Type { get; set; }
            public int TypeID { get; set; }
            public string CatalogType { get; set; }
            public string FileName { get; set; }
            public string ClientOpenUrl { get; set; }
            public string BrowserOpenUrl { get; set; }
            public string OpenStatus { get; set; }
            public string Owners { get; set; }
            public string SupportAlias { get; set; }
            public string UserEmail { get; set; }
            public string Site { get; set; }
            public string ReportStatus { get; set; }
            public string SystemReportStatus { get; set; }
            public string SubscribeStatus { get; set; }
            public string RecommendStatus { get; set; }
            public string StatusComment { get; set; }
            public string DataSource { get; set; }
            public string Categories { get; set; }
            public string Tags { get; set; }
            public bool AvaliableInSearch { get; set; }
            public string Secured { get; set; }
            public string SecuredUsers { get; set; }
            public bool Editable { get; set; }
            public string EditURL { get; set; }
            public string RatingTitle { get; set; }
            public string RatingStar { get; set; }
            public int RatingAggregation { get; set; }
            public int RatingCount { get; set; }
            public string Comment { get; set; }
            public bool IsApprove { get; set; }
            public bool IsSelected { get; set; }
            public bool Remove { get; set; }

            public List<ReportRecommendViewModel> RecommendList { get; set; }
            public List<ReportAdditionalInformationViewModel> AdditionalInformation { get; set; }
            public ReportItemViewModel()
            {
                RecommendList = new List<ReportRecommendViewModel>();
                AdditionalInformation = new List<ReportAdditionalInformationViewModel>();
            }
        }

        public class ReportRecommendViewModel
        {
            public string UserName { get; set; }
            public string Comment { get; set; }
        }

        public class ReportAdditionalInformationViewModel
        {
            public string Title { get; set; }
            public string Link { get; set; }
        }


    }

}
