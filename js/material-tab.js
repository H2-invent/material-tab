function initTabs(selectorTab) {

    window.addEventListener('resize', initalSetUnderline('.underline'));


    var anchors = document.querySelectorAll(selectorTab);
    for (var i = 0; i < anchors.length; i++) {

        anchors[i].insertAdjacentHTML('beforeend', '<span class="underline"></span>');

        var tabHandles = anchors[i].querySelectorAll('.nav-mat-item');
        for (var k = 0; k < tabHandles.length; k++) {
            var tabHand = tabHandles[k];
            tabHand.onclick = function (e) {
                e.preventDefault();
                var ele = this;
                var parent = ele.closest('.nav-mat-tabs');
                var eleOld = parent.querySelector('.active').closest('.nav-mat-item');
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
        try {
            initSwipe(anchors[i].dataset.swipe);
        }catch (e) {
            console.log(e);
            console.log('Swipe not activeted. Add data-swipe="#id" to the tabCOntent and on the nav bar see Demo')
        }
    }
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

function initalSetUnderline($input) {
    var anchors = document.querySelectorAll($input);

    for (var i = 0; i < anchors.length; i++) {
        var ele = anchors[i].closest('.nav-mat-tabs').querySelector('.nav-mat-item.active');
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
    document.querySelector(trigger).addEventListener('touchstart', function (event) {
        //console.log(event);
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        //console.log(`the start is at X: ${startX}px and the Y is at ${startY}px`)

    })

    document.querySelector(trigger).addEventListener('touchend', function (event) {
        //console.log(event);
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
        //console.log(`the start is at X: ${endX}px and the Y is at ${endY}px`)

        var xDist = endX - startX;
        var yDist = endY - startY;
        if (Math.abs(xDist) > treshold) {
            if (xDist < 0) {
                left(this.dataset.swipe)
            } else {
                right(this.dataset.swipe)
            }
        }
    })


    var left = (target) => {
        var tabnav = document.querySelector(target);
        var tabActive = tabnav.querySelector('.active');
        var nextTab = tabActive.nextElementSibling;
        if (nextTab) {
            nextTab.click();
        }
    }
    var right = (target) => {
        var tabnav = document.querySelector(target);
        var tabActive = tabnav.querySelector('.active');
        var prevTab = tabActive.previousElementSibling;
        if (prevTab) {
            prevTab.click();
        }

    }
}

export {initTabs,initalSetUnderline}

