/**
 * Created by sergey on 05.03.17.
 */
var Ypos = 0;
var scroll_list_rating = document.getElementById("scroll_list_rating");
var list_rating = scroll_list_rating.getElementsByTagName('*');
var selection_group = document.getElementById("select_group");
var select = selection_group.getElementsByTagName('*');

function RemoveList() {
    for(let i = 0; i < list_rating.length; ) {
        list_rating[i].removeChild(list_rating[i].children[0]);
        scroll_list_rating.removeChild(list_rating[i]);
    }
}

function CreateList(num) {
    let newLi = document.createElement('li');
    newLi.className = "scrollable-list__item";
    let div = document.createElement('div');
    div.className = "record";
    let h4_1 = document.createElement('h4');
    h4_1.className = "record__number";
    h4_1.innerHTML = num;
    let h4_2 = document.createElement('h4');
    h4_2.className = "record__name";
    h4_2.innerHTML = "Ник";
    let h4_3 = document.createElement('h4');
    h4_3.className = "record__score";
    h4_3.innerHTML = "Очки";
    let h4_4 = document.createElement('h4');
    h4_4.className = "record__round";
    h4_4.innerHTML = "Раунд";
    div.appendChild(h4_1);
    div.appendChild(h4_2);
    div.appendChild(h4_3);
    div.appendChild(h4_4);
    newLi.appendChild(div);
    scroll_list_rating.appendChild(newLi);
}

function GenerateList(from, to) {
    RemoveList();
    for(let i = from; i < to; i++) {
        CreateList(i);
    }
    scroll_list_rating.scrollTop = 0;
}

GenerateList(0, 50);

select[0].onmousedown = function () {
    GenerateList(0, 50);
};

select[1].onmousedown = function () {
    GenerateList(51, 100);
};

select[2].onmousedown = function () {
    GenerateList(101, 150);
};

scroll_list_rating.onmouseover = function () {
    console.log(list_rating);
    for(let i = 1; i < list_rating.length; i += 6) {
        if(event.clientY > list_rating[i].getBoundingClientRect().top - 5 &&
            event.clientY < list_rating[i].getBoundingClientRect().bottom + 10) {
            list_rating[i].style.width = 75 + '%';
            list_rating[i].style.height = 65 + 'px';
            list_rating[i].style.marginLeft = 12.5 + '%';
        } else {
            list_rating[i].style.width = 65 + '%';
            list_rating[i].style.height = 45 + 'px';
            list_rating[i].style.marginLeft = 17 + '%';
        }
    }
};

scroll_list_rating.onmousemove = function () {
    scroll_list_rating.onmousedown = function () {
        Ypos = event.clientY;
    };
    if (Ypos !== 0) {
        var del = event.clientY - Ypos;
        scroll_list_rating.scrollTop -= del * 2;
        Ypos = event.clientY;
    }
};

scroll_list_rating.addEventListener('touchmove', function(event) {
    scroll_list_rating.addEventListener('touchstart', function(event) {
        Ypos = event.changedTouches[0].clientY;
    }, false);
    if (Ypos !== 0) {
        var del = event.changedTouches[0].clientY - Ypos;
        scroll_list_rating.scrollTop -= del * 2;
        Ypos = event.changedTouches[0].clientY;
    }
}, false);

scroll_list_rating.addEventListener('touchend', function(event) {
    Ypos = 0;
}, false);
