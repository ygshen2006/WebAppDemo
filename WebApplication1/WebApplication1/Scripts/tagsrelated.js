(function (tagrelate, $, undefined) {

    tagrelate.Init = new function () {

        this.getTagRelatedArticles = function () {
            var tagid = tagrelate.Util.getCurrentTeamGuid(1);
            var teamid = tagrelate.Util.getCurrentTeamGuid(2);

            var requesttype = "gettagrelatedarticles";
            var loadingarea = $('.wrapper');
            var url = tagrelate.Util.getBaseUrl() + "?requestType=" + requesttype+"&teamid="+teamid+"&tagid="+tagid;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingarea.showLoading();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    if (result != null) {
                        showTags(result);
                    }
                },
                complete: function () {
                    loadingarea.hideLoading();
                },
            });
        }

        showTags: function showTags(reports) {
            var str = "";
            $.each(reports, function (index, current) {
                str += " <div class='item clearfix'>";
                str += "<div class='thumb-img'>";
                str += " <a>";
                if (current.ReportFeaturePics != null && current.ReportFeaturePics.length > 1) {
                    str += "<img style='height:192px; width:300px; border-radius:10px;' src='" + current.ReportFeaturePics[0] + "' />";
                }
                else {
                    str += "<img style='height:192px; width:300px; border-radius:10px;' src='../Images/5.jpg' />";
                }
                str += "</a> </div>";
                str += "<div class='item-con'>";
                str += "<h2><a href='../AddReport/PostDetail.aspx?teamsiteid=" + tagrelate.Util.getCurrentTeamGuid(2) + "?postid=" + current.ID + "'>" + current.ReportName + "</a></h2>";
                str += " <p class='des'>" + current.ReportDescription + "</p>";
                str += " <div class='autor-meta'>";
                str += " <a class='author'>";
                if (current.ReportOwners[0].UserPhoto == null) {
                    if(current.ReportOwners[0].Sex==true){
                        str += "<img src='../Images/men.png' />";
                    }
                   else{
                        str += "<img src='../Images/women.png' />";
                    }
                }

                else
                    {str += tagrelate.Util.HTMLDecode(current.ReportOwners[0].UserPhoto);}
                str += "<span class='name'>" + current.ReportOwners[0].UserName + "</span>";
                str += "</a></div></div></div>";
            });

            $('.news-list').append(str);
        }
    }

    tagrelate.Util = new function () {
        this.getCurrentTeamGuid = function (index1) {
            var currentUrl = window.document.URL;

            var teamGuid = "";
            if (currentUrl != null) {
                teamGuid = currentUrl.split('?')[index1].split('=')[1];
            }
            else {
                console.error("current url is blank");
            }

            return teamGuid;

        }
        this.HTMLDecode = function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }
        this.getBaseUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/AddNewReport';
            return url;
        };
    }
})(window.tagrelate = window.tagrelate || {}, $, undefined);