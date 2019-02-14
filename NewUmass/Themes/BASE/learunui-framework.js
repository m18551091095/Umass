/**
 * jQuery BaseUI 4.1
 *上海力软信息技术有限公司 Copyright © Base 2014
 */
//样式
$(function () {
    readyIndex();
})
function readyIndex() {
    $(".main_menu li div").click(function () {
        $(".main_menu li div").removeClass('main_menu leftselected');
        $(this).addClass('main_menu leftselected');
    }).hover(function () {
        $(this).addClass("hoverleftselected");
    }, function () {
        $(this).removeClass("hoverleftselected");
    });
}
/********
接收地址栏参数
**********/
function GetQuery(key) {
    var search = location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == key) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
/*
获取动态tab标签当前iframeID
*/
function tabiframeId() {
    var tabs_container = top.$("#tabs_container");
    return "tabs_iframe_" + tabs_container.find('.selected').attr('id').substr(5);
}
//关闭当前tab
function btn_back() {
    top.ThisCloseTab();
}
/*
中间加载对话窗
*/
function Loading(bool, text) {
    var ajaxbg = top.$("#loading_background,#loading");
    if (!!text) {
        top.$("#loading").css("left", (top.$('body').width() - top.$("#loading").width()) / 2);
        top.$("#loading span").html(text);
    } else {
        top.$("#loading").css("left", "42%");
        top.$("#loading span").html("正在拼了命为您加载…");
    }
    if (bool) {
        ajaxbg.show();
    } else {
        ajaxbg.hide();
    }
}
/* 
请求Ajax 带返回值
*/
function getAjax(url, postData, callBack) {
    $.ajax({
        type: 'post',
        dataType: "text",
        url: url,
        data: postData,
        cache: false,
        async: false,
        success: function (data) {
            callBack(data);
            //Loading(false);
        },
        error: function (data) {
            alert("error:" + data + "url:" + url);
            Loading(false);
        }
    });
}
function AjaxJson(url, postData, callBack) {
    $.ajax({
        url: url,
        type: "post",
        data: postData,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.Code == "-1") {
                Loading(false);
                alertDialog(data.Message, -1);
            } else {
                Loading(false);
                callBack(data);
            }
        },
        error: function (data) {
            Loading(false);
            alertDialog(data.responseText, -1);
        }
    });
}
/*
刷新当前页面
*/
function Replace() {
    location.reload();
    return false;
}

/*
iframe同步连接
*/
function iframe_src(iframe, src) {
    Loading(true);
    $("#" + iframe).attr('src', src);
    $("#" + iframe).load(function () {
        Loading(false);
    });
}
/**
格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
*/
formatDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
/**
当前时间
*/
function CurrentTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

/**
获取选中复选框值
值：1,2,3,4
**/
function CheckboxValue() {
    var reVal = '';
    $('[type = checkbox]').each(function () {
        if ($(this).attr("checked")) {
            reVal += $(this).val() + ",";
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    return reVal;
}


/*
弹出打印网页
*/
function PrintDialog(url, _id, _title, _width, _height, _callBack) {
    Loading(true);
    top.$.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: true,
        title: _title,
        content: 'url:' + url,
        button: [
            {
                name: '打 印',
                callback: function () {
                    _callBack(_id);
                    return false;
                }
            },
            {
                name: '取 消'
            }
        ]
    });
}

/*打开网页 window.open
/*url:          表示请求路径
/*windowname:   定义页名称
/*width:        宽度
/*height:       高度
---------------------------------------------------*/
function OpenWindow(url, title, w, h) {
    var width = w;
    var height = h;
    var left = ($(window).width() - width) / 2;
    var top = ($(window).height() - height) / 2;
    window.open(url, title, 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, titlebar=yes, alwaysRaised=yes');
}

/**
短暂提示
msg: 显示消息
time：停留时间
type：类型 >1：成功，<1：失败，其他：警告
**/
function tipDialog(msg, time, type) {
    var msg = "<div class='ui_alert_tip'>" + msg + "</div>"
    if (type >= 1) {
        top.$.dialog.tips(msg, time, 'succ.png');
    } else if (type == -1) {
        top.$.dialog.tips(msg, time, 'fail.png');
    } else if (type == 0) {
        top.$.dialog.tips(msg, time, 'fail.png');
    } else {
        top.$.dialog.tips(msg, time, 'i.png');
    }
}


//=================动态菜单tab标签========================
function AddTabMenu(tabid, url, name, img, Isclose, IsReplace) {
    $('#overlay_startmenu').hide(); $('#start_menu_panel').hide(); $('#start_menu_panel .nicescroll-rails').show(); $('.nicescroll-rails').hide();
    if (url == "" || url == "#") {
        url = "/Error/Error404";
    }
    var tabs_container = top.$("#tabs_container");
    var ContentPannel = top.$("#ContentPannel");
    if (IsReplace == 'true') {
        top.RemoveDiv(tabid);
    }
    if (top.document.getElementById("tabs_" + tabid) == null) { //如果当前tabid存在直接显示已经打开的tab
        Loading(true);
        if (tabs_container.find('li').length >= 10) {
            top.jBox.info("为保证系统效率,只允许同时运行10个功能窗口,请关闭一些窗口后重试！", '信息警告');
            return false;
        }
        tabs_container.find('li').removeClass('selected');
        ContentPannel.find('iframe').hide();
        if (Isclose != 'false') { //判断是否带关闭tab
            tabs_container.append("<li id=\"tabs_" + tabid + "\" class='selected' win_close='true'><span title='" + name + "' onclick=\"AddTabMenu('" + tabid + "','" + url + "','" + name + "','true')\"><a><img src='/Themes/Images/32/" + img + "' width='16' height='16'>" + name + "</a></span><a class=\"win_close\" title=\"关闭当前窗口\" onclick=\"RemoveDiv('" + tabid + "')\"></a></li>");
        } else {
            tabs_container.append("<li id=\"tabs_" + tabid + "\" class=\"selected\" onclick=\"AddTabMenu('" + tabid + "','" + url + "','" + name + "','false')\"><a><img src='/Themes/Images/32/" + img + "' width='16' height='16'>" + name + "</a></li>");
        }
        ContentPannel.append("<iframe id=\"tabs_iframe_" + tabid + "\" name=\"tabs_iframe_" + tabid + "\" height=\"100%\" width=\"100%\" src=\"" + url + "\" frameBorder=\"0\"></iframe>");
    } else {
        tabs_container.find('li').removeClass('selected');
        ContentPannel.find('iframe').hide();
        tabs_container.find('#tabs_' + tabid).addClass('selected');
        top.document.getElementById("tabs_iframe_" + tabid).style.display = 'block';
    }
    $('iframe#' + tabiframeId()).load(function () {
        Loading(false);
    });
    //LoadrightMenu(".tab-nav li");
}
//关闭当前tab
function ThisCloseTab() {
    var tabs_container = top.$("#tabs_container");
    top.RemoveDiv(tabs_container.find('.selected').attr('id').substr(5));
}
//全部关闭tab
function AllcloseTab() {
    top.$(".tab-nav").find("[win_close=true]").each(function () {
        RemoveDiv($(this).attr('id').substr(5))
    });
}
//关闭除当前之外的tab
function othercloseTab() {
    var tabs_container = top.$("#tabs_container");
    var id = tabs_container.find('.selected').attr('id').substr(5);
    top.$(".tab-nav").find("[win_close=true]").each(function () {
        if ($(this).attr('id').substr(5) != id) {
            RemoveDiv($(this).attr('id').substr(5))
        }
    });
}
//关闭事件
function RemoveDiv(obj) {
    Loading(false);
    var tabs_container = top.$("#tabs_container");
    var ContentPannel = top.$("#ContentPannel");
    var ModuleId = tabs_container.find('.selected').attr('id').substr(5);//原来ID
    var ModuleName = tabs_container.find('.selected').find('span').attr('title');//原来名称
    tabs_container.find("#tabs_" + obj).remove();
    ContentPannel.find("#tabs_iframe_" + obj).remove();
    var tablist = tabs_container.find('li');
    var pannellist = ContentPannel.find('iframe');
    if (tablist.length > 0) {
        tablist[tablist.length - 1].className = 'selected';
        pannellist[tablist.length - 1].style.display = 'block';
        var id = tabs_container.find('.selected').attr('id').substr(5);
    }
}
//=================动态菜单tab标签========================

