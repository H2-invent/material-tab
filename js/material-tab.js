function initTabs(selectorTab) {

    window.addEventListener('resize', initalSetUnderline);


    var anchors = document.querySelectorAll(selectorTab);
    for (var i = 0; i < anchors.length; i++) {

        anchors[i].insertAdjacentHTML('beforeend', '<span class="underline"></span>');

        var tabHandles = anchors[i].querySelectorAll('.nav-item');
        for (var k = 0; k < tabHandles.length; k++) {
            var tabHand = tabHandles[k];
            tabHand.onclick = function (e) {
                e.preventDefault();
                var ele = this;
                var parent = ele.closest('.nav-tabs');
                var eleOld = parent.querySelector('.active').closest('.nav-item');
                parent.querySelector('.active').classList.remove('active');
                ele.classList.add('active');
                var parentwidth = parent.clientWidth;
                var eleWidth = ele.clientWidth;
                var oldRight = eleOld.offsetLeft + eleOld.clientWidth;
                var oldLeft = eleOld.offsetLeft;
                var newRight = ele.offsetLeft + ele.clientWidth;
                var newLeft = ele.offsetLeft;
                var oldWidth = ele.clientWidth;
                var tmpWidth = oldRight - newLeft;
                if (oldLeft < newLeft) {
                    tmpWidth = newRight - oldLeft;
                }
                var direction = newLeft < oldLeft ? 1 : 0;

                if (direction === 1) {//we move to the left
                    parent.querySelector('.underline').style.transform = 'translateX(' + newLeft / parentwidth * 100 + '%) scaleX(' + tmpWidth / parentwidth + ')';
                } else {
                    parent.querySelector('.underline').style.transform = 'translateX(' + oldLeft / parentwidth * 100 + '%) scaleX(' + tmpWidth / parentwidth + ')';
                }


                var leftAtfter = newLeft / parentwidth * 100;
                var widthAfter = eleWidth / parentwidth;
                setTimeout(function () {
                    parent.querySelector('.underline').style.transform = 'translateX(' + leftAtfter + '%) scaleX(' + widthAfter + ')';
                }, 180);

                changeTabContent(ele.querySelector('a').getAttribute('href'), direction);
            }
        }

    }
    initalSetUnderline();
    var dropdown = document.querySelectorAll('.dropdownTabToggle');

    for (var i = 0; i < dropdown.length; i++) {
        dropdown[i].onclick = function (e) {
            e.preventDefault();
            var ele = this;
            var target = ele.getAttribute('href');
            changeTabContent(document.querySelector(target).getAttribute('href'), 1);
            var dropdownItems = ele.closest('.dropdown-menu').querySelectorAll('.dropdown-item');

            for (var y = 0; y < dropdownItems.length; y++) {
                dropdownItems[y].classList.remove('active');
            }
            ele.classList.add('active');
            ele.closest('.tabDropdown').querySelector('button').textContent = ele.textContent;
        }
    }
}


function changeTabContent(href, direction = 1) {
    var target = document.querySelector(href);
    var oldEle = target.closest('.tab-content').querySelector('.active')
    if (target.classList.contains('active')) {
        return false;
    }
    target.classList.add('noAnimation');
    if (direction === 1) {//we move to the left
        target.style.transform = 'translateX(-110%)'
        oldEle.querySelector('.tab-pane').style.transform = 'translateX(110%)';
    } else {
        oldEle.querySelector('.tab-pane').style.transform = 'translateX(-110%)';
        target.style.transform = 'translateX(110%)';
    }
    setTimeout(function () {
        target.classList.remove('noAnimation')
        oldEle.classList.remove('active');
        oldEle.querySelector('.active').classList.remove('active');
        target.closest('.tab-content-watch').classList.add('active');
        target.style.transform = 'translateX(0%)';
        target.classList.add('active');
    }, 0);
    return true;
}

function initalSetUnderline() {
    var anchors = document.querySelectorAll('.underline');

    for (var i = 0; i < anchors.length; i++) {
        var ele = anchors[i].closest('.nav-tabs').querySelector('.active').closest('.nav-item');
        var newLeft = ele.offsetLeft;
        var parent = ele.closest('.nav-tabs');
        var parentwidth = parent.clientWidth;

        var leftAtfter = newLeft / parentwidth * 100;
        var widthAfter = ele.clientWidth / parentwidth;
        parent.querySelector('.underline').style.transform = 'translateX(' + leftAtfter + '%) scaleX(' + widthAfter + ')';
        parent.querySelector('.underline').style.display = 'block';
    }

}

export {initTabs}

