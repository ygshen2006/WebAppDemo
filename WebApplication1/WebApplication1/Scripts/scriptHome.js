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
            $.ajaxSetup({
                crossDomain: true,
                cache: false,
                async: true
            });

            // get the article type
            $(document).live('click', function (e) {
                if ($('.articleTypeDiv').hasClass('expands') && $('.articleTypeDiv-sub').hasClass('expands')) {
                    $('.articleTypeDiv-sub').addClass('collapse');
                }

                if ($('.articleTeamDiv').hasClass('expands') && $('.articleTeamDiv-sub').hasClass('expands')) {
                    $('.articleTeamDiv-sub').addClass('collapse');
                }


                if ($('.articleTagDiv').hasClass('expands') && $('.articleTagDiv-sub').hasClass('expands')) {
                    $('.articleTagDiv-sub').addClass('collapse');
                }

                if ($('.owners-list').hasClass('expands') && $('.articleOwnerDiv-sub').hasClass('expands')) {
                    $('.articleOwnerDiv-sub').addClass('collapse');
                }

                if ($('.articleStatusDiv').hasClass('expands')) {
                    $('.articleStatusDiv-sub').addClass('collapse');
                }
            });

            $('.articleTypeDiv-sub').live('click', function (e) {
                e.stopPropagation();
            });
            $('.articleTagDiv-sub').live('click', function (e) {
                e.stopPropagation();
            });
            $('.articleTypeDiv').live('click', function (e) {
                $('.articleTypeDiv-sub').children().remove();
                // Load all the categories for this article
                if (!$(this).hasClass('expands')) {
                    $('.articleTypeDiv-sub').removeClass('collapse').addClass('expands');
                    $(this).removeClass('expands').addClass('expands');


                    URP.AddReport.LoadCategories($(this), function (result) {
                        var str = "";
                        if (result != null) {
                            $.each(result, function (index, current) {
                                if (current.ParentId == null) {
                                    str += "<li><ul><input class='pc' onchange='URP.AddReport.unionSelect(this)' type='checkbox' value='" + current.Id + "'>" + current.CategoryName + "</input>";
                                    $.each(current.ChildCategories, function (i, c) {
                                        if (selectedcategories.some(function (v) { return v.cid == c.Id; })) {
                                            str += "<li style='padding-left:10px'><input checked='checked' class='cc' onchange='URP.AddReport.childSelect(this)' type='checkbox' value='" + c.Id + "' /><span>" + c.CategoryName + "</span></li>";
                                        }
                                        else {
                                            str += "<li style='padding-left:10px'><input class='cc' onchange='URP.AddReport.childSelect(this)' type='checkbox' value='" + c.Id + "' /><span>" + c.CategoryName + "</span></li>";
                                        }
                                    });
                                    str += "</ul><li>";
                                }
                            });
                            $('.articleTypeDiv-sub').append(str);
                        }

                    });

                }
                else {
                    $(this).removeClass('expands');
                    $('.articleTypeDiv-sub').removeClass('collapse').addClass('collapse');
                }

                e.stopPropagation();
            });


            $('.articleTeamDiv').live('click', function (e) {
                // Load all the categories for this article
                if (!$(this).hasClass('expands')) {
                    $('.articleTeamDiv-sub').removeClass('collapse').addClass('expands');
                    $(this).removeClass('expands').addClass('expands');

                    $('.articleTeamDiv-sub').children().remove();

                    URP.AddReport.LoadTeams($(this), function (result) {
                        var str = "";
                        if (result != null) {
                            $.each(result.Teams, function (index, current) {
                                if (current.TeamLogo == null || current.TeamLogo == "") {
                                    current.TeamLogo = "../images/team-default.jpg";
                                }
                                str += "<li tag1='" + current.TeamGuid + "' tag='" + current.Id + "'><div class='teampicsmall'><img src='" + current.TeamLogo + "'/><span style='float:right'>" + current.TeamName + "</span></div></li>";
                            });
                            $('.articleTeamDiv-sub').append(str);
                        }
                    });
                }
                else {
                    $(this).removeClass('expands');
                    $('.articleTeamDiv-sub').removeClass('collapse').addClass('collapse');
                }

                e.stopPropagation();
            });
            $('.articleTeamDiv-sub li').live('click', function (e) {
                var teamNameTag = $(this).find('span')[0];
                selectedteams = [];
                selectedteams.push({ "TeamId": $(this).attr('tag'), "TeamName": $(teamNameTag).text() });
                $('.articleTeamDiv').text('').append("<span>" + $(teamNameTag).text() + "</span>");
                $('#currentSelectedTeam').val($(this).attr('tag1'));
            });


            $('.owners-list').bind('keyup', function (e) {
                // get current user name

                var userNames = $(this).val();

                $(this).removeClass('expands').addClass('expands');


                URP.AddReport.LoadUsers($(this), userNames, function (result) {
                    if (result != null && result.length > 0) {

                        $('.articleOwnerDiv-sub').children().remove();
                        if ($('.articleOwnerDiv-sub').hasClass('collapse')) {
                            $('.articleOwnerDiv-sub').removeClass('collapse');
                        }

                        // Show the user in the div list for select
                        $.each(result, function (index, current) {
                            if (!selectedOwners.some(function (v) {
                                return v.UserName == current.UserName.trim();
                            })) {
                                var str = "<li class='owneritem' tag=" + current.Id + "><div class='move'>";

                                str += "<div class='up" + index + "'> </div><div class='un' style='margin-left:5px; font-weight:bold'>" + current.UserName + "</div>";

                                str += "</div>";
                                // If this user doesn't have picture. use a default phot
                                var d = '';
                                if (current.UserPhoto == null) {
                                    var t = '';
                                    if (current.Sex == 1) { t = '../Images/men.png'; } else { t = '../Images/women.png'; }

                                    d = "&lt;div style='height: 60px; width: 60px; overflow: hidden;' class='img-preview'&gt;&lt;" +
                                    "img src='" + t + "'" +
                                    " style='height: 75px; margin-left: -20px; margin-top: 0px; width: 100px;'&gt;&lt;/div&gt;";

                                }
                                else {
                                    d = current.UserPhoto;
                                }
                                str += "</li>";
                                $('.articleOwnerDiv-sub').append(str);

                                $(".up" + index + "").html(URP.util.HTMLDecode(d));
                            }
                        });
                    }
                });
            });
            function CheckIfUserExists(value, index, ar) {

            }
            $('.articleOwnerDiv-sub li').live('click', function (e) {
                var selectedUser = $(this);
                // add the selected users to the array list

                selectedOwners.push({ "UserId": $(this).attr('tag'), "UserName": $(selectedUser).find('.un').text().trim() });
                // add the item to the selected list
                var newItem = "<li class='test' tag='" + $(this).attr('tag') + "'><span tag='" + $(this).attr('tag') + "' class='selectedUserShow'>" + $(selectedUser).text() + ";</span></li>";
                $('.ownerarea').append(newItem);
                $('.articleOwnerDiv-sub').children().remove();
                if (!$('.articleOwnerDiv-sub').hasClass('collapse')) {
                    $('.articleOwnerDiv-sub').addClass('collapse');
                }
            });
            $('.selectedUserShow').live('click', function (e) {
                $(this).remove();

                URP.AddReport.updateTheSelectedOwners($(this).text().trim());
            });


            $('.articleTagDiv').live('click', function (e) {
                // Load all the categories for this article

              
                    if (!$(this).hasClass('expands')) {
                        $('.articleTagDiv-sub').removeClass('collapse').addClass('expands');
                        $(this).removeClass('expands').addClass('expands');

                        $('.articleTagDiv-sub').children().remove();
                        if ($('#currentSelectedTeam').val() == '') {
                            alert('请先选择一个团队');
                            return;
                        }
                        if (selectedTags.length == 0) {
                            URP.AddReport.LoadTeamTags($(this), $('#currentSelectedTeam').val(), function (result) {
                                var str = '';
                                if (result != null && result.length > 0) {
                                    $.each(result, function (index, current) {
                                        str += "<li><input onchange='URP.AddReport.TagSelect(this," + current.Title + ")' type='checkbox' tag='" + current.Id + "'/><lable>" + current.Title + "</lable></li>";
                                    });
                                    $('.articleTagDiv-sub').append(str);
                                }

                            });
                        }
                        else {
                            // make the selected items as checked
                            URP.AddReport.LoadTeamTags($(this), $('#currentSelectedTeam').val(), function (result) {
                                var str = '';
                                if (result != null && result.length > 0) {
                                    $.each(result, function (index, current) {
                                        if (selectedTags.some(function (v) { return v.tagid == current.Id; })) {
                                            str += "<li><input checked='checked' onchange='URP.AddReport.TagSelect(this," + current.Title + ")' type='checkbox' tag='" + current.Id + "'/><lable>" + current.Title + "</lable></li>";
                                        }
                                        else {
                                            str += "<li><input onchange='URP.AddReport.TagSelect(this," + current.Title + ")' type='checkbox' tag='" + current.Id + "'/><lable>" + current.Title + "</lable></li>";
                                        }
                                    });
                                    $('.articleTagDiv-sub').append(str);
                                }
                            });
                        }
                    }
                    else {
                        $(this).removeClass('expands');
                        $('.articleTagDiv-sub').removeClass('collapse').addClass('collapse');
                    }

                    e.stopPropagation();
            });


        };

        var selectedcategories = [];
        var selectedteams = [];
        var selectedOwners = [];
        var selectedTags = [];
        this.LoadCategories = function (loadingArea, callBack) {

            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/SiteAdminAjax';

            $.ajax({
                url: url + "?requestType=getallcategory",
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error found any categories');
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
        }

        this.LoadTeams = function (loadingArea, callBack) {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/SiteAdminAjax';

            $.ajax({
                url: url + "?requestType=getteams",
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error found any teams');
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
        }

        this.LoadUsers = function (loadingArea, value, callBack) {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/UserAjax';

            $.ajax({
                url: url + "?requestType=getusersforadmin&key=" + value,
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error found any teams');
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

        this.LoadTeamTags = function (loadingArea, teamId, callBack) {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/TeamSiteAdminAjax';

            $.ajax({
                url: url + "?queryType=getsitetags&SiteGUID=" + teamId,
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('Error found any teams');
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
        }


        this.unionSelect = function (item) {

            selectedcategories = [];

            var childs = $(item).parent().find('li input');
            var status = $(item).attr('checked');
            $.each(childs, function (index, current) {
                if (status == 'checked') {
                    current.setAttribute("checked", "checked");
                    current.checked = true;
                }
                else {

                    current.setAttribute("checked", ""); // For IE
                    current.removeAttribute("checked"); // For other browsers
                    current.checked = false;
                }
            });

            URP.AddReport.updateTheSelectedCategories();
        }

        this.childSelect = function (item) {
            selectedcategories = [];

            var status = $(item).attr('checked');
            var slibings = $(item).parent().parent().find(".cc:checked");

            var slibingsLen = slibings.length;

            var parent = $(item).parent().parent();

            var union = parent.find(".pc")[0];
            if (status == 'checked') {
                if (slibingsLen == $(item).parent().siblings().length) {
                    union.setAttribute("checked", "checked");
                    union.checked = true;
                }
            }
            else {
                union.setAttribute("checked", ""); // For IE
                union.removeAttribute("checked"); // For other browsers
                union.checked = false;
            }
            URP.AddReport.updateTheSelectedCategories();
        }


        this.TagSelect = function (item, itemvalue) {

            var status = $(item).attr('checked');
            if (status == 'checked') {
                selectedTags.push({ "tagid": $(item).attr('tag'), "tagname": itemvalue });
            }
            else {
                var j = 0;
                for (var i = 0; i < selectedTags.length; i++) {
                    if (selectedTags[i].tagid == $(item).attr('tag')) {
                        j = i;
                        break;
                    }
                }
                removeByIndex(selectedTags, j);
            }
            updateTagsInSelectZone();

        }
        function updateTagsInSelectZone() {
            var str = "";
            $.each(selectedTags, function (index, current) {
                str += current.tagname + "; ";
            });
            $('.articleTagDiv').html(str);
        }
        /// We have choose the items for categories
        /// Here to update the selected categories array
        /// Then show the items selected into the selected area
        this.updateTheSelectedCategories = function () {

            $.each($('.cc'), function (index, current) {
                if ($(this).attr('checked') == 'checked') {
                    selectedcategories.push({ "cid": $(this).val(), "ctext": $(this).next('span').text() });
                }
            });

            // Update the selected items div
            var selectedDiv = "<ul class='selectedCategories'>";
            $.each(selectedcategories, function (index, current) {
                selectedDiv += "<li>" + current.ctext + ";</li>";
            });
            selectedDiv += "</ul>";

            $('.articleTypeDiv').children().remove();
            $('.articleTypeDiv').append(selectedDiv);
        }

        this.updateTheSelectedOwners = function (text) {

            var index = selectedOwners.indexOf(text);
            //selectedOwners = [];
            removeByIndex(selectedOwners, index);

            var test = selectedOwners;
        }

        function removeByIndex(arr, index) {
            arr.splice(index, 1);
        }
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
        this.HTMLDecode = function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }
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