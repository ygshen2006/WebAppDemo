(function (URP, $, undefined) {
    URP.teamSiteAdmin = new function () {
        this.TeamInfo = {
        }

        this.ArticleManagement = {

        }
        this.TeamTagManagement = new function () {
            this.Init = function () {
                $('#addnewtag').live('click', function (e) {
                    $('.tags').append("<tr><td><a href='#' class='tSave'>保存</a></td><td><input tid='-1' type='text' class='newtagtext' /></td></tr>");
                });

                $('.tSave').live('click', function (e) {
                    var tbName = $(this).parent().parent().find('.newtagtext')[0];
                    if ($(tbName).val().trim() == '') {

                        alert('请输入标签名字!');
                        $(tbName).focus();
                    }
                    else {
                        var oldTagId = $(tbName).attr('tid');

                        var val = $(tbName).val().trim();
                        // replace the txtbox to be lable
                        var p = $(tbName).parent();
                        $(tbName).remove();

                        p.append("<lable tid='" + oldTagId + "' class='newtaglable'>" + val + "</lable>");

                        // Change the save mode to delete mode
                        var actionParent = $(this).parent();
                        $(this).remove();
                        actionParent.append("<a href='#' class='tRemove'>删除</a>");
                    }
                });

                $('.newtaglable').live('click', function (e) {
                    var oldTagId = $(this).attr('tid');
                    var current = $(this).parent().parent();
                    var val = $(this).text().trim();
                    // replace the txtbox to be lable
                    var p = $(this).parent();

                    $(this).remove();

                    p.append("<input type='text' tid='" + oldTagId + "' class='newtagtext' value='" + val + "'/>");

                    var action = $(current).find('.tRemove')[0];

                    var actionParent = $(action).parent();
                    $(action).remove();
                    actionParent.append("<a href='#' class='tSave'>保存</a>");
                });

                $('.tRemove').live('click', function (e) {
                    var tr = $(this).parent().parent();
                    $(tr).remove();
                });
                $('#submit').live('click', function (e) {
                    //if there are unsaved tags
                    if ($('.newtagtext').length == 0) {
                        var tags = [];

                        $.each($('.tags tr'), function (index, current) {
                            var val1 = $(current).find('.newtagtext');
                            var val2 = $(current).find('.newtaglable');
                            if (val1.length > 0) {
                                tags.push({ 'Id': $(val1).attr('tid'), 'Title': val1.val() });
                            }
                            if (val2.length > 0) {
                                tags.push({ 'Id': $(val2).attr('tid'), 'Title': val2.text() });
                            }
                        });

                        var baseUrl = URP.teamSiteAdmin.getBaseUrl();
                        // Send ajax call to the tags
                        $.ajax({
                            url: baseUrl,
                            cache: false,
                            type: 'Get',
                            data: { queryType: 'updatetags', SiteGUID: $('#siteguid').val(), TagData: JSON.stringify(tags) },
                            dataType: 'json',
                            timeout: 60000,
                            beforeSend: function () {
                                //$('<div class="mark"><div class="donut"></div></div>').appendTo($('.dashboard-body .grid'));
                            },
                            complete: function () {
                                //$('.dashboard-body .grid .mark').remove();
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert('status :' + XMLHttpRequest.status + '; readyState:' + XMLHttpRequest.readyState + '; textStatus:' + textStatus);
                            },
                            success: function (result) {
                                // load all the tags
                                $('.tags tr').remove();


                                var str = "";
                                if (result != null && result.length > 0) {

                                    $.each(result, function (index, current) {
                                        str += '<tr><td><a href="#" class="tRemove">删除</a></td><td><lable tid="' + current.Id + '" class="newtaglable">' + current.Title + '</lable></td></tr>';
                                    });

                                }
                                $('.tags').append(str);
                            }
                        });
                    }
                    else {
                        alert("请保存你的更改，然后点击提交");
                    }
                    });
                
            }
            this.LoadExistingTags = function () {
                $('.tags tr').remove();

                var baseUrl = URP.teamSiteAdmin.getBaseUrl();
                // Send ajax call to the tags
                $.ajax({
                    url: baseUrl,
                    cache: false,
                    type: 'Get',
                    data: { queryType: 'getsitetags', SiteGUID: $('#siteguid').val() },
                    dataType: 'json',
                    timeout: 60000,
                    beforeSend: function () {
                        //$('<div class="mark"><div class="donut"></div></div>').appendTo($('.dashboard-body .grid'));
                    },
                    complete: function () {
                        //$('.dashboard-body .grid .mark').remove();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('status :' + XMLHttpRequest.status + '; readyState:' + XMLHttpRequest.readyState + '; textStatus:' + textStatus);
                    },
                    success: function (result) {
                        // load all the tags
                        var str = "";
                        if (result != null && result.length > 0) {

                            $.each(result,function(index,current){
                                str += '<tr><td><a href="#" class="tRemove">删除</a></td><td><lable tid="' + current.Id + '" class="newtaglable">' + current.Title + '</lable></td></tr>';
                            });

                        }
                        $('.tags').append(str);
                    }
                });
            }
        }

        this.Initial = function () {
            var siteGuid = GetQueryString('SiteGuid');
            $('#siteguid').val(siteGuid);

            // Switch between tabs 
            var div_li = $("#managelist li");

            $('#managelist li').live('click', function (e) {
                e.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');

                var currentSelected = $(div_li).index($(this));
           
                $('.tab_box > div').eq(currentSelected).removeClass('hide')
                    .siblings().addClass('hide');

                //if current tab is the tag management tab. Load the old tags
                if ($(this).hasClass('tagtab'))
                {
                    // load the existing tags for current team

                    $('.tags tr').remove();


                    URP.teamSiteAdmin.TeamTagManagement.LoadExistingTags();
                }
            });

         
            URP.teamSiteAdmin.TeamTagManagement.Init();

        }

        this.getBaseUrl = function () {
            var baseUrl = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/TeamSiteAdminAjax';
            return baseUrl;
        }
        function GetQueryString(name) {
            var r = window.location.search.split('=')[1];
            return r;
        }
    }

}(window.URP = window.URP || {}, jQuery));

$(function () {
    

    URP.teamSiteAdmin.Initial();
});