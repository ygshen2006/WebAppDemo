(function (TeamSites, $, undefined) {
    TeamSites.teamsitesLoading = new function () {
        var currentSelectedTile = undefined;
        var div_li = $('nav ul li');
        var baseUrl = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/TeamAdminAjax';
        var teamSitesText = '   <div class="panel" data-role="panel">' +

                                    '' +
                                        '{Segment}' +
                                    '</div>';
                                //    '<div class="panel-content" style="display: block; border: none">'+

                                //    '</div>'+
                                //'</div>';

        
        this.Init = function () {
            $.ajaxSetup({
                crossDomain: true,
                cache: false,
                async: true
            });
            this.InitTeamSiteDivisions();
            
            $('.btn-search').live('click', function (e) {
                e.preventDefault();
                $('.teamsselected').remove();
                var str = "<div class='teamsselected'><ul>";
                var teamname = $('#teamnameinput').val().trim();
                if (teamname == null) {
                    // do nothing
                    $('#foundnoteam').removeClass('noresult').addClass('noresult');
                }
                else {
                    // select teams has the team name contains and list them in the div
                    $.ajax({
                        url: baseUrl + "?requestType=searchteams&teamname=" + teamname,
                        type: "POST",
                        dataType: "json",
                        data: {},
                        timeout: 99000,
                        beforeSend: function () {
                        },
                        error: function (xhr, status, error) {
                            console.log(error);
                        },
                        success: function (result) {
                            // load the segment and teamsites
                            if (result != null && result.length > 0) {
                                $('#foundnoteam').addClass('noresult');
                                $.each(result, function (index, icurrent) {
                                    var pic = "../Images/1.jpg";

                                    if (icurrent.TeamLogo != null) {
                                        pic = icurrent.TeamLogo;
                                    }
                                    str += '<li class="teampic" style="list-style: none; ">';
                                    str += '<div class="teamsitetile-small">';
                                    str+='          <div class="tile live half">';
                                    str += '              <div class="tile-content image">';
                                    str += '                  <img class="teamtag" src="' + pic + '" tag="' + icurrent.TeamGuid + '" />';
                                    str+='              </div>';
                                    str +='             <div class="tile-status bg-dark opacity teamtitlefont">' + icurrent.TeamName;
                                    str+=  '            </div>';
                                    str+='          </div>';
                                    str += ' </div>';
                                    str += '<div class="teamdescarea">';
                                    str += '      <span>' + icurrent.TeamName + '</span>  ';
                                    str += '</div>';
                                    str += '</li>';
                                });
                                str += "</ul></div>";
                                $('.teamseachzone').append(str);
                            }
                        },
                        complete: function () {
                        },
                    });
                }
            });
            $('.teamsitetile-seg').live('click', function (e) {
                // If you click a sub segment.
                var that = $(this).parent();
                $(this).remove();
                // Append the teams in this segment

                '<div class="teamsitetile"><div class="tile double live" data-role="live-tile" effect="slideLeft"><div class="tile-content image"><img class="teamtag" src="' + pic + '" /></div><div class="tile-status bg-dark opacity teamtitlefont">' + icurrent.title + '</div></div></div>';
                $(that).append();
            });
            $('#divisionlist li').live('click', function (e) {
                if ($(this).hasClass('active')) {
                    return;
                }
                currentSelectedTile = $(this).attr('tag');

                $(this).addClass('active');
                $.each($(this).siblings(), function (index, current) {
                    $(current).removeClass('active');
                });
                
                
                $.each($('.tab_box .panel'), function (index, current) {
                    $(current).remove();
                });
                var str = '';
                // get the segment and teams sites belonging to current division
                $.ajax({
                    url: baseUrl + "?requestType=getsegmentandteams&divisionid=" + currentSelectedTile,
                    type: "POST",
                    dataType: "json",
                    data: {},
                    timeout: 99000,
                    beforeSend: function () {
                    },
                    error: function (xhr, status, error) {
                        console.log(error);
                    },
                    success: function (result) {
                        // load the segment and teamsites
                        if (result != null && result.length > 0) {
                            $.each(result, function (index, current) {

                                str += '<div class="panel" data-role="panel" style="float:left; width: 810px; border:none">'+
                                    '<div class="panel-header segment"><span style="margin-left: 10px">';
                                        str += current.title;
                              str += "</span></div>";

                                str += '<div class="panel-content" style="display: block; border: none; margin: 0 auto">';
                                $.each(current.children, function (iindex, icurrent) {
                                    // if this is a team?
                                    if (icurrent.tooltip == 'team') {
                                        var pic = "../Images/1.jpg";

                                        if (icurrent.teampic != null) {
                                            pic = icurrent.teampic;
                                        }

                                        str += '<div class="teamsitetile teampic" style="padding: 10px; 10px">' +
                                                '<div class="tile live" data-role="live-tile" effect="slideLeft">' +
                                                    '<div class="tile-content image">' +
                                                        '<img class="teamtag" src="' + pic + '" tag="' + icurrent.TeamGuid + '"/>' +
                                                    '</div>' +
                                                    '<div class="tile-status bg-dark opacity teamtitlefont">'
                                                        + icurrent.title +
                                                    '</div>' +
                                                 '</div>' +
                                               '</div>';
                                    }
                                    else {
                                        // this is a subsegment
                                        str += '<div class="teamsitetile-seg"><div class="tile double live" data-role="live-tile" effect="slideLeft"><div class="tile-content bg-lime image teamtag" tag="' + icurrent.SegmentGuid + '">子单位<div class="tile-status bg-dark opacity teamtitlefont">' + icurrent.title + '</div></div></div>';
                                    }
                                });
                                str += '</div>';
                                str += '</div>';
                            });

                        }
                        $('.tab_box').append(str);

                    },
                    complete: function () {
                    },
                });
            });
            this.GetTeamSiteAndSegments();

            $('.teampic').live('click', function (e) {
                var teamguid =$(this).find('.teamtag').attr('tag');
                
                if (teamguid != '00000000-0000-0000-0000-000000000000') {
                    // navigate to team site page
                    var win = window.open("../TeamSite/MyTeamSitePage.aspx?teamguid=" + teamguid, '_blank');
                    win.focus();
                }
            });
        }
        this.InitTeamSiteDivisions = function () {

            $.ajax({
                url: baseUrl + "?requestType=getdivisions",
                type: "POST",
                dataType: "json",
                data: { },
                timeout: 99000,
                beforeSend: function () {
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    // load the divsions
                    var divsionsStr = "";
                    $.each(result, function (index, current) {
                        var color;
                        if (index % 2 == 0) {
                            color = 'bg-yellow';
                            }
                        else {
                            color = 'bg-green';
                        }
                        divsionsStr += "<li tag='" + current.Id + "' class='stick " + color + "'><a href='#'><i class='icon-home'></i>" + current.title + "</a></li>";
                    });
                    $('#divisionlist').append(divsionsStr);
                },
                complete: function () {
                },
            });
        }
        this.GetTeamSiteAndSegments = function () {
            
        }
        this.Utility = new function () {
            this.GetBaseUrl = function () {
                var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/TeamAdminAjax';
                return url;
            };
        }
        
    }
}(window.TeamSites = window.TeamSites || {}, jQuery));

$(function () {
    TeamSites.teamsitesLoading.Init();

    if ($('#divisionlist li')[0] != null) {
        $('#divisionlist li:first').trigger('click');
    }
});