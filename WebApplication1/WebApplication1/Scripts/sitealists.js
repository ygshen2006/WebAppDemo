(function (LS, $, undefined) {
    LS.criteria = { TileId: 0, SiteType: 'teamsite', SortAttribute: "Title", SortAscending: true, CurrentPage: 0, PageSize: 10, FilterEntityList: [] };

    LS.Initiate = function (userName) 
    {
        // Team site filter initialize
        LS.Filter.Initialize(userName);

        // Team site list initialze
        LS.TeamSites.Initialize();
    }

    LS.SearchBox = new function () {
        this.Initialize = function () {
            // Initialize the search box controls' behavior
        }
    }
    LS.Filter = new function () {

        this.Initialize = function (userName) {
            // Initialize the team site list controls' behavior
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
                $(this).parentsUntil('.filtersec').find('input[type=checkbox]').prop('checked', $(this).prop('checked'));
            });
        }

        this.GetFilter  = function (userName, tileId) {

            LS.util.SendAjaxCall('getteamfilterlist', 'TeamAdminAjax',
                [{ Name: 'userName', Value: userName }, {Name: 'tileId', Value: tileId}],
                null, $('.left-side'),
                function (result) {
                    var str = "";
                    if (result != null && result.length > 0)
                    {
                        // Display the team's division, segement and subsegment hieararchy in the search list
                        $.each(result, function (index, current) {
                        str += "<div class='filtersec'><a href='#' class='filterExpand' value='" + current.DivisionId + "' /><span>" + current.DivisionName + "</span>";
                            str +="<ul style='margin: 5px'>";
                            str+="   <li style='margin-left: -15px;'>";
                            str+="      <input type='checkbox' class='checkAll' checked='checked'>全选</input></li>";
                            str+="   <li style='margin-left: -15px;'>";
                            str+="      <input type='checkbox' checked='checked' value='" + current.SegmentId + "'>" + current.SegmentName + "(" + current.DSCount + ")</input>";
                            if (current.Childs != null && current.Childs.length > 0) {
                                str+= "<ul style='margin: 5px'>";
                                $.each(current.Childs,function(index,cu){
                                    str += "<li style='margin-left: -15px;'><input type='checkbox' checked='checked' value='" + cu.SegmentId + "'>" + cu.SegmentName + "(" + cu.Count + ")</input></li>";
                                });
                                 str+="</ul";
                            }
                            str+= "</li>";
                            str+="</ul>";
                          str+="</div>";
                        });
                    }

                    if (result.length != 0) {
                        str += "<div class='filterApply'><input type='button' class='setButton' style='margin: 5px' value='筛选'></input><input style='margin: 5px' type='button' class='cleanButton' value='重选'></input></div>";
                    }
                    $('#teamsearchList').html(str);
                });
        }

    }
    LS.TeamSites = new function () {
        this.Initialize = function () { }
        this.GetTeamSites = function (userName) {
            // get all the teams this user has administration rights with
            LS.util.SendAjaxCall('getteamsforuser', 'UserAjax',
               [{ Name: 'userName', Value: userName, TileId: 1 }],
               null, $('.center-side'),
               function (result) {
                   var str = "";
                   if (result != null && result.length > 0) {
                       $.each(result, function (index, current) {
                           str += " <li class='goods_li' style='cursor: pointer'>";
                           str += "<div class='mod_goods'>";
                           str += " <div class='mod_goods_img'>";
                           str += "<a class='link_pic' target='_blank' href='#'>";
                           if (current.TeamLogo == null) {
                               str += "     <img style='width:200px; height:200px' alt='' src='../Images/default-team.png' />";
                           }
                           else {
                               str += "     <img style='width:200px; height:200px' alt='' src='" + current.TeamLogo + "' />";
                           }
                           str += "</a>";
                           str += " </div>";
                           str += " <div class='mod_goods_info'>";
                           str += " <p class='mod_goods_tit'><a href='' target='_blank' title=''>团队名称: " + current.TeamName + "</a></p>";
                           str += "<p class='mod_goods_tit' title=''>成立时间: " + current.CreatedDate + "</p>";
                           str += " <p class='mod_goods_price'>团队人数: 100人</p>";
                           str += "</div>";
                           str += "</div>";
                           str += "<li>";
                       });

                   }
                   $('.goods_ul').append(str);
               });
        }

    }


    LS.util = new function () {
        this.SendAjaxCall = function (requestType, serverletName, urlParamNames, paramData, loadingArea, callBack)
        {
            var url = LS.util.GetUrl(serverletName);
            url += "?requestType=" + requestType;
            if (urlParamNames != null && urlParamNames.length > 0)
            {
                var str = "";
                for (var i = 0; i < urlParamNames.length; i++)
                {
                    str += "&"+urlParamNames[i].Name+'='+urlParamNames[i].Value;
                }
                url += str;
            }
            console.log(url);

            $.ajax({
                url: url,
                type: "POST",
                data: { queryParam: JSON.stringify(paramData) },
                async: false,
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    if (callBack != null)
                        callBack(result);
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        }

        this.GetUrl=function(serverPageName){
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/' + serverPageName;
            return url;
        }
    }

})(window.LS = window.LS || {}, $, undefined);