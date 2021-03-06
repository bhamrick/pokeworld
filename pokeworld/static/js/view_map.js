function update_minimap() {
    var map_w = $("#map_img").width();
    var map_h = $("#map_img").height();
    var border_width_w = ($("#map_img").outerWidth() - map_w) / 2;
    var border_width_h = ($("#map_img").outerHeight() - map_h) / 2;
    var win_w = $(window).width();
    var win_h = $(window).height();
    var scroll_x = $(document).scrollLeft() - border_width_w;
    var scroll_y = $(document).scrollTop() - border_width_h;
    var minimap_w = $("#minimap").width();
    var minimap_h = $("#minimap").height();

    var sel_x = minimap_w * scroll_x / map_w;
    var sel_y = minimap_h * scroll_y / map_h;
    var sel_w = minimap_w * win_w / map_w;
    var sel_h = minimap_h * win_h / map_h;
    if (sel_x > minimap_w - sel_w) {
        sel_x = minimap_w - sel_w;
    }
    if (sel_y > minimap_h - sel_h) {
        sel_y = minimap_h - sel_h;
    }
    if (sel_x < 0) {
        sel_x = 0;
    }
    if (sel_y < 0) {
        sel_y = 0;
    }
    $("#selector").css({"left": sel_x + "px",
                        "top": sel_y + "px",
                        "width": sel_w + "px",
                        "height": sel_h + "px"});
}

function update_scroll(x, y) {
    var map_w = $("#map_img").width();
    var map_h = $("#map_img").height();
    var win_w = $(window).width();
    var win_h = $(window).height();
    var minimap_w = $("#minimap").width();
    var minimap_h = $("#minimap").height();
    var selector_w = $("#selector").width();
    var selector_h = $("#selector").height();

    if (x < 0 || y < 0 || x > minimap_w || y > minimap_h) {
        return;
    }

    x = x - selector_w / 2;
    y = y - selector_h / 2;
    if (x > minimap_w - selector_w) {
        x = minimap_w - selector_w;
    }
    if (y > minimap_h - selector_h) {
        y = minimap_h - selector_h;
    }
    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }

    $("#selector").css({"left": x + "px",
                        "right": y + "px"});
    var border_width_w = ($("#map_img").outerWidth() - map_w) / 2;
    var border_width_h = ($("#map_img").outerHeight() - map_h) / 2;
    var scroll_x = map_w * x / minimap_w + border_width_w;
    var scroll_y = map_h * y / minimap_h + border_width_h;
    $(document).scrollTop(scroll_y);
    $(document).scrollLeft(scroll_x);
}

function minimap_click_handler(e) {
    var minimap_offset = $("#minimap").offset();
    var x = e.pageX - minimap_offset.left;
    var y = e.pageY - minimap_offset.top;
    update_scroll(x, y);
}

function minimap_drag_handler(e) {
    if (dragging) {
        var minimap_offset = $("#minimap").offset();
        var x = e.pageX - minimap_offset.left;
        var y = e.pageY - minimap_offset.top;
        update_scroll(x, y);
    }
}

function highlight_tile(x, y) {
    $(".highlight").css({"left": 16*x + "px",
                         "top": 16*y + "px",
                         "width": 16 + "px",
                         "height": 16 + "px",
                         "position": "absolute",
                         "display": "block"});
}

function scroll_to_highlight() {
    var coords = $(".highlight").offset();
    var map_w = $("#map_img").width();
    var map_h = $("#map_img").height();
    var win_w = $(window).width();
    var win_h = $(window).height();

    var scroll_x = coords.left + 8 - win_w / 2;
    var scroll_y = coords.top + 8 - win_h / 2;

    if (scroll_x > map_w - win_w) {
        scroll_x = map_w - win_w;
    }
    if (scroll_y > map_h - win_h) {
        scroll_y = map_h - win_h;
    }
    if (scroll_x < 0) {
        scroll_x = 0;
    }
    if (scroll_y < 0) {
        scroll_y = 0;
    }

    $(document).scrollLeft(scroll_x);
    $(document).scrollTop(scroll_y);
}

function handle_hash() {
    var coords = window.location.hash.slice(1).split(",");
    if (coords.length == 2) {
        var x = parseInt(coords[0]);
        var y = parseInt(coords[1]);
        highlight_tile(x, y);
        scroll_to_highlight();
    }
}

function map_click_handler(e) {
    var map_coords = $("#map_img").offset();
    var map_w = $("#map_img").width();
    var map_h = $("#map_img").height();
    var border_width_w = ($("#map_img").outerWidth() - map_w) / 2;
    var border_width_h = ($("#map_img").outerHeight() - map_h) / 2;
    var x = Math.floor((e.pageX - map_coords.left - border_width_w) / 16);
    var y = Math.floor((e.pageY - map_coords.top - border_width_h) / 16);
    highlight_tile(x, y);
    window.location.hash = x + "," + y;
}

function init() {
    if (use_minimap) {
        update_minimap();
        $(document).scroll(update_minimap);
        $(window).resize(update_minimap);
        $("#minimap").click(minimap_click_handler);
        dragging = false;
        $(document).mousedown(function(e) {
            dragging = true;
            e.originalEvent.preventDefault();
        });
        $(document).mouseup(function() {
            dragging = false;
        });
        $(document).mousemove(minimap_drag_handler);
    }

    handle_hash();
    window.onhashchange = handle_hash;
    $("#map_img").dblclick(map_click_handler);
}

$(document).ready(init);
