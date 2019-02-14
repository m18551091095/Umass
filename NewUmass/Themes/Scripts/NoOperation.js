//这段js要放在页面最下方
var h = window.innerHeight, w = window.innerWidth;
//禁用右键 （防止右键查看源代码）
window.oncontextmenu = function () { return false; }
//在本网页的任何键盘敲击事件都是无效操作 （防止F12和shift + ctrl + i调起开发者工具）
document.onkeydown = function () {
    if ((window.event.keyCode == 116) || (window.event.keyCode == 123) ||  //屏蔽F12
        (window.event.shiftKey && window.event.ctrlKey && window.event.keyCode == 73) //shift+ctrl+i
    ) {
        window.event.keyCode = 0;
        window.event.returnValue = false;
    }
    if ((window.event.altKey) && (window.event.keyCode == 115)) {   //屏蔽Alt+F4
        window.showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");
        return false;
    }
}

//禁止选中
document.onselectstart = function (event) {
    if (window.event) {
        event = window.event;
    } try {
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};
/*禁止复制*/
document.oncontextmenu = function (event) {
    if (window.event) {
        event = window.event;
    } try {
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};

/*禁止审查元素*/
jQuery(document).keydown(function (event) {
    var src = (event.srcElement || event.target);
    if (src != null && src.nodeType == 1) {
        var nodeName = src.nodeName.toLowerCase();
        if (nodeName == "input" || nodeName == "textarea") {
            return true;
        }
    }
    if (event.keyCode == 67 && event.ctrlKey == true) {
        return false;
    }
    return true;
});
jQuery(document).keyup(function (event) {
    var src = (event.srcElement || event.target);
    if (src != null && src.nodeType == 1) {
        var nodeName = src.nodeName.toLowerCase();
        if (nodeName == "input" || nodeName == "textarea") {
            return true;
        }
    }
})

///*好吧，你的开发者工具是单独的窗口显示，不会改变原来网页的高度和宽度，
//但是你只要修改页面元素我就重新加载一次数据,让你无法修改页面元素（不支持IE9以下浏览器）*/
////if (window.addEventListener) {
////    window.addEventListener("DOMCharacterDataModified", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMAttributeNameChanged", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMCharacterDataModified", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMElementNameChanged", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMNodeInserted", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMNodeInsertedIntoDocument", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMNodeRemoved", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMNodeRemovedFromDocument", function () { window.location.reload(); }, true);
////    window.addEventListener("DOMSubtreeModified", function () { window.location.reload(); }, true);
////}