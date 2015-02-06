(function (ST, $, undefined) {
    var newAdded = 0;

    var divisionChangeTimes = 0;
    var segmentChangeTimes = 0;
    var subSegmentChangeTimes = 0;
    var teamChangeTimes = 0;

    var activeNode;

    var divisions = [];
    var segements = [];
    var subSegments = [];
    var teams = [];

    var divisions1 = [];
    var segements1 = [];
    var subSegments1 = [];
    var teams1 = [];

    var tempSegmentName;
    var tempTeamList = [];

    var teamsAvailable = [];

    var allNodes = [];
    ST.LoadTeamHierarchy = function () {
        LoadTeamHierarchy();
    }
    ST.Initiate = function () {
        var div_li = $("#nav-id ul li");
        $("#team a")[0].click();

        // Loading the intrests and teams to show
        $("#nav-id ul li").click(function () {
            $(this).addClass("active")
                   .siblings().removeClass("active");
            var index = div_li.index($(this));
            $("div.tab_box > div")
                    .eq(index).show()
                    .siblings().hide();
            if ($(this).attr('id') == 'intrest') {
                ST.LoadTeamHierarchy();
            }
            else if ($(this).attr('id') == 'team') {
                // Load existing teams 
                ST.util.GetAdminTeamSite($('.wrapper'), function (resultNew) {
                    var str = '';
                    if (resultNew != null && resultNew.Teams != null) {
                        $.each(resultNew.Teams, function (index, current) {
                            str += "<tr><td><span class='span-teamname' teamid='" + current.Id + "'>" + current.TeamName + "</span></td><td><span class='span-teamdesc'>" + current.TeamDescription + "</span></td><td><span class='span-teamowner'>" + current.TeamOwners + "</span></td>";
                            if (current.TeamLogo == '') {
                                str += '<td>无</td>';
                            }
                            else {
                                str += "<td><div style='position:relative'><img class='team-logo' src='" + current.TeamLogo + "' /></div></td>";
                            }
                            //if (current.ReportsRelated.length == 0)
                            //{
                            //}
                            str += '</tr>';
                        });
                        $('.teamlist-body').children().remove().end().append(str);
                    }
                });
            }
            else if ($(this).attr('id') == 'category') {
                ST.util.GetCategory($('.wrapper'), 0, function (resultNew) {
                    if (resultNew != null && resultNew.length > 0) {
                        var str = '';
                        $('.child-category-list').children().remove();
                        $.each(resultNew, function (index, current) {
                            str += "<tr><td><select class='select-parent-category'><option value='" + current.ParentId + "' selected='true'>" + current.ParentCategory.CategoryName + "</option></select></td><td><span class='child-category-name' PId=" + current.Id + ">" + current.CategoryName + "</span></td>";
                            if (current.Reports == null) {
                                str += "<td><a href='#' class='category-delete'>删除...</a></td>";
                            }
                            else {
                                str += "<td></td>";
                            }
                            str += '</tr>';
                        });
                        $('.child-category-list').append(str);
                    }
                });
            }
            else if ($(this).attr('id') == 'links') {
                ST.util.GetUsefulLinks($('.wrapper'), 0, function (result2) {
                    if (result2 != null && result2.length > 0) {
                        $('.child-link-list').children().remove();

                        var str = '';
                        $.each(result2, function (index, current) {
                            
                                str += "<tr><td><select class='select-parent-link'><option value=" + current.ParentId + ">" + current.ParentLink.LinkName + "</option></select></td><td><span class='child-link-name' Id='" + current.Id + "'>" + current.LinkName + "</span></td><td><span class='child-link-url'>" + current.URL + "</span></td>";

                                str += "<td><a class='plink-delete' href='#'>删除...</a></td>";
                                str += '</tr>';
                            
                        });

                        $('.child-link-list').append(str);
                    }
                });
            }
        }).hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        });
        // Add a new team
        $('.add-team').live('click', function (e) {
            e.preventDefault();
            $('.save-team').attr('disabled', 'disabled');

            if ($('.reset-team').attr('disabled') == 'disabled') {
                $('.reset-team').removeAttr('disabled');
            }
            // before adding, find whether there is some team has invalid value
            var show_erro = 0;
            $.each($(".teamlist-body td input[type=text]"), function (index, current) {
                if ($(current).val() == '') {
                    $(current).addClass('error-circle');
                    $('.error-msg').show();
                    show_erro = 1;
                }
            });
            if (show_erro == 1) {
                $('.save-team').attr('disabled', 'disabled');
                return;
            }

            var str = '';
            str += "<tr><td><input class='name-value' type='text' tag=''/></td><td><input class='desc-value' type='text' /></td><td><div class='show_hints' style='position:relative'><textarea id='Text1' cols='20' rows='2' class='owner-value'></textarea></div></td><td><div style='position:relative'><a href='#' class='uploadPictureBt'>上传..</a> </div></td></tr>";
            $('.teamlist-body').append(str);
        });
       
        $('.owner-value').live('keyup', function (e) {
            var userNameValue = $(this).val().trim();

            var lastSeperater = userNameValue.lastIndexOf(';');
            var currentUserName = userNameValue.substring(lastSeperater+1, userNameValue.length);

            if (currentUserName.length > 2) {
                var that = $(this);
                var pare = $(that).parent();
                if ($('.intrest-select').length == 0) {
                    $(pare).append(" <div class='intrest-select'> <div class='intrest-list'></div> </div>");
                }
                $(pare).find('.intrest-list').children().remove();
                $('.intrest-select').css('position', 'absolute').css('left', $(that).css('left')).css('top', $(that).css('top') + 100 + 'px').show();
                // get the users 

                ST.util.GetUsers($('.intrest-select'), currentUserName, function (result) {
                    if (result != null && result.length > 0) {
                        // Show the user in the div list for select
                        $.each(result, function (index, current) {
                            var str = "<div class='move'>";

                            str += "<div class='up" + index + "'> </div><div class='un' style='margin-left:5px; font-weight:bold'>" + current.UserName + "</div>";

                            str += "</div>";
                            // If this user is doesn't have picture. use a default phot
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

                            $('.intrest-list').append(str);

                            $(".up" + index + "").html(ST.util.HTMLDecode(d));
                        });
                    }
                    else {
                        var str2 = "<div>找不到用户</div>";
                        $('.intrest-list').append(str2);
                    }
                });

            }
            else {
                $(this).parent().find('.intrest-select').remove();
            }
        }).live('blur', function (e) {
            
        });

        $('.move').live('click', function (e) {
            var uname = $(this).find('.un')[0].innerText;

            var lastIndexOfSeperator = $('#Text1').val().lastIndexOf(';');
            var newName = $('#Text1').val().substr(0,lastIndexOfSeperator+1);
            // Substring the last name text
            
            $('#Text1').val(newName+uname+';');
           $('.intrest-select').find('.intrest-list').children().remove();
           $('.intrest-select').remove();
        });
        var selectedZone = {};
        var input = $('#imageSelect').browseElement();
        $(input).change(function () {
            var file = $(input)[0].files['0'];
            if (file != null) {
                var that = $(selectedZone).parent();

                ST.util.UploadImage(file, $(this), function (result) {
                    $(that).children().remove();
                    $(that).append("<img class='team-logo' src='" + result + "' />");
                });
            }
        });
        
        
        $('.name-value').live('blur', function (e) {
            var that = $(this);
            e.preventDefault();
            var has_duplicated = 0;
            var all_names = $('.teamlist-body').find('.name-value');

            $.each(all_names, function (index, current) {
                if ($(current).val().trim() == $(that).val().trim()) {
                    has_duplicated++;
                }
            });

            if (has_duplicated > 1) {
                alert($(that).val() + ' 团队名字已经存在');
                $(that).focus();
                $('.save-team').attr('disabled', 'disabled');
            }
            else {
                var allText = $('.teamlist-body input[type=text]');
                var has_invalid = 0;
                $.each(allText, function (index, current) {
                    if ($(current).val().trim() == '') {
                        has_invalid = 1;
                    }
                });
                if (has_invalid == 0)
                    $('.save-team').removeAttr('disabled');
            }
        });
        $('.desc-value, .owner-value, .name-value, .intrest-value').live('change', function (e) {
            var that = $(this);
            var allText = $('.teamlist-body input[type=text]');
            if ($(this).val().trim() != '') {
                if ($(this).hasClass('error-circle')) {
                    $(this).removeClass('error-circle');
                }
            }

        }).live('blur', function () {
            var allText = $('.teamlist-body input[type=text]');
            var that = $(this);

            var error_show = 0;

            $.each(allText, function (index, current) {
                if ($(current).val().trim() == '') {
                    //$(current).removeClass('error-circle').addClass('error-circle');
                    error_show = 1;
                }
            });

            if (error_show == 0) {
                $('.error-msg').hide();
                $('.save-team').removeAttr('disabled');
                $(that).removeClass('error-circle');
            }
            else {
                $('.save-team').attr('disabled', 'disabled');
            }
        });
        $('.uploadPictureBt').live('click', function (e) {
            e.preventDefault();
            selectedZone = $(this);
            $(input).trigger('click');
        });

        $('.reset-team').live('click', function (e) {
            e.preventDefault();
            $(this).attr('disabled', 'disabled');
            $('.save-team').attr('disabled', 'disabled');

            if ($('.error-msg').length == 1) {
                $('.error-msg').hide();
            }
            // Remove all the rows that are editing now
            $.each($('.teamlist-body tr'), function (index, current) {
                if ($(current).find(':text').length > 0) {

                    if ($(current).find('.team-logo').length > 0) {
                        // has logo to remove
                        var cleanItem = [];
                        cleanItem.push($(current).find('.team-logo').attr('src'));
                        ST.util.RemoveImage(cleanItem, $(current), function (result) {
                            alert('succeed');
                            $(current).remove();
                        });
                    }
                    else {
                        $(current).remove();
                    }
                }
            });
        });
        $('.save-team').live('click', function (e) {
            e.preventDefault();
            var params = { 'Teams': [] };
            var allTeamsNeedSave = $('.teamlist-body').find('tr');
            if ($('.owner-value').length == 0)
            {
                // do remove action
                return;
            }
            var validate = ValidateTeamOwnerList($('.owner-value').val().trim());
            if (validate == true) {
                $.each(allTeamsNeedSave, function (index, current) {
                    if ($(current).find('.name-value').length > 0) {
                        var team_name = $(current).find('.name-value').val();
                        var team_desc = $(current).find('.desc-value').val();

                        var team_owners = $(current).find('.owner-value').val().trim();

                        var team_logo = $(current).find('.team-logo').attr('src');
                        var Id = $(current).find('.name-value').attr('tag');

                        var data = { 'Id': Id, 'TeamName': team_name, 'TeamDescription': team_desc, 'TeamOwners': team_owners, 'TeamLogo': team_logo };
                        params.Teams.push(data);
                    }
                    var ext = $(current).find('.span-teamname');
                    if (ext.length > 0) {
                        var team_existed_name = $(current).find('.span-teamname').val();
                        var team_existed_Id = $(current).find('.span-teamname').attr('teamid');

                        var data2 = { 'Id': team_existed_Id };
                        params.Teams.push(data2);
                    }
                });


                // Need to push those existing teams into the list
                ST.util.SaveTeamSite($('.wrapper'), params, function (result) {

                    // Add the team back to the listview
                    ST.util.GetAdminTeamSite($('.wrapper'), function (resultNew) {
                        var str = '';
                        if (resultNew != null && resultNew.Teams != null) {
                            $.each(resultNew.Teams, function (index, current) {
                                str += "<tr><td><span class='span-teamname' teamid='" + current.Id + "'>" + current.TeamName + "</span></td><td><span class='span-teamdesc'>" + current.TeamDescription + "</span></td><td><span class='span-teamowner'>" + current.TeamOwners + "</span></td>";
                                if (current.TeamLogo == '') {
                                    str += "<td>无</td>";

                                }
                                else {
                                    str += "<td><div style='position:relative'><img src='" + current.TeamLogo + "' class='team-logo'/></div></td>";

                                }
                                //if (current.ReportsRelated.length == 0)
                                //{
                                //}
                                str += '</tr>';
                            });
                            $('.teamlist-body').children().remove().end().append(str);
                        }
                    });
                });

                $('.save-team').attr('disabled', 'disabled');
            }
        });
        $('.team-delete').live('click', function (e) {
            e.preventDefault();
            $(this).parent().parent().remove();

            $('.save-team').removeAttr('disabled');

        });
        $('.team-logo').live('mouseover', function (e) {
            // add a div to show the bigger picture
            var that = $(this);
            $(this).parent().append("<div class='pic-big'><img src='" + $(that).attr('src') + "' /></div>");
            $('.pic-big').css('position', 'absolute').css('left', e.left).css('top', e.top).show();
        }).live('mouseout', function (e) {
            $('.pic-big').remove();
        });

        // Manage team hieararchy
        $('#add-div').live('click', function (e) {
            e.preventDefault();
            // Remember current active node
            activeNode = $("#test").dynatree("getActiveNode");
            $('.addDivisionDialog').bPopup();
        });
        $('#add-seg').live('click', function (e) {
            var node = $("#test").dynatree("getActiveNode");
            
            e.preventDefault();
            $('#team-list').children().remove();
            // Get the latest available teams and show them in the list
            var str = GetAvailableTeamString($('#team-list'));

            $('#team-list').append(str);

            activeNode = $("#test").dynatree("getActiveNode");
            $('.addSegDialog').bPopup();
        });
        $('#add-sub-seg').live('click', function (e) {
            $('#subteam-list').children().remove();
            e.preventDefault();
            var str = GetAvailableTeamString($('#subteam-list'));
            $('#subteam-list').append(str);

            activeNode = $("#test").dynatree("getActiveNode");
            $('.addSubSegDialog').bPopup();
        });

        $('#remove-item').live('click', function (e) {
            activeNode = $("#test").dynatree("getActiveNode");
            var parentNode = activeNode.getParent();

            // See if this 
            var r = confirm('Either remove division or segments will have the team not found from customer view. Are your sure?');
            if (r == true) {
                // Get the selected node 
                var node = $("#test").dynatree("getActiveNode");
                RemoveNode(node, parentNode);

            } else {
                activeNode.activate();
                return;
            }

        });

        $('#cancel-div-bt').live('click', function (e) {
            e.preventDefault();
            $('.addDivisionDialog').bPopup().close();
            activeNode.activate();

        })
        $('#cancel-seg-bt').live('click', function (e) {
            e.preventDefault();
            $('.addSegDialog').bPopup().close();
            activeNode.activate();
        })
        $('#cancel-subseg-bt').live('click', function (e) {
            e.preventDefault();
            $('.addSubSegDialog').bPopup().close();
            activeNode.activate();
        })


        $('#save-div-bt').live('click', function (e) {
            e.preventDefault();
            newAdded = 1;
            // Call save method to save the new entry
            var node = $("#test").dynatree("getActiveNode");

            var nodeLevel = node.getLevel();
            var key = nodeLevel + "-" + (divisionChangeTimes--);

            var existedChildren = node.getChildren();
            if (existedChildren != null && existedChildren.length > 0) {
                if (ChildrenExisted(existedChildren, $('#divisionName').val().trim())) {
                    // Existed already
                    alert('Division ' + $('#divisionName').val().trim() + ' Already Existed');
                    return;
                }
            }

            var childNode = node.addChild({
                isFolder: true,
                title: $('#divisionName').val().trim(),
                tooltip: "division",
                key: key
            });
            $('.addDivisionDialog').bPopup().close();
            $('#save-changes').show();
            activeNode.activate();

            divisions.push(key);
        })
        $('#save-seg-bt').live('click', function (e) {
            e.preventDefault();
            $('#save-changes').show();
            newAdded = 1;
            var node = $("#test").dynatree("getActiveNode");

            var pnode = node.getParent();
            var selectedTeams = $('#team-list').children().find("input:checked");

            var nodeLevel = node.getLevel();
            var key = nodeLevel + "-" + (segmentChangeTimes--);

            var title = $('#segmentName').val().trim();
            var tooltip = 'segment';

            AddSeg(node, node, key, title, tooltip, selectedTeams);
            segements.push(key);

            $('.addSegDialog').bPopup().close();
            activeNode.activate();
        })
        $('#save-subseg-bt').live('click', function (e) {
            e.preventDefault();
            newAdded = 1;

            // Call save method to save the new entry
            var node = $("#test").dynatree("getActiveNode");

            var nodeLevel = node.getLevel();
            var key = nodeLevel + "-" + (subSegmentChangeTimes--);


            var existedChildren = node.getChildren();
            if (existedChildren != null && existedChildren.length > 0) {
                if (ChildrenExisted(existedChildren, $('#subsegmentName').val().trim())) {
                    // Existed alread
                    alert('Sub-Segment ' + $('#subsegmentName').val().trim() + ' Already Existed');
                    return;
                }
            }
            var selectedTeams = $('#subteam-list').children().find("input:checked");

            AddSeg(node, node, key, $('#subsegmentName').val().trim(), 'subsegment', selectedTeams);


            $('.addSubSegDialog').bPopup().close();
            $('#save-changes').show();

            activeNode.activate();
            subSegments.push(key);
        })

        $('#existcancel-seg-bt').live('click', function (e) {
            e.preventDefault();
            $('.EditSegDialog').bPopup().close();
        })
        $('#existcancel-subseg-bt').live('click', function (e) {
            e.preventDefault();
            $('.editSubSegDialog').bPopup().close();
        })

        $('#existsave-seg-bt').live('click', function (e) {

            e.preventDefault();
            //check required field
            if ($('#oldsegmentname').val().trim() == '') {
                alert('Segement name shall not be null');
                return;
            }

            var node = $("#test").dynatree("getActiveNode");
            var pnode = $("#test").dynatree("getActiveNode").getParent();

            // Get the team selectec list
            var teamsSelected = [];

            var teamsNodeRelated = $('#existteam-list').children().find('input');
            if (teamsNodeRelated != null && teamsNodeRelated.length > 0) {
                for (var i = 0; i < teamsNodeRelated.length; i++) {
                    var checkedItem = $(teamsNodeRelated[i]).attr('checked');
                    if (checkedItem) {
                        teamsSelected.push($(teamsNodeRelated[i]));
                    }
                }
            }

            var teamsValue = [];
            $.each($(teamsSelected), function (index, current) {
                teamsValue.push($(current).attr('value'));
            });
            // Compare the segment name and teamlist array
            if (($('#oldsegmentname').val().trim().toLowerCase() == tempSegmentName.toLowerCase()
                && ComapreArray(tempTeamList, teamsValue))) {
                // No changes to the property
                $('.EditSegDialog').bPopup().close();
                // no need to add the key to the segments array, because we use old key
                pnode.activate();

                return;
            }
            else {
                // Remove the old node in the tree, and update the new node to the tree
                $('#save-changes').show();
                UpdateNode(node, pnode, $('#oldsegmentname').val().trim(), $(teamsSelected));

                $('.EditSegDialog').bPopup().close();
                // no need to add the key to the segments array, because we use old key
                pnode.activate();
            }
        })
        $('#existsave-subseg-bt').live('click', function (e) {
            var node = $("#test").dynatree("getActiveNode");
            var pnode = $("#test").dynatree("getActiveNode").getParent();

            e.preventDefault();
            //check required field
            if ($('#oldsubsegmentname').val().trim() == '') {
                alert('Segement name shall not be null');
                return;
            }
            var pnode = $("#test").dynatree("getActiveNode").getParent();

            if (!VerifyChildrenExisted(pnode, $('#oldsubsegmentname').val().trim())) {
                alert('SubSegment' + $('#oldsubsegmentname').val().trim() + ' already existed');
                return;
            }

            // Get the team selectec list
            var teamsSelected = [];

            var teamsNodeRelated = $('#existsubteam-list').children().find('input');
            if (teamsNodeRelated != null && teamsNodeRelated.length > 0) {
                for (var i = 0; i < teamsNodeRelated.length; i++) {
                    var checkedItem = $(teamsNodeRelated[i]).attr('checked');
                    if (checkedItem) {
                        teamsSelected.push($(teamsNodeRelated[i]));
                    }
                }

            }
            var teamsValue = [];
            $.each($(teamsSelected), function (index, current) {
                teamsValue.push($(current).attr('value'));
            })
            // Compare the segment name and teamlist array
            if (($('#oldsubsegmentname').val().trim().toLowerCase() == tempSegmentName.toLowerCase()
                && ComapreArray(tempTeamList, teamsValue))) {
                // No changes to the property
                $('.editSubSegDialog').bPopup().close();
                // no need to add the key to the segments array, because we use old key
                pnode.activate();
                return;
            }
            else {
                // Remove the old node in the tree, and update the new node to the tree
                $('#save-changes').show();

                UpdateNode(node, pnode, $('#oldsubsegmentname').val().trim(), $(teamsSelected));

                $('.editSubSegDialog').bPopup().close();
                // no need to add the key to the segments array, because we use old key
                pnode.activate();
            }
        })

        $('#save-changes').live('click', function (e) {
            // Get the root by key
            var root = $("#test").dynatree("getTree").getNodeByKey('root');
            var allErrors = ValidTree(root);
            var str = "";
            if (allErrors != null && allErrors.length != 0) {
                // Alert the error messages
                $.each(allErrors, function (index, current) {
                    $('#test').dynatree("getTree").selectKey(current.key);

                    str += current.error;
                    str + "</br>";
                });

                alert(str);
                return;
            }
            else {
                var dict = $("#test").dynatree("getTree").toDict();

                SendAjaxCall(dict, function (result) {
                    if (result != null && result.length > 0) {
                        $('#save-changes').hide();
                        ST.util.showSuccessHints();


                    }
                });
            }
            //

        })


        // Manage links
        $('.add-root-link').live('click', function (e) {
            $('.manage-parent-link-div').bPopup();
            // Load the links into the zone
            ST.util.GetUsefulLinks($('.manage-parent-link-div'), 1, function (result) {
                if (result != null && result.length > 0) {
                    $('.parent-link-list-body').children().remove();

                    var str = '';
                    $.each(result, function (index, current) {
                        
                            str += "<tr><td><span PId='" + current.Id + "' class='plink-name'>" + current.LinkName + "</span></td>";
                            if (current.ChildLinks == null) {
                                str += "<td><a class='plink-delete' href='#'>删除...</a>|<a class='plink-edit' href='#'>修改...</a></td>";
                            }
                            str += '<td></td></tr>';
                        
                    });

                    $('.parent-link-list-body').append(str);
                }
            });
        });
        $('.add-myroot-link').live('click', function (e) {
            $('.save-myroot-link').attr('disabled', 'disabled');
            var str = '';
            var show_error = 0;
            var allText = $('.parent-link-list').find(':text');
            $.each(allText, function (index, current) {
                if ($(current).val() == '') {
                    show_error = 1;
                    $(current).addClass('error-circle');
                    $('.pCategory-msg').show();
                }
                else {
                    $(current).removeClass('.error-circle');
                }
            });
            if (show_error == 1) {
                return;
            }
            else {
                $('.pCategory-msg').hide();
                str += "<tr><td><input type='text' class='plink-name' PId=''/></td><td><a class='plink-delete' href='#'>删除...</a>|<a class='plink-edit' href='#'>修改...</a></td></tr>";
                $('.parent-link-list-body').append(str);
            }
        });
        $('.plink-name').live('blur', function (e) {
            $(this).removeClass('error-circle');
            var allNames = [];
            $.each($('.plink-name'), function (index, current) {
                if ($(current).val() == '') {
                    // this is an lable
                    allNames.push($(current)[0].innerText.trim());
                }
                else {
                    allNames.push($(current).val().trim());
                }
            });

            var args = { search: $(this).val().trim() };
            var sameOnes = allNames.filter(FindSame, args);
            if (sameOnes.length > 1) {
                $(this).addClass('error-circle').focus();
                $('.save-myroot-link').attr('disabled', 'disabled');
                alert('链接组: ' + $(this).val().trim() + ' 已经存在');
            }
            else {
                var temp = sameOnes.filter(FindSame, { search: '' });
                if (temp.length == 0) {
                    // all are valid
                    $('.save-myroot-link').removeAttr('disabled');
                }
                $(this).removeClass('error-circle');
            }
        });
        $('.close-myroot-link').live('click', function () {
            $('.manage-parent-link-div').bPopup().close();
        });
        $('.plink-delete').live('click', function (e) {
            $('.save-myroot-link').removeAttr('disabled');
            $('.save-link').removeAttr('disabled');
            $(this).parent().parent().remove();
        });
        $('.plink-edit').live('click', function (e) {
            e.preventDefault();
            var tr = $(this).parent().parent();
            var tem = $(tr).find('.plink-name');
            var temVal = $(tem)[0].innerText.trim();
            $(tem).remove();
            $($(tr).children()[0]).append("<input type='text' class='plink-name' value='" + temVal + "' />");
        });
        $('.save-myroot-link').live('click', function (e) {
            var paramData = [];
            var allCategory = $('.plink-name');
            $.each(allCategory, function (index, current) {
                var dataCol = [];
                var data = { 'Id': $(current).attr('PId'), 'LinkName': $(current).val() != '' ? $(current).val().trim() : current.innerText.trim() };
                paramData.push(data);
            });

            ST.util.saveUsefulLinks($('.wrapper'), paramData, 1, function (result) {
                ST.util.GetUsefulLinks($('.manage-parent-link-div'), 1, function (result2) {
                    if (result2 != null && result2.length > 0) {
                        $('.parent-link-list-body').children().remove();

                        var str = '';
                        $.each(result2, function (index, current) {
                           
                                str += "<tr><td><span class='plink-name' PId='" + current.Id + "'>" + current.LinkName + "</span></td>";
                                if (current.ChildLinks.length == 0) {
                                    str += "<td><a class='plink-delete' href='#'>删除...</a>|<a class='plink-edit' href='#'>修改...</a></td>";
                                }
                                str += '<td></td></tr>';
                            
                        });

                        $('.parent-link-list-body').append(str);
                    }
                });
            });
        });
        $('.add-child-link').live('click', function (e) {
            var str = '';
            var parentOptions = '';
            var temp = [];
            var allText = $('.child-link-list').find('.child-link-name:text');
            $.each(allText, function (index, current) {
                temp.push($(current).val());
            });
            var data = temp.filter(FindSame, { search: '' });
            if (data.length > 0) {
                alert('连接名字不能为空');
                return;
            }

            // Get all the parent categories
            ST.util.GetUsefulLinks($('.child-link-list'), 1, function (result) {
                if (result != null && result.length > 0) {
                    str += "<tr><td><select class='select-parent-link'>";
                    $.each(result, function (index, current) {
                        str += "<option value=" + current.Id + ">" + current.LinkName + "</option>";
                    });
                    str += "</select></td><td><input type='text' Id='' class='child-link-name' /></td><td><input type='text' class='child-link-url' /></td><td><a href='#' class='intrest-delete'>删除...</a></td></tr>";
                }
                $('.child-link-list').append(str);
            });
        });
        $('.child-link-name:text').live('blur', function (e) {
            var that = $(this);
            var parentCategory = $(this).parent().parent().find('.select-parent-link').val();

            $(this).removeClass('error-circle');

            var allNames = [];
            $.each($('.child-link-name'), function (index, current) {
                var d;
                if ($(current).val().trim() == '') {
                    d = $(current)[0].innerText.trim();
                }
                else {
                    d = $(current).val().trim();
                }
                var data = { child: d, parent: $(current).parent().parent().find('.select-parent-link').val() };
                allNames.push(data);
            });

            var args = { child: that.val(), parent: parentCategory };

            var sameOnes = allNames.filter(FindSame2, args);
            if (sameOnes.length > 1) {
                $(this).addClass('error-circle').focus();
                alert('该连接已存在');
                $('.save-link').attr('disabled', 'disabled');
            }
            else {
                $('.save-link').removeAttr('disabled');
            }
        });
        $('.save-link').live('click', function (e) {
            var paramData = [];
            var allCategories = $('.child-link-list tr');
            $.each(allCategories, function (index, current) {
                var p = $(current).find('.select-parent-link').val();
                var c;
                if ($(current).find('.child-link-name').val().trim() != '') {
                    c = $(current).find('.child-link-name').val().trim();
                }
                else {
                    c = $(current).find('.child-link-name')[0].innerText.trim();
                }
                var url = $(current).find('.child-link-url').val() == '' ? $(current).find('.child-link-url')[0].innerText : $(current).find('.child-link-url').val();
                var data = { ParentId: p, LinkName: c, URL: url, Id: $(current).find('.child-link-name').attr('Id') };
                paramData.push(data);
            });
            ST.util.saveUsefulLinks($('.wrapper'), paramData,0, function (result) {
                if (result != '' && result.length > 0) {
                    ST.util.GetUsefulLinks($('.wrapper'), 0, function (result2) {
                        if (result2 != null && result2.length > 0) {
                            $('.child-link-list').children().remove();

                            var str = '';
                            $.each(result2, function (index, current) {
                                if (current.ParentId != null) {
                                    str += "<tr><td><select class='select-parent-link'><option value=" + current.ParentId + ">" + current.ParentLink.LinkName + "</option></select></td><td><span class='child-link-name' Id='" + current.Id + "'>" + current.LinkName + "</span></td><td><span class='child-link-url'>" + current.URL + "</span></td>";

                                    str += "<td><a class='plink-delete' href='#'>删除...</a></td>";
                                    str += '</tr>';
                                }
                            });

                            $('.child-link-list').append(str);
                        }
                    });
                }
            });
            //$('.save-catagory').attr('disabled', 'disabled');
        });
        $('span.child-link-name').live('click', function (e) {
            $('.save-link').removeAttr('disabled');
            $(this).parent().append("<input type='text' class='child-link-name' value=" + $(this)[0].innerText + " />");
            $(this).remove();
        });
        $('span.child-link-url').live('click', function (e) {
            $('.save-link').removeAttr('disabled');
            $(this).parent().append("<input type='text' class='child-link-url' value=" + $(this)[0].innerText + " />");
            $(this).remove();
        });
        $('.select-parent-link').live('click', function (e) {
            // Load the links into the select zone
            var that=$(this);
            if ($(this).children().length > 1) {
                // Don't load
            }
            else {
                $(this).children().remove();
                ST.util.GetUsefulLinks($(that), 1, function (result) {
                    if (result != null && result.length > 0)
                    {
                        var str = "";
                        $.each(result, function (index, current) {
                            str += "<option value=" + current.Id + ">" + current.LinkName + "</option>";
                        });

                        $(that).append(str);
                    }
                });
            }
        }).live('change', function (e) {
            $('.save-link').removeAttr('disabled');
        });
        
        // Manage catagory
        $('.add-root-catagory').live('click', function (e) {
            $('.manage-parent-category-div').bPopup();
            // Load the categories into the zone
            ST.util.GetCategory($('.manage-parent-category-div'), 1, function (result) {
                if (result != null && result.length > 0) {
                    $('.parent-catagory-list-body').children().remove();

                    var str = '';
                    $.each(result, function (index, current) {

                        str += "<tr><td><span PId='" + current.Id + "' class='pcategory-name'>" + current.CategoryName + "</span></td>";
                        if (current.ChildCategories.length == 0) {
                            str += "<td><a class='pcatagory-delete' href='#'>删除...</a>|<a class='pcatagory-edit' href='#'>修改...</a></td>";
                        }
                        str += '<td></td></tr>';
                    });

                    $('.parent-catagory-list-body').append(str);
                }
            });
        });
        $('.add-myroot-catagory').live('click', function (e) {
            $('.save-myroot-catagory').attr('disabled', 'disabled');
            var str = '';
            var show_error = 0;
            var allText = $('.parent-catagory-list').find(':text');
            $.each(allText, function (index, current) {
                if ($(current).val() == '') {
                    show_error = 1;
                    $(current).addClass('error-circle');
                    $('.pCategory-msg').show();
                }
                else {
                    $(current).removeClass('.error-circle');
                }
            });
            if (show_error == 1) {
                return;
            }
            else {
                $('.pCategory-msg').hide();
                str += "<tr><td><input type='text' class='pcategory-name' PId=''/></td><td><a class='pcatagory-delete' href='#'>删除...</a>|<a class='pcatagory-edit' href='#'>修改...</a></td></tr>";
                $('.parent-catagory-list-body').append(str);
            }
        });
        var FindSame = function (val, index, arr) {
            return val == this.search;
        }
        var FindSame2 = function (val, index, arr) {
            return val.parent == this.parent && val.child == this.child;
        }
        $('.pcategory-name').live('blur', function (e) {
            $(this).removeClass('error-circle');
            var allNames = [];
            $.each($('.pcategory-name'), function (index, current) {
                if ($(current).val() == '') {
                    // this is an lable
                    allNames.push($(current)[0].innerText.trim());
                }
                else {
                    allNames.push($(current).val().trim());
                }
            });

            var args = { search: $(this).val().trim() };
            var sameOnes = allNames.filter(FindSame, args);
            if (sameOnes.length > 1) {
                $(this).addClass('error-circle').focus();
                $('.save-myroot-catagory').attr('disabled', 'disabled');
                alert('文章类型: ' + $(this).val().trim() + ' 已经存在');
            }
            else {
                var temp = sameOnes.filter(FindSame, { search: '' });
                if (temp.length == 0) {
                    // all are valid
                    $('.save-myroot-catagory').removeAttr('disabled');
                }
                $(this).removeClass('error-circle');
            }
        });
        $('.close-myroot-catagory').live('click', function () {
            $('.manage-parent-category-div').bPopup().close();
        });
        $('.pcatagory-delete').live('click', function (e) {
            $('.save-myroot-catagory').removeAttr('disabled');

            $(this).parent().parent().remove();
        });
        $('.pcatagory-edit').live('click', function (e) {
            e.preventDefault();
            var tr = $(this).parent().parent();

            var vl= $(tr).find('.pcategory-name')[0].innerText;
            $(tr).find('.pcategory-name').remove();

            $($(tr).children()[0]).append("<input type='text' class='pcategory-name' value=" +vl+ " />");
        });
        $('.save-myroot-catagory').live('click', function (e) {
            var paramData = [];
            var allCategory = $('.pcategory-name');
            $.each(allCategory, function (index, current) {
                var dataCol = [];
                var data = { 'Id': $(current).attr('PId'), 'CategoryName': $(current).val() != '' ? $(current).val().trim() : current.innerText.trim() };
                paramData.push(data);
            });

            ST.util.saveCategory($('.wrapper'), paramData, 1, function (result) {
                if (result != '' && result.length > 0) {
                    $('.parent-catagory-list-body').children().remove();

                    var str = '';
                    $.each(result, function (index, current) {

                        str += "<tr><td><span class='pcategory-name' PId='" + current.Id + "'>" + current.CategoryName + "</span></td>";
                        if (current.ChildCategories == null) {
                            str += "<td><a class='pcatagory-delete' href='#'>删除...</a>|<a class='pcatagory-edit' href='#'>修改...</a></td>";
                        }
                        str += '<td></td></tr>';
                    });

                    $('.parent-catagory-list-body').append(str);
                }
            });
        });
        $('.add-child-catagory').live('click', function (e) {
            var str = '';
            var parentOptions = '';
            var temp = [];
            $.each($('.child-category-name :text'), function (index, current) {
                temp.push($(current).val());
            });
            var data = temp.filter(FindSame, { search: '' });
            if (data.length > 0) {
                alert('类型名字不能为空');
                return;
            }

            // Get all the parent categories
            ST.util.GetCategory($('.child-category-list'), 1, function (result) {
                if (result != null && result.length > 0) {
                    str += "<tr><td><select class='select-parent-category'>";
                    $.each(result, function (index, current) {
                        str += "<option value=" + current.Id + ">" + current.CategoryName + "</option>";
                    });
                    str += "</select></td><td><input type='text' class='child-category-name' /></td><td><a href='#' class='category-delete'>删除...</a></td></tr>";
                }
                $('.child-category-list').append(str);
            });
        });
        $('.child-category-name').live('blur', function (e) {
            var that = $(this);
            var parentCategory = $(this).parent().parent().find('.select-parent-category').val();

            $(this).removeClass('error-circle');

            var allNames = [];
            $.each($('.child-category-name'), function (index, current) {
                var d;
                if ($(current).val().trim() == '') {
                    d = $(current)[0].innerText.trim();
                }
                else {
                    d = $(current).val().trim();
                }
                var data = { child: d, parent: $(current).parent().parent().find('.select-parent-category').val() };
                allNames.push(data);
            });

            var args = { child: that.val(), parent: parentCategory };

            var sameOnes = allNames.filter(FindSame2, args);
            if (sameOnes.length > 1) {
                $(this).addClass('error-circle').focus();
                alert('类型已存在');
                $('.save-catagory').attr('disabled', 'disabled');
            }
            else {
                $('.save-catagory').removeAttr('disabled');
            }
        });
        $('.save-catagory').live('click', function (e) {
            var paramData = [];
            var allCategories = $('.child-category-list tr');
            $.each(allCategories, function (index, current) {
                var p = $(current).find('.select-parent-category').val();
                var c;
                if ($(current).find('.child-category-name').val().trim() != '') {
                    c = $(current).find('.child-category-name').val().trim();
                }
                else {
                    c = $(current).find('.child-category-name')[0].innerText.trim();
                }
                var data = { ParentId: p, CategoryName: c, Id: $(current).find('.child-category-name').attr('PId') };
                paramData.push(data);
            });
            ST.util.saveCategory($('.wrapper'), paramData, 0, function (result) {
                if (result != '' && result.length > 0) {

                    $.each($('.child-category-list :text'), function (index, current) {
                        var that = $(this).parent();
                        $(that).append("<span class='child-category-name' PId=" + that.attr('PId') + ">" + $(this).val() + "</span>");
                        $(this).remove();
                    });

                }
            });
            //$('.save-catagory').attr('disabled', 'disabled');
        });
        $('span.child-category-name').live('click', function (e) {
            $('.save-catagory').removeAttr('disabled');
            $(this).parent().append("<input type='text' class='child-category-name' value=" + $(this)[0].innerText + " />");
            $(this).remove();
        });
        $('.category-delete').live('click', function () {
            $('.save-myroot-category').removeAttr('disabled');
            $('.save-catagory').removeAttr('disabled');
            $(this).parent().parent().remove();
        });
        $('.select-parent-category').live('click', function (e) {
            // Load the links into the select zone
            var that = $(this);
            if ($(this).children().length > 1) {
                // Don't load
            }
            else {
                $(this).children().remove();
                ST.util.GetCategory($(that), 1, function (result) {
                    if (result != null && result.length > 0) {
                        var str = "";
                        $.each(result, function (index, current) {
                            str += "<option value=" + current.Id + ">" + current.CategoryName + "</option>";
                        });

                        $(that).append(str);
                    }
                });
            }
        }).live('change', function (e) {
            $('.save-catagory').removeAttr('disabled');
        });
    };
    ST.util = new function () {
        this.HTMLDecode = function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }
        this.GetAdminTeamSite = function (loadingArea, callBack) {
            var url = this.GetSiteAdminUrl() + "?requestType=getteams";

            // Send the ajax call 
            $.ajax({
                url: url,
                type: 'Post',
                timeout: 9900000,
                dataType: 'json',
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                success: function (resultNew) {
                    //ST.util.showSuccessHints();

                    if (callBack != null)
                        callBack(resultNew);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    ST.util.showErrorHints();
                },

                complete: function () {
                    loadingArea.hideLoading();
                }
            });
        };
        this.SaveTeamSite = function (loadingArea, paramData, callBack) {
            var url = ST.util.GetSiteAdminUrl();
            url += "?requestType=addteam";
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(paramData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    ST.util.showErrorHints();

                    console.log(error);
                },
                success: function (result) {
                    ST.util.showSuccessHints();

                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        };
        //Get users list
        this.GetUsers = function (loadingArea, parameter, callBack)
        {
            var url = ST.util.GetUserUrl();
            url += "?requestType=getusersforadmin&key=" + parameter;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
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
        this.saveCategory = function (loadingArea, paramData, categoryType, callBack) {
            var url = ST.util.GetSiteAdminUrl();
            url += "?requestType=addcategory&categoryType=" + categoryType;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(paramData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    ST.util.showSuccessHints();
                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        }
        this.saveUsefulLinks = function (loadingArea, paramData, linkType, callBack) {
            var url = ST.util.GetSiteAdminUrl();
            url += "?requestType=addusefullinks&linkType=" + linkType;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(paramData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    ST.util.showSuccessHints();
                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        }
        this.GetCategory = function (loadingArea, param, callBack) {
            var url = ST.util.GetSiteAdminUrl();
            url += "?requestType=getcategory&parentonly=" + param;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('获取文章类型失败');
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
        this.GetUsefulLinks = function (loadingArea, param, callBack) {
            var url = ST.util.GetSiteAdminUrl();
            url += "?requestType=getusefullinks&parentOnly=" + param;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                },
                error: function (xhr, status, error) {
                    alert('获取连接失败');
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
        this.GetSiteAdminUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/SiteAdminAjax';
            return url;
        };
        this.GetUserUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/UserAjax';
            return url;
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
                    ST.util.showErrorHints();

                    console.log(error);
                },
                success: function (result) {
                    ST.util.showSuccessHints();

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
        this.showSuccessHints = function () {
            $('.suceed-div').css({
                left: '50%',
                top: '50%'
            }).fadeIn('slow').fadeOut('slow');
        };
        this.showErrorHints = function () {
            $('.fail-div').css({
                left: '50%',
                top: '50%'
            }).fadeIn('slow').fadeOut('slow');
        };
        this.UploadImage = function (pictureData, loadingArea, callBack) {
            var baseUrl = this.GetBaseUrl();
            var url = baseUrl + "?queryType=addPicture";
            $.upload(url, pictureData, callBack);
        };
    };
    function GetAllNodes(root) {
        var child = root.getChildren();
        if (child != null && child.length > 0) {
            $.each(child, function (index, current) {
                if (current.data.tooltip != 'team') {
                    allNodes.push(current);
                }

                GetAllNodes(current);
            });
        }
    }

    function ValidTree(root) {
        var invalidSegments = [];

        allNodes = [];
        GetAllNodes(root);
        if (allNodes != null && allNodes.length > 0) {
            $.each(allNodes, function (index, current) {
                if (current.data.tooltip == 'segment') {
                    if (current.getChildren() == null) {

                        // invalid, shall be one team under segment
                        invalidSegments.push({ key: current.data.key, error: "至少添加一个团队到类型 '" + current.data.title + "中'" });
                    }
                    if (current.getChildren() != null) {
                        // Search if team is under that node
                        if (!ChildrenExistedByToolTip(current.getChildren(), 'team')) {
                            invalidSegments.push({ key: current.data.key, error: "至少添加一个团队到类型 '" + current.data.title + "中'" });
                        }
                    }
                }
                if (current.data.tooltip == 'subsegment') {
                    if (current.getChildren() == null) {
                        // invalid, shall be one team under segment
                        invalidSegments.push({ key: current.data.key, error: "至少添加一个团队到 '" + current.data.title + "中'" });
                    }
                }
                if (current.data.tooltip == 'division') {
                    if (current.getChildren() == null) {
                        // invalid, shall be one team under segment
                        invalidSegments.push({ key: current.data.key, error: "至少添加一个子类型 到类型'" + current.data.title + "中'" });
                    }
                }
            });
        }
        return invalidSegments;
    }
    function GetBaseUrl() {
        var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/SiteAdminAjax';
        return url;
    };
    function ChildrenExisted(list, val) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].data.title.toLowerCase().trim() == val.trim().toLowerCase()) {
                return true;
            }
        }
    }

    function ChildrenExistedByToolTip(list, val) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].data.tooltip.toLowerCase().trim() == val.trim().toLowerCase()) {
                return true;
            }
        }
    }
    function ComapreArray(a1, a2) {
        if (a1.length == 0 && a2.length == 0) {
            return true;
        }
        if (a1.length != a2.length) {
            return false;
        }
        else {
            for (var i = 0; i < a1.length; i++) {
                if ($.inArray(a1[i], a2) == -1) {
                    return false;
                }
            }
        }
        return true;
    }

    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    function RemoveNode(node, parentNode) {

        // Get all current and children nodes, remove the keys from the array
        switch (node.data.tooltip) {
            case "division":
                {
                    removeA(divisions, node.data.key);
                    break;
                }
            case "segment":
                {
                    removeA(segements, node.data.key);

                    break;
                }
            case "subsegment":
                {
                    removeA(subSegments, node.data.key);

                    break;
                }
            case "team":
                {
                    removeA(teams, node.data.key);
                    teamsAvailable.push({ TeamName: node.data.title, TeamGuid: node.data.key });
                    break;
                }
        }

        RemoveNodeHierarchy(node);


        node.remove();
        parentNode.activate();
        // determin whether to enable saving
        if (ComapreArray(divisions, divisions1) == true &&
            ComapreArray(segements, segements1) == true &&
            ComapreArray(subSegments, subSegments1) == true
            && ComapreArray(teams, teams1) == true) {
            $('#save-changes').hide();
        }
        else {
            $('#save-changes').show();
        }
    }
    function RemoveNodeHierarchy(node) {
        var existedChildren = node.getChildren();
        if (existedChildren != null && existedChildren.length > 0) {
            for (var i = 0; i < existedChildren.length; i++) {
                if (existedChildren[i].data.tooltip == "segment") {
                    removeA(segements, existedChildren[i].data.key);
                }
                if (existedChildren[i].data.tooltip == "subsegment") {
                    removeA(subSegments, existedChildren[i].data.key);
                }
                if (existedChildren[i].data.tooltip == "team") {
                    removeA(teams, existedChildren[i].data.key);

                    // Add team elements backtop available teams array
                    teamsAvailable.push({ TeamName: existedChildren[i].data.title, TeamGuid: existedChildren[i].data.key });
                }

                RemoveNodeHierarchy(existedChildren[i]);
            }
        }
    }

    function UpdateNode(node, parentNode, newName, newTeamList) {
        node.data.title = newName;
        $('#save-changes').show();

        var nodeChild = node.getChildren();
        var removedTeams = [];

        if (nodeChild != null && nodeChild.length > 0) {
            for (var i = 0; i < nodeChild.length; i++) {
                if (nodeChild[i].data.tooltip == 'team') {
                    removedTeams.push(nodeChild[i]);
                    //$("#test").dynatree("getTree").getNodeByKey(nodeChild[i].data.key).remove();
                    teamsAvailable.push({ TeamName: nodeChild[i].data.title, TeamGuid: nodeChild[i].data.key });

                }
            }
        }

        $.each(removedTeams, function (index, current) {
            current.remove();
        });

        if (newTeamList != null && newTeamList.length > 0) {
            for (var i = 0; i < newTeamList.length; i++) {
                node.addChild({
                    title: $(newTeamList[i]).attr('title'),
                    tooltip: "team",
                    key: $(newTeamList[i]).attr('value')
                });
                RemoveTeamInArray($(newTeamList[i]).attr('value'));
            }
        }
    }
    function AddSeg(node, parentNode, key, title, tooltip, selectedTeams) {
        // Get the team selected
        var currentTeams = [];
        for (var i = 0; i < selectedTeams.length; i++) {
            currentTeams.push({ title: $(selectedTeams[i]).attr('title'), tooltip: 'team', key: $(selectedTeams[i]).attr('value') });
            teams.push(key);
            // Remove the teams selected above from the available teams list
            RemoveTeamInArray($(selectedTeams[i]).attr('value'));
        }

        var childNode = parentNode.addChild({
            title: title,
            tooltip: tooltip,
            key: key,
            children: currentTeams.length > 0 ? currentTeams : ""
        });
        segements.push(key);
    }

    function PopupSegmentPropertyWindow(node, nameCtrl, teamlistCtrl) {
        tempSegmentName = '';
        tempTeamList = [];

        nameCtrl.val(node.data.title);
        tempSegmentName = node.data.title;

        // Team list will be loaded from the child nodes
        var childNodesOfCurrent = node.getChildren();
        var str = "";

        if (childNodesOfCurrent != null && childNodesOfCurrent.length > 0) {
            // Add current node to the childteam's array
            for (var i = 0; i < childNodesOfCurrent.length; i++) {
                if (childNodesOfCurrent[i].data.tooltip == "team") {
                    var teamName = childNodesOfCurrent[i].data.title;
                    var teamguid = childNodesOfCurrent[i].data.key;
                    tempTeamList.push(teamguid);
                    str += "<li> <input type='checkbox' checked='checked' title='" + teamName + "' value='" + teamguid + "' />" + teamName + "</li>";
                }
            }
        }

        // Append those available teams in the ul
        var str2 = GetAvailableTeamString(teamlistCtrl);

        // Load the data into the team list area
        teamlistCtrl.children().remove();
        teamlistCtrl.append(str + str2);
    }

    function VerifyChildrenExisted(pnode, titleFound) {
        var j = 0;
        var childs = pnode.getChildren();
        if (childs == null || childs.length == 0) {
            return true;
        }
        else {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].data.title.toLowerCase() == titleFound.toLowerCase())
                    j++;
            }
        }

        if (j > 1) return false;
        return true;
    }

    function GetTeamsAvailable(callBack) {
        $.ajax({
            url: GetBaseUrl() + "?requestType=getteamssingle",
            type: "POST",
            dataType: "json",
            timeout: 99000,
            beforeSend: function () {
            },
            error: function (xhr, status, error) {
                alert('Error loading report');
                console.log(error);
            },
            success: function (result) {
                // Initializing the team sites available list
                if (callBack != null)
                    callBack(result);
            },
            complete: function () {
            },
        });
    }

    function SendAjaxCall(prameter, callBack) {
        $.ajax({
            url: GetBaseUrl() + "?requestType=savetree",
            type: "POST",
            data: { queryParam: JSON.stringify(prameter) },
            dataType: "json",
            timeout: 99000,
            beforeSend: function () {
            },
            error: function (xhr, status, error) {
                alert('Error loading report');
                console.log(error);
            },
            success: function (result) {
                // Initializing the team sites available list
                if (callBack != null)
                    callBack(result);
            },
            complete: function () {
            },
        });
    }

    function RemoveTeamInArray(teamguid) {
        if (teamsAvailable == null || teamsAvailable.length == 0) {
            return;
        }
        else {
            for (var i = 0; i < teamsAvailable.length; i++) {
                if (teamsAvailable[i].TeamGuid.toLowerCase() == teamguid.toLowerCase()) {
                    teamsAvailable.splice(i, 1);
                }
            }
        }
    }


    function GetAvailableTeamString(teamListCtrl) {
        var str = "";
        teamListCtrl.children().remove();
        if (teamsAvailable != null && teamsAvailable.length > 0) {
            $.each(teamsAvailable, function (index, current) {
                str += "<li><input type='checkbox' title='" + current.TeamName + "' value='" + current.TeamGuid + "' />" + current.TeamName + "</li>";
            });
        }
        else {
            str += "<li>No Available team !</li>";
        }
        return str;
    }

    function LoadTeamHierarchy() {
        teamsAvailable = [];
        GetTeamsAvailable(function (result) {
            if (result != null && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    teamsAvailable.push({ TeamName: result[i].TeamName, TeamGuid: result[i].TeamGuid });
                }
            }
        })

        $("#test").dynatree({
            onActivate: function (node) {
                // Get the node depth to determin wich button needs to be activated
                var level = node.getLevel();

                switch (level) {
                    case 1:
                        {
                            $('#add-div').show().siblings().not('#save-changes').hide();
                            break;
                        }
                    case 2:
                        {
                            // See if there is more than 1 node 

                            $('#add-seg').show().siblings().not('#save-changes').hide();
                            $('#remove-item').show();

                            break;
                        }
                    case 3:
                        {
                            $('#add-sub-seg').show().siblings().not('#save-changes').hide();
                            $('#remove-item').show();
                            break;
                        }
                    case 4:
                        {
                            $('.actions').find('input').not('#save-changes').hide();
                            $('#remove-item').show();
                            break;
                        }
                }
            },
            onDblClick: function (node, event) {
                // Load the segement detail in the pop up window
                var nodeLevel = node.getLevel();
                if (nodeLevel == 3) {
                    $('#existteam-list').children().remove();
                    PopupSegmentPropertyWindow(node, $('#oldsegmentname'), $('#existteam-list'));
                    $('.EditSegDialog').bPopup();
                }

                else if (nodeLevel == 4 && node.data.tooltip != 'team') {
                    $('#existsubteam-list').children().remove();
                    PopupSegmentPropertyWindow(node, $('#oldsubsegmentname'), $('#existsubteam-list'));
                    $('.editSubSegDialog').bPopup();
                }
            },
            onCreate: function (node, nodeSpan) {
                var level = node.getLevel();

                switch (level) {
                    case 2:
                        {
                            node.data.isFolder = true;
                            break;
                        }
                    case 3: {
                        node.data.icon = "segment-icon.png";
                        break;

                    }
                    case 4: {
                        if (node.data.tooltip == 'team') {
                            node.data.icon = "team-icon.png";
                        }
                        else {
                            node.data.icon = "segment-icon.png";
                        }
                        break;

                    }
                    case 5: {
                        node.data.icon = "team-icon.png";
                        break;

                    }
                }
                if (newAdded == 0 && node.data.tooltip != null) {

                    if (node.data.tooltip == "divisions") {
                        return;
                    }

                    if (node.data.tooltip == 'division') {
                        divisions.push(node.data.key);
                        divisions1.push(node.data.key);
                        return;

                    }
                    if (node.data.tooltip == 'segment') {
                        segements.push(node.data.key);
                        segements1.push(node.data.key);
                        return;

                    }
                    if (node.data.tooltip == 'subsegment') {
                        subSegments.push(node.data.key);
                        subSegments1.push(node.data.key);
                        return;

                    }
                    if (node.data.tooltip = 'team') {
                        teams.push(node.data.key);
                        teams1.push(node.data.key);
                        return;

                    }


                }
            },
            initAjax: {
                url: GetBaseUrl(),
                data: { requestType: 'getdivisions' }
            },
            persist: false,
        });

        // Expand all nodes
        $("#test").dynatree("getRoot").visit(function (node) {
            node.expand(true);
        });
    }

    function ValidateTeamOwnerList(users)
    {
        var t = true;
        if (users == null) {
            t = false;
            alert('团队管理员不能为空');
        }
        else {
            var duplicatedNames = [];
            // verify if there is duplicated user names
            var uArray = users.split(';');

            for (var i = 0; i < uArray.length; i++)
            {
                var j = 1;
                for (var k = 0; k < uArray.length; k++)
                {
                    if (uArray[i] == uArray[k])
                    {
                        j++;
                    }
                }
                if (j > 2)
                {
                    duplicatedNames.push(uArray[i]);
                }
            }

            if (duplicatedNames.length > 0)
            {
                t = false;
                alert("用户名不能同时出现在管理员列表");
            }


            // Send ajax call to verify the users exist
            VerifyUsersExisted(users, function (result) {
                if (result != null && result.length > 0)
                {
                    t = false;

                    alert("用户" + result + "不存在！");
                }
            });
        }
        return t;
    }

    function VerifyUsersExisted(users, callBack) {
        $.ajax({
            url: ST.util.GetUserUrl() + "?requestType=findlistofuser&users="+users,
            type: "POST",
            async: false,
            dataType: "json",
            timeout: 99000,
            beforeSend: function () {
            },
            error: function (xhr, status, error) {
                alert('Error');
                console.log(error);
            },
            success: function (result) {
                // Initializing the team sites available list
                if (callBack != null)
                    callBack(result);
            },
            complete: function () {
            },
        });
    }
})
    (window.ST = window.ST || {}, $, undefined);