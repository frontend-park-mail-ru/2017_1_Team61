/**
 * Created by sergey on 05.03.17.
 */
var Xpos = 0;
var scroll_list = document.getElementById("scroll_list_achievements");
var list = scroll_list.getElementsByTagName('*');
var scroll_list_description = document.getElementById("scroll_list_description");
var list_description = scroll_list_description.getElementsByTagName('*');

scroll_list.onmouseover = function () {
    scroll_list.onwheel = function (e) {
        var delta = e.deltaY || e.detail || e.wheelDelta;
        if(delta > 0) {
            scroll_list.scrollLeft += 40;
        } else {
            scroll_list.scrollLeft -= 40;
        }
    };
};

function ItemDetect() {
    for(let i = 0; i < list.length; i += 2) {
        list[i].style.width = 150 + 'px';
        list[i].style.height = 150 + 'px';
        list[i].getElementsByTagName("img")[0].style.width = 150 + 'px';
        list[i].getElementsByTagName("img")[0].style.height = 150 + 'px';
        list_description[i].style.display = 'none';
        let item_atr = list[i].getBoundingClientRect();
        let list_atr = scroll_list.getBoundingClientRect();
        if(item_atr.left + item_atr.width / 2 - list_atr.left < list_atr.width / 2 + item_atr.width / 1.7  &&
            item_atr.left + item_atr.width / 2 - list_atr.left > list_atr.width / 2 - item_atr.width / 1.7 ) {
            list[i].style.width = 240 + 'px';
            list[i].style.height = 240 + 'px';
            list[i].getElementsByTagName("img")[0].style.width = 240 + 'px';
            list[i].getElementsByTagName("img")[0].style.height = 240 + 'px';
            list_description[i].style.display = 'inline';
        }
    }
}

scroll_list.onmousemove = function () {
    scroll_list.onmousedown = function () {
        Xpos = event.clientX;
    };
    if (Xpos !== 0) {
        var del = event.clientX - Xpos;
        scroll_list.scrollLeft -= del * 2;
        Xpos = event.clientX;
    }
    ItemDetect();
};

scroll_list.addEventListener('touchmove', function(event) {
    scroll_list.addEventListener('touchstart', function(event) {
        Xpos = event.changedTouches[0].clientX;
    }, false);
    if (Xpos !== 0) {
        var del = event.changedTouches[0].clientX - Xpos;
        scroll_list.scrollLeft -= del * 2;
        Xpos = event.changedTouches[0].clientX;
    }
    ItemDetect();
}, false);

scroll_list.addEventListener('touchend', function(event) {
    Xpos = 0;
}, false);

window.onmouseup = function () {
    Ypos = 0;
    Xpos = 0;
};