/// <reference path="jquery-1.10.2.min.js" />
(function (URP, $, undefined) {
    URP.CustomizationTiles = new function () {
        var whiteColorMap = ['#4668C5', '#00188F', '#002050', '#0072C6', '#008272', '#007233', '#008A00', '#DC3C00', '#E81123', '#BA141A', '#B4009E', '#9B4F96', '#68217A', '#442359'];
        var minVal = -1;
        var unit = 140;
        var gap = 70;
        var originalTiles = [];
        var gridTiles = [];//[{ coordinateX: 0, coordinateY: 0, demensionX: 3, demensionY: 3, icon: '&#xE12F;', id: 0, onGrid: true, backgroundColor: '#0072C6', backgroundImage: null, title: 'hello', overlayColor: 'None', shownCount: 'Lower-right', countNum: '12' }, { coordinateX: 3, coordinateY: 0, demensionX: 2, demensionY: 2, icon: '&#xE204;', id: 1, onGrid: true, backgroundColor: '#6DC2E9', backgroundImage: null, title: 'world', overlayColor: 'None', shownCount: 'None', countNum: '7' }, { coordinateX: 5, coordinateY: 0, demensionX: 1, demensionY: 1, icon: null, id: 2, onGrid: true, backgroundColor: null, backgroundImage: '/SiteAssets/tileImage.PNG', title: 'Hi', overlayColor: 'Black', shownCount: 'None', countNum: '38' }];
        var clipboardTiles = [];
        var startOffsetX = 0;
        var startOffsetY = 0;
        var previousDestinationX = null
        var previousDestinationY = null;

        this.dragStart = function (ev) {
            //ev.dataTransfer.setData("Text", ev.target.id);        
            startOffsetX = ev.offsetX;
            startOffsetY = ev.offsetY;
            previousDestinationX = -1;
            previousDestinationY = -1;
            ev.target.style.opacity = '0.5';
            $('.tile-selected').removeClass('tile-selected')
            $(ev.target).addClass('tile-selected');
            $('.feature-area-middle .mark').css({
                top: '0px', height: '533px'
            });
            $('.feature-area-right .mark').css({
                top: '0px', height: '552px'
            });
            $('.action-wrapper .tile-create').removeClass('active');
            var tileId = ev.currentTarget.id.substr(5);
            var currentTile = getCurrentTileById(ev.target.id.substr(5));
            if (currentTile.LogicType == 'AllReport') {
                $('.action-wrapper .tile-delete').removeClass('active');
            } else {
                if (!$('.action-wrapper .tile-delete').hasClass('active')) {
                    $('.action-wrapper .tile-delete').addClass('active');
                }
            }

            currentTile.orignalCoordinateX = currentTile.coordinateX;
            currentTile.orignalCoordinateY = currentTile.coordinateY;
            caculateLocation(ev);
        };
        this.drag = function (ev) {
            caculateLocation(ev);
        };
        this.dragEnd = function (ev) {
            caculateLocation(ev, true);
            var tileId = ev.currentTarget.id.substr(5);
            var currentTile = getCurrentTileById(tileId);
            if (currentTile.onGrid === true) {
                $('#tile_' + tileId).css({
                    'left': (currentTile.coordinateX * unit) + 'px',
                    'top': (currentTile.coordinateY * unit) + 'px',
                });
            } else {
                $('#tile_' + tileId).css({
                    'left': (currentTile.coordinateX * unit) + 'px',
                    'top': ((currentTile.coordinateY + 3) * unit) + gap + 'px',
                });
                if ($('.size-input').hasClass('expand')) {
                    $('.size-input').removeClass('expand').addClass('collapse');
                }
            }
            ev.currentTarget.style.opacity = '1';
            createOrEditTile(tileId);
            if (!URP.CustomizationTiles.hasChanged) {
                checkSaveState();
            }
        };


        this.Init = function () {
            $.ajaxSetup({
                crossDomain: true,
                cache: false,
                async: true
            });
            //alert('This is a test');
            refreshColorItem();
            $(document).on('click', '.grid .tile-spaceHoder', function () {

                $('.tile-selected').removeClass('tile-selected');

                $(this).addClass('tile-selected');
                $('.color-radio').prop('checked', true);
                $('.image-pickup input[type=text]').val('');
                $('.show-count select').val('None');
                $('.image-size').text('130X130');
                selectColorItem('#6DC2E9');
                $('.size-input').html('&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br/>&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br/>&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;');
                $('.feature-area-middle .mark').css({
                    top: '0px', height: '533px'
                });
                $('.feature-area-right .mark').css({
                    top: '0px', height: '552px'
                });
                $('.action-wrapper .tile-create').addClass('active');
                $('.action-wrapper .tile-delete').removeClass('active');
                $('.title-area input[type=text]').val('New');
                if ($('.size-input').hasClass('expand')) {
                    $('.size-input').removeClass('expand').addClass('collapse');
                }
                $('.feature-area-middle .icon .icon-input').text('None').attr('icon', 'None');
                $('.overlay-black').prop('checked', true);
                $('.label-tile-type').text('Static');

            });
            $(document).on('click', '.action-wrapper .tile-create', function () {
                if (!$(this).hasClass('active')) {
                    return;
                }
                $(this).removeClass('active');
                $('.action-wrapper .tile-delete').addClass('active');

                clearSelected();
                gridTiles.push({
                    coordinateX: parseInt($('.tile-selected').attr('coordinatex')),
                    coordinateY: parseInt($('.tile-selected').attr('coordinatey')),
                    demensionX: 1,
                    demensionY: 1,
                    icon: null,
                    id: --minVal,
                    onGrid: true,
                    backgroundColor: '#6DC2E9',
                    backgroundImage: null,
                    title: 'New',
                    overlayColor: 'None',
                    shownCount: 'None',
                    countNum: '0',
                    selected: true,
                    LogicType: 'Static',
                    LogicString: ''
                });
                refreshTiles();
                createOrEditTile(minVal);
                //$('.title-area .tile-tile').focus();
            });
            $(document).on('click', '.grid .tile', function () {
                var tileId = this.id.substr(5);
                var currentTile = getCurrentTileById(tileId);
                $('.tile-selected').removeClass('tile-selected');
                $(this).addClass('tile-selected');
                createOrEditTile(tileId);
            });

            $(document).on('click', '.size-area .size-input', function (e) {
                if ($(this).hasClass('expand')) {
                    $(this).addClass('collapse').removeClass('expand');
                } else {
                    $(this).addClass('expand').removeClass('collapse');
                }
                e.preventDefault();
                e.stopPropagation()
            });

            $(document).on('click', '.size-area li.size-picker-sup', function (e) {
                if ($(this).hasClass('expand')) {
                    $(this).addClass('collapse').removeClass('expand');
                } else {
                    $('.size-area li.size-picker-sup').addClass('collapse').removeClass('expand');
                    $(this).addClass('expand').removeClass('collapse');
                }
                e.preventDefault();
                e.stopPropagation()
            });
            $(document).on('click', '.size-picker-sub li', function (e) {
                $('.size-area .size-input').addClass('collapse').removeClass('expand').html($(this).html());
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                tile.demensionX = parseInt($(this).attr('demensionX'));
                tile.demensionY = parseInt($(this).attr('demensionY'));
                $('.image-size').text('(' + (tile.demensionX * 140 - 10) + 'X' + (tile.demensionY * 140 - 10) + ')');
                refreshTiles();
                e.preventDefault();
                e.stopPropagation()
            });

            $(document).on('click', '.color-picker .color-item', function () {
                $('.color-item-selected').removeClass('color-item-selected');
                $(this).addClass('color-item-selected');
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                tile.backgroundColor = $(this).attr('backgroundcolor');
                tile.backgroundImage = null;
                refreshTiles();
            });
            $(document).on('change', '.select-tileType', function () {
                LogicTypeChange($(this).val());
            });

            $('.color-radio').click(function () {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                //if ($('.color-item-selected').length > 0) {
                //    tile.backgroundColor = $('.color-item-selected').attr('backgroundcolor');
                //}
                //if ($('.icon .icon-input').attr('icon') != 'None') {
                //    tile.icon = '&#x' + $('.icon .icon-input').attr('icon');
                //} else {
                //    tile.icon = null;
                //}
                selectColorItem(tile.backgroundColor);
                if (tile.icon != null && !/^\s*$/.test(tile.icon)) {
                    $('.icon .icon-input').html(tile.icon);
                } else {
                    $('.icon .icon-input').html('None');
                }

                tile.backgroundImage = null;
                refreshTiles();
                $('.feature-area-middle .mark').css({
                    top: '0px', height: '0px'
                });
                $('.feature-area-right .mark').css({
                    top: '235px', height: '225px'
                });
            });
            $('.image-radio').click(function () {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                if (/^\s*$/.test($('.image-pickup input[type=text]').val())) {
                    tile.backgroundImage = null;
                } else {
                    tile.backgroundImage = $('.image-pickup input[type=text]').val();
                }

                if ($('.overlay-white').prop('checked')) {
                    tile.overlayColor = 'White';
                }
                if ($('.overlay-black').prop('checked')) {
                    tile.overlayColor = 'Black';
                }
                if ($('.overlay-none').prop('checked')) {
                    tile.overlayColor = 'None';
                }
                if ($('.show-count select').val() == 'Centered') {
                    tile.shownCount = 'Lower-right';
                    $('.show-count select').val('Lower-right');
                }
                refreshTiles();
                $('.feature-area-middle .mark').css({
                    top: '235px', height: '290px'
                });
                $('.feature-area-right .mark').css({
                    top: '0px', height: '0px'
                });
            });
            $('.overlay-white').click(function () {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                tile.overlayColor = 'White';
                refreshTiles();
            });
            $('.overlay-black').click(function () {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                tile.overlayColor = 'Black';
                refreshTiles();
            });
            $('.overlay-none').click(function () {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                if ((tile.title != null && /^\s*$/.test(tile.title) == false) || (tile.shownCount == 'Lower-right')) {
                    alert('Overlay is required if Title or Report Count are to be displayed');
                    switch (tile.overlayColor) {
                        case 'White':
                            $('.overlay-white').prop('checked', true);
                            break;
                        case 'Black':
                            $('.overlay-black').prop('checked', true);
                            break;
                    }

                    return;
                }
                clearSelected();
                tile.selected = true;
                tile.overlayColor = 'None';
                refreshTiles();
            });
            $(document).on('blur', '.title-area .tile-tile', function () {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                var tileTitle = HTMLEncode($.trim($(this).val()));
                if (tileTitle != 'New' && tileTitle != '' && isDuplicate(tile.id, tileTitle)) {
                    alert('title duplicated!');
                    $('.title-area .tile-tile').focus();
                    return false;
                }
                clearSelected();
                tile.selected = true;
                tile.title = tileTitle;
                if (/^\s*$/.test(tile.title) == false && $('.image-radio').prop('checked') && $('.overlay-none').prop('checked')) {
                    alert('For tiles with background images, you must display tile\'s title with an image overlay, changing overlay to black');
                    tile.overlayColor = 'Black';
                    $('.overlay-black').prop('checked', true);
                }
                refreshTiles();
            });
            $(document).on('click', '.icon .icon-input', function (e) {
                if ($(this).hasClass('expand')) {
                    $(this).addClass('collapse').removeClass('expand');
                } else {
                    $(this).addClass('expand').removeClass('collapse');
                }
                e.preventDefault();
                e.stopPropagation()
            });
            $(document).on('click', '.icon .icon-picker table tr td', function (e) {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                if ($(this).attr('icon') != 'None') {
                    if ($('.show-count select').val() == 'Centered') {
                        if (confirm('By selecting a tile icon, the report count selection will be changed to Lower-Right, Continue? ')) {
                            $('.show-count select').val('Lower-right');
                            $('.icon .icon-input').html($(this).html());
                            $('.icon .icon-input').attr('icon', $(this).attr('icon'));
                            // tile.icon = '&#x' + $(this).attr('icon');
                            tile.icon = $(this).html();

                            tile.shownCount = 'Lower-right';
                        } else {
                            if (tile.icon == null || /^\s*$/.test(tile.icon)) {
                                $('.icon .icon-input').html('None');
                                $('.icon .icon-input').attr('icon', 'None');
                            } else {
                                $('.icon .icon-input').html(tile.icon);
                                $('.icon .icon-input').attr('icon', tile.icon.substr(3));
                            }
                        }
                    } else {
                        $('.icon .icon-input').html($(this).html());
                        $('.icon .icon-input').attr('icon', $(this).attr('icon'));
                        // tile.icon = '&#x' + $(this).attr('icon');
                        tile.icon = $(this).html();

                    }
                } else {
                    tile.icon = null;
                    $('.icon .icon-input').html('None');
                    $('.icon .icon-input').attr('icon', 'None');
                }
                $('.icon .icon-input').addClass('collapse').removeClass('expand');
                refreshTiles();
                e.preventDefault();
                e.stopPropagation()
            });
            $(document).on('change', '.show-count select', function () {
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                if ($(this).val() == 'Centered') {
                    if ($('.image-radio').prop('checked')) {
                        alert('Invalid entry, you cannot center the report count with a tile image');
                        $(this).val(tile.shownCount);
                        return;
                    }
                    if ($('.color-radio').prop('checked') && $('.icon .icon-input').attr('icon') != 'None') {
                        alert('Invalid entry, you cannot center the report count with a tile icon selected');
                        $(this).val(tile.shownCount);
                        return;
                    }
                }
                if ($(this).val() == 'Lower-right') {
                    if ($('.overlay-none').prop('checked')) {
                        alert('For tiles with background images, you must display a report count with an image overlay, changing overlay to black');
                        $('.overlay-black').prop('checked', true);
                        tile.overlayColor = 'Black';
                    }
                }
                tile.shownCount = $(this).val();

                refreshTiles();
            });

            $('.clipboard-clear').click(function () {
                if (clipboardTiles.length == 0) {
                    return;
                }
                if (confirm('You are about to delete all tiles in the clipboard and associated settings, continue?')) {
                    if ($('.tile-selected').length > 0) {
                        clearSelected();
                        var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                        tile.selected = true;
                    }
                    clipboardTiles = [];
                    refreshTiles();
                    if ($('.tile-selected').length == 0) {
                        $('.tile-delete').removeClass('active');
                    }
                }
            });
            $('.tile-delete').click(function () {
                if (!$(this).hasClass('active')) {
                    return;
                }
                if ($('.tile-selected').length > 0) {
                    if (confirm('Are you sure you want to delete the selected tile?')) {
                        var tileId = parseInt($('.tile-selected').attr('id').substr(5));
                        deleteTileById(tileId);
                        $('.action-wrapper .tile-create').removeClass('active');
                        $('.action-wrapper .tile-delete').removeClass('active');
                        refreshTiles();
                        $('.feature-area-middle .mark').css({
                            top: '0px', height: '533px'
                        });
                        $('.feature-area-right .mark').css({
                            top: '0px', height: '552px'
                        });
                        $('.tile-selected').removeClass('tile-selected');
                        $('.tile-delete').removeClass('active');
                    }
                }
            });

            $('.tile-type').click(function () {
                var tileId = $('.tile-selected').attr('id').substr(5);
                var tile = getCurrentTileById(tileId);
                if (tile.LogicType == 'AllReport') {
                    return;
                }
                $('.popupWindow').bPopup({ modalClose: false });
                //$('.autolaunch input[type=checkbox]').prop('checked', tile.autoLaunch);
                $('.select-tileType').val(tile.LogicType);
                LogicTypeChange(tile.LogicType);
            });



            $('.dashboard-body .action-area a.action-save').click(function () {
                if ($(this).hasClass('action-disable')) {
                    return;
                }
                if (clipboardTiles.length > 0) {
                    alert('Clipboard中存在没有保存的Tile,请先清空');
                    return;
                }
                if (confirm('是否保存?')) {
                    saveTiles();
                }
            });
            $('.dashboard-body .action-area .action-cancel').click(function () {
                if (confirm('推出后本次更改无法保存，是否继续?')) {
                    $(window).off('onbeforeunload');
                    window.location.href = $('.action-back').attr('href');
                }
            });
            $(document).on('click', function (e) {
                if ($('.size-input').hasClass('expand')) {
                    $('.size-input').addClass('collapse').removeClass('expand');
                }
                if ($('.icon-input').hasClass('expand')) {
                    $('.icon-input').addClass('collapse').removeClass('expand');
                }
            });

            initilizeIconPanel();

            $('.popupSave').click(function () {
                if (SaveLogicType() == true) {
                    $('.popupWindow').bPopup().close();
                    $('.popupWindow .reportListAjaxData .Filtered .filterItem .filterExpand').each(function () {
                        $(this).removeClass('filterExpand').addClass('filterCollopse');
                        $(this).parent().children('ul').slideUp();
                    });
                }
            });

            $('.popupCancel').click(function (e) {
                $('.popupWindow').bPopup().close();
            });
        }
      

        this.loadTiles = function () {
            $.ajax({
                url: getBaseUrl() + '/Ajax/TeamDashBoardAjax',
                cache: false,
                type: 'Get',
                data: { queryType: 'getadmintileinfo', SiteGUID: GetQueryString('SiteGUID') },
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
                    result.forEach(function (v) {
                        if (v.LogicType != 'Filtered' && v.LogicType != 'Selected' & v.LogicType != 'Tagged') {
                            v.LogicType = 'Static'
                        }                    
                        v.onGrid = true;
                        originalTiles.push({}, v);
                    });
                    gridTiles = result;
                    refreshTiles(true);
                    //URP.CustomizationTiles.Init();
                }
            });
        };
        this.changeTileBackgroundImage = function () {
            var imagePath = $('#hiddenupload').val();
            var lastIndex = imagePath.lastIndexOf('.');
            var tem = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];
            if ((lastIndex < 0) || (tem.indexOf(imagePath.substr(lastIndex)) == 0)) {
                $('.image-pickup input[type=text]').val('');
                alert("请选择一个后缀为'.png', '.jpg', '.jpeg', '.gif', '.bmp'的文件");
                return;
            }
            var f = document.getElementById("hiddenupload").files;

            uploadImageFile(f[0], function (result) {
                // upload the img back to server
                var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
                clearSelected();
                tile.selected = true;
                if (/^\s*$/.test(result)) {
                    tile.backgroundImage = null;
                } else {
                    tile.backgroundImage = result;
                }
                refreshTiles();
            });


        };

        this.hasChanged = false;
        function isDuplicate(tileId, tileTitle) {
            if (gridTiles.some(function (v) { return v.id != tileId && v.title.toLowerCase() == tileTitle.toLowerCase(); })) {
                return true;
            }
            if (clipboardTiles.some(function (v) { return v.id != tileId && v.title.toLowerCase() == tileTitle.toLowerCase(); })) {
                return true;
            }
            return false;
        }
  

        function checkSaveState() {
            var changed = false;
            if (originalTiles.length != gridTiles.length) {
                changed = true;
            } else {
                for (var i = 0; i < originalTiles.length; i++) {
                    if (originalTiles[i].title != gridTiles[i].title) {
                        changed = true;
                        break;
                    }
                    if (originalTiles[i].coordinateY != gridTiles[i].coordinateY) {
                        changed = true; break;
                    }
                    if (originalTiles[i].coordinateX != gridTiles[i].coordinateX) {
                        changed = true; break;
                    }
                    if (originalTiles[i].demensionX != gridTiles[i].demensionX) {
                        changed = true; break;
                    }
                    if (originalTiles[i].demensionY != gridTiles[i].demensionY) {
                        changed = true; break;
                    }
                    if (originalTiles[i].backgroundColor != gridTiles[i].backgroundColor) {
                        changed = true; break;
                    }
                    if (originalTiles[i].icon != gridTiles[i].icon) {
                        changed = true; break;
                    }
                    if (originalTiles[i].backgroundImage != gridTiles[i].backgroundImage) {
                        changed = true; break;
                    }
                    if (originalTiles[i].overlayColor != gridTiles[i].overlayColor) {
                        changed = true; break;
                    }
                    if (originalTiles[i].shownCount != gridTiles[i].shownCount) {
                        changed = true; break;
                    }
                    if (originalTiles[i].autoLaunch != gridTiles[i].autoLaunch) {
                        changed = true; break;
                    }
                    if (originalTiles[i].LogicType != gridTiles[i].LogicType) {
                        changed = true; break;
                    }
                    if (originalTiles[i].LogicString != gridTiles[i].LogicString) {
                        changed = true; break;
                    }
                }
            }

            if (changed) {
                URP.CustomizationTiles.hasChanged = true;
                $('.dashboard-body .action-area a.action-save').removeClass('action-disable');
            }
        }
        function uploadImageFile(imageData, callBack) {
            var url = getBaseUrl() + "/Ajax/FrontAjax?queryType=addPicture";
            $.upload(url, imageData, callBack);
        }
        function saveTiles() {
            var tilesData = JSON.stringify(gridTiles);
            $.ajax({
                url: getBaseUrl() + '/Ajax/TeamDashBoardAjax',
                data: { queryType: 'updateadmintileinfo', TilesData: tilesData, SiteGUID: GetQueryString('SiteGUID') },
                type: "POST",
                dataType: "json",
                timeout: 60000,
                beforeSend: function () {
                    $('.dashboard-body').showLoading();
                },
                complete: function () {
                    $('.dashboard-body').hideLoading();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('status :' + XMLHttpRequest.status + '; readyState:' + XMLHttpRequest.readyState + '; textStatus:' + textStatus);
                },
                success: function (result) {
                    if (result.result == '0') {
                        alert('更新失败！');
                    } else {
                        $(window).off('onbeforeunload')
                        window.location.href = $('.action-back').attr('href');
                    }
                }
            });
        }
        function LogicTypeChange(logicType) {
            $('.popupWindow .reportListAjaxData > div').hide().removeClass('shown');
            var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
            $('.select-tileType').prop('disabled', false);
            switch (logicType) {
                case 'Static':
                    $('.popupWindow .reportListAjaxData .Static').show().addClass('shown');
                    break;
                case 'Selected':
                    {
                        $('.popupWindow .reportListAjaxData .Selected').show().addClass('shown');
                        var callBackFun = function () {
                            $('.popupWindow .listItemID').prop('checked', false);
                            var categoryIDs;
                            if (tile.LogicType == 'Selected') {
                                categoryIDs = tile.LogicString.split(',');
                            }
                            if (categoryIDs != undefined && categoryIDs.length > 0) {
                                $('.popupWindow .listItemID').each(function () {
                                    if (categoryIDs.contains($(this).val())) {
                                        $(this).prop('checked', true);
                                    } else {
                                        $(this).prop('checked', false);
                                    }
                                });
                            }
                            
                        };
                        if ($('.reportListAjaxData .Selected').html() == '') {
                            getReportsForSelected(callBackFun);
                        } else {
                            callBackFun();
                        }
                    }
                    break;
                case 'Filtered':
                   
                    $('.popupWindow .reportListAjaxData .Filtered').show().addClass('shown');;

                    var callBackFun = function () {
                        $('.popupWindow .reportListAjaxData .Filtered .filterItem input[type=checkbox]').prop('checked', false);
                        var filterEdit;
                        if (tile.LogicType == 'Filtered') {
                            if (tile.LogicString != null && !(/^\s*$/.test(tile.LogicString))) {
                                filterEdit = JSON.parse(tile.LogicString);
                            }
                        }
                        if (filterEdit != undefined) {
                            $('.popupWindow .reportListAjaxData .Filtered .filterItem').each(function () {
                                var that = $(this);
                                var filterItemType = that.find('span.filterItemText').attr('filterType');
                                if (filterEdit[filterItemType] == null) {
                                    return true;
                                }
                                filterEdit[filterItemType].forEach(function (value) {
                                    that.find('input[type=checkbox][value=' + value.Id + ']').prop('checked', true);
                                });
                                if (that.find('input.checkItem').length == filterEdit[filterItemType].length) {
                                    $(that).find('.checkAll').prop('checked', true);
                                }
                            });
                        }
                    };
                    if ($('.reportListAjaxData .Filtered').html() == '') {
                        getReportsForFiltered(callBackFun);
                    } else {
                        callBackFun();
                    }
                    break;
                case 'Tagged':
                  
                    $('.popupWindow .reportListAjaxData .Tagged').show().addClass('shown');;
                    var callBackFun = function () {
                        $('.popupWindow .reportListAjaxData .Tagged .tagItemID').prop('checked', false);
                        var tagIds;
                        if (tile.LogicType == 'Tagged') {
                            tagIds = tile.LogicString.split(',');
                        }
                        if (tagIds != undefined && tagIds.length > 0) {
                            $('.popupWindow .reportListAjaxData .Tagged .tagItemID').each(function () {
                                if (tagIds.contains($(this).val())) {
                                    $(this).prop('checked', true);
                                } else {
                                    $(this).prop('checked', false);
                                }
                            });
                        }
                    };
                    if ($('.reportListAjaxData .Tagged').html() == '') {
                        getReportsForTagged(callBackFun);
                    } else {
                        callBackFun();
                    }
                    break;
            }

        }
        function SaveLogicType() {
            var LogicString = '';
            var LogicType = $('.select-tileType').val();
            $('.show-count select').prop('disabled', false);
            switch (LogicType) {
                case 'Static':
                    $('.show-count select').val('None');
                    $('.show-count select').prop('disabled', true);
                    break;
                case 'Selected':
                    if ($('.popupWindow .Selected .listItemID:checked').length == 0) {
                        alert('Must select at least one report!');
                        return false;
                    }
                    $('.popupWindow .Selected .listItemID:checked').each(function () {
                        LogicString += $(this).val() + ',';
                    });
                    if (LogicString.length > 0) {
                        LogicString = LogicString.substr(0, LogicString.length - 1);
                    }
                    break;
                case 'Filtered':
                    if ($('.popupWindow .Filtered .checkItem:checked').length == 0) {
                        alert('please Select at least one Filters');
                        return false;
                    }

                    var filterObj = {};
                    $('.popupWindow .Filtered .filterItem').each(function () {
                        var propertyName = $(this).children('.filterItemText').attr('filterType');
                        if ($(this).find('.checkItem:checked').length == 0) {
                            return true;
                        }

                        filterObj[propertyName] = [];
                        $(this).find('.checkItem').each(function () {
                            if ($(this).prop('checked')) {
                                filterObj[propertyName].push({ Id: $(this).val(), Name: $(this).next().text() });
                            }
                        });
                    });
                    LogicString = JSON.stringify(filterObj);
                    break;
                case 'Tagged':
                    if ($('.popupWindow .Tagged .tagItemID').length == 0) {
                        alert('There is no tag available!');
                        return false;
                    }
                    if ($('.popupWindow .Tagged .tagItemID:checked').length == 0) {
                        alert('Must select at least one tag!');
                        return;
                    }
                    $('.popupWindow .Tagged .tagItemID:checked').each(function () {
                        LogicString += $(this).val() + ',';
                    });
                    if (LogicString.length > 0) {
                        LogicString = LogicString.substr(0, LogicString.length - 1);
                    }
                    break;
            }
            var tile = getCurrentTileById($('.tile-selected').attr('id').substr(5));
            tile.LogicType = LogicType;
            $('.label-tile-type').text(LogicType);
            tile.LogicString = LogicString;
       

            updateCount(tile);
            if (!URP.CustomizationTiles.hasChanged) {
                checkSaveState();
            }
            return true;
        }
        function updateCount(tile) {
            if (tile.LogicType == 'Static') {
                tile.countNum = 0;
                if ($('#tile_' + tile.id + ' .tile-count').length > 0) {
                    $('.show-count select').val('None').prop('disabled', true);
                    $('#tile_' + tile.id + ' .tile-count').text('');
                }
            } else {
                var tileData = JSON.stringify(tile);
                $.ajax({
                    url: getBaseUrl() + '/_layouts/15/URPAjax/AdminAjax.aspx',
                    type: 'Post',
                    data: { queryType: 'GetTempTileReportCount', TileData: tileData, SiteGUID: GetQueryString('SiteGUID') },
                    dataType: 'json',
                    timeout: 60000,
                    beforeSend: function () {
                    },
                    complete: function () {
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('status :' + XMLHttpRequest.status + '; readyState:' + XMLHttpRequest.readyState + '; textStatus:' + textStatus);
                    },
                    success: function (result) {
                        tile.countNum = result;
                        if ($('#tile_' + tile.id + ' .tile-count').length > 0) {
                            $('#tile_' + tile.id + ' .tile-count').text(result);
                        }
                    }
                });
            }

        }
        function getReportsForSelected(callBack) {
            $.ajax({
                url: getBaseUrl() + '/Ajax/AddNewReport',
                type: 'Get',
                cache: false,
                data: { queryType: 'getadmintilereport', TileID: 0, SiteGUID: GetQueryString('SiteGUID') },
                dataType: 'json',
                timeout: 60000,
                beforeSend: function () {
                    if ($('.popupWindow .reportListAjaxData .Selected').hasClass('shown')) {
                        $('.select-tileType').prop('disabled', true);
                        $('.popupSave').prop('disabled', true);
                    }
                    $('.popupWindow .reportListAjaxData .Selected').addClass('donut');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('status :' + XMLHttpRequest.status + '; readyState:' + XMLHttpRequest.readyState + '; textStatus:' + textStatus);
                },
                complete: function () {
                    $('.select-tileType').prop('disabled', false);
                    $('.popupSave').prop('disabled', false);
                    $('.popupWindow .reportListAjaxData .Selected').removeClass('donut');
                },
                success: function (result) {
                    if (result == null || !$('.popupWindow .reportListAjaxData .Selected').hasClass('shown')) {
                        return;
                    }
                    var reportListString = '<h3 style="margin-top:20px;margin-bottom:10px;font-size:16px">Select List</h3>';
                    $.each(result.ReportList, function (index, content) {
                        reportListString += ' <div class="list-item"><div class="item-header"><input class="listItemID" type="checkbox" value="' + content.ID + '"/><a class="item-title"  target="_Blank" href="' + content.BrowserOpenUrl + '">' + content.Title + '</a></div>' +
                        '<div class="item-content"><div class="item-summary">' + content.Descript + '</div><div class="summary-footer">Type: ' + content.Type + ' | Owner: ' + subOwner(content.Owners) + ' | Status: ' + content.ReportStatus + '</div></div></div>';
                    });

                    $('.popupWindow .reportListAjaxData .Selected').html(reportListString);
                    $('.popupWindow .listItemID').prop('checked', false);
                    if (callBack != null) {
                        callBack();
                    }
                }
            });
        }
        function getReportsForFiltered(callBack) {
            $.ajax({
                url: getBaseUrl() + '/Ajax/TeamAdminAjax',
                type: 'Get',
                cache: false,
                data: { queryType: 'gettilefilterlist', TileID: 0, SiteGUID: GetQueryString('SiteGUID') },
                dataType: 'json',
                timeout: 60000,
                beforeSend: function () {
                    $('.select-tileType').prop('disabled', true);
                    $('.popupSave').prop('disabled', true);
                    $('.popupWindow .reportListAjaxData .Filtered').addClass('donut');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('status :' + XMLHttpRequest.status + '; readyState:' + XMLHttpRequest.readyState + '; textStatus:' + textStatus);
                },
                complete: function () {
                    if ($('.popupWindow .reportListAjaxData .Filtered').hasClass('shown')) {
                        $('.select-tileType').prop('disabled', false);
                        $('.popupSave').prop('disabled', false);
                    }
                    $('.popupWindow .reportListAjaxData .Filtered').removeClass('donut');
                },
                success: function (result) {
                    if (result == null || !$('.popupWindow .reportListAjaxData .Filtered').hasClass('shown')) {
                        return;
                    }

                    var filterItemListString = '<h3 style="margin-top:20px;margin-bottom:10px;font-size:16px">Filters</h3>';
                    for (var filterType in result) {
                        var filterItemText;
                        switch (filterType) {
                            case 'SubCategory':
                                filterItemText = 'Category';
                                break;
                            case 'Type':
                                filterItemText = 'BI Type';
                                break;
                            case 'CatelogType':
                                filterItemText = 'Catelog Type';
                                break;
                            case 'DataSource':
                                filterItemText = 'Data Source';
                                break;
                            default:
                                filterItemText = filterType
                                break;
                        }
                        filterItemListString += '<div class="filterItem"><a href="#" class="filterCollopse"></a><span class="filterItemText" filterType="' + filterType + '">' + filterItemText + '</span><ul class="top-ul"><li><input class="checkAll" type="checkbox" value="All" /><label>All</label></li>';
                        if (filterType != 'SubCategory') {
                            result[filterType].forEach(function (value) {
                                filterItemListString += ' <li title=\'' + value.Name + '\'><input class="checkItem" type="checkbox"   value="' + value.Id + '" /><label>' + value.Name + '</label></li>';
                            });
                        } else {
                            var categoryList = result[filterType].filter(function (x) {
                                return x.ParentId == null;
                            });
                            categoryList.forEach(function (value) {
                                filterItemListString += ' <li title=\'' + value.Name + '\'><a href="#" class="filterCollopse"></a><span class="filterItemText">' + value.Name + '</span><ul class="leveTwoUl">';
                                var subCategoryList = result[filterType].filter(function (x) {
                                    return x.ParentId == value.Id;
                                });
                                subCategoryList.forEach(function (subValue) {
                                    filterItemListString += ' <li title=\'' + subValue.Name + '\'><input class="checkItem" type="checkbox"  value="' + subValue.Id + '" /><label>' + subValue.Name + '</label></li>';
                                });
                                filterItemListString += '</ul></li>';
                            });
                        }
                        filterItemListString += '</ul></div>';
                    }

                    $('.popupWindow .reportListAjaxData .Filtered').html(filterItemListString);
                    if (callBack != null) {
                        callBack();
                    }
                }
            });
        }
        function getReportsForTagged(callBack) {
            $.ajax({
                url: getBaseUrl() + '/Ajax/TeamAdminAjax',
                type: 'Get',
                cache: false,
                data: { queryType: 'taglist', TileID: 0, SiteGUID: GetQueryString('SiteGUID') },
                dataType: 'json',
                timeout: 60000,
                beforeSend: function () {
                    $('.select-tileType').prop('disabled', true);
                    $('.popupSave').prop('disabled', true);
                    $('.popupWindow .reportListAjaxData .Tagged').addClass('donut');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('status :' + XMLHttpRequest.status + '; readyState:' + XMLHttpRequest.readyState + '; textStatus:' + textStatus);
                },
                complete: function () {
                    if ($('.popupWindow .reportListAjaxData .Tagged').hasClass('shown')) {
                        $('.select-tileType').prop('disabled', false);
                        $('.popupSave').prop('disabled', false);
                    }
                    $('.popupWindow .reportListAjaxData .Tagged').removeClass('donut');
                },
                success: function (result) {
                    if (result == null || !$('.popupWindow .reportListAjaxData .Tagged').hasClass('shown')) {
                        return;
                    }
                    var reportListString = '<h3 style="margin-top:20px;margin-bottom:10px;font-size:16px">Tags</h3>';
                    $.each(result, function (index, content) {
                        reportListString += '<div class="list-tag-item"><label><input class="tagItemID" type="checkbox" value="' + content.Id + '"></input>' + content.Name + '</label></div>';
                    });

                    $('.popupWindow .reportListAjaxData .Tagged').html(reportListString);
                    $('.popupWindow .listItemID').prop('checked', false);
                    if (callBack != null) {
                        callBack();
                    }
                }
            });
        }
        function createOrEditTile(tileId) {
            $('.action-wrapper .tile-create').removeClass('active');
            var tile = getCurrentTileById(tileId);
            if (tile.LogicType == 'AllReport') {
                $('.action-wrapper .tile-delete').removeClass('active');
                $('.title-area input[type=text]').prop('disabled', true);
                $('.tile-type').css('background-color', '#ddd');
            } else {
                $('.action-wrapper .tile-delete').addClass('active');
                $('.title-area input[type=text]').prop('disabled', false);
                $('.tile-type').css('background-color', '#1570A6');
            }
            $('.title-area input[type=text]').val(HTMLDecode(tile.title));
            if (tile.onGrid) {
                refreshSizePicker(tileId);
            } else {
                var sizeInputHtml = '';
                for (y = 0; y < tile.demensionY; y++) {
                    for (x = 0; x < 8 ; x++) {
                        if (x < tile.demensionX) {
                            sizeInputHtml += '&#xE074;';
                        } else {
                            sizeInputHtml += '&#xE157;';
                        }
                    }
                    sizeInputHtml += '<br />';
                }
                for (; y < 3; y++) {
                    sizeInputHtml += '&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />';
                }
                $('.size-area .size-input').html(sizeInputHtml);
            }
            if ($('.size-input').hasClass('expand')) {
                $('.size-input').removeClass('expand').addClass('collapse');
            }
            if (tile.backgroundImage == null || /^\s*$/.test(tile.backgroundImage)) {
                $('.color-radio').prop('checked', true);
                $('.feature-area-middle .mark').css({
                    top: '0px', height: '0px'
                });
                $('.feature-area-right .mark').css({
                    top: '235px', height: '225px'
                });
                selectColorItem(tile.backgroundColor);
                if (tile.icon != null && !/^\s*$/.test(tile.icon)) {
                    $('.icon .icon-input').html(tile.icon);
                    $('.icon .icon-input').attr('icon', tile.icon.substr(3));
                } else {
                    $('.icon .icon-input').html('None');
                    $('.icon .icon-input').attr('icon', 'None');
                }
                $('.overlay-black').prop('checked', true);
                $('.image-pickup input[type=text]').val('');
            } else {
                $('.image-radio').prop('checked', true);
                $('.feature-area-middle .mark').css({
                    top: '235px', height: '290px'
                });
                $('.feature-area-right .mark').css({
                    top: '0px', height: '0px'
                });

                $('.image-pickup input[type=text]').val(tile.backgroundImage);
                switch (tile.overlayColor) {
                    case 'None':
                        $('.overlay-none').prop('checked', true);
                        break;
                    case 'Black':
                        $('.overlay-black').prop('checked', true);
                        break;
                    case 'White':
                        $('.overlay-white').prop('checked', true);
                        break;
                }
            }
            $('.image-size').text('(' + (tile.demensionX * 140 - 10) + 'X' + (tile.demensionY * 140 - 10) + ')');
            selectCountItem(tile.shownCount);
            if (!tile.onGrid) {
                $('.feature-area-middle .mark').css({
                    top: '0px', height: '533px'
                });
                $('.feature-area-right .mark').css({
                    top: '0px', height: '552px'
                });
            }
            $('.label-tile-type').text(tile.LogicType);
            if (tile.LogicType == 'AllReport') {
                $('.label-tile-type').text('All Reports');
            }
            $('.select-tileType').val(tile.LogicType);
            switch (tile.LogicType) {
                case 'Static':
                    $('.show-count select').val('None');
                    $('.show-count select').prop('disabled', true);
                    break;
                default:
                    $('.show-count select').prop('disabled', false);
                    break;
            }
        }
        function selectCountItem(value) {
            $('.feature-area-right .show-count select option:first').prop('selected', true);
            $('.feature-area-right .show-count select option').each(function () {
                if ($(this).val().toLowerCase() == value.toLowerCase()) {
                    $(this).prop('selected', true);
                }
            });
        }
        function selectColorItem(colorCode) {
            $('.color-item-selected').removeClass('color-item-selected');
            $('.dashboard-body .color-picker .color-item').each(function () {
                if ($(this).attr('backgroundColor') == colorCode) {
                    $(this).addClass('color-item-selected');
                }
            });
        }
        function refreshColorItem() {
            $('.dashboard-body .color-picker .color-item').each(function () {
                $(this).css('background-color', $(this).attr('backgroundColor'));
            });
        }
        function refreshSizePicker(tileId) {
            var map83 = [[false, false, false], [false, false, false], [false, false, false],
                    [false, false, false], [false, false, false], [false, false, false],
                    [false, false, false], [false, false, false]
            ];
            var currentCoordinateX, currentCoordinateY, currentDemensionX, currentDemensionY;
            var x = 0, xx = 0, y = 0, yy = 0, yyy = 0, i = 0, j = 0;
            gridTiles.forEach(function (v) {
                if (v.id == tileId) {
                    currentCoordinateX = parseInt(v.coordinateX);
                    currentCoordinateY = parseInt(v.coordinateY);
                    currentDemensionX = parseInt(v.demensionX);
                    currentDemensionY = parseInt(v.demensionY);
                    return true;
                }
                for (i = 0; i < v.demensionX; i++) {
                    for (j = 0; j < v.demensionY; j++) {
                        map83[v.coordinateX + i][v.coordinateY + j] = true;
                    }
                }
            });
            var sizeInputHtml = '';
            for (y = 0; y < currentDemensionY; y++) {
                for (x = 0; x < 8 ; x++) {
                    if (x < currentDemensionX) {
                        sizeInputHtml += '&#xE074;';
                    } else {
                        sizeInputHtml += '&#xE157;';
                    }
                }
                sizeInputHtml += '<br />';
            }
            for (; y < 3; y++) {
                sizeInputHtml += '&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />';
            }
            $('.size-area .size-input').html(sizeInputHtml);
            var sizePickerHtml = '';
            for (y = 0; y + currentCoordinateY < 3 && map83[currentCoordinateX][y + currentCoordinateY] == false; y++) {
                if (y + 1 == currentDemensionY) {
                    sizePickerHtml += ' <li class="size-picker-sup expand">';
                } else {
                    sizePickerHtml += ' <li class="size-picker-sup collapse">';
                }
                for (yy = 0; yy <= y; yy++) {
                    sizePickerHtml += '&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br/>';
                }
                for (; yy < 3; yy++) {
                    sizePickerHtml += '&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br/>';
                }
                sizePickerHtml += ' </li><li><ul class="size-picker-sub">';
                for (x = 0; x + currentCoordinateX < 8; x++) {
                    var hasConfict = false;
                    for (yy = 0; yy <= y; yy++) {
                        if (map83[currentCoordinateX + x][yy + currentCoordinateY] == true) {
                            hasConfict = true;
                            break;
                        }
                    }
                    if (hasConfict == true) {
                        break;
                    } else {
                        sizePickerHtml += '<li demensionX="' + (x + 1) + '" demensionY="' + (y + 1) + '">';
                        for (yyy = 0; yyy < y + 1; yyy++) {
                            for (xx = 0; xx < 8 ; xx++) {
                                if (xx < x + 1) {
                                    sizePickerHtml += '&#xE074;';
                                } else {
                                    sizePickerHtml += '&#xE157;';
                                }
                            }
                            sizePickerHtml += '<br />';
                        }
                        for (; yyy < 3; yyy++) {
                            sizePickerHtml += '&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />';
                        }
                        sizePickerHtml += '</li>';
                    }
                }
                sizePickerHtml += '</ul></li>';
            }
            $('.size-picker').html(sizePickerHtml);
        }
        function refreshItselfOnGrid(tileId, destinationX, destinationY) {
            var currentTile = getCurrentTileById(tileId);
            if (destinationX < 0) {
                destinationX = 0;
            }
            if (destinationX + currentTile.demensionX > 8) {
                destinationX = 8 - currentTile.demensionX;
            }
            if (destinationY < 0) {
                destinationY = 0;
            }
            if (destinationY + currentTile.demensionY > 3) {
                destinationY = 3 - currentTile.demensionY;
            }
            var map83 = [[false, false, false], [false, false, false], [false, false, false],
                     [false, false, false], [false, false, false], [false, false, false],
                     [false, false, false], [false, false, false]
            ];
            for (var i = 0; i < currentTile.demensionX; i++) {
                for (var j = 0; j < currentTile.demensionY; j++) {
                    map83[destinationX + i][destinationY + j] = true;
                }
            }
            var hasConfict = false;
            gridTiles.forEach(function (v) {
                if (v.id == tileId) {
                    return true;
                }
                for (var i = 0; i < v.demensionX; i++) {
                    for (var j = 0; j < v.demensionY; j++) {
                        if (map83[v.coordinateX + i][v.coordinateY + j] == false) {
                            map83[v.coordinateX + i][v.coordinateY + j] = true;
                        } else {
                            hasConfict = true;
                            break;
                        }
                    }
                }
                if (hasConfict == true) {
                    return false;
                }
            });
            if (hasConfict == false) {
                currentTile.coordinateX = destinationX;
                currentTile.coordinateY = destinationY;
                if (currentTile.onGrid == false) {
                    for (var i = clipboardTiles.length; i--;) {
                        if (clipboardTiles[i].id == tileId) {
                            gridTiles.push(clipboardTiles[i]);
                            clipboardTiles.splice(i, 1);
                        }
                    }
                    currentTile.onGrid = true;
                }
            } else {
                currentTile.coordinateX = currentTile.orignalCoordinateX;
                currentTile.coordinateY = currentTile.orignalCoordinateY;
            }
        }
        function refreshItselfOnClipboard(tileId, destinationX, destinationY) {
            var currentTile = getCurrentTileById(tileId);
            if (destinationX < 0) {
                destinationX = 0;
            }
            if (destinationX + currentTile.demensionX > 4) {
                destinationX = 4 - currentTile.demensionX;
            }
            if (destinationY < 0) {
                destinationY = 0;
            }
            if (destinationY + currentTile.demensionY > 3) {
                destinationY = 3 - currentTile.demensionY;
            }
            var map43 = [[false, false, false], [false, false, false], [false, false, false], [false, false, false]];
            for (var i = 0; i < currentTile.demensionX; i++) {
                for (var j = 0; j < currentTile.demensionY; j++) {
                    map43[destinationX + i][destinationY + j] = true;
                }
            }
            var hasConfict = false;
            clipboardTiles.forEach(function (v) {
                if (v.id == tileId) {
                    return true;
                }
                for (var i = 0; i < v.demensionX; i++) {
                    for (var j = 0; j < v.demensionY; j++) {
                        if (map43[v.coordinateX + i][v.coordinateY + j] == false) {
                            map43[v.coordinateX + i][v.coordinateY + j] = true;
                        } else {
                            hasConfict = true;
                            break;
                        }
                    }
                }
                if (hasConfict == true) {
                    return false;
                }
            });
            if (hasConfict == false) {
                currentTile.coordinateX = destinationX;
                currentTile.coordinateY = destinationY;
                if (currentTile.onGrid == true) {
                    for (var i = gridTiles.length; i--;) {
                        if (gridTiles[i].id == tileId) {
                            clipboardTiles.push(gridTiles[i]);
                            gridTiles.splice(i, 1);
                            break;
                        }
                    }
                    currentTile.onGrid = false;
                }

            } else {
                currentTile.coordinateX = currentTile.orignalCoordinateX;
                currentTile.coordinateY = currentTile.orignalCoordinateY;
            }
        }
        function clearSelected() {
            gridTiles.forEach(function (v) {
                delete v.selected;
            });
        }
        function refreshTiles(firstTime) {
            if (!firstTime && !URP.CustomizationTiles.hasChanged) {
                checkSaveState();
            }
            $('.tile-selected').removeClass('tile-selected');
            $('.grid .tile').remove();
            gridTiles.forEach(function (v) {
                var left = (v.coordinateX * unit) + 'px';
                var top = (v.coordinateY * unit) + 'px';
                var width = (v.demensionX * unit - 10) + 'px';
                var height = (v.demensionY * unit - 10) + 'px';
                var tile = $('<div draggable="true" ondragstart="URP.CustomizationTiles.dragStart(event)" ondrag="URP.CustomizationTiles.drag(event)" ondragend="URP.CustomizationTiles.dragEnd(event)" id="tile_' + v.id + '" class="tile" style="left:' + left + ';top:' + top + ';width:' + width + ';height:' + height + ';"><span class="tile-title">' + v.title + '</span><span class="selected-check"></span> </div>').appendTo($('.grid'));
                if (v.backgroundImage == null || /^\s*$/.test(v.backgroundImage)) {
                    tile.css('background-color', v.backgroundColor);
                    if (whiteColorMap.indexOf(v.backgroundColor) > -1) {
                        tile.css('color', 'white');
                    } else {
                        tile.css('color', 'black');
                    }
                    if (v.icon != null && v.icon.length > 0) {
                        var icon = $('<span class="tile-icon">' + v.icon + '</span>');
                        switch (v.demensionY) {
                            case 1:
                                icon.addClass('tile-icon1row');
                                break;
                            case 2:
                                icon.addClass('tile-icon2row');
                                break;
                            case 3:
                                {
                                    icon.addClass('tile-icon3row');
                                    if (v.demensionX == 1) {
                                        icon.css({ 'font-size': '70px', 'margin-top': '120px' })
                                    }
                                }
                                break;
                        }
                        icon.appendTo(tile);
                    }
                } else {
                    tile.css('background-image', 'url(' + v.backgroundImage.replace(' ', '%20') + ')');
                    var overlay = $('<span class="tile-overlay"></span>');
                    overlay.css('background-color', v.overlayColor);
                    switch (v.overlayColor) {
                        case 'Black':
                            tile.find('.tile-title').css('color', 'white');
                            break;
                        case 'White':
                            tile.find('.tile-title').css('color', 'black');
                            break;
                    }
                    overlay.appendTo(tile);
                }
                if (v.shownCount != null && v.shownCount != 'None') {
                    var count = $('<span class="tile-count">' + v.countNum + '</span>');
                    if (v.shownCount == 'Centered' && (v.icon == null || /^\s*$/.test(v.icon)) && v.backgroundColor != null && v.backgroundColor.length > 0) {
                        switch (v.demensionY) {
                            case 1:
                                count.addClass('tile-icon1row');
                                break;
                            case 2:
                                count.addClass('tile-icon2row');
                                break;
                            case 3:
                                {
                                    count.addClass('tile-icon3row');
                                    if (v.demensionX == 1) {
                                        count.css({ 'font-size': '70px', 'margin-top': '120px' })
                                    }
                                }
                                break;
                        }

                    } else {
                        count.css({
                            position: 'absolute',
                            bottom: '8px',
                            right: '10px',
                            fontFamily: 'Segoe UI',
                            fontSize: '13px',
                        });
                        if (v.backgroundImage != null && v.backgroundImage.length > 0) {
                            switch (v.overlayColor) {
                                case 'Black':
                                    count.css('color', 'white');
                                    break;
                                case 'White':
                                    count.css('color', 'black');
                                    break;
                            }
                        }
                    }
                    count.appendTo(tile);
                }
                if (v.selected) {
                    tile.addClass('tile-selected');
                }
            });
            clipboardTiles.forEach(function (v) {
                var left = (v.coordinateX * unit) + 'px';
                var top = ((v.coordinateY + 3) * unit) + gap + 'px';
                var width = (v.demensionX * unit - 10) + 'px';
                var height = (v.demensionY * unit - 10) + 'px';
                var tile = $('<div draggable="true" ondragstart="URP.CustomizationTiles.dragStart(event)" ondrag="URP.CustomizationTiles.drag(event)" ondragend="URP.CustomizationTiles.dragEnd(event)" id="tile_' + v.id + '" class="tile" style="left:' + left + ';top:' + top + ';width:' + width + ';height:' + height + ';"><span class="tile-title">' + v.title + '</span><span class="selected-check"></span> </div>').appendTo($('.grid'));
                if (v.backgroundImage == null || /^\s*$/.test(v.backgroundImage)) {
                    tile.css('background-color', v.backgroundColor);
                    if (whiteColorMap.indexOf(v.backgroundColor) > -1) {
                        tile.css('color', 'white');
                    } else {
                        tile.css('color', 'black');
                    }
                    if (v.icon != null && v.icon.length > 0) {
                        var icon = $('<span class="tile-icon">' + v.icon + '</span>');
                        switch (v.demensionY) {
                            case 1:
                                icon.addClass('tile-icon1row');
                                break;
                            case 2:
                                icon.addClass('tile-icon2row');
                                break;
                            case 3:
                                {
                                    icon.addClass('tile-icon3row');
                                    if (v.demensionX == 1) {
                                        icon.css({ 'font-size': '70px', 'margin-top': '120px' })
                                    }
                                }
                                break;
                        }
                        icon.appendTo(tile);
                    }
                } else {
                    tile.css('background-image', 'url(' + v.backgroundImage.replace(' ', '%20') + ')');
                    var overlay = $('<span class="tile-overlay"></span>');
                    overlay.css('background-color', v.overlayColor);
                    switch (v.overlayColor) {
                        case 'Black':
                            tile.find('.tile-title').css('color', 'white');
                            break;
                        case 'White':
                            tile.find('.tile-title').css('color', 'black');
                            break;
                    }
                    overlay.appendTo(tile);
                }
                if (v.shownCount != null && v.shownCount != 'None') {
                    var count = $('<span class="tile-count">' + v.countNum + '</span>');
                    if (v.shownCount == 'Centered' && (v.icon == null || /^\s*$/.test(v.icon)) && v.backgroundColor != null && v.backgroundColor.length > 0) {
                        switch (v.demensionY) {
                            case 1:
                                count.addClass('tile-icon1row');
                                break;
                            case 2:
                                count.addClass('tile-icon2row');
                                break;
                            case 3:
                                {
                                    count.addClass('tile-icon3row');
                                    if (v.demensionX == 1) {
                                        count.css({ 'font-size': '70px', 'margin-top': '120px' })
                                    }
                                }
                                break;
                        }

                    } else {
                        count.css({
                            position: 'absolute',
                            bottom: '8px',
                            right: '10px',
                            fontFamily: 'Segoe UI',
                            fontSize: '13px',
                        });
                        if (v.backgroundImage != null && v.backgroundImage.length > 0) {
                            switch (v.overlayColor) {
                                case 'Black':
                                    count.css('color', 'white');
                                    break;
                                case 'White':
                                    count.css('color', 'black');
                                    break;
                            }
                        }
                    }
                    count.appendTo(tile);
                }
            });

        }
        function caculateLocation(ev, ondrop) {

            var endOffsetX = ev.offsetX;
            var endOffsetY = ev.offsetY;
            var newTop = parseFloat(ev.currentTarget.style.top.replace('px', '')) + (endOffsetY - startOffsetY);
            var newLeft = parseFloat(ev.currentTarget.style.left.replace('px', '')) + (endOffsetX - startOffsetX);
            ev.currentTarget.style.top = newTop + 'px';
            ev.currentTarget.style.left = newLeft + 'px';

            if (ondrop == null) {
                return;
            }

            var tileId = ev.currentTarget.id.substr(5);
            var currentTile = getCurrentTileById(tileId);
            var pageX = ev.pageX;
            var pageY = ev.pageY;
            var gridLeft = $('.grid').offset().left;
            var gridTop = $('.grid').offset().top;
            var clipboardLeft = $('.clipboard').offset().left;
            var clipboardTop = $('.clipboard').offset().top;
            if (pageX > gridLeft && pageX < gridLeft + 1120 && pageY > gridTop && pageY < gridTop + 420) {
                if (newTop % unit <= unit / 2) {
                    newTop = (newTop / unit) * unit;
                } else {
                    newTop = ((newTop / unit) + 1) * unit;
                }

                if (newLeft % unit <= unit / 2) {
                    newLeft = (newLeft / unit) * unit;
                } else {
                    newLeft = ((newLeft / unit) + 1) * unit;
                }
                var currentDestinationX = parseInt(newLeft / unit);
                var currentDestinationY = parseInt(newTop / unit);
                if (previousDestinationX != currentDestinationX || previousDestinationY != currentDestinationY || currentTile.onGrid == false) {
                    previousDestinationX = currentDestinationX;
                    previousDestinationY = currentDestinationY;
                    refreshItselfOnGrid(tileId, currentDestinationX, currentDestinationY);
                }

            } else if (pageX > clipboardLeft && pageX < clipboardLeft + 560 && pageY > clipboardTop && pageY < clipboardTop + 420 && currentTile.demensionX <= 4 && currentTile.LogicType != 'AllReport') {
                newTop -= (3 * unit + gap);
                if (newTop % unit <= unit / 2) {
                    newTop = (newTop / unit) * unit;
                } else {
                    newTop = ((newTop / unit) + 1) * unit;
                }

                if (newLeft % unit <= unit / 2) {
                    newLeft = (newLeft / unit) * unit;
                } else {
                    newLeft = ((newLeft / unit) + 1) * unit;
                }
                var currentDestinationX = parseInt(newLeft / unit);
                var currentDestinationY = parseInt(newTop / unit);
                if (previousDestinationX != currentDestinationX || previousDestinationY != currentDestinationY || currentTile.onGrid == true) {
                    previousDestinationX = currentDestinationX;
                    previousDestinationY = currentDestinationY;
                    refreshItselfOnClipboard(tileId, currentDestinationX, currentDestinationY);
                }
            } else {
                currentTile.coordinateX = currentTile.orignalCoordinateX;
                currentTile.coordinateY = currentTile.orignalCoordinateY;
                return;
            }
            //$('#console').html('onGrid:' + currentTile.onGrid);
        }
        function getCurrentTileById(tileId) {
            var currentTile = undefined;
            gridTiles.forEach(function (v) {
                if (v.id == tileId) {
                    currentTile = v;
                    return false;
                }
            });
            clipboardTiles.forEach(function (v) {
                if (v.id == tileId) {
                    currentTile = v;
                    return false;
                }
            });
            return currentTile;
        }
        function deleteTileById(tileId) {
            for (var i = gridTiles.length - 1; i >= 0; i--) {
                if (gridTiles[i].id == tileId) {
                    gridTiles.splice(i, 1);
                }
            }

            for (var i = clipboardTiles.length - 1; i >= 0; i--) {
                if (clipboardTiles[i].id == tileId) {
                    clipboardTiles.splice(i, 1);
                }
            }
        }
        function getBaseUrl() {
            var url = "http://" + window.location.hostname + ':' + window.location.port;
            return url;

        }
        function GetQueryString(name) {
            var r = window.location.search.split('=')[1];
            return r;
        }
        function subOwner(name) {
            if (!(name == undefined || name == null)) {
                if (name.indexOf(",") > 0)
                    return name.substring(0, name.indexOf(","));
                else
                    return name;
            }
        }
        function emailStr(strs) {
            var arr = strs.split(",");
            var result = "";
            for (var i = 0; i < arr.length; i++) {
                result += "<a href='mailto:" + arr[i] + "'>" + arr[i] + "</a>";
                if (i < arr.length - 1) {
                    result += "<Br/>"
                }
            }
            return result;
        }
        function initilizeIconPanel() {
            //var i, iconNum, index = 1;
            //var tr;
            //$('.icon-picker table').html('');
            //tr = $('<tr></tr>').appendTo($('.icon-picker table')).append('<td icon="None">None</td>');
            //for (i = 57600; i < 57835; i++) {
            //    if (index % 10 == 0) {
            //        tr = $('<tr></tr>').appendTo($('.icon-picker table'));
            //    }
            //    iconNum = Number(i).toString(16).toUpperCase();
            //    $('<td></td>').html('&#x' + iconNum).appendTo(tr).attr('icon', iconNum);
            //    index++;
            //}
        }
    }

})(window.URP = window.URP || {}, jQuery);

$(function () {
    URP.CustomizationTiles.Init();
    //URP.CustomizationTiles.loadTiles();
    URP.CustomizationTiles.loadTiles();

    $(window).on('onbeforeunload', function () {
        if (!$('.dashboard-body .action-area a.action-save').hasClass('action-disable')) {
            return 'Are you sure you want to leave current page without saving tiles.';
        }
    });
});

function allowDrop(ev) {
    ev.preventDefault();
}

function changedBackgroundImage() {
    URP.CustomizationTiles.changeTileBackgroundImage();
}


function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}
function HTMLDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}