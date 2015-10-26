var plugins = [
    'grid',
    'cell'
];
var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
$.each(plugins, function (i, plugin) {
    $("<script/>").attr('src', '../Scripts/tile/tile-' + plugin + '.js').appendTo($('body'));

});