function update_minimap() {
    var map_w = $("#map_img").width();
    var map_h = $("#map_img").height();
    var win_w = $(window).width();
    var win_h = $(window).height();
    var scroll_x = $(document).scrollLeft();
    var scroll_y = $(document).scrollTop();
    var minimap_w = $("#minimap").width();
    var minimap_h = $("#minimap").height();

    $("#selector").css({"left": minimap_w * scroll_x / map_w + "px",
                        "top": minimap_h * scroll_y / map_h + "px",
                        "width": minimap_w * win_w / map_w + "px",
                        "height": minimap_h * win_h / map_h + "px"});
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
    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }
    if (x > minimap_w - selector_w) {
        x = minimap_w - selector_w;
    }
    if (y > minimap_h - selector_h) {
        y = minimap_h - selector_h;
    }

    $("#selector").css({"left": x + "px",
                        "right": y + "px"});
    $(document).scrollTop(map_h * y / minimap_h);
    $(document).scrollLeft(map_w * x / minimap_w);
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

function init_minimap() {
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

$(document).ready(init_minimap);


