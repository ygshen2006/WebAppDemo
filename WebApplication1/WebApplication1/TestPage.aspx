<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestPage.aspx.cs" Inherits="WebApplication1.TestPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        .actions {
            width: 600px;
            margin: 0 auto;
        }

            .actions input {
                margin-left: 5px;
            }

        .addDivisionDialog, .addSegDialog, .addSubSegDialog, .EditSegDialog, .editSubSegDialog {
            display: none;
            width: 700px;
            height: auto;
            background-color: white;
        }

        .loading-indicator {
          background:transparent url('../Images/loading40.gif') no-repeat scroll 50% center;

            width: 70px;
            height: 70px;
        }

        .loading-indicator-overlay {
            opacity: 0.6;
            background-color: rgb(255, 255, 255);
        }

        .actions-bar {
            margin: 20px;
        }

            .actions-bar input {
                margin-left: 5px;
            }

        #test {
            width: 100%;
            height: auto;
            float: left;
            border: none;
        }

        #teamzone {
            width: 80%;
            height: 200px;
            float: right;
            background-color: gray;
            display: none;
        }
    </style>
    <link href="../Content/ui.dynatree.css" rel="stylesheet" />
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../js/jqueryui/jquery-ui.custom.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/jquery.dynatree.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script type="text/javascript">

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
        $(function () {
            // Before  showing the tree hierarchy.  Get teams can be added to the list

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

                    if (newAdded == 0 && node.data.tooltip != null) {

                        if (node.data.tooltip == "divisions"){
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
        });

        $('#add-div').live('click', function (e) {
            e.preventDefault();
            // Remember current active node
            activeNode = $("#test").dynatree("getActiveNode");
            $('.addDivisionDialog').bPopup();
        });
        $('#add-seg').live('click', function (e) {
            var node = $("#test").dynatree("getActiveNode");
            var currentNodeChilds = node.getChildren();

            if (currentNodeChilds != null && currentNodeChilds.length > 0) {
                alert("There is alreay an segment under this division");
                return;
            }
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
                    if (result != null && result.length > 0)
                    {
                        $('#save-changes').hide();
                        alert('successfully save the changes');


                    }
                });
            }
            //

        })

        function GetAllNodes(root) {
            var child = root.getChildren();
            if (child != null && child.length > 0)
                {
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
                            invalidSegments.push({ key: current.data.key, error: "One team is required for segment: '" + current.data.title + "'" });
                        }
                        if (current.getChildren() != null) {
                            // Search if team is under that node
                            if (!ChildrenExistedByToolTip(current.getChildren(), 'team')) {
                                invalidSegments.push({ key: current.data.key, error: "Only one team is required for segment: '" + current.data.title + "'" });
                            }
                        }
                    }
                    if (current.data.tooltip == 'subsegment') {
                        if (current.getChildren() == null) {
                            // invalid, shall be one team under segment
                            invalidSegments.push({ key: current.data.key, error: "At lease One team is required for sub segment: '" + current.data.title + "'" });
                        }
                    }
                    if (current.data.tooltip == 'division')
                    {
                        if (current.getChildren() == null) {
                            // invalid, shall be one team under segment
                            invalidSegments.push({ key: current.data.key, error: "At lease One segment is required for Divison: '" + current.data.title + "'" });
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

        function SendAjaxCall(prameter,callBack)
        {
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
                       teamsAvailable.splice(i,1);
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
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div style="width: 600px; margin:0 auto">
            <div class="actions">
                <input type="button" id="add-div" value="Add New Division" style="display: none" />
                <input type="button" id="add-seg" value="Add New Segment" style="display: none" />
                <input type="button" id="add-sub-seg" value="Add New Sub-Segment" style="display: none" />
                <input type="button" id="remove-item" value="Delete" style="display: none" />
                <input type="button" id="save-changes" value="Save" style="display: none" />
                <input type="button" id="undo-changes" value="UnDo" style="display: none" />

            </div>
            <div style="width: 600px; margin: 0 auto">
                <div id="test">
                </div>
            </div>
            <div class="addDivisionDialog">
                <div style="margin: 20px;">
                    <span>Division Name:</span>
                    <input id="divisionName" type="text" style="width: 80px" />
                </div>

                <div class="actions-bar">
                    <input id="save-div-bt" type="button" value="Save" />
                    <input id="cancel-div-bt" type="button" value="Cancel" />
                </div>
            </div>

            <div class="addSegDialog">
                <div style="width: 600px; margin: 0 auto;">
                    <div style="margin: 20px;">
                        <span>Segment Name:</span>
                        <input id="segmentName" type="text" style="width: auto" />
                    </div>
                    <div style="margin: 20px">
                        <span>Teams:</span>
                        <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                            <ul style="list-style: none" id="team-list">

                                <%--<li>
                                    <input type="checkbox" title="Team1" value="Team1" />TeamSite1</li>
                                <li>
                                    <input type="checkbox" title="Team1" value="Team2" />TeamSite2</li>
                                <li>
                                    <input type="checkbox" title="Team1" value="Team3" />TeamSite3</li>--%>
                            </ul>
                        </div>
                    </div>

                    <div class="actions-bar">
                        <input id="save-seg-bt" type="button" value="Save" />
                        <input id="cancel-seg-bt" type="button" value="Cancel" />
                    </div>
                </div>
            </div>

            <div class="addSubSegDialog">
                <div style="margin: 20px;">
                    <span>Sub Segment Name:</span>
                    <input id="subsegmentName" type="text" style="width: 80px" />
                </div>
                <div style="margin: 20px">
                    <span>Teams:</span>
                    <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                        <ul style="list-style: none" id="subteam-list">
                        </ul>
                    </div>
                </div>
                <div class="actions-bar">
                    <input id="save-subseg-bt" type="button" value="Save" />
                    <input id="cancel-subseg-bt" type="button" value="Cancel" />
                </div>
            </div>

            <div class="EditSegDialog">
                <div style="width: 600px; margin: 0 auto;">
                    <div style="margin: 20px;">
                        <span>Segment Name:</span>
                        <input id="oldsegmentname" type="text" style="width: auto" /><span style="color: red; margin-left: 5px">*</span>
                    </div>
                    <div style="margin: 20px">
                        <span>Teams:</span>
                        <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                            <ul style="list-style: none" id="existteam-list">
                            </ul>
                        </div>
                    </div>

                    <div class="actions-bar">
                        <input id="existsave-seg-bt" type="button" value="Save" />
                        <input id="existcancel-seg-bt" type="button" value="Cancel" />
                    </div>
                </div>
            </div>

            <div class="editSubSegDialog">
                <div style="margin: 20px;">
                    <span>Sub Segment Name:</span>
                    <input id="oldsubsegmentname" type="text" style="width: 80px" />
                </div>
                <div style="margin: 20px">
                    <span>Teams:</span>
                    <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                        <ul style="list-style: none" id="existsubteam-list">
                        </ul>
                    </div>
                </div>
                <div class="actions-bar">
                    <input id="existsave-subseg-bt" type="button" value="Save" />
                    <input id="existcancel-subseg-bt" type="button" value="Cancel" />
                </div>
            </div>
        </div>
    </form>

</body>
</html>
