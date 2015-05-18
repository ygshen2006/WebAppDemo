/// <reference path="../Ajax/FrontAjax.aspx" />
/// <reference path="../Ajax/FrontAjax.aspx" />
/// <reference path="../Ajax/FrontAjax.aspx" />
///<reference path="jquery-1.8.2.min.js" />
/// <reference path="jquery.cookie.js" />
/// <reference path="jquery.bpopup.min.js" />
/// <reference path="FileUploader.js" />
/// <reference path="masonry.pkgd.min.js" />
/// <reference path="jquery.showLoading.js" />

(function (URP, $, undefined) {
    URP.criteria = { TileId: 0, SiteType: 'teamsite', SortAttribute: "Title", SortAscending: true, currentPage: 0, PageSize: 10, FilterEntityList: [] };
    URP.Filter = new function () {
        this.initial = function () {
            // Inite user image
           
            $('#oldUserPhoto').live('hover', function (e) {
                $('.edit_pic').css({ 'position': 'absolute', 'left': '0px', 'top': '30px' }).show();
            }).live('mouseleave', function () {
                $('.edit_pic').hide();
            });
            
            // Initiate the behaviors on the filter 
            $('.filterCollapse').live("click", function (e) {
                e.preventDefault();
                $(this).removeClass("filterCollapse").addClass("filterExpand");
                $(this).parent().children("ul").slideDown();
            });
            $('.filterExpand').live("click", function (e) {
                e.preventDefault();
                $(this).removeClass("filterExpand").addClass("filterCollapse");
                $(this).parent().children("ul").slideUp();
            });
            $('.checkAll').live("click", function (e) {
                $(this).parentsUntil('.top-ul').parent().find('input[type=checkbox]').prop('checked', $(this).prop('checked'));
            });
            $('.childFilter').live("click", function (e) {
                if (!$(this).prop('checked')) {
                    $(this).parentsUntil('.top-ul').parent().find('.checkAll').prop('checked', $(this).prop('checked'));
                }
            });
            $('.setButton').live("click", function (e) {
                var prompt = false;
                var promtString;
                $('.filter .filterItem').each(function (e) {
                    if ($(this).find('input[type=checkbox]:checked').length == 0) {
                        prompt = true;
                        promtString = 'Please enter' + $(this).children('.parentFilter').html();
                        return false;
                    }
                });
                if (prompt) {
                    alert(promtString);
                    return;
                }
                OnOkCleanButtonClicked();
            });
            $('.cleanButton').live("click", function (e) {
                $('.filter input[type=checkbox]').prop("checked", true);
                OnOkCleanButtonClicked();
            });

            function OnOkCleanButtonClicked() {
                FetchSearchCretia();
            }

        };
        this.getFilter = function (tileId) {
            URP.util.GetFilter($('.leftbar'), tileId, GetFilterEntityList);
            function GetFilterEntityList() {
                FetchSearchCretia();
            }
        };
        function FetchSearchCretia() {
            var filterList = [];
            $('.filterItem').each(function () {
                var filterEntity = {};
                filterEntity.FilterType = $(this).find('.parentFilter').text();
                filterEntity.FilterList = [];
                if ($(this).find('.checkAll').prop("checked")) {
                    return true;
                }

                $('.filterItem .childFilter').each(function () {
                    if ($(this).prop("checked")) {
                        var filterItem = {};
                        filterItem.Value = $(this).val();
                        filterEntity.FilterList.push(filterItem);
                    }
                });
                filterList.push(filterEntity);
            });
            URP.criteria.FilterEntityList = filterList;
        }
    };
    URP.initiate = function () {
        // Initiate the click 
        $.ajaxSetup({
            crossDomain: true,
            cache: false,
            async: true
        });
        $('.addReport, .action').live('click', function () {
            var criteriaString = JSON.stringify(URP.criteria);
            $.cookie('criteriaString', criteriaString, { expires: 1 });
        });
        $(document).scroll(function (e) {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {

                var itemNum = $('.content .list-item').length;
                if (itemNum != 0 && /^\d+$/.test(itemNum / URP.criteria.PageSize)) {
                    URP.Report.getReport(true);
                }
            }
        });
        URP.Filter.initial();
        URP.Report.initial();
    };
    URP.Report = new function () {
        this.initial = function () {
            $('.reportExpanded').live('click', function (x) {
                x.preventDefault();
                $(this).removeClass("reportExpanded");
                $(this).addClass("reportCollapse");
                // Show the short message under the table
                $(this).parent().parent().find('.item-description').show();
                $(this).parent().parent().find('.item-footer').show();
                $(this).parent().parent().find('.item-detail').slideUp();

            });

            $('.reportCollapse').live('click', function (x) {
                x.preventDefault();
                $(this).removeClass("reportCollapse");
                $(this).addClass("reportExpanded");
                $(this).parent().parent().find('.item-description').hide();
                $(this).parent().parent().find('.item-footer').hide();
                var loadingArea = $(this).parent().parent().find('.item-detail');
                var reportId = $(this).parent().parent().find('.reportTitle').attr('tag');
                var reportHeader = $(this).parent().parent().find('.item-header');


                $(this).parent().parent().find('.item-detail').slideDown('fast', function () {
                    // Get one report detail
                    URP.util.GetReportDetail(loadingArea, reportId, function (result) {
                        loadingArea.children().remove();
                        // Load the report detail
                        var detailString = '';
                        detailString = "<div class='detail-desc'>" + result.ReportDescription + "</div>"
                                        + "<table style='width:100%' class='detail-table'><tbody>"
                                           + "<tr class='even'><td>Report Name</td><td>" + result.ReportName + "</td></tr>"
                                           + "<tr><td>Report Owner</td><td>" + result.ReportOwner + "</td></tr>"
                                           + "<tr class='even'><td>Report Status</td><td>" + result.ReprotStatus + "</td></tr>"
                                           + "<tr><td>Report URL</td><td>" + result.ReportURL + "</td></tr>"
                                        + "</tbody></table>"
                                        + "<div class=''><a href='#' class='action'>Edit</a><a href='#' class='action'>Recommend</a><a href='#' class='action'>Subscribe</a></div>";

                        loadingArea.html(detailString);
                    });
                });
            });
        };
        this.getReport = function (scrolling, briefCallBack, detailCallBack) {
            // Set the sort order
            $('.ordersel').val(URP.criteria.SortAscending);
            // Set the loading area
            var loadingArea;
            if (scrolling) {
                URP.criteria.currentPage++;
                loadingArea = $('.last-item');
            }
            else {
                URP.criteria.currentPage = 0;
                loadingArea = $('div .content');
            }

            // Calling util method to load reports
            URP.util.GetReport(loadingArea, function (result) {
                $('.list-item').remove();
                var listString = '';
                $.each(result.ReportItemList, function (index, content) {
                    listString += "<div class='list-item' style='margin-top:10px'>"
                                    + "<div class='item-header'>"
                                        + "<a href='#' class='reportCollapse'></a><span class='reportIcon'></span><a tag=" + content.ID + " class='reportTitle' href='" + content.ReportURL + "'>" + content.ReportName + "</a>"
                                    + "</div>"

                                    + "<div class='item-description'>"
                                        + content.ReportDescription
                                    + "</div>"
                                    + "<div class='item-footer'>"
                                        + "Report type:" + content.ReportName + " | Report owner:" + content.ReportOwner + " | Status:" + content.ReprotStatus + "<a href='#' class='action'>Edit</a><a href='#' class='action'>Recommend</a><a href='#' class='action'>Subscribe</a>"
                                    + "</div>"
                                    + "<div class='item-detail'></div>"
                                  + "</div>";
                });
                if (listString.length == 0) {
                    if (URP.criteria.currentPage == 0) {
                        listString += "<div class='list-item'>No Reports availale</div>";
                    }
                    else {
                        listString += "<div class='list-item'>There is no  more reports</div>";
                    }
                }
                $(listString).insertBefore($('.content .last-item'));
            })
        };
    };
    URP.AddReport = new function () {
        this.initiate = function () {
            // get the article type

            $('#report-list div').live('click', function (e) {
                if ($(this).attr('class') == "articleTypeDiv") {
                    // Load all the categories for this article

                }
                else if ($(this).attr('class') == "articleTagDiv") {
                    // Load all the tags for current team
                }
                else if ($(this).attr('class') == "articleTeamDiv") {
                    // Load all the teams
                }
                else if ($(this).attr('class') == "articleStatusDiv") {
                }
            });
            // get the team sites

            // get the tags based on the team selected

            // get the status

            // bind the above collection to the controls
          
        };
    };

    URP.util = new function () {
        this.UploadImage = function (pictureData, loadingArea, callBack) {
            var baseUrl = this.GetBaseUrl();
            alert('sending jquery request');
            $.ajax({
                url: baseUrl + "?queryType=addPicture",
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(pictureData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error loading report');
                    console.log(error);
                },
                success: function (result) {

                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        };
        this.RemoveImage = function (pictureData, loadingArea, callBack) {
            var baseUrl = this.GetBaseUrl();

            $.ajax({
                url: baseUrl + "?queryType=removePicture",
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(pictureData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error removing pictures');
                    console.log(error);
                },
                success: function (result) {

                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        };
        this.GetBaseUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/FrontAjax';
            return url;
        };
        this.GetSite = function (loadingArea, callBack) {
            var url1 = this.GetBaseUrl() + "?queryType=reporttype&siteType=" + URP.criteria.SiteType;

            // Send the ajax call 
            $.ajax({
                url: url1,
                type: 'Get',
                timeout: 9900000,
                dataType: 'json',
                beforeSend: function () {
                    //loadingArea.showLoading();
                },
                success: function (result) {
                    if (callBack) callBack(result);
                },
                error: function (jqXHR, textStatus, errorThrown) { alert(textStatus); },

                complete: function () {
                    //loadingArea.hideLoading();
                }
            });
        };

        this.GetFilter = function (loadingArea, tileId, callBack) {
            var url2 = this.GetBaseUrl() + "?queryType=reportfilter&siteType=" + URP.criteria.SiteType;

            // Send the ajax call 
            $.ajax({
                url: url2,
                type: 'Get',
                timeout: 30000,
                dataType: 'json',
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                success: function (returnedResult) {
                    // Load the components
                    $('.filter').html('');

                    var filterString = "<h3 class='filterHead'>筛选条件</h3>";

                    var levelOneObjects = returnedResult.filter(function (x) { return x.FilterType != "Sub Category"; });
                    var levelTwoObjects = returnedResult.filter(function (x) { return x.FilterType == "Sub Category"; });

                    // Load the Level one nodes
                    $.each(levelOneObjects, function (innerIndx, innerContent) {
                        filterString += "<div class='filterItem'><a href='#' class='filterCollapse'></a><span class='parentFilter'>" + innerContent.FilterType + "</span><ul class='top-ul'>";

                        var secondItems = innerContent.FilterItemList;
                        filterString += "<li><input type='checkbox' class='checkAll' checked='checked'>All</input></li>";
                        $.each(secondItems, function (secondIndex, secondContent) {
                            if (secondContent.Name == "Sub Category")
                            { }
                            else
                            {
                                filterString += "<li><input type='checkbox' class='childFilter' value='" + secondContent.Value + "' checked='checked'><label>" + secondContent.Value + "(" + secondContent.Count + ")" + "</label></input></li>";
                            }
                        });
                        filterString += "</ul></div>";
                    });
                    if (returnedResult.length != 0) {
                        filterString += "<div class='filterApply'><input type='button' class='setButton' value='筛选'></input><input type='button' class='cleanButton' value='重选'></input></div>";
                    }

                    $('.filter').html(filterString);
                    if (callBack) { callBack(returnedResult); }
                },
                error: function (jqXHR, textStatus, errorThrown) { alert(textStatus); },

                complete: function () { loadingArea.hideLoading(); }
            });

            // Read the cookied to find which filter has been checked before this 
            if (URP.criteria.FilterEntityList.length > 0) {
                $('.filterItem').each(function () {
                    var that = $(this);
                    var filterItemText = that.find('span.parentFilter').text();

                    $.each(URP.criteria.FilterEntityList, function (index, outContent) {
                        if (filterItemText == outContent.FilterType) {
                            that.find('input[type=checkbox]').prop('checked', false);
                            $.each(outContent.FilterItemList, function (index, innerContent) {
                                that.find('input[type=checkbox][value=' + innerContent.Value + ']').prop('checked', true);
                            });
                        }
                    });
                });
            }
        };

        this.GetReport = function (loadingArea, callBack) {
            var url3 = this.GetBaseUrl() + "?queryType=reportsList&siteType=" + URP.criteria.SiteType;

            $.ajax({
                url: url3,
                type: "POST",
                dataType: "json",
                // TO-DO: Need to find the report with the query 
                data: { queryParam: JSON.stringify(URP.criteria) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error loading report');
                    console.log(error);
                },
                success: function (result) {

                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        };

        this.GetReportDetail = function (loadingArea, reportId, callBack) {
            // Send the ajax call to the function
            var url = this.GetBaseUrl() + "?queryType=reportDetail&reportId=" + reportId + "&siteType=" + URP.criteria.SiteType;
            $.ajax({
                url: url,
                type: "Get",
                timeout: 30000,
                dataType: "json",
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error loading report');
                    console.log(error);
                },
                success: function (result) {
                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        };
    };
})(window.URP = window.URP || {}, $, undefined);