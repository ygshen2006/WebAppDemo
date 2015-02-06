$(function(){
    if ((document.location.host.indexOf('.dev') > -1) || (document.location.host.indexOf('modernui') > -1) ) {
        $("<script/>").attr('src', '../js/metro/metro-loader.js').appendTo($('body'));
    } else {
        $("<script/>").attr('src', '../js/metro.min.js').appendTo($('body'));
    }
})