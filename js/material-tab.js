import ZingTouch from 'zingtouch';

var positionArr = getCookie('h2material-matPosition') ? getCookie('h2material-matPosition') : {};

function initTabs(selectorTab) {

    window.addEventListener('resize', initalSetUnderline('.underline'));

    var parentCount = 0;
    var parent = null;
    var anchors = document.querySelectorAll(selectorTab);
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].insertAdjacentHTML('beforeend', '<span class="underline"></span>');
        var tabHandles = anchors[i].querySelectorAll('.nav-mat-item');
        for (var k = 0; k < tabHandles.length; k++) {
            var tabHand = tabHandles[k];
            var parentTmp = tabHand.closest('.nav-mat-tabs');
            if (parent !== parentTmp) {
                parent = parentTmp;
                parent.dataset.h2material = 'h2material_' + parentCount;
                parentCount++;
            }
            tabHand.onclick = function (e) {
                e.preventDefault();
                var ele = this;
                var parent = ele.closest('.nav-mat-tabs');
                var eleOld = parent.querySelector('.mat-active').closest('.nav-mat-item');
                parent.querySelector('.mat-active').classList.remove('mat-active');
                ele.classList.add('mat-active');
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
                var pos = ele.closest('.nav-mat-tabs').dataset.h2material
                positionArr[pos] = ele.querySelector('a').id
                setCookie('h2material-matPosition', positionArr, 365);
                changeTabContent(ele.querySelector('a').getAttribute('href'), direction);
            }
        }
        try {
            initSwipe(anchors[i].dataset.swipe);
        } catch (e) {
            console.log(e);
            console.log('Swipe not activeted. Add data-swipe="#id" to the tabCOntent and on the nav bar see Demo')
        }
    }
    setTabsFromCookie();
    initalSetUnderline('.underline');
    var dropdown = document.querySelectorAll('.dropdownTabToggle');

    for (var i = 0; i < dropdown.length; i++) {
        dropdown[i].onclick = function (e) {
            e.preventDefault();
            var ele = this;
            var target = ele.getAttribute('href');
            changeTabContent(document.querySelector(target).getAttribute('href'), 1);
            var dropdownItems = ele.closest('.dropdown-menu').querySelectorAll('.dropdown-item');

            for (var y = 0; y < dropdownItems.length; y++) {
                dropdownItems[y].classList.remove('mat-active');
            }
            ele.classList.add('mat-active');
            ele.closest('.tabDropdown').querySelector('button').textContent = ele.textContent;
        }
    }
    for (var i = 0; i < anchors.length; i++) {
        var tabContent = document.querySelectorAll('.tab-content');
        for (var k = 0; k < tabContent.length; k++) {
            console.log(tabContent[k]);
            tabContent[k].style.display = 'flex';
        }
    }
}


function changeTabContent(href, direction = 1) {
    var target = document.querySelector(href);
    var oldEle = target.closest('.tab-content').querySelector('.mat-active')
    if (target.classList.contains('mat-active')) {
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
        oldEle.classList.remove('mat-active');
        oldEle.querySelector('.mat-active').classList.remove('mat-active');
        target.closest('.tab-content-watch').classList.add('mat-active');
        target.style.transform = 'translateX(0%)';
        target.classList.add('mat-active');
    }, 0);
    return true;
}

function initalSetUnderline($input) {
    var anchors = document.querySelectorAll($input);

    for (var i = 0; i < anchors.length; i++) {
        var ele = anchors[i].closest('.nav-mat-tabs').querySelector('.nav-mat-item.mat-active');
        var newLeft = ele.offsetLeft;
        var parent = ele.closest('.nav-mat-tabs');
        var parentwidth = parent.clientWidth;

        var leftAtfter = newLeft / parentwidth * 100;
        var widthAfter = ele.clientWidth / parentwidth;
        parent.querySelector('.underline').style.transform = 'translateX(' + leftAtfter + '%) scaleX(' + widthAfter + ')';
        parent.querySelector('.underline').style.display = 'block';
    }
}


var startX
var startY
var endX
var endY
var treshold = 100; //this sets the minimum swipe distance, to avoid noise and to filter actual swipes from just moving fingers


function initSwipe(trigger) {

    var activeRegion = new ZingTouch.Region(document.querySelector(trigger), null, false);
    let childElement = document.querySelector(trigger);
    activeRegion.bind(childElement, new ZingTouch.Swipe({}),
        function (event) {
            var rad = event.detail.data[0]['directionFromOrigin'] / 360 * 2 * Math.PI;
            var direction = event.detail.data[0]['currentDirection']
            if (direction > 135 && direction < 225) {
                left(this.dataset.swipe);
            } else if (direction > 315 || direction < 45) {
                right(this.dataset.swipe);
            }
        });

    var left = (target) => {
        var tabnav = document.querySelector(target);
        var tabActive = tabnav.querySelector('.mat-active');
        var nextTab = tabActive.nextElementSibling;
        if (nextTab) {
            nextTab.click();
        }
    }
    var right = (target) => {
        var tabnav = document.querySelector(target);
        var tabActive = tabnav.querySelector('.mat-active');
        var prevTab = tabActive.previousElementSibling;
        if (prevTab) {
            prevTab.click();
        }

    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
    }
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    })
    var value = cookie[name];
    try {
        value = JSON.parse(value);
        return value
    } catch (e) {
        return value;
    }
}


function setTabsFromCookie() {
    for (const key in positionArr) {
        var href = document.getElementById(positionArr[key]).getAttribute('href')
        var target = document.querySelector(href);
        if (!target.classList.contains('mat-active')) {

            var oldEle = target.closest('.tab-content').querySelector('.mat-active')
            target.classList.add('noAnimation');
            oldEle.querySelector('.mat-active').classList.remove('mat-active');
            oldEle.classList.remove('mat-active');
            oldEle.querySelector('.tab-pane').classList.add('noAnimation');
            target.style.transform = 'translateX(0%)';
            oldEle.querySelector('.tab-pane').style.transform = 'translateX(110%)';

            target.classList.remove('noAnimation')
            oldEle.querySelector('.tab-pane').classList.remove('noAnimation');
            target.closest('.tab-content-watch').classList.add('mat-active');
            target.classList.add('mat-active');
            document.getElementById(positionArr[key]).click();

        }
    }
}


export {initTabs, initalSetUnderline}

