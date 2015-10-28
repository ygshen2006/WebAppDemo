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
            public string Descript { get; set; }
            public string Owners { get; set; }
            public string ReportStatus { get; set; }
            public string SubscribeStatus { get; set; }
            public string RecommendStatus { get; set; }
            public bool Editable { get; set; }
            public List<ReportRecommendViewModel> RecommendList { get; set; }
            public List<ReportAdditionalInformationViewModel> AdditionalInformation { get; set; }
            public ReportItemViewModel()
            {
                RecommendList = new List<ReportRecommendViewModel>();
                AdditionalInformation = new List<ReportAdditionalInformationViewModel>();
            }

            public bool Remove { get; set; }
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
