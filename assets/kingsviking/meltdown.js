// meltdown2.js
// Licensed under the MIT License:
// http://www.opensource.org/licenses/mit-license.php
// forked from http://d.hatena.ne.jp/KAZUMiX/20081229/meltdown2

function meltdown() {

    var d = document;
    var frameInterval = 100;
    var height = Math.max(Math.max(d.body.scrollHeight, (window.scrollMaxY || 0)+(window.innerHeight || 0)), (d.documentElement.clientHeight || d.body.clientHeight));
    var width = Math.max(d.body.scrollWidth, Math.max(d.body.clientWidth, d.documentElement.clientWidth));

    addWrapper();

    var computedStyle = function(ele,prop){
        return window.getComputedStyle(ele, null)[prop];
    };

    var targetElms = getTargetElements();
    var animationElms = [];

    meltdown();

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function getPoint(ele){
        var x=0, y=0;
        while (ele) {
            x += ele.offsetLeft;
            y += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return {x:x, y:y};
    }

    function addWrapper(){
        d.body.innerHTML = '<div style="position:absolute;top:0px;left:0px;margin:0;padding:0;width:' + width + 'px;height:'+height+'px;overflow:hidden;">' + d.body.innerHTML + '</div>';
    }

    function getTargetElements(){
        var result = [];
        var allElms = document.querySelectorAll('p, li, h1, h2, hr, div.danger');
        allElms = Array.prototype.slice.call(allElms);
        shuffle(allElms);

        for (var i = 0, len = allElms.length; i < len; i++) {
            var elm = allElms[i];
            if (computedStyle(elm, 'display').match(/^(none|inline)$/i) || computedStyle(elm, 'visibility').match(/^hidden$/i)){
                continue;
            }
            if (computedStyle(elm, 'position').match(/absolute/i)){
                var top = computedStyle(elm, 'top');
                var right = computedStyle(elm, 'right');
                var bottom = computedStyle(elm, 'bottom');
                var left = computedStyle(elm, 'left');
                if (top == 'auto' && right == 'auto' && bottom == 'auto' && left == 'auto') {
                    continue;
                }
                if (top.match(/%$/) || right.match(/%$/) || bottom.match(/%$/) || left.match(/%$/)){
                    continue;
                }
            }
            elm.pos = getPoint(elm);
            result.push(elm);
        }
        return result;
    }

    function meltdown(){
        if (targetElms.length > 0){
            var elm = targetElms.pop();
            ready4animation(elm);
            animationElms.push(elm);
        }
        animateElms();
        if (targetElms.length != 0 || animationElms.length != 0){
            setTimeout(function() {
                meltdown.apply(this);
            }, frameInterval);
        }

        function ready4animation(elm){
            var position = computedStyle(elm, 'position');
            if (!position.match(/(relative|absolute)/i)){
                elm.style.position = 'relative';
                elm.axisX = 0;
                elm.axisY = 0;
                elm.propX = 'left';
                elm.propY = 'top';
            } else {
                var left = computedStyle(elm, 'left');
                var right = computedStyle(elm, 'right');
                if (left != 'auto' || (left == 'auto' && right == 'auto')){
                    elm.axisX = parseInt(left, 10) || 0;
                    elm.propX = 'left';
                } else {
                    elm.axisX = parseInt(right, 10) || 0;
                    elm.propX = 'right';
                }

                var top = computedStyle(elm, 'top');
                var bottom = computedStyle(elm, 'bottom');
                if(top != 'auto' || (top == 'auto' && bottom == 'auto')){
                    elm.axisY = parseInt(top,10) || 0;
                    elm.propY = 'top';
                }else{
                    elm.axisY = parseInt(bottom,10) || 0;
                    elm.propY = 'bottom';
                }
            }

            elm.vx = Math.random() * 4;
            if (elm.propX == 'right'){
                elm.vx *= -1;
            }
            elm.vy = 1;
            elm.ay = 1.5;
            elm.limitY = height - elm.pos.y;

            elm.posHistory = [];
        }

        function animateElms(){
            var nextAnimationElms = [];
            for (var i=0,len=animationElms.length; i<len; i++){
                var elm = animationElms[i];
                if (animateElm(elm)){
                    nextAnimationElms.push(elm);
                }
            }
            animationElms = nextAnimationElms;

            function animateElm(elm){
                elm.vy *= elm.ay;
                elm.axisY += elm.vy;
                elm.axisX += elm.vx;

                var axisY = Math.floor(elm.axisY);
                var axisX = Math.floor(elm.axisX);

                elm.posHistory.push({axisY:axisY, axisX:axisX});

                elm.style[elm.propY] = axisY + 'px';
                elm.style[elm.propX] = axisX + 'px';

                if (elm.limitY <= elm.axisY){
                    elm.style.visibility = 'hidden';
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

}
