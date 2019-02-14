var layuiindex = layer.load(1, { shade: [0.1, '#fff'] });
var form, element, upload;
var laypage;
var drapindex = 0;
var index = 0;
var TextIndex = 0;
var ImgIndex = 0;
var ImgTextIndex = 0;
var ImgBottomIndex = 0;
var swiper;
var tag = false, ox = 0, left = 0, bgleft = 0;
layui.use(['element', 'form', 'upload', 'laypage'], function () {
    element = layui.element;
    form = layui.form;
    upload = layui.upload;
    laypage = layui.laypage;
    form.on('switch(BoxShadow)', function (data) {
        if (data.elem.checked == true) {
            var AttrButeId = $("#SetAttriButeId").val();
            if ($("#" + AttrButeId).attr("data-type") == "button") {
                var obj = $("#" + AttrButeId + " button");
                obj.css('box-shadow', 'rgb(0, 0, 0) 0px 0px 5px');
            }
            else if ($("#" + AttrButeId).attr("data-type") == "img") {
                var obj = $("#" + AttrButeId + " img");
                obj.css('box-shadow', 'rgb(0, 0, 0) 0px 0px 5px');
            }
            else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
                var obj = $("#" + AttrButeId + " p");
                obj.css('box-shadow', 'rgb(0, 0, 0) 0px 0px 5px');
            }
            else if ($("#" + AttrButeId).attr("data-type") == "text") {
                var obj = $("#" + AttrButeId + " div");
                obj.css('box-shadow', 'rgb(0, 0, 0) 0px 0px 5px');
            }
        }
        else {
            var AttrButeId = $("#SetAttriButeId").val();
            if ($("#" + AttrButeId).attr("data-type") == "button") {
                var obj = $("#" + AttrButeId + " button");
                obj.css('box-shadow', '');
            }
            else if ($("#" + AttrButeId).attr("data-type") == "img") {
                var obj = $("#" + AttrButeId + " img");
                obj.css('box-shadow', '');
            }
            else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
                var obj = $("#" + AttrButeId + " p");
                obj.css('box-shadow', '');
            }
            else if ($("#" + AttrButeId).attr("data-type") == "text") {
                var obj = $("#" + AttrButeId + " div");
                obj.css('box-shadow', '');
            }
        }
    });
    form.on('switch(IsShuYuan)', function (data) {
        if (data.elem.checked == true) {
            var AttrButeId = $("#SetAttriButeId").val();
            if ($("#" + AttrButeId).attr("data-type") == "swiper") {
                var obj = $("#" + AttrButeId);
                obj.attr('data-access', 'banner');
            }
        }
        else {
            var AttrButeId = $("#SetAttriButeId").val();
            if ($("#" + AttrButeId).attr("data-type") == "swiper") {
                var obj = $("#" + AttrButeId);
                obj.attr('data-access', '');
            }
        }
    });
    form.on('select(btnshijian)', function (data) {
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "button") {
            var obj = $("#" + AttrButeId + " button");
            obj.attr('data-href', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "text") {
            var obj = $("#" + AttrButeId + " div");
            obj.attr('data-href', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "title") {
            var obj = $("#" + AttrButeId + " a");
            obj.attr('href', data.elem.value);
        }
    });
    form.on('select(imgshijian)', function (data) {
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "img") {
            var obj = $("#" + AttrButeId + " img");
            obj.attr('data-href', data.elem.value);
        }
    });
    form.on('select(Swipershijian)', function (data) {
    });
    form.on('select(ImgListSelect)', function (data) {
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "img-list") {
            var obj = $("#imglist" + data.elem.id.replace("ImgListSelect", ""));
            obj.attr('data-href', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "imgtext-list") {
            var obj = $("#imgtext" + data.elem.id.replace("ImgTextListSelect", ""));
            obj.attr('data-href', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
            var obj = $("#" + AttrButeId + " .inner-content");
            obj.attr('data-href', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "top") {
            var obj = $("#" + AttrButeId);
            obj.attr('data-href', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
            var num = data.elem.id.replace("BottomListSelect", "");
            $("#BottomImg" + num).attr('pagePath', data.elem.value);
        }
    });
    form.on('select(ImgListSelectList)', function (data) {
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "img-list") {
            var obj = $("#" + AttrButeId);
            obj.attr('data-access', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "imgtext-list") {
            var obj = $("#" + AttrButeId);
            obj.attr('data-access', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
            var obj = $("#" + AttrButeId);
            obj.attr('data-access', data.elem.value);
        }
        else if ($("#" + AttrButeId).attr("data-type") == "top") {
            var obj = $("#" + AttrButeId);
            obj.attr('data-access', data.elem.value);
        }
    });
    var uploadInst = upload.render({
        elem: '#test1'
        , url: 'Handler/UploadHandler.ashx?doType=UpdateImage'
        , auto: false
        , choose: function (obj) {
            obj.preview(function (index, file, result) {
                $('#demo1').attr('src', result);
            });
        }
        , bindAction: '#test9'
        , done: function (res) {
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            var AttrButeId = $("#SetAttriButeId").val();
            if ($("#" + AttrButeId).attr("data-type") == "img") {
                var obj = $("#" + AttrButeId + " img");
                obj.attr('src', res.data.src);
            }
            return layer.msg('上传成功');
        }
        , before: function (obj) {
            this.data.params = {
                "imgurl": $("#demo1").attr("src")
            };
            this.data.params = JSON.stringify(this.data.params);
        }
        , error: function (e) {
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });
    var demoListView = $('#demoList');
    var uploadInsts = upload.render({
        elem: '#test2'
        , url: ''
        , auto: false
        , multiple: true
        , choose: function (obj) {
            var files = this.files = obj.pushFile();
            obj.preview(function (index, file, result) {
                file.name = result;
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td><img src="' + result + '" class="layui-upload-img"  style="height:30px;width:30px;"></td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));
                tr.find('.demo-delete').on('click', function () {
                    delete files[index];
                    tr.remove();
                    uploadInsts.config.elem.next()[0].value = '';
                });

                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code == 0) {
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html('');
                delete this.files[index];
            }
            this.error(index, upload);
        }
        , error: function (index, upload) {
            var tr = demoListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide');
        }
    });
});
var uploadFun = function (elem) {
    upload.render({
        elem: elem,
        url: '/upload/' //上传接口
        , done: function (res) {
            //上传完毕回调
        }
        , error: function () {
            //请求异常回调
        }
    });
}
function dropItems2(idOfDraggedItem, targetId, x, y) {
    var obj = document.getElementById(idOfDraggedItem);
    if ($("#" + obj.id).attr("data-type") == "top") {
        if ($("#dropContent1").html() == null || $("#dropContent1").html().replace(/[\r\n]/g, "") == "") {
            $("#dropContent1").css('display', 'block');
            $("#dropContent1").css('height', 'auto');
            $("#dropContent1").css('text-align', 'center');
            var Qheight = parseInt($("#dropContent2").css("height").replace('px', ''));
            var Nheight = Qheight - 100;
            $("#dropContent2").css('height', Nheight + 'px');
            $("#dropContent2").css('margin-top', '0px');
            $("#dropContent1").html("<div class='con' style='width:100%;top:0;line-height:100px;'><div id='IndexTopId' class='page-title js-text' data-type='top' style='background-color: rgb(52, 182, 253); font-size:40px; color: rgb(255, 255, 255);' onclick='Alert(this.id)' onmouseover='SetCloseTopDiv(this)' onmouseout='SetCloseTopDiv(this)'><i class='layui-icon left layui-icon-spread-left' style='left:15px;position:absolute;font-size:40px;width:40px;height:40px;'></i><span>首页</span><div id='DelTopdiv' style='position: absolute; top: 10px; right: 15px; z-index: 99; width: 10px; cursor: pointer; display: none; line-height: 20px;' onclick='DeleteTopDiv(this)'>X</div></div></div>");
            $("#IndexTopId").css('background-color', '#34B6FD');
            $("#IndexTopId").css('color', '#FFFFFF');
            if ($("#dropContent3").html() != null || $("#dropContent3").html().replace(/[\r\n]/g, "") != "") {
                $("#IndexTopId").css('background-color', $("#IndexBottomId").css("background-color"));
                $("#IndexTopId").css('color', $("#IndexBottomId").css("color"));
            }
        }
        else {
            layer.msg("只能添加一个顶部！");
        }
        return;
    } else if ($("#" + obj.id).attr("data-type") == "bottom") {
        if ($("#dropContent3").html() == null || $("#dropContent3").html().replace(/[\r\n]/g, "") == "") {
            $("#dropContent3").css('height', '100px');
            $("#dropContent3").css('display', 'block');
            $("#dropContent3").css('position', 'absolute');
            $("#dropContent3").css('bottom', '0px');
            var Qheight = parseInt($("#dropContent2").css("height").replace('px', ''));
            var Nheight = Qheight - 121;
            $("#dropContent2").css('height', Nheight + 'px');
            $("#dropContent3").css('font-size', '36px');
            if (isNaN(ImgBottomIndex)) {
                ImgBottomIndex = 0;
            }
            $("#dropContent3").html("<div id='IndexBottomId' data-type='bottom' onmouseover='SetCloseBottomDiv(this)' onmouseout='SetCloseBottomDiv(this)' onclick='Alert(this.id)'  class='inner-content inner-contents' style='position:relative;width:100%;height:100%;text-decoration:inherit;border-radius: inherit;z-index: 1;text-align:center;'><div id='BottomImg" + (parseInt(ImgBottomIndex) + 1) + "' class='item' style='width: 25%;height:99%;line-height:1.4;float:left;'><a class='img-thumb-wrap' href='javascript:;' style='height:58px;width:58px;'><img src='' class='bottomimg' style='vertical-align:middle;height:58px;width:58px' /><img style='display:none' ng-reflect-src='' src='' /></a><span class='bottom-text' style='float:left;width:100%'>标签</span></div><div id='BottomImg" + (parseInt(ImgBottomIndex) + 2) + "'class='item' style='width: 25%;height:99%;line-height:1.4;float:left;'><a class='img-thumb-wrap' href='javascript:;' style='height:58px;width:58px;'><img src='' class='bottomimg' style='vertical-align:middle;height:58px;width:58px' /><img style='display:none' ng-reflect-src='' src='' /></a><span class='bottom-text' style='float:left;width:100%'>标签</span></div><div id='BottomImg" + (parseInt(ImgBottomIndex) + 3) + "'class='item' style='width: 25%;height:99%;line-height:1.4;float:left;'><a class='img-thumb-wrap' href='javascript:;' style='height:58px;width:58px;'><img src='' class='bottomimg' style='vertical-align:middle;height:58px;width:58px' /><img style='display:none' ng-reflect-src='' src='' /></a><span class='bottom-text' style='float:left;width:100%'>标签</span></div><div id='BottomImg" + (parseInt(ImgBottomIndex) + 4) + "'class='item' style='width: 25%;height:99%;line-height:1.4;float:left;'><a class='img-thumb-wrap' href='javascript:;' style='height:58px;width:58px;'><img src='' class='bottomimg' style='vertical-align:middle;height:58px;width:58px' /><img style='display:none' ng-reflect-src='' src='' /></a><span class='bottom-text' style='float:left;width:100%'>标签</span></div></div></div><div id='DelBottomdiv'class='control-wrap' style='position:absolute;cursor:pointer;heiht:1px;'onclick='DeleteBottomDiv(this)'>X</div>");
            $("#IndexBottomId").css('display', 'inline-block');
            $("#IndexBottomId").css('background-color', '#34B6FD');
            $("#IndexBottomId").css('color', '#FFFFFF');
            if ($("#dropContent1").html() != null || $("#dropContent1").html().replace(/[\r\n]/g, "") != "") {
                $("#IndexBottomId").css('background-color', $("#IndexTopId").css("background-color"));
                $("#IndexBottomId").css('color', $("#IndexTopId").css("color"));
            }
            ImgBottomIndex = (parseInt(ImgBottomIndex) + 4)
        } else {
            layer.msg("只能添加一个底部！");
        }
        return;
    }
    if (obj.parentNode.id == 'dropContent2') return;
    var object = obj.cloneNode(true);
    object.id = new Date().getTime();
    document.getElementById('dropContent2').appendChild(object);
    var DataType = $("#" + object.id).attr("data-type");
    $("#" + object.id).removeClass("dragableBox");
    $("#" + object.id).addClass("dragableBoxs");
    switch (DataType) {
        case "text":
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).css("text-align", "left");
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).css("height", "auto");
            if (isNaN(TextIndex)) {
                TextIndex = 0;
            }
            $("#" + object.id).html("<div id='text" + (parseInt(TextIndex) + 1) + "' style='width:100%;height:auto;line-height:30px;border:1px solid #c1c1c1;background-color:#FFFFFF;color:#000000;word-break: break-all; word-wrap:break-word;'>我是文本</div><i class='drag'></i>");
            TextIndex = (parseInt(TextIndex) + 1);
            break;
        case "button":
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).html("<button class='layui-btn' style='opacity:1;height:40px;background-color:#009688;text-align:center;border-radius:0;border:0px;'>按钮</button><i class='drag'></i>");
            break;
        case "img":
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).css("width", "910px");
            if (isNaN(ImgIndex)) {
                ImgIndex = 0;
            }
            $("#" + object.id).html("<img id='img" + (parseInt(ImgIndex) + 1) + "' src='images/face.jpg' class='img' alt='' style='left:0px;margin:3px;width:100%;height:200px;opacity:1;border:0px;' /><i class='drag'></i>");
            ImgIndex = parseInt(ImgIndex) + 1
            break;
        case "swiper":
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).html("<div class='swiper-container'><div class='swiper-wrapper'><div class='swiper-slide'><img src='images/face.jpg' style='width: 100%;height:370px' alt=''></div><div class='swiper-slide'><img src='images/face.jpg' style='width: 100%;height:370px' alt=''></div><div class='swiper-slide'><img src='images/face.jpg' style='width: 100%;height:370px' alt=''></div></div></div><i id='swiperi' class='drag'></i>");
            break;
        case "img-list":
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).css("padding-top", "9px");
            $("#" + object.id).css("padding-left", "9px");
            $("#" + object.id).css("height", "auto");
            if (isNaN(index)) {
                index = 0;
            }
            $("#" + object.id).html("<div id='imglist" + (parseInt(index) + 1) + "' class='inner-contents imglist' style='float:left;width:49%;position:relative;margin-bottom:9px;margin-right: 9px;'><image src='images/face.jpg' style='width:100%;height:100px;'></image><span class='class_cover' data-num='1'>图片1</span></div><div id='imglist" + (parseInt(index) + 2) + "' class='inner-contents imglist' style='float:left;width:49%;position:relative;margin-bottom:9px;margin-right: 9px;'><image src='images/face.jpg' style='width:100%;height:100px;'></image><span class='class_cover' data-num='2' >图片2</span></div><div id='imglist" + (parseInt(index) + 3) + "' class='inner-contents imglist' style='float:left;width:49%;position:relative;margin-bottom:9px;margin-right: 9px;'><image src='images/face.jpg' style='width:100%;height:100px;'></image><span class='class_cover' data-num='3'>图片3</span></div><div id='imglist" + (parseInt(index) + 4) + "' class='inner-contents imglist' style='float:left;width:49%;position:relative;margin-bottom:9px;margin-right: 9px;'><image src='images/face.jpg' style='width:100%;height:100px;'></image><span class='class_cover' data-num='4'>图片4</span></div><div id='imglist" + (parseInt(index) + 5) + "' class='inner-contents imglist' style='float:left;width:49%;position:relative;margin-bottom:9px;margin-right: 9px;'><image src='images/face.jpg' style='width:100%;height:100px;'></image><span class='class_cover' data-num='5'>图片5</span></div><div id='imglist" + (parseInt(index) + 6) + "' class='inner-contents imglist' style='float:left;width:49%;position:relative;margin-bottom:9px;margin-right: 9px;'><image src='images/face.jpg' style='width:100%;height:100px;'></image><span class='class_cover' data-num='6'>图片6</span></div><i class='drag'></i>");
            index = (parseInt(index) + 6);
            break;
        case "imgtext-list":
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).css("height", "auto");
            $("#" + object.id).css("padding-left", "5px");
            $("#" + object.id).css("padding-top", "5px");
            if (isNaN(ImgTextIndex)) {
                ImgTextIndex = 0;
            }
            $("#" + object.id).html("<div id='imgtext" + (parseInt(ImgTextIndex) + 1) + "' class='inner-content inner-contents' style='margin-right:5px;margin-bottom:5px;height: 60px;display:block;'><div class='ImgText' style='width: 60px;height: 60px;float: left;margin-right: 6px;'><image src='images/face.jpg' style='width:100%;height:100%'></image></div><div class='title-container' style='float:left;text-align:left;margin-top:10px;'><div class='title imgtexttitle'>标题</div><div class='sec-title' style='text-align: left;color: rgb(102, 102, 102);font-size: 12px;'>我是简介</div></div></div><div  id='imgtext" + (parseInt(ImgTextIndex) + 2) + "'  class='inner-content inner-contents'  style='margin-right:5px;margin-bottom:5px;height: 60px;display:block;'><div class='ImgText' style='width: 60px;height: 60px;float: left;margin-right: 6px;'><image src='images/face.jpg' style='width:100%;height:100%'></image></div><div class='title-container' style='float:left;text-align:left;margin-top:10px;'><div class='title imgtexttitle'>标题</div><div class='sec-title' style='text-align: left;color: rgb(102, 102, 102);font-size: 12px;'>我是简介</div></div></div><div  id='imgtext" + (parseInt(ImgTextIndex) + 3) + "'  class='inner-content inner-contents' style='margin-right:5px;margin-bottom:5px;height: 60px;display:block;'><div class='ImgText' style='width: 60px;height: 60px;float: left;margin-right: 6px;'><image src='images/face.jpg' style='width:100%;height:100%'></image></div><div class='title-container' style='float:left;text-align:left;margin-top:10px;'><div class='title imgtexttitle'>标题</div><div class='sec-title' style='text-align: left;color: rgb(102, 102, 102);font-size: 12px;'>我是简介</div></div></div><i class='drag'></i>");
            ImgTextIndex = (parseInt(ImgTextIndex) + 3)
            break;
        case "text-list":
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).css("text-align", "left");
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).css("padding-left", "7px");
            $("#" + object.id).css("padding-right", "7px");
            $("#" + object.id).html("<div class='inner-content inner-contents'><div class='title-container' style='width:100%;border-bottom-width:1px;'><p class='title'>标题</p></div></div><div class='inner-content inner-contents'><div class='title-container' style='width:100%;border-bottom-width:1px;'><p class='title'>标题</p></div></div><div class='inner-content inner-contents'><div class='title-container' style='width:100%;border-bottom-width:1px;'><p class='title'>标题</p></div></div><div class='inner-content inner-contents'><div class='title-container' style='width:100%;border-bottom-width:1px;'><p class='title'>标题</p></div></div><i class='drag'></i>");
            break;
        case "title":
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("text-align", "left");
            $("#" + object.id).css("height", "30px");
            $("#" + object.id).css("background-color", "#FFFFFF");
            $("#" + object.id).addClass("title-ele");
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).html("<span class='title-text'><span class='mark' style='background-color:red;'></span><span class='js-text' style='font-size:14px;'>标题文字</span></span><a href='#' data-ajax='false' style='position:absolute;right: 5px;'>更多&gt;&gt;</a><i class='drag'></i>");
            break;
        case "paging":
            if (isNaN(ImgIndex)) {
                ImgIndex = 0;
            }
            $("#" + object.id).css("display", "inline-block");
            $("#" + object.id).css("border", "0px");
            $("#" + object.id).css("width", "910px");
            $("#" + object.id).html("<div id='demo" + (parseInt(ImgIndex) + 1) + "'></div></a><i class='drag'></i>");
            ImgIndex = (parseInt(ImgIndex) + 1);
            //只显示上一页、下一页
            laypage.render({
                elem: "demo" + (parseInt(ImgIndex))
              , count: 50
              , layout: ['prev', 'next']
              , jump: function (obj, first) {
                  if (!first) {
                      //layer.msg('第 ' + obj.curr + ' 页');
                  }
              }
            });
            break;
        default:
            break;
    }
    $("#" + object.id).css('visibility', 'visible');
    $("#" + object.id).attr('DR_drag', '2');
    $("#" + object.id).attr('DR_replace', (parseInt(drapindex) + 1));
    $("#" + object.id).attr("onclick", "Alert(" + object.id + ")");
    $("#dropContent2 div").remove(".dragableBox");
    drapindex = parseInt(drapindex) + 1;
};
function UpdateImgList() {
    var index = layer.load(1, { shade: [0.1, '#fff'] });
    var imglist = new Array;
    var leg = $("#demoList img").length;
    if (leg > 0) {
        for (var i = 0; i < leg; i++) {
            if ($("#demoList img")[i].id == null || $("#demoList img")[i].id == "") {
                imglist.push({ "id": $("#demoList tr")[i].id, "imgurl": $("#demoList img")[i].src });
            }
        }
        var json = JSON.stringify(imglist);
        if (imglist.length > 0) {
            $.ajax({
                url: "Handler/UploadHandler.ashx?doType=UpSwiper",
                type: "post",
                dataType: "json",
                data: { "params": json },
                success: function (data) {
                    if (data.code == 0) {
                        var mySwiper = new Swiper('.swiper-container');
                        try {
                            mySwiper.removeAllSlides();
                        } catch (e) {
                            mySwiper[0].removeAllSlides();
                        }
                        for (var i = 0; i < data.data.length; i++) {
                            var id = data.data[i].img.substr(data.data[i].img.indexOf("upload-"), 24).replace("'", "").replace(" ", "");
                            var tr = $("#" + id), tds = tr.children();
                            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                            $("#" + id + " img").attr("src", data.data[i].img.substring(data.data[i].img.indexOf("/images"), data.data[i].img.indexOf(".png") + 4));
                            $("#" + id + " img").attr("id", id);
                            var AttrButeId = $("#SetAttriButeId").val();
                            $("#" + AttrButeId + " .swiper-wrapper").append("<div class='swiper-slide'><img src='" + data.data[i].img.substring(data.data[i].img.indexOf("/images"), data.data[i].img.indexOf(".png") + 4) + "' style='width: 100%;height:100%;' alt=''></div>");
                            delete this.files;
                        }
                        $(".swiper-slide").css("height", "370px");
                        var AttrButeId = $("#SetAttriButeId").val();
                        var html = $("#demoList").html();
                        $("body").append("<input type='hidden' id='h" + AttrButeId + "' value='" + html + "' />");
                    }
                    layer.close(index);
                },
                error: function (e) {
                    var trs = $('#demoList').find('tr');
                    for (var i = 0; i < trs.length; i++) {
                        var tr = $("#" + trs[i].id), tds = tr.children();
                        tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                    }
                    layer.close(index);
                }
            });
        }
        else {
            layer.close(index);
            return layer.msg('请添加图片!');
        }
    }
}
function UpdateImg(elem, json) {
    $.ajax({
        url: "Handler/UploadHandler.ashx?doType=UpdateImage",
        type: "post",
        dataType: "json",
        data: { "params": json },
        success: function (data) {
            if (data.code == 0) {
                var AttrButeId = $("#SetAttriButeId").val();
                if ($("#" + AttrButeId).attr("data-type") == "img-list") {
                    var obj = $("#imglist" + elem.replace("#UpImageList", "") + " img");
                    obj.attr('src', data.data.src);
                }
                else if ($("#" + AttrButeId).attr("data-type") == "imgtext-list") {
                    var obj = $("#imgtext" + elem.replace("#UptextImageList", "") + " img");
                    obj.attr('src', data.data.src);
                }
                else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
                    if (elem.indexOf("UpLoadImg") != -1) {
                        var obj = $("#BottomImg" + elem.replace("#UpLoadImg", "") + " .bottomimg");
                        obj.attr('src', data.data.src);
                        $("#BottomImg" + elem.replace("#UpLoadImg", "")).attr('iconPath', data.data.src);
                    }
                    else if (elem.indexOf("BomLoadImg") != -1) {
                        var obj = $("#BottomImg" + elem.replace("#BomLoadImg", ""));
                        obj.attr('selectedIconPath', data.data.src);
                    }
                }
                return layer.msg('上传成功');
            }
            else {
                return layer.msg('上传失败');
            }
        },
        error: function (e) {
            var trs = $('#demoList').find('tr');
            for (var i = 0; i < trs.length; i++) {
                var tr = $("#" + trs[i].id), tds = tr.children();
                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            }
        }
    });
}
$(function () {
    var GroupGuid = getQueryString("GroupGuid");
    $.ajax({
        url: "Handler/HtmlHandler.ashx?doType=SaveMobileHtml",
        type: "post",
        async: false,
        dataType: "json",
        data: { "GroupGuid": GroupGuid },
        success: function (data) {
            if (data != null) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    if (data[i].TitleEnName == 'HomePage') {
                        $("#index").attr('HtmlGuid', data[i].Guid);
                        $("#index").attr('HtmlName', data[i].TitleEnName);
                        $("#index").attr('HtmlCode', data[i].HtmlCode);
                        $("#index").attr('HtmlTitle', data[i].TitleZnName);
                    }
                    else {
                        $("#htmldemo").append("<a href='javacript:void(0);' onclick=\"ClickPage('" + data[i].TitleEnName + "')\"><li id='" + data[i].TitleEnName + "' class='page_title' HtmlGuid='" + data[i].Guid + "' page-type='detail' page-path='pages/contact' HtmlCode='" + data[i].HtmlCode + "' HtmlTitle='" + data[i].TitleZnName + "' onmouseover='SetMouseUpSpan(this.id)' onmouseout='SetMouseOutSpan(this.id)'>" + data[i].TitleZnName + "<span class='DeleteSpan' style='position: absolute;right: 0px;background-color:#A7A7A9;width: 60px;text-align:  center;color: white;display:none' onclick='DeleteMouse(this)'>删除</span></li></a>");
                        $(".ListSelect").append("<option value=" + data[i].TitleEnName + ">" + data[i].TitleZnName + "</option>");
                        form.render();
                    }
                }
            }
        },
        error: function (e) {
        }
    });
    // 调用插件
    $('body').dragMove({
        limit: true,// 限制在窗口内
        callback: function ($move, $replace) {
        }
    });
    $("#zjk").css('visibility', 'hidden');
});
function Alert(id) {
    $("#SetAttriButeId").val(id);
    var datatype = $("#" + id).attr("data-type");
    switch (datatype) {
        case "text":
            var obj = $("#" + id);
            var objs = $("#" + id + " div");
            $("#TextText").val(obj[0].innerText);
            $("#height").val(parseInt(obj.css("height").replace('px', '')));
            $("#width").val(parseInt(obj.css("width").replace('px', '')));
            $("#fontSize").val(parseInt(obj.css('font-size').replace('px', '')));
            $("#fontColor").val(RGBToHex(objs.css('color')));
            $("#TextIndent").val(parseInt(objs.css('text-indent').replace('px', '')));
            var textAlign = obj[0].style.textAlign;
            if (textAlign == "left") {
                var img = $("#Alignment1 img").clone();
                $("#Alignment1").parent().addClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "center") {
                var img = $("#Alignment2 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().addClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "right") {
                var img = $("#Alignment3 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().addClass("layui-this");
                $("#ddthis").html(img);
            }
            $("#bgColor").val(RGBToHex(objs.css("background-color")));
            if (objs.css('border-style') == "none") {
                $("#BorderStyleThis").html("无");
                $("#BorderStyle0").parent().addClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (objs.css('border-style') == "solid") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().addClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (objs.css('border-style') == "dotted") {
                $("#BorderStyleThis").html("点线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().addClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (objs.css('border-style') == "dashed") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().addClass("layui-this");
            }
            $("#BorderWidth").val(parseInt(objs.css("border-width").replace('px', '')));
            $("#BorderColor").val(RGBToHex(objs.css('border-color')));
            if (obj.attr('data-href') != null && obj.attr('data-href') != undefined && obj.attr('data-href') != "") {
                $("#btnshijian").val(obj.attr('data-href'));
            }
            $("#su").click();
            $("#OffDiv").removeClass('layui-show');
            $("#AlignDiv").removeClass('layui-show');
            $("#AdjustFocusDiv").removeClass('layui-show');
            $("#RadiusDiv").removeClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#AssemblySetting").css('display', 'block');
            $("#BorderSetting").css('display', 'block');
            $("#TextSetting").css('display', 'block');
            $("#ImgSetting").css('display', 'none');
            $("#Uptext").css('display', 'block');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#ys").css('visibility', '');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        case "button":
            var obj = $("#" + id + " button");
            var objs = $("#" + id);
            $("#btnText").val(obj[0].innerText);
            $("#height").val(parseInt(obj.css("height").replace('px', '')));
            $("#width").val(parseInt(obj.css("width").replace('px', '')));
            $("#setLeft").val(parseInt(obj.css("margin-left").replace('px', '')));
            $("#setHeight").val(parseInt(obj.css("margin-top").replace('px', '')));
            $("#fontSize").val(parseInt(obj.css('font-size').replace('px', '')));
            $("#fontColor").val(RGBToHex(obj.css('color')));
            var Align = objs.css("text-align");
            if (Align == "center") {
                $("#left").addClass('layui-btn-primary');
                $("#center").removeClass('layui-btn-primary');
                $("#right").addClass('layui-btn-primary');
            } else if (Align == "left") {
                $("#left").removeClass('layui-btn-primary');
                $("#center").addClass('layui-btn-primary');
                $("#right").addClass('layui-btn-primary');
            } else {
                $("#left").addClass('layui-btn-primary');
                $("#center").addClass('layui-btn-primary');
                $("#right").removeClass('layui-btn-primary');
            }
            var textAlign = obj[0].style.textAlign;
            if (textAlign == "left") {
                var img = $("#Alignment1 img").clone();
                $("#Alignment1").parent().addClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "center") {
                var img = $("#Alignment2 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().addClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "right") {
                var img = $("#Alignment3 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().addClass("layui-this");
                $("#ddthis").html(img);
            }
            $("#opacity").html(obj[0].style.opacity * 100 + "%");
            $("#bgColor").val(RGBToHex(obj[0].style.backgroundColor));
            $("#borderRadius").val(obj[0].style.borderRadius);
            if (obj.css('border-style') == "none") {
                $("#BorderStyleThis").html("无");
                $("#BorderStyle0").parent().addClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj.css('border-style') == "solid") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().addClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj.css('border-style') == "dotted") {
                $("#BorderStyleThis").html("点线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().addClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj.css('border-style') == "dashed") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().addClass("layui-this");
            }
            $("#BorderWidth").val(parseInt(obj.css("border-width").replace('px', '')));
            $("#BorderColor").val(RGBToHex(obj.css('border-color')));
            if (obj.attr('data-href') != null && obj.attr('data-href') != undefined && obj.attr('data-href') != "") {
                $("#btnshijian").val(obj.attr('data-href'));
            }
            tag = false, ox = 0, left = 184 * obj[0].style.opacity, bgleft = 184 * obj[0].style.opacity;
            $('.progress_bar').width(left);
            $('.progress_btn').css('left', left);
            $("#su").click();
            $("#AssemblySetting").css('display', 'block');
            $("#BorderSetting").css('display', 'block');
            $("#TextSetting").css('display', 'block');
            $("#ImgSetting").css('display', 'none');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'block');
            $("#UpImg").css('display', 'none');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', '');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        case "img":
            var obj1 = $("#" + id + " img");
            var objs1 = $("#" + id);
            $("#height").val(parseInt(obj1.css("height").replace('px', '')));
            $("#width").val(parseInt(obj1.css("width").replace('px', '')));
            $("#setLeft").val(parseInt(obj1.css("margin-left").replace('px', '')));
            $("#setHeight").val(parseInt(obj1.css("margin-top").replace('px', '')));
            var Align = objs1.css("text-align");
            if (Align == "center") {
                $("#left").addClass('layui-btn-primary');
                $("#center").removeClass('layui-btn-primary');
                $("#right").addClass('layui-btn-primary');
            } else if (Align == "left") {
                $("#left").removeClass('layui-btn-primary');
                $("#center").addClass('layui-btn-primary');
                $("#right").addClass('layui-btn-primary');
            } else {
                $("#left").addClass('layui-btn-primary');
                $("#center").addClass('layui-btn-primary');
                $("#right").removeClass('layui-btn-primary');
            }
            $("#demo1").attr('src', obj1.attr('src'));
            $("#opacity").html(obj1[0].style.opacity * 100 + "%");
            tag = false, ox = 0, left = 184 * obj1[0].style.opacity, bgleft = 184 * obj1[0].style.opacity;
            $('.progress_bar').width(left);
            $('.progress_btn').css('left', left);
            $("#borderRadius").val(obj1[0].style.borderRadius);
            if (obj1.css('border-style') == "none") {
                $("#BorderStyleThis").html("无");
                $("#BorderStyle0").parent().addClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj1.css('border-style') == "solid") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().addClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj1.css('border-style') == "dotted") {
                $("#BorderStyleThis").html("点线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().addClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj1.css('border-style') == "dashed") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().addClass("layui-this");
            }
            $("#BorderWidth").val(parseInt(obj1.css("border-width").replace('px', '')));
            $("#BorderColor").val(RGBToHex(obj1.css('border-color')));
            if (objs1.attr('data-href') != null && objs1.attr('data-href') != undefined && objs1.attr('data-href') != "") {
                $("#imgshijian").val(objs1.attr('data-href'));
            }
            $("#su").click();
            $("#AssemblySetting").css('display', 'block');
            $("#BorderSetting").css('display', 'block');
            $("#ImgSetting").css('display', 'none');
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").removeClass('layui-show');
            $("#TextSetting").css('display', 'none');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'block');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#ys").css('visibility', '');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            break;
        case "swiper":
            if ($("#h" + id).val() != null && $("#h" + id).val() != undefined)
                $("#demoList").html($("#h" + id).val());
            else
                $("#demoList").html("");
            $("#su").click();
            if ($("#" + id).attr("data-access") != null && $("#" + id).attr("data-access") != undefined);
            {
                $("#IsShuYuan").attr("checked", "true");
            }
            $("#su").click();
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', 'hidden');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#UpSwiper").css('display', 'block');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            break;
        case "img-list":
            var obj = $("#" + id + " div");
            var objs = $("#" + id);
            var objp = $("#" + id + " img");
            if (objs.attr("data-style") == "ImageList2") {
                $("#ImageList2").click();
            } else {
                $("#ImageList1").click();
            }
            if (objs.attr("data-Row") != null && objs.attr("data-Row") != undefined && objs.attr("data-Row") != "") {
                $("#RowNum").val(parseInt(objs.attr("data-Row")));
                objs.attr("data-Col");
            } else {
                $("#RowNum").val(3);
            }
            if (objs.attr("data-Col") != null && objs.attr("data-Col") != undefined && objs.attr("data-Col") != "") {
                $("#ColNum").val(parseInt(objs.attr("data-Col")));
            } else {
                $("#ColNum").val(2);
            }
            $("#Imgheight").val(parseInt(objp.css('height').replace('px', '')));
            $("#setImgLeft").val(parseInt(objs.css('padding-left').replace('px', '')));
            $("#setImgLeft").val(parseInt(objs.css('padding-left').replace('px', '')));
            $("#setImgHeight").val(parseInt(objs.css('padding-top').replace('px', '')));
            $("#ImgborderRadius").val(parseInt(objp.css('border-radius').replace('px', '')));
            $("#UpImgShuXing").html("");
            $("#UpImgShuXing").html("<button type='button' class='layui-btn' style='width: 100%' onclick='AddImage()' id='AddImage'>添加图片</button>");
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem
                        , auto: false
                        , url: ''
                        , choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                if (imgid != "") {
                                    $(imgid).attr('src', result);
                                }
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        }
                        , done: function (res) {
                        }
                        , before: function (obj) {
                        }
                    });
                }
                var len = obj.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var num = parseInt(obj[i].id.replace("imglist", ""));
                        var imgsrc = $("#" + obj[i].id + " img").attr("src");
                        var text = $("#" + obj[i].id + " span").html();
                        $("#UpImgShuXing").append("<div id='upimglistdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>" + text + "<i class='layui-icon layui-colla-icon'></i><i id='i" + num + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i>   </h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left:60px'><input id='ImgListText" + num + "' type='text' name='btnText' lay-verify='btnText'onchange='EditImgListText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='" + text + "' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>图片</label><div class='layui-input-block' style='margin-left: 60px'><image id='ImgListImg" + num + "' src='" + imgsrc + "' style='height: 60px; width: 60px; float: left'></image><div id='Upload" + num + "' class='layui-upload'><label id='UpImageList" + num + "' class='layui-form-label uploadimglist' style='text-align: left; color: #efbf1f; float: left; margin-top: 34px; width: 56px;'>更改图片</label></div></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px;margin-left:-10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='ImgListSelect" + num + "' name='ImgListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                        if (obj.attr('data-href') != null && obj.attr('data-href') != undefined && obj.attr('data-href') != "") {
                            $("#ImgListSelect" + num).val(obj.attr("data-href"));
                        }
                        uploadFun('#UpImageList' + num, '#ImgListImg' + num);
                        index = num;
                    }
                    $(".page_title").each(function (index, element) {
                        if (element.id != "index") {
                            $(".ListSelect").append("<option value=" + $("#" + element.id).attr('htmlname') + ".html>" + $("#" + element.id).attr('htmltitle') + "</option>");
                        }
                    });
                    element.init();
                    form.render();
                }
            });
            if (objs.attr("data-access") != null && objs.attr("data-access") != undefined && objs.attr('data-access') != "") {
                $("#ImgListSelectList2").val(objs.attr("data-access"));
            }
            $("#su").click();
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', '');
            $("#AssemblySetting").css('display', 'none');
            $("#BorderSetting").css('display', 'none');
            $("#TextSetting").css('display', 'none');
            $("#ImgSetting").css('display', 'block');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpImgList").css('display', 'block');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        case "imgtext-list":
            var obj = $("#" + id + " div");
            var objs = $("#" + id);
            if (objs.attr("data-style") == "ImageTextList2") {
                $("#ImageTextList2").click();
            }
            else {
                $("#ImageTextList1").click();
            }
            $("#UpImgTextShuXing").html("");
            $("#UpImgTextShuXing").html("<button type='button' class='layui-btn' style='width: 100%' onclick='AddImage()' id='AddImageText'>添加图片</button>");
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem
                        , auto: false
                        , url: ''
                        , choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                if (imgid != "") {
                                    $(imgid).attr('src', result);
                                }
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        }
                        , done: function (res) {
                        }
                        , before: function (obj) {
                        }
                    });
                }
                var len = obj.length;
                if (len > 0) {
                    for (var i = 0; i < len; i = i + 5) {
                        var num = parseInt(obj[i].id.replace("imgtext", ""));
                        var imgsrc = $("#imgtext" + num + " div img").attr("src");
                        var title = $("#imgtext" + num + " .title-container div").html();
                        var text = $("#imgtext" + num + " .title-container .sec-title").html();
                        $("#UpImgTextShuXing").append("<div id='UpImgTextListDiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>" + title + "<i id='ImgTextI" + num + "' class='layui-icon layui-icon-delete' style='position: absolute; right: 10px; font-size: 25px' onclick='DelImgTextList(this.id)'></i></h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block'class='layui-input-block' style='margin-left: 60px'><input id='ImgTextListTitle" + num + "' type='text' name='ImgTextListTitle" + num + "' lay-verify='btnText' onchange='EditImgTextTitle(this.id)' autocomplete='off' placeholder='请输入标题' class='layui-input' value='" + title + "'></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>简介</label><div class='layui-input-block' style='margin-left: 60px'><input id='ImgTextListText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditImgTextText(this.id)' autocomplete='off' placeholder='请输入简介' class='layui-input' value='" + text + "'></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>图片</label><div class='layui-input-block' style='margin-left: 60px'><image id='ImgtextListImg" + num + "' src='" + imgsrc + "' style='height: 60px; width: 60px; float: left'></image><label id='UptextImageList" + num + "' class='layui-form-label' style='text-align: left; color: #efbf1f; float: left; margin-top: 34px; width: 56px;'>更改图片</label></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px; margin-left: -10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='ImgTextListSelect" + num + "' class='ListSelect' name='ImgTextListSelect" + num + "' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                        if (obj.attr("data-href") != null && obj.attr("data-href") != undefined && obj.attr('data-href') != "") {
                            $("#ImgTextListSelect" + num).val(obj.attr("data-href"));
                        }
                        uploadFun('#UptextImageList' + num, '#ImgtextListImg' + num);
                        ImgTextIndex = num;
                    }
                    $(".page_title").each(function (index, element) {
                        if (element.id != "index") {
                            $(".ListSelect").append("<option value=" + $("#" + element.id).attr('htmlname') + ".html>" + $("#" + element.id).attr('htmltitle') + "</option>");
                        }
                    });
                    element.init();
                    form.render();
                }
            });
            if (objs.attr("data-access") != null && objs.attr("data-access") != undefined && objs.attr('data-access') != "") {
                $("#ImgTextSelect1").val(objs.attr("data-access"));
            }
            $("#su").click();
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', 'hidden');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgTextList").css('display', 'block');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        case "title":
            var obj;
            var objt = $("#" + id + " .js-text");
            var objs = $("#" + id);
            if (objs.attr("mode") == "0" || objs.attr("mode") == null || objs.attr("mode") == undefined) {
                $(".title-ele").css("border", "");
                $("#TitleStle1").css("border", "2px solid #41d8e1");
                obj = $("#" + id + " .mark");
            }
            if (objs.attr("mode") == "1") {
                $(".title-ele").css("border", "");
                $("#TitleStle2").css("border", "2px solid #41d8e1");
                obj = $("#" + id + " .mark1");
            }

            if (objs.attr("mode") == "2") {
                $(".title-ele").css("border", "");
                $("#TitleStle3").css("border", "2px solid #41d8e1");
                obj = $("#" + id + " .mark2");
            }
            if (objs.attr("mode") == "3") {
                $(".title-ele").css("border", "");
                $("#TitleStle4").css("border", "2px solid #41d8e1");
                obj = $("#" + id + " .mark3");
            }
            $("#TitleFontSize").val(parseInt(objt.css('font-size').replace('px', '')));
            $("#TitleText").val(objt.text());
            $("#MarkHeight").val(parseInt(objs.css("height").replace("px", "")));
            $("#MarkBgColor").val(RGBToHex(objs.css('background-color')));
            $("#MarkColor").val(RGBToHex(obj.css('background-color')));
            $("#su").click();
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', 'hidden');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'block');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        case "text-list":
            var obj = $("#" + id + " .title-container");
            var objt = $("#" + id + " .js-text");
            var obji = $("#" + id + " .inner-contents");
            var objp = $("#" + id + " .inner-contents p");
            var objs = $("#" + id);
            if (obj.css("height") == null || obj.css("height") == undefined) {
                $("#TextListHeight").val(0);
            } else {
                $("#TextListHeight").val(parseInt(obj.css("height").replace("px", "")));
            }
            if (obj.css("background-color") != null && obj.css("background-color") != undefined) {
                $("#TextListBgColor").val(RGBToHex(objs.css('background-color')));
            }
            if (objp.css("font-size") != null && objp.css("font-size") != undefined) {
                $("#TextListFontSize").val(parseInt(objp.css('font-size').replace("px", "")));
            } else {
                $("#TextListFontSize").val(0);
            }
            if (obj.css('border-bottom-style') == "none") {
                $("#BorderStyleThis").html("无");
                $("#BorderStyle0").parent().addClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj.css('border-bottom-style') == "solid") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().addClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj.css('border-bottom-style') == "dotted") {
                $("#BorderStyleThis").html("点线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().addClass("layui-this");
                $("#BorderStyle3").parent().removeClass("layui-this");
            } else if (obj.css('border-bottom-style') == "dashed") {
                $("#BorderStyleThis").html("实线");
                $("#BorderStyle0").parent().removeClass("layui-this");
                $("#BorderStyle1").parent().removeClass("layui-this");
                $("#BorderStyle2").parent().removeClass("layui-this");
                $("#BorderStyle3").parent().addClass("layui-this");
            }
            $("#BorderColor").val(RGBToHex(obj.css('border-bottom-color')));
            if (obji.attr("data-href") != null && obji.attr("data-href") != undefined && obji.attr("data-href") != "") {
                $("#TextListSelect1").val(obji.attr('data-href'));
            }
            if (objs.attr("data-access") != null && objs.attr("data-access") != undefined && objs.attr('data-access') != "") {
                $("#TextListSelect2").val(objs.attr('data-access'));
            }
            $("#su").click();
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', '');
            $("#AssemblySetting").css('display', 'none');
            $("#BorderSetting").css('display', 'block');
            $("#TextSetting").css('display', 'none');
            $("#ImgSetting").css('display', 'none');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'block');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        case "top":
            var obj = $("#" + id);
            var objs = $("#" + id + " span");
            $("#TopBgColor").val(RGBToHex(obj.css("background-color")));
            $("#fontSize").val(parseInt(obj.css('font-size').replace("px", "")));
            var textAlign = obj[0].style.textAlign;
            if (textAlign == "left") {
                var img = $("#Alignment1 img").clone();
                $("#Alignment1").parent().addClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "center") {
                var img = $("#Alignment2 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().addClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "right") {
                var img = $("#Alignment3 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().addClass("layui-this");
                $("#ddthis").html(img);
            }
            $("#fontColor").val(RGBToHex(obj.css('color')));
            $("#TopClick").html("");
            $("#TopClick").html("<button type='button' class='layui-btn' style='width: 100%' onclick='AddImage()' id='AddImageText'>添加链接</button>");
            var objn = $(".leftNav span");
            var len = objn.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var num = parseInt(objn[i].id.replace("NavSpan", ""));
                    var src = $("#NavSpan" + num).attr("data-href");
                    var text = $("#NavSpan" + num).html();
                    $("#TopClick").append("<div id='uptopdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>" + text + "<i class='layui-icon layui-colla-icon'></i><i id='Topi" + num + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i>   </h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left:60px'><input id='TopList" + num + "' type='text' name='btnText' lay-verify='btnText'onchange='EditImgListText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='" + text + "' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px;margin-left:-10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='TopListSelect" + num + "' name='TopListSelect" + num + "' class='ListSelect' lay-filter='TopListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                    $("#TopListSelect" + num).val(src);
                }
                $(".page_title").each(function (index, element) {
                    if (element.id != "index") {
                        $(".ListSelect").append("<option value=" + $("#" + element.id).attr('htmlname') + ".html>" + $("#" + element.id).attr('htmltitle') + "</option>");
                    }
                });
                element.init();
                form.render();
            }
            uploadFun('#UpImageList' + num, '#ImgListImg' + num);
            $("#TopText").val(objs.text());
            if (obj.attr("data-href'") != null && obj.attr("data-href'") != undefined && obj.attr('data-href') != "") {
                $("#TopSelect1").val(obj.attr('data-href'));
            }
            if (obj.attr("data-access") != null && obj.attr("data-access") != undefined && obj.attr('data-access') != "") {
                $("#TopSelect2").val(obj.attr('data-access'));
            }
            $("#su").click();
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', '');
            $("#AssemblySetting").css('display', 'none');
            $("#BorderSetting").css('display', 'none');
            $("#TextSetting").css('display', 'block');
            $("#ImgSetting").css('display', 'none');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'block');
            $("#Upbottom").css('display', 'none');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        case "bottom":
            $("#UpbottomShuXing").html("");
            $("#UpbottomShuXing").html("<button type='button' class='layui-btn' style='width: 100%' onclick='AddImage()' id='AddImage'>添加</button>");
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem
                        , auto: false
                        , url: ''
                        , choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                if (imgid != "") {
                                    $(imgid).attr('src', result);
                                }
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        }
                        , done: function (res) {
                        }
                        , before: function (obj) {
                        }
                    });
                }
                var obj = $("#IndexBottomId .item");
                var len = obj.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var num = parseInt(obj[i].id.replace("BottomImg", ""));
                        var text = $("#" + obj[i].id + " span").html();
                        $("#UpbottomShuXing").append("<div id='upbottomimgdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>" + text + "<i class='layui-icon layui-colla-icon'></i><i id='BottomI" + num + "' class='layui-icon layui-icon-delete' style='position: absolute; right: 10px; font-size: 25px' onclick='DelImgList(this.id)'></i></h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>标题</label><div class='layui-input-block' style='margin-left: 60px'><input id='BottomText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditBottomSpanText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='" + text + "' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 60px; margin-left: -30px;'>原始图片</label> <div class='layui-input-block' style='margin-left: 60px'><div id='UpBottomImg" + num + "' class='layui-upload'><button type='button' class='layui-btn' id='UpLoadImg" + num + "'>上传图片</button></div></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 60px; margin-left: -30px;'>按下图片</label><div class='layui-input-block' style='margin-left: 60px'><div id='DownBottomImg" + num + "' class='layui-upload'><button type='button' class='layui-btn' id='BomLoadImg" + num + "'>上传图片</button></div></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px; margin-left: -10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='BottomListSelect" + num + "' name='BottomListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                        if ($("#" + obj[i].id).attr('pagepath') != null && $("#" + obj[i].id).attr('pagepath') != undefined && $("#" + obj[i].id).attr('pagepath') != "") {
                            $("#BottomListSelect" + num).val($("#" + obj[i].id).attr('pagepath'));
                        }
                        uploadFun('#UpLoadImg' + num, "");
                        uploadFun('#BomLoadImg' + num, "");
                        ImgBottomIndex = num;
                    }
                    $(".page_title").each(function (index, element) {
                        if (element.id != "index") {
                            $(".ListSelect").append("<option value=" + $("#" + element.id).attr('htmlname') + ".html>" + $("#" + element.id).attr('htmltitle') + "</option>");
                        }
                    });
                    element.init();
                    form.render();
                }
            });
            var objs = $("#IndexBottomId");
            $("#fontSize").val(parseInt(objs.css('font-size').replace("px", "")));
            var textAlign = objs[0].style.textAlign;
            if (textAlign == "left") {
                var img = $("#Alignment1 img").clone();
                $("#Alignment1").parent().addClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "center") {
                var img = $("#Alignment2 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().addClass("layui-this");
                $("#Alignment3").parent().removeClass("layui-this");
                $("#ddthis").html(img);
            } else if (textAlign == "right") {
                var img = $("#Alignment3 img").clone();
                $("#Alignment1").parent().removeClass("layui-this");
                $("#Alignment2").parent().removeClass("layui-this");
                $("#Alignment3").parent().addClass("layui-this");
                $("#ddthis").html(img);
            }
            $("#fontColor").val(RGBToHex(objs.css('color')));
            $("#BottomBgColor").val(RGBToHex(objs.css("background-color")));
            $("#su").click();
            $("#OffDiv").addClass('layui-show');
            $("#AlignDiv").addClass('layui-show');
            $("#AdjustFocusDiv").addClass('layui-show');
            $("#RadiusDiv").addClass('layui-show');
            $("#bgColorDiv").addClass('layui-show');
            $("#ys").css('visibility', '');
            $("#AssemblySetting").css('display', 'none');
            $("#BorderSetting").css('display', 'none');
            $("#TextSetting").css('display', 'block');
            $("#ImgSetting").css('display', 'none');
            $("#Uptext").css('display', 'none');
            $("#Upbutton").css('display', 'none');
            $("#UpImg").css('display', 'none');
            $("#UpImgList").css('display', 'none');
            $("#UpSwiper").css('display', 'none');
            $("#UpImgTextList").css('display', 'none');
            $("#Uptitle").css('display', 'none');
            $("#Uptext-list").css('display', 'none');
            $("#Uptop").css('display', 'none');
            $("#Upbottom").css('display', 'block');
            $("#rightlist").css('display', 'block');
            element.init();
            form.render();
            break;
        default:
            break;
    }
};
function AddImage() {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "img-list") {
        var obj = $("#" + AttrButeId + " div");
        var len = obj.length;
        if (len > 0) {
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem,
                        auto: false,
                        url: '',
                        choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                if (imgid != "") {
                                    $(imgid).attr('src', result);
                                }
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        },
                        done: function (res) {
                        },
                        before: function (obj) {
                        }
                    });
                }
                for (var i = len - 1; i < len; i++) {
                    var num = index + 1;
                    var datastyle = $("#" + AttrButeId).attr("data-style");
                    var imgstyle = $("#" + AttrButeId + " .inner-contents img").attr("style");
                    var spanstyle = $("#" + AttrButeId + " .inner-contents span").attr("style");
                    var width = $("#" + AttrButeId + " .inner-contents").css('width').replace('px', '');
                    if (datastyle == "ImageList2") {
                        $("#" + AttrButeId).append("<div id='imglist" + num + "' class='inner-contents'  style='float:left;width:" + width + "px;height:" + (parseInt($("#Imgheight").val()) + 20) + "px;position:relative;margin-bottom:" + $("#setImgHeight").val() + "px;margin-right: " + $("#setImgLeft").val() + "px;'><img src='images/face.jpg' style='" + imgstyle + "'><span class='class_cover' style='" + spanstyle + "' data-num='" + num + "'>标题</span></div>");
                        var objs = $("#" + AttrButeId);
                        if (len % 2 == 0) {
                            objs.css('height', 'auto');
                        }
                    } else {
                        $("#" + AttrButeId).append("<div id='imglist" + num + "' class='inner-contents' style='float:left;width:" + width + "px;position:relative;margin-bottom:" + $("#setImgHeight").val() + "px;margin-right: " + $("#setImgLeft").val() + "px;'><img src='images/face.jpg' style='" + imgstyle + "'><span class='class_cover' style='" + spanstyle + "' data-num='" + num + "'>标题</span></div>");
                        var objs = $("#" + AttrButeId);
                        if (len % 2 == 0) {
                            objs.css('height', 'auto');
                        }
                    }
                    $("#UpImgShuXing").append("<div id='upimglistdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>标题<i class='layui-icon layui-colla-icon'></i><i id='i" + num + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i>   </h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left:60px'><input id='ImgListText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditImgListText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='标题' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>图片</label><div class='layui-input-block' style='margin-left: 60px'><image id='ImgListImg" + num + "' src='images/face.jpg' style='height: 60px; width: 60px; float: left'></image><label id='UpImageList" + num + "' class='layui-form-label' style='text-align: left; color: #efbf1f; float: left; margin-top: 34px; width: 56px;'>更改图片</label></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px;margin-left:-10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='ImgListSelect" + num + "' name='ImgListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                    uploadFun('#UpImageList' + num, '#ImgListImg' + num);
                    index = num;
                }
            });
            element.init();
            form.render();
        } else {
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem,
                        auto: false,
                        url: '',
                        choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                if (imgid != "") {
                                    $(imgid).attr('src', result);
                                }
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        },
                        done: function (res) {
                        },
                        before: function (obj) {
                        }
                    });
                }
                var num = 1;
                $("#" + AttrButeId).append("<div id='imglist" + num + "' style='float:left;width:49%;height:100px;position:relative;margin-bottom:3px;margin-right: 3px;'><img src='images/face.jpg' style='width:100%;height:100%;'><span class='class_cover' data-num='" + num + "'>标题</span></div>");
                var objs = $("#" + AttrButeId);
                objs.css('height', parseInt(objs.css("height").replace("px", "")) + 103 + "px");
                $("#UpImgShuXing").append("<div id='upimglistdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>标题<i class='layui-icon layui-colla-icon'></i><i id='i" + num + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i>   </h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left:60px'><input id='ImgListText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditImgListText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='标题' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>图片</label><div class='layui-input-block' style='margin-left: 60px'><image id='ImgListImg" + num + "' src='images/face.jpg' style='height: 60px; width: 60px; float: left'></image><label id='UpImageList" + num + "' class='layui-form-label' style='text-align: left; color: #efbf1f; float: left; margin-top: 34px; width: 56px;'>更改图片</label></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px;margin-left:-10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='ImgListSelect" + num + "' name='ImgListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                uploadFun('#UpImageList' + num, '#ImgListImg' + num);
                index = num;
            });
            element.init();
            form.render();
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "imgtext-list") {
        var obj = $("#" + AttrButeId + " div");
        var len = obj.length;
        if (len > 0) {
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem,
                        auto: false,
                        url: '',
                        choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                if (imgid != "") {
                                    $(imgid).attr('src', result);
                                }
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        },
                        done: function (res) {
                        },
                        before: function (obj) {
                        }
                    });
                }
                for (var i = len - 1; i < len; i++) {
                    var num = ImgTextIndex + 1;
                    var datastyle = $("#" + AttrButeId).attr("data-style");
                    if (datastyle == "ImageTextList2") {
                        $("#" + AttrButeId).append("<div id='imgtext" + num + "' class='inner-content inner-contents' style='margin-right:5px;margin-bottom:5px;height:137px;display:block;'><div class='ImgText' style='width: 100%;height: 100px;float: left;'><img src='images/face.jpg' style='width:100%;height:100%'></div><div class='title-container' style='float:left;text-align:left;'><div class='title  imgtexttitle'>标题</div><div class='sec-title' style='text-align: left;color: rgb(102, 102, 102);font-size: 12px;'>我是简介</div></div></div>");
                        var objs = $("#" + AttrButeId);
                        objs.css('height', parseInt(objs.css("height").replace("px", "")) + 142 + "px");
                    } else {
                        $("#" + AttrButeId).append("<div id='imgtext" + num + "' class='inner-content inner-contents' style='margin-right:5px;margin-bottom:5px;height: 60px;display:block;'><div class='ImgText' style='width: 60px;height: 60px;float: left;margin-right: 6px;'><img src='images/face.jpg' style='width:100%;height:100%'></div><div class='title-container' style='float:left;text-align:left;margin-top:10px;'><div class='title imgtexttitle'>标题</div><div class='sec-title' style='text-align: left;color: rgb(102, 102, 102);font-size: 12px;'>我是简介</div></div></div>");
                        var objs = $("#" + AttrButeId);
                        objs.css('height', parseInt(objs.css("height").replace("px", "")) + 65 + "px");
                    }
                    $("#UpImgTextShuXing").append("<div id='UpImgTextListDiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>标题<i id='ImgTextI" + num + "' class='layui-icon layui-icon-delete' style='position: absolute; right: 10px; font-size: 25px' onclick='DelImgTextList(this.id)'></i></h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left: 60px'><input id='ImgTextListTitle" + num + "' type='text' name='ImgTextListTitle" + num + "' lay-verify='btnText' onchange='EditImgTextTitle(this.id)' autocomplete='off' placeholder='请输入标题' class='layui-input' value='标题'></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>简介</label><div class='layui-input-block' style='margin-left: 60px'><input id='ImgTextListText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditImgTextText(this.id)' autocomplete='off' placeholder='请输入简介' class='layui-input' value='我是简介'></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>图片</label><div class='layui-input-block' style='margin-left: 60px'><image id='ImgtextListImg" + num + "' src='images/face.jpg' style='height: 60px; width: 60px; float: left'></image><label id='UptextImageList" + num + "' class='layui-form-label' style='text-align: left; color: #efbf1f; float: left; margin-top: 34px; width: 56px;'>更改图片</label></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px; margin-left: -10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select name='ImgTextListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                    uploadFun('#UptextImageList' + num, '#ImgtextListImg' + num);
                    ImgTextIndex = num;
                }
            });
            element.init();
            form.render();
        } else {
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem,
                        auto: false,
                        url: '',
                        choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                if (imgid != "") {
                                    $(imgid).attr('src', result);
                                }
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        },
                        done: function (res) {
                        },
                        before: function (obj) {
                        }
                    });
                }
                var num = 1;
                var datastyle = $("#" + AttrButeId).attr("data-style");
                if (datastyle == "ImageTextList2") {
                    $("#" + AttrButeId).append("<div id='imgtext" + num + "' class='inner-content inner-contents' style='margin-right:5px;margin-bottom:5px;height:137px;display:block;'><div class='ImgText' style='width: 100%;height: 100px;float: left;'><img src='images/face.jpg' style='width:100%;height:100%'></div><div class='title-container' style='float:left;text-align:left;'><div class='title imgtexttitle'>标题</div><div class='sec-title' style='text-align: left;color: rgb(102, 102, 102);font-size: 12px;'>我是简介</div></div></div>");
                    var objs = $("#" + AttrButeId);
                    objs.css('height', parseInt(objs.css("height").replace("px", "")) + 142 + "px");
                } else {
                    $("#" + AttrButeId).append("<div id='imgtext" + num + "' class='inner-content inner-contents' style='margin-right:5px;margin-bottom:5px;height: 60px;display:block;'><div class='ImgText' style='width: 60px;height: 60px;float: left;margin-right: 6px;'><img src='images/face.jpg' style='width:100%;height:100%'></div><div class='title-container' style='float:left;text-align:left;margin-top:10px;'><div class='title imgtexttitle'>标题</div><div class='sec-title' style='text-align: left;color: rgb(102, 102, 102);font-size: 12px;'>我是简介</div></div></div>");
                    var objs = $("#" + AttrButeId);
                    objs.css('height', parseInt(objs.css("height").replace("px", "")) + 65 + "px");
                }
                $("#UpImgTextShuXing").append("<div id='UpImgTextListDiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>标题<i id='ImgTextI" + num + "' class='layui-icon layui-icon-delete' style='position: absolute; right: 10px; font-size: 25px' onclick='DelImgTextList(this.id)'></i></h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left: 60px'><input id='ImgTextListTitle" + num + "' type='text' name='ImgTextListTitle" + num + "' lay-verify='btnText' onchange='EditImgTextTitle(this.id)' autocomplete='off' placeholder='请输入标题' class='layui-input' value='标题'></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>简介</label><div class='layui-input-block' style='margin-left: 60px'><input id='ImgTextListText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditImgTextText(this.id)' autocomplete='off' placeholder='请输入简介' class='layui-input' value='我是简介'></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>图片</label><div class='layui-input-block' style='margin-left: 60px'><image id='ImgtextListImg" + num + "' src='images/face.jpg' style='height: 60px; width: 60px; float: left'></image><label id='UptextImageList" + num + "' class='layui-form-label' style='text-align: left; color: #efbf1f; float: left; margin-top: 34px; width: 56px;'>更改图片</label></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px; margin-left: -10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select name='ImgTextListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                uploadFun('#UptextImageList' + num, '#ImgtextListImg' + num);
                ImgTextIndex = num;
            });
            element.init();
            form.render();
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        var obj = $("#" + AttrButeId + " .item");
        var len = obj.length;
        if (len > 0) {
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem,
                        auto: false,
                        url: '',
                        choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                $(imgid).attr('src', result);
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        },
                        done: function (res) {
                        },
                        before: function (obj) {
                        }
                    });
                }
                for (var i = len - 1; i < len; i++) {
                    var num = ImgBottomIndex + 1;
                    $("#IndexBottomId").append("<div id='BottomImg" + num + "' class='item' style='width: 25%;height:99%;line-height:1.4;float:left;'><a class='img-thumb-wrap' href='javascript:;' style='height:38px;width:38px;'><img src='' class='bottomimg' style='vertical-align:middle;height:38px;width:38px'><img style='display:none' ng-reflect-src='' src=''></a><span class='bottom-text' style='float:left;width:100%'>标签</span></div>");
                    $(".item").css('width', parseInt(100 / (len + 1)) + "%");
                    $("#UpbottomShuXing").append("<div id='upbottomimgdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>标签<i class='layui-icon layui-colla-icon'></i><i id='BottomI" + num + "' class='layui-icon layui-icon-delete' style='position: absolute; right: 10px; font-size: 25px' onclick='DelImgList(this.id)'></i></h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>标题</label><div class='layui-input-block' style='margin-left: 60px'><input id='BottomText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditBottomSpanText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='标签' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 60px; margin-left: -30px;'>原始图片</label> <div class='layui-input-block' style='margin-left: 60px'><div id='UpBottomImg" + num + "' class='layui-upload'><button type='button' class='layui-btn' id='UpLoadImg" + num + "'>上传图片</button></div></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 60px; margin-left: -30px;'>按下图片</label><div class='layui-input-block' style='margin-left: 60px'><div id='DownBottomImg" + num + "' class='layui-upload'><button type='button' class='layui-btn' id='BomLoadImg" + num + "'>上传图片</button></div></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px; margin-left: -10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='BottomListSelect" + num + "' name='BottomListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                    uploadFun('#UpLoadImg' + num, "");
                    uploadFun('#BomLoadImg' + num, "");
                    ImgBottomIndex = num;
                }
            });
            element.init();
            form.render();
        } else {
            layui.use('upload', function () {
                upload = layui.upload;
                var uploadFun = function (elem, imgid) {
                    upload.render({
                        elem: elem,
                        auto: false,
                        url: '',
                        choose: function (obj) {
                            obj.preview(function (index, file, result) {
                                $(imgid).attr('src', result);
                                var imglist;
                                imglist = {
                                    "imgurl": result
                                };
                                imglist = JSON.stringify(imglist);
                                UpdateImg(elem, imglist);
                            });
                        },
                        done: function (res) {
                        },
                        before: function (obj) {
                        }
                    });
                }
                var num = 1;
                $("#" + AttrButeId).append("<div id='BottomImg" + num + "' class='item' style='width: 25%;height:99%;line-height:1.4;float:left;'><a class='img-thumb-wrap' href='javascript:;' style='height:38px;width:38px;'><img src='' class='bottomimg' style='vertical-align:middle;height:38px;width:38px'><img style='display:none' ng-reflect-src='' src=''></a><span class='bottom-text' style='float:left;width:100%'>标签</span></div>");

                $("#IndexBottomId .item").css('width', '100%');
                $("#UpbottomShuXing").append("<div id='upbottomimgdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>标签<i class='layui-icon layui-colla-icon'></i><i id='BottomI" + num + "' class='layui-icon layui-icon-delete' style='position: absolute; right: 10px; font-size: 25px' onclick='DelImgList(this.id)'></i></h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>标题</label><div class='layui-input-block' style='margin-left: 60px'><input id='BottomText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditBottomSpanText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='标签' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 60px; margin-left: -30px;'>原始图片</label> <div class='layui-input-block' style='margin-left: 60px'><div id='UpBottomImg" + num + "' class='layui-upload'><button type='button' class='layui-btn' id='UpLoadImg" + num + "'>上传图片</button></div></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 60px; margin-left: -30px;'>按下图片</label><div class='layui-input-block' style='margin-left: 60px'><div id='DownBottomImg" + num + "' class='layui-upload'><button type='button' class='layui-btn' id='BomLoadImg" + num + "'>上传图片</button></div></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px; margin-left: -10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='BottomListSelect" + num + "' name='BottomListSelect" + num + "' class='ListSelect' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                $("#BottomListSelect" + num).val($("#" + obj[i].id).attr("data-href"));
                uploadFun('#UpLoadImg' + num, "");
                uploadFun('#BomLoadImg' + num, "");
                ImgBottomIndex = num;
            });
            element.init();
            form.render();
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var objn = $(".leftNav span");
        var len = objn.length;
        if (len > 0) {
            for (var i = len - 1; i < len; i++) {
                var num = (parseInt(objn[i].id.replace("NavSpan", "")) + 1);
                $("#TopClick").append("<div id='uptopdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>地址<i class='layui-icon layui-colla-icon'></i><i id='Topi" + num + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i>   </h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left:60px'><input id='TopListSelect" + num + "' type='text' name='btnText' lay-verify='btnText'onchange='EditImgListText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='地址' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px;margin-left:-10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='TopListSelect" + num + "' name='TopListSelect" + num + "' class='ListSelect' lay-filter='TopListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
                $('.leftNav').append("<span id='NavSpan" + num + "' class='span' data-href=''>地址</span>")
                element.init();
                form.render();
            }
        }
        else {
            $("#TopClick").append("<div id='uptopdiv1' class='layui-colla-item'><h2 class='layui-colla-title'>地址<i class='layui-icon layui-colla-icon'></i><i id='Topi1' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i>   </h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left:60px'><input id='TopListSelect1' type='text' name='btnText' lay-verify='btnText'onchange='EditImgListText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='地址' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px;margin-left:-10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='TopListSelect1' name='TopListSelect1' class='ListSelect' lay-filter='TopListSelect'><option value='' selected=''></option><option value='HomePage.html'>首页</option></select></div></div></div></div>");
            $('.leftNav').append("<span id='NavSpan1' class='span' data-href='HomePage.html'>首页</span>")
            element.init();
            form.render();
        }
    }
};
function SetAlign(id) {
    if (id == "center") {
        $("#left").addClass('layui-btn-primary');
        $("#center").removeClass('layui-btn-primary');
        $("#right").addClass('layui-btn-primary');
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "button") {
            var obj = $("#" + AttrButeId + " button");
            obj.css('margin-left', '0px');
            var objs = $("#" + AttrButeId);
            objs[0].style.textAlign = id;
        } else if ($("#" + AttrButeId).attr("data-type") == "img") {
            var obj = $("#" + AttrButeId + " img");
            obj.css('margin-left', '0px');
            obj.css('margin-right', '0px');
            var objs = $("#" + AttrButeId);
            objs[0].style.textAlign = id;
        }
    }
    else if (id == "left") {
        $("#left").removeClass('layui-btn-primary');
        $("#center").addClass('layui-btn-primary');
        $("#right").addClass('layui-btn-primary');
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "button") {
            var obj = $("#" + AttrButeId + " button");
            obj.css('margin-left', '0px');
            var objs = $("#" + AttrButeId);
            objs[0].style.textAlign = id;
        } else if ($("#" + AttrButeId).attr("data-type") == "img") {
            var obj = $("#" + AttrButeId + " img");
            obj.css('margin-left', '0px');
            obj.css('margin-right', '0px');
            var objs = $("#" + AttrButeId);
            objs[0].style.textAlign = id;
        }
    }
    else {
        $("#left").addClass('layui-btn-primary');
        $("#center").addClass('layui-btn-primary');
        $("#right").removeClass('layui-btn-primary');
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "button") {
            var obj = $("#" + AttrButeId + " button");
            obj.css('margin-left', '0px');
            var objs = $("#" + AttrButeId);
            objs[0].style.textAlign = id;
        } else if ($("#" + AttrButeId).attr("data-type") == "img") {
            var obj = $("#" + AttrButeId + " img");
            obj.css('margin-left', '0px');
            obj.css('margin-right', '0px');
            var objs = $("#" + AttrButeId);
            objs[0].style.textAlign = id;
        }
    }
}
function SetOffset(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        if (id == "setLeft") {
            $("#left").addClass('layui-btn-primary');
            $("#center").addClass('layui-btn-primary');
            $("#right").addClass('layui-btn-primary');
            var obj = $("#" + AttrButeId + " button");
            var objs = $("#" + AttrButeId);
            objs.css('text-align', 'left');
            obj.css('margin-left', $("#" + id)[0].value + "px");
            $("#left").removeClass('layui-btn-primary');
            $("#center").addClass('layui-btn-primary');
            $("#right").addClass('layui-btn-primary');
        }
        else if (id == "setHeight") {
            var obj = $("#" + AttrButeId + " button");
            obj.css('margin-top', $("#" + id)[0].value + "px");
            $("#" + AttrButeId).css('height', parseInt($("#height").val()) + parseInt($("#" + id).val()) + 'px');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img") {
        if (id == "setLeft") {
            $("#left").addClass('layui-btn-primary');
            $("#center").addClass('layui-btn-primary');
            $("#right").addClass('layui-btn-primary');
            var obj = $("#" + AttrButeId + " img");
            obj.css('margin-left', $("#" + id)[0].value + "px");
            obj.css('margin-right', $("#" + id)[0].value + "px");
            obj.css('width', $("#" + AttrButeId)[0].offsetWidth - (parseInt($("#" + id).val()) * 2) + 'px');
        }
        else if (id == "setHeight") {
            var obj = $("#" + AttrButeId + " img");
            obj.css('margin-top', $("#" + id)[0].value + "px");
            obj.css('margin-bottom', $("#" + id)[0].value + "px");
            $("#" + AttrButeId).css('height', parseInt($("#height").val()) + (parseInt($("#" + id).val()) * 2) + 'px');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img-list") {
        if (id == "setImgLeft") {
            if ($("#" + id).val() >= 3) {
                $("#" + AttrButeId).css('padding-left', $("#" + id).val() + "px");
                $("#" + AttrButeId + " .inner-contents").css('margin-right', $("#" + id).val() + "px");
                var Jwidth = $("#" + AttrButeId)[0].offsetWidth - (parseInt($("#" + id).val()) * 1.5 - 5);
                if (Jwidth > ($("#" + AttrButeId)[0].offsetWidth / 2)) {
                    Jwidth = $("#" + AttrButeId)[0].offsetWidth / 2;
                }
                $("#" + AttrButeId + " .inner-contents").css('width', Jwidth + 'px');

                $("#" + AttrButeId).css('width', $("#" + AttrButeId)[0].offsetWidth - parseInt($("#" + AttrButeId).css('padding-left').replace('px', '')) + "px");
            }
        }
        else if (id == "setImgHeight") {
            $("#" + AttrButeId).css('padding-top', $("#" + id).val() + "px");
            $("#" + AttrButeId + " .inner-contents").css('margin-bottom', $("#" + id).val() + "px");
            $("#" + AttrButeId).css('height', 'auto');
        }
        $("#" + AttrButeId + " .inner-contents .class_cover").css('width', parseInt($("#" + AttrButeId + " .inner-contents").css('width').replace('px', '')) - 6 + 'px');
    }
}
function SetTextIndent(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        obj.css('text-indent', $("#" + id)[0].value + "px");
    }
}
function SetHeightWidth(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        if (id == "width") {
            var obj = $("#" + AttrButeId + " button");
            obj[0].style.width = $("#" + id)[0].value + "px";
            if (parseInt($("#" + id)[0].value) < 64) {
                obj.css('padding', '0px');
            } else {
                obj.css('padding', '0 18px');
            }
        }
        else {
            var obj = $("#" + AttrButeId + " button");
            obj[0].style.height = $("#" + id)[0].value + "px";
            obj.css('line-height', $("#" + id)[0].value + "px");
            var objs = $("#" + AttrButeId);
            objs.css("height", "auto");
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img") {
        if (id == "width") {
            var obj = $("#" + AttrButeId + " img");
            obj[0].style.width = $("#" + id)[0].value + "px";
        }
        else {
            var obj = $("#" + AttrButeId + " img");
            obj[0].style.height = $("#" + id)[0].value + "px";
            var objs = $("#" + AttrButeId);
            objs[0].style.height = parseInt($("#" + id)[0].value) + 6 + "px";
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "title") {
        var objs = $("#" + AttrButeId);
        objs[0].style.height = parseInt($("#" + id)[0].value) + "px";
        var obji = $("#" + AttrButeId + " i");
        obji[0].style.height = parseInt($("#" + id)[0].value) + "px";
        var objt = $("#" + AttrButeId + " .title-text");
        objt.css("line-height", parseInt($("#" + id)[0].value) + "px");
        var objt = $("#" + AttrButeId + " a");
        objt.css("line-height", parseInt($("#" + id)[0].value) + "px");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
        var objt = $("#" + AttrButeId + " .title-container");
        objt.css("height", parseInt($("#" + id)[0].value) + "px");
        objt.css("line-height", parseInt($("#" + id)[0].value) + "px");
        var len = $("#" + AttrButeId + " .title-container").length;
        var height = 0;
        for (var i = 0; i < len; i++) {
            if ($("#" + AttrButeId + " .title-container")[i].style.height != null || $("#" + AttrButeId + " .title-container")[i].style.height != undefined)
                height += parseInt($("#" + AttrButeId + " .title-container")[i].style.height.replace("px", ""));
            else
                height += 25;
        }
        var objs = $("#" + AttrButeId);
        objs[0].style.height = height + "px";
        var obji = $("#" + AttrButeId + " i");
        obji[0].style.height = height + "px";
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        if (id == "height") {
            var objt = $("#" + AttrButeId + " div");
            objt.css("height", parseInt($("#" + id)[0].value) + "px");
            objt.css("line-height", parseInt($("#" + id)[0].value) + "px");
            var objs = $("#" + AttrButeId);
            objs[0].style.height = parseInt($("#" + id)[0].value) + "px";
            var obji = $("#" + AttrButeId + " i");
            obji[0].style.height = parseInt($("#" + id)[0].value) + "px";
        }
        else {
            var objt = $("#" + AttrButeId + " div");
            objt.css("width", parseInt($("#" + id)[0].value) + "px");
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img-list") {
        var objt = $("#" + AttrButeId + " img");
        objt.css("height", parseInt($("#" + id)[0].value) + "px");
        var datastyle = $("#" + AttrButeId).attr("data-style");
        var objs = $("#" + AttrButeId + " .inner-contents");
        if (datastyle == "ImageList2") {
            objs.css('height', parseInt($("#" + id)[0].value) + 20 + 'px');
        } else {
            objs.css('height', parseInt($("#" + id)[0].value) + 'px');
        }
        $("#" + AttrButeId).css('height', 'auto');
    }
}
function SetFontSize(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        obj.css('font-size', $("#" + id)[0].value + "px");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "title") {
        var obj = $("#" + AttrButeId + " .js-text");
        obj.css('font-size', $("#" + id)[0].value + "px");
        var obja = $("#" + AttrButeId + " a");
        obja.css('font-size', $("#" + id)[0].value + "px");
        var objt = $("#" + AttrButeId + " .title-text");
        objt.css('font-size', $("#" + id)[0].value + "px");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
        var obj = $("#" + AttrButeId + " p");
        obj.css('font-size', $("#" + id)[0].value + "px");
        var obj = $("#" + AttrButeId);
        obj.css('height', 'auto');
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var obj = $("#" + AttrButeId);
        obj.css('font-size', $("#" + id)[0].value + "px");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        var obj = $("#" + AttrButeId);
        obj.css('font-size', $("#" + id)[0].value + "px");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId);
        obj.css('font-size', $("#" + id)[0].value + "px");
    }
}
function SetFontWeight(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        if (obj.css('font-weight') != '700' && obj.css('font-weight') != 'bold') {
            obj.css('font-weight', 'bold');
        }
        else {
            obj.css('font-weight', 'normal');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var obj = $("#" + AttrButeId);
        if (obj.css('font-weight') != '700' && obj.css('font-weight') != 'bold') {
            obj.css('font-weight', 'bold');
        }
        else {
            obj.css('font-weight', 'normal');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        var obj = $("#" + AttrButeId);
        if (obj.css('font-weight') != '700' && obj.css('font-weight') != 'bold') {
            obj.css('font-weight', 'bold');
        }
        else {
            obj.css('font-weight', 'normal');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        if (obj.css('font-weight') != '700' && obj.css('font-weight') != 'bold') {
            obj.css('font-weight', 'bold');
        }
        else {
            obj.css('font-weight', 'normal');
        }
    }
}
function SetFontStyle(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        if (obj.css('font-style') != 'italic') {
            obj.css('font-style', 'italic');
        }
        else {
            obj.css('font-style', 'normal');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var obj = $("#" + AttrButeId);
        if (obj.css('font-style') != 'italic') {
            obj.css('font-style', 'italic');
        }
        else {
            obj.css('font-style', 'normal');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        var obj = $("#" + AttrButeId);
        if (obj.css('font-style') != 'italic') {
            obj.css('font-style', 'italic');
        }
        else {
            obj.css('font-style', 'normal');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId);
        if (obj.css('font-style') != 'italic') {
            obj.css('font-style', 'italic');
        }
        else {
            obj.css('font-style', 'normal');
        }
    }
}
function SetFontDecoration(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        if (obj[0].style.textDecoration != 'underline') {
            obj.css('text-decoration', 'underline');
        }
        else {
            obj.css('text-decoration', 'none');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var obj = $("#" + AttrButeId);
        if (obj[0].style.textDecoration != 'underline') {
            obj.css('text-decoration', 'underline');
        }
        else {
            obj.css('text-decoration', 'none');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        var obj = $("#" + AttrButeId + " span");
        if (obj[0].style.textDecoration != 'underline') {
            obj.css('text-decoration', 'underline');
        }
        else {
            obj.css('text-decoration', 'none');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        if (obj[0].style.textDecoration != 'underline') {
            obj.css('text-decoration', 'underline');
        }
        else {
            obj.css('text-decoration', 'none');
        }
    }
}
function SetFontColor(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        obj.css('color', $("#" + id)[0].value);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var obj = $("#" + AttrButeId);
        obj.css('color', $("#" + id)[0].value);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        var obj = $("#" + AttrButeId);
        obj.css('color', $("#" + id)[0].value);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        obj.css('color', $("#" + id)[0].value);
    }
}
function SetTextAlign(id) {
    if (id == "Alignment1") {
        $("#Alignment1").parent().addClass("layui-this");
        $("#Alignment2").parent().removeClass("layui-this");
        $("#Alignment3").parent().removeClass("layui-this");
        var img = $("#Alignment1 img").clone();
        $("#ddthis").html(img);
    }
    if (id == "Alignment2") {
        $("#Alignment1").parent().removeClass("layui-this");
        $("#Alignment2").parent().addClass("layui-this");
        $("#Alignment3").parent().removeClass("layui-this");
        var img = $("#Alignment2 img").clone();
        $("#ddthis").html(img);
    }
    if (id == "Alignment3") {
        $("#Alignment1").parent().removeClass("layui-this");
        $("#Alignment2").parent().removeClass("layui-this");
        $("#Alignment3").parent().addClass("layui-this");
        var img = $("#Alignment3 img").clone();
        $("#ddthis").html(img);
    }
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        if (id == "Alignment1") {
            obj[0].style.textAlign = "left";
        }
        if (id == "Alignment2") {
            obj[0].style.textAlign = "center";
        }
        if (id == "Alignment3") {
            obj[0].style.textAlign = "right";
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var obj = $("#" + AttrButeId);
        if (id == "Alignment1") {
            obj[0].style.textAlign = "left";
        }
        if (id == "Alignment2") {
            obj[0].style.textAlign = "center";
        }
        if (id == "Alignment3") {
            obj[0].style.textAlign = "right";
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        var obj = $("#" + AttrButeId);
        if (id == "Alignment1") {
            obj[0].style.textAlign = "left";
        }
        if (id == "Alignment2") {
            obj[0].style.textAlign = "center";
        }
        if (id == "Alignment3") {
            obj[0].style.textAlign = "right";
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId);
        if (id == "Alignment1") {
            obj[0].style.textAlign = "left";
        }
        if (id == "Alignment2") {
            obj[0].style.textAlign = "center";
        }
        if (id == "Alignment3") {
            obj[0].style.textAlign = "right";
        }
    }
}
function SetBorderStyle(id) {
    if (id == "BorderStyle0") {
        $("#BorderStyle0").parent().addClass("layui-this");
        $("#BorderStyle1").parent().removeClass("layui-this");
        $("#BorderStyle2").parent().removeClass("layui-this");
        $("#BorderStyle3").parent().removeClass("layui-this");
        $("#BorderStyleThis").html("无");
    }
    else if (id == "BorderStyle1") {
        $("#BorderStyle0").parent().removeClass("layui-this");
        $("#BorderStyle1").parent().addClass("layui-this");
        $("#BorderStyle2").parent().removeClass("layui-this");
        $("#BorderStyle3").parent().removeClass("layui-this");
        $("#BorderStyleThis").html("实线");
    }
    else if (id == "BorderStyle2") {
        $("#BorderStyle0").parent().removeClass("layui-this");
        $("#BorderStyle1").parent().removeClass("layui-this");
        $("#BorderStyle2").parent().addClass("layui-this");
        $("#BorderStyle3").parent().removeClass("layui-this");
        $("#BorderStyleThis").html("点线");
    }
    else if (id == "BorderStyle3") {
        $("#BorderStyle0").parent().removeClass("layui-this");
        $("#BorderStyle1").parent().removeClass("layui-this");
        $("#BorderStyle2").parent().removeClass("layui-this");
        $("#BorderStyle3").parent().addClass("layui-this");
        $("#BorderStyleThis").html("虚线");
    }
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        if (id == "BorderStyle0") {
            obj.css('border-style', 'none');
        }
        else if (id == "BorderStyle1") {
            obj.css('border-style', 'solid');
        }
        else if (id == "BorderStyle2") {
            obj.css('border-style', 'dotted');
        }
        else if (id == "BorderStyle3") {
            obj.css('border-style', 'dashed');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img") {
        var obj = $("#" + AttrButeId + " img");
        if (id == "BorderStyle0") {
            obj.css('border-style', 'none');
        }
        else if (id == "BorderStyle1") {
            obj.css('border-style', 'solid');
        }
        else if (id == "BorderStyle2") {
            obj.css('border-style', 'dotted');
        }
        else if (id == "BorderStyle3") {
            obj.css('border-style', 'dashed');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
        var obj = $("#" + AttrButeId + " .title-container");

        if (id == "BorderStyle0") {
            obj.css('border-bottom-style', 'none');
        }
        else if (id == "BorderStyle1") {
            obj.css('border-bottom-style', 'solid');
        }
        else if (id == "BorderStyle2") {
            obj.css('border-bottom-style', 'dotted');
        }
        else if (id == "BorderStyle3") {
            obj.css('border-bottom-style', 'dashed');
        }
        var height = 0;
        if (obj.css('border-bottom-style') == 'none')
            height = parseInt(obj.css('height').replace('px', '')) * 4;
        else
            height = (parseInt(obj.css('height').replace('px', '')) * 4) + (parseInt(obj.css('border-bottom-width').replace('px', '')) * 4);
        var objs = $("#" + AttrButeId);
        objs[0].style.height = height + "px";
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        if (id == "BorderStyle0") {
            obj.css('border-style', 'none');
        }
        else if (id == "BorderStyle1") {
            obj.css('borde-style', 'solid');
        }
        else if (id == "BorderStyle2") {
            obj.css('border-style', 'dotted');
        }
        else if (id == "BorderStyle3") {
            obj.css('border-style', 'dashed');
        }
    }
}
function SetBorderColor(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        obj.css('border-color', $("#" + id)[0].value);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img") {
        var obj = $("#" + AttrButeId + " img");
        obj.css('border-color', $("#" + id)[0].value);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
        var obj = $("#" + AttrButeId + " .title-container");
        obj.css('border-bottom-color', $("#" + id)[0].value);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        obj.css('border-color', $("#" + id)[0].value);
    }
}
function SeBorderWidth(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        obj.css('border-width', $("#" + id)[0].value + "px");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img") {
        var obj = $("#" + AttrButeId + " img");
        obj.css('border-width', $("#" + id)[0].value + "px");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
        var obj = $("#" + AttrButeId + " .title-container");
        obj.css('border-bottom-width', $("#" + id)[0].value + "px");
        var height = 0;
        if (obj.css('border-bottom-style') == 'none')
            height = parseInt(obj.css('height').replace('px', '')) * 4;
        else
            height = (parseInt(obj.css('height').replace('px', '')) * 4) + (parseInt(obj.css('border-bottom-width').replace('px', '')) * 4);
        var objs = $("#" + AttrButeId);
        objs[0].style.height = height + "px";
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        obj.css('border-width', $("#" + id)[0].value + "px");
    }
}
function DeleteTopDiv(thisdel) {
    $("#dropContent2").css('margin-top', '33px');
    var Qheight = parseInt($("#dropContent2").css("height").replace('px', ''));
    var Nheight = Qheight + 40;
    $("#dropContent2").css('height', Nheight + 'px');
    $("#dropContent1").css('display', 'none');
    $("#dropContent1").html("");
}
function DeleteBottomDiv(thisdel) {
    var Qheight = parseInt($("#dropContent2").css("height").replace('px', ''));
    var Nheight = Qheight + 60;
    $("#dropContent2").css('height', Nheight + 'px');
    $("#dropContent3").css('display', 'none');
    $("#dropContent3").html("");
}
function SetCloseTopDiv(obj) {
    if ($("#DelTopdiv").css('display') == 'block') {
        $("#DelTopdiv").css('display', 'none');
    }
    else {
        $("#DelTopdiv").css('display', 'block');
    }
}
function SetCloseBottomDiv(obj) {
    var x = event.pageX;
    var y = event.pageY;
    var div = $('#IndexBottomId');
    var y1 = div.offset().top;
    var y2 = y1 + div.height();
    var x1 = div.offset().left;
    var x2 = x1 + div.width();

    if (x < x1 || x > x2 || y < y1 || y > y2) {
        $("#DelBottomdiv").css('display', 'none');
    } else {
        $("#DelBottomdiv").css('display', 'block');
    }
}
function SetColor(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        obj[0].style.backgroundColor = $("#" + id)[0].value;
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        obj[0].style.backgroundColor = $("#" + id)[0].value;
    }
}
function SetRadius(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        obj[0].style.borderRadius = $("#" + id)[0].value + "px";
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img") {
        var obj = $("#" + AttrButeId + " img");
        if (obj[0].offsetHeight - 6 > obj[0].offsetWidth) {
            obj[0].style.width = obj[0].offsetHeight - 6 + "px";
            $("#width").val(obj[0].offsetHeight);
        }
        else if (obj[0].offsetHeight < obj[0].offsetWidth - 6) {
            obj[0].style.height = obj[0].offsetWidth - 6 + "px";
            $("#height").val(obj[0].offsetWidth);
        }
        obj[0].style.borderRadius = $("#" + id)[0].value + "px";
        obj[0].style.width = $("#width").val() + "px";
        obj[0].style.height = $("#height").val() + "px";
        var objs = $("#" + AttrButeId);
        objs[0].style.height = $("#height").val() + "px";
        var obji = $("#" + AttrButeId + " i");
        obji[0].style.height = $("#height").val() + "px";
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img-list") {
        var obj = $("#" + AttrButeId + " img");
        var objs = $("#" + AttrButeId + " .inner-contents");
        var widthNum = parseInt(objs.css('width').replace('px', ''));
        var heightNum = parseInt($("#Imgheight").val());
        if (heightNum > widthNum) {
            obj.css('height', heightNum + 'px');
        } else {
            obj.css('height', widthNum + 'px');
        }
        objs.css('height', 'auto');
        obj.css('border-radius', $("#" + id)[0].value + "px");
    }
}
function SetRadiusMax() {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        if (obj[0].offsetHeight > obj[0].offsetWidth) {
            obj[0].style.width = obj[0].offsetHeight + "px";
            $("#width").val(obj[0].offsetHeight);
        }
        else {
            obj[0].style.height = obj[0].offsetWidth + "px";
            $("#height").val(obj[0].offsetWidth);
        }
        obj[0].style.borderRadius = $("#height").val() / 2 + "px";
        var objs = $("#" + AttrButeId);
        objs[0].style.height = $("#height").val() + "px";
        var obji = $("#" + AttrButeId + " i");
        obji[0].style.height = $("#height").val() + "px";
        $("#borderRadius").val($("#height").val() / 2);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img") {
        var obj = $("#" + AttrButeId + " img");
        if (obj[0].offsetHeight - 6 > obj[0].offsetWidth) {
            obj[0].style.width = obj[0].offsetHeight - 6 + "px";
            $("#width").val(obj[0].offsetHeight);
        }
        else if (obj[0].offsetHeight < obj[0].offsetWidth - 6) {
            obj[0].style.height = obj[0].offsetWidth - 6 + "px";
            $("#height").val(obj[0].offsetWidth);
        }
        obj[0].style.borderRadius = $("#height").val() / 2 + "px";
        obj[0].style.width = $("#width").val() + "px";
        obj[0].style.height = $("#height").val() + "px";
        var objs = $("#" + AttrButeId);
        objs[0].style.height = $("#height").val() + "px";
        var obji = $("#" + AttrButeId + " i");
        obji[0].style.height = $("#height").val() + "px";
        $("#borderRadius").val($("#height").val() / 2);
    }
    else if ($("#" + AttrButeId).attr("data-type") == "img-list") {
        var obj = $("#" + AttrButeId + " img");
        var objs = $("#" + AttrButeId + " .inner-contents");
        var widthNum = parseInt(objs.css('width').replace('px', ''));
        $("#Imgheight").val(widthNum);
        obj.css('height', widthNum + 'px');
        var datastyle = $("#" + AttrButeId).attr("data-style");
        if (datastyle == "ImageList2") {
            objs.css('height', widthNum + 20 + 'px');
        } else {
            objs.css('height', widthNum + 'px');
        }
        obj.css('border-radius', widthNum / 2 + "px");
        $("#ImgborderRadius").val(widthNum / 2);
    }
}
function DelImgList(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        $("#upbottomimgdiv" + id.replace("BottomI", "")).remove();
        $("#BottomImg" + id.replace("BottomI", "")).remove();
        var obj = $("#" + AttrButeId + " div");
        var len = obj.length;
        $("#IndexBottomId .item").css('width', parseInt(100 / len) + "%");
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        $("#uptopdiv" + id.replace("Topi", "")).remove();
        $("#NavSpan" + id.replace("Topi", "")).remove();
    }
    else {
        $("#upimglistdiv" + id.replace("i", "")).remove();
        $("#imglist" + id.replace("i", "")).remove();
        var obj = $("#" + AttrButeId + " div");
        var len = obj.length;
        if (len % 2 == 0) {
            $("#" + AttrButeId).css('height', 'auto');
        }
    }
    element.init();
    form.render();
}
function DelImgTextList(id) {
    $("#UpImgTextListDiv" + id.replace("ImgTextI", "")).remove();
    $("#imgtext" + id.replace("ImgTextI", "")).remove();
    var AttrButeId = $("#SetAttriButeId").val();
    var objs = $("#" + AttrButeId);
    if (objs.attr('data-style') == "ImageTextList2") {
        objs.css('height', parseInt(objs.css("height").replace("px", "")) - 142 + "px");
    } else {
        objs.css('height', parseInt(objs.css("height").replace("px", "")) - 65 + "px");
    }
    element.init();
    form.render();
}
var dragDropObj = new DHTMLgoodies_dragDrop();
dragDropObj.addSource('box2', true);
dragDropObj.addSource('box3', true);
dragDropObj.addSource('box4', true);
dragDropObj.addSource('box5', true);
dragDropObj.addSource('box6', true);
dragDropObj.addSource('box7', true);
dragDropObj.addSource('box8', true);
dragDropObj.addSource('box9', true);
dragDropObj.addTarget('dropBox2', 'dropItems2');
dragDropObj.init();
function RGBToHex(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp);
    var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < re.length; i++) {
        var r = null, c = re[i], l = c;
        var hexAr = [];
        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        } hexAr.push(hex[c]);
        if (l < 16 && l != "") {
            hexAr.push(0);
        }
        hexColor += hexAr.reverse().join('');
    }
    return hexColor;
}
function EditText() {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "button") {
        var obj = $("#" + AttrButeId + " button");
        obj[0].innerText = $("#btnText").val();
    }
    else if ($("#" + AttrButeId).attr("data-type") == "title") {
        var obj = $("#" + AttrButeId + " .js-text");
        obj.text($("#TitleText").val());
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        var obj = $("#" + AttrButeId + " span");
        obj.text($("#TopText").val());
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text") {
        var obj = $("#" + AttrButeId + " div");
        obj.text($("#TextText").val());
        if ($("#TextText").val() != null && $("#TextText").val() != "" && $("#TextText").val() != undefined) {
            $("#" + AttrButeId).css("height", "auto");
            $("#" + AttrButeId + " div").css("height", "auto");
        } else {
            $("#" + AttrButeId).css("height", "20px");
            $("#" + AttrButeId + " div").css("height", "20px");
        }
    }
}
function EditImgTextTitle(id) {
    var obj = $("#" + id);
    var objid = id.replace("ImgTextListTitle", "");
    var text = obj.val();
    $("#UpImgTextListDiv" + objid + " h2").html(text + "<i id='ImgTextI" + objid + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgTextList(this.id)'></i><i class='layui-icon layui-colla-icon'></i>");
    $("#imgtext" + objid + " .title-container .title").html(text);
}
function EditImgTextText(id) {
    var obj = $("#" + id);
    var objid = id.replace("ImgTextListText", "");
    var text = obj.val();
    $("#imgtext" + objid + " .title-container .sec-title").html(text);
}
function EditImgListText(id) {
    var obj = $("#" + id);
    var objid = id.replace("ImgListText", "");
    var text = obj.val();
    $("#upimglistdiv" + objid + " h2").html(text + "<i id='i" + objid + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i><i class='layui-icon layui-colla-icon'></i>");
    $("#imglist" + objid + " span").html(text);
}
function EditBottomSpanText(id) {
    var obj = $("#" + id);
    var objid = id.replace("BottomText", "");
    var text = obj.val();
    $("#upbottomimgdiv" + objid + " h2").html(text + "<i id='BottomI" + objid + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i><i class='layui-icon layui-colla-icon'></i>");
    $("#BottomImg" + objid + " span").html(text);
    $("#BottomImg" + objid).attr('text', text);
}
function EditImgeListStyle(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "img-list") {
        if (id == "ImageList1") {
            $("#ImageList1").css("border", "2px solid #41d8e1");
            $("#ImageList2").css("border", "");
            $("#" + AttrButeId).attr("data-style", "ImageList1");
            $("#" + AttrButeId + " div").css('height', parseInt($("#" + AttrButeId + " img").css('height').replace('px', '')) + 'px');
            $("#" + AttrButeId + " div span").css('background-color', '');
            $("#" + AttrButeId + " div span").css('color', '');
            $("#" + AttrButeId).css('height', 'auto');
        } else {
            $("#ImageList1").css("border", "");
            $("#ImageList2").css("border", "2px solid #41d8e1");
            $("#" + AttrButeId).attr("data-style", "ImageList2");
            $("#" + AttrButeId + " div").css('height', (parseInt($("#" + AttrButeId + " img").css('height').replace('px', '')) + 30) + 'px');
            $("#" + AttrButeId + " div img").css('height', parseInt($("#" + AttrButeId + " img").css('height').replace('px', '')) + 'px');
            $("#" + AttrButeId + " div span").css('background-color', '#FFFFFF');
            $("#" + AttrButeId + " div span").css('color', '#000000');
            $("#" + AttrButeId).css('height', 'auto');
        }
    }
    else if ($("#" + AttrButeId).attr("data-type") == "imgtext-list") {
        if (id == "ImageTextList2") {
            $("#ImageTextList2").css("border", "2px solid #41d8e1");
            $("#ImageTextList1").css("border", "");
            $("#" + AttrButeId).attr("data-style", "ImageTextList2");
            $("#" + AttrButeId + " .inner-content").css('height', '137px');
            $("#" + AttrButeId + " .inner-content .ImgText").css('width', '100%');
            $("#" + AttrButeId + " .inner-content .ImgText").css('height', '100px');
            $("#" + AttrButeId + " .inner-content .ImgText").css('margin-right', '');
            $("#" + AttrButeId + " .inner-content .title-container").css('margin-top', '');
            var len = $("#" + AttrButeId + "  .inner-content").length;
            var height = 0;
            for (var i = 0; i < len; i++) {
                height += parseInt($("#" + AttrButeId + " .inner-content")[i].style.height.replace("px", "")) + 5;
            }
            $("#" + AttrButeId).css("height", height + "px");
        } else {
            $("#ImageTextList2").css("border", "");
            $("#ImageTextList1").css("border", "2px solid #41d8e1");
            $("#" + AttrButeId).attr("data-style", "ImageTextList1");
            $("#" + AttrButeId + " .inner-content").css('height', '60px');
            $("#" + AttrButeId + " .inner-content .ImgText").css('width', '60px');
            $("#" + AttrButeId + " .inner-content .ImgText").css('height', '60px');
            $("#" + AttrButeId + " .inner-content .ImgText").css('margin-right', '6px');
            $("#" + AttrButeId + " .inner-content .title-container").css('margin-top', '10px');
            var len = $("#" + AttrButeId + " .inner-content").length;
            var height = 0;
            for (var i = 0; i < len; i++) {
                height += parseInt($("#" + AttrButeId + " .inner-content")[i].style.height.replace("px", "")) + 5;
            }
            $("#" + AttrButeId).css("height", height + "px");
        }
    }
}
function EditImgListRole() {
    var AttrButeId = $("#SetAttriButeId").val();
    if (parseInt($("#ColNum").val()) >= 2 && parseInt($("#ColNum").val()) <= 5) {
        var ImgWidth = ($("#" + AttrButeId)[0].offsetWidth - parseInt($("#setImgLeft").val()) * (parseInt($("#ColNum").val()) + 1)) / parseInt($("#ColNum").val()) - 1;
        if ($("#" + AttrButeId).attr("data-type") == "img-list") {
            $("#" + AttrButeId + " .inner-contents").css('width', ImgWidth + 'px');
            $("#" + AttrButeId + " .inner-contents .class_cover").css('width', (ImgWidth - 6) + 'px');
            var len = parseInt($("#RowNum").val()) * parseInt($("#ColNum").val());
            var lodlen = $("#" + AttrButeId + " .inner-contents").length;
            if (len - lodlen > 0) {
                len = len - lodlen;
                if (len > 0) {
                    layui.use('upload', function () {
                        upload = layui.upload;
                        var uploadFun = function (elem, imgid) {
                            upload.render({
                                elem: elem,
                                auto: false,
                                url: '',
                                choose: function (obj) {
                                    //将每次选择的文件追加到文件队列
                                    //预读本地文件示例，不支持ie8
                                    obj.preview(function (index, file, result) {
                                        if (imgid != "") {
                                            $(imgid).attr('src', result); //图片链接（base64)
                                        }
                                        var imglist;
                                        imglist = {
                                            "imgurl": result
                                        };
                                        imglist = JSON.stringify(imglist);
                                        UpdateImg(elem, imglist);
                                    });
                                },
                                done: function (res) {
                                },
                                before: function (obj) {
                                }
                            });
                        }
                        for (var i = 1; i <= len; i++) {
                            var num = (parseInt(index) + 1);
                            var datastyle = $("#" + AttrButeId).attr("data-style");
                            var imgstyle = $("#" + AttrButeId + " .inner-contents img").attr("style");
                            var spanstyle = $("#" + AttrButeId + " .inner-contents span").attr("style");
                            if (datastyle == "ImageList2") {
                                $("#" + AttrButeId).append("<div id='imglist" + num + "' class='inner-contents'  style='float:left;width:" + ImgWidth + "px;height:" + (parseInt($("#Imgheight").val()) + 20) + "px;position:relative;margin-bottom:" + $("#setImgHeight").val() + "px;margin-right: " + $("#setImgLeft").val() + "px;'><img src='images/face.jpg' style='" + imgstyle + "'><span class='class_cover' style='" + spanstyle + "' data-num='" + num + "'>标题</span></div>");
                                var objs = $("#" + AttrButeId);
                                if (len % 2 == 0) {
                                    objs.css('height', 'auto');
                                }
                            } else {
                                $("#" + AttrButeId).append("<div id='imglist" + num + "' class='inner-contents' style='float:left;width:" + ImgWidth + "px;position:relative;margin-bottom:" + $("#setImgHeight").val() + "px;margin-right: " + $("#setImgLeft").val() + "px;'><img src='images/face.jpg' style='" + imgstyle + "'><span class='class_cover' style='" + spanstyle + "' data-num='" + num + "'>标题</span></div>");
                                var objs = $("#" + AttrButeId);
                                if (len % 2 == 0) {
                                    objs.css('height', 'auto');
                                }
                            }
                            $("#UpImgShuXing").append("<div id='upimglistdiv" + num + "' class='layui-colla-item'><h2 class='layui-colla-title'>标题<i class='layui-icon layui-colla-icon'></i><i id='i" + num + "' class='layui-icon layui-icon-delete' style='position:absolute;right:10px;font-size:25px' onclick='DelImgList(this.id)'></i>   </h2><div class='layui-colla-content layui-form'><div class='layui-form-item'><label class='layui-form-label' style='width:30px'>标题</label><div class='layui-input-block' style='margin-left:60px'><input id='ImgListText" + num + "' type='text' name='btnText' lay-verify='btnText' onchange='EditImgListText(this.id)' autocomplete='off' placeholder='请输入文字' class='layui-input' value='标题' /></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 30px'>图片</label><div class='layui-input-block' style='margin-left: 60px'><image id='ImgListImg" + num + "' src='images/face.jpg' style='height: 60px; width: 60px; float: left'></image><label id='UpImageList" + num + "' class='layui-form-label' style='text-align: left; color: #efbf1f; float: left; margin-top: 34px; width: 56px;'>更改图片</label></div></div><div class='layui-form-item'><label class='layui-form-label' style='width: 42px;margin-left:-10px'>连接至</label><div class='layui-input-block' style='margin-left: 60px'><select id='ImgListSelect" + num + "' name='ImgListSelect" + num + "' lay-filter='ImgListSelect'><option value='' selected=''></option><option value='/pages/product/productDetail?id={{item.id}}'>商品详细</option><option value='/pages/news/newsDetail?id={{item.id}}'>新闻详细</option><option value='/pages/about/aboutDetail?id={{item.id}}'>关于详细</option></select></div></div></div></div>");
                            uploadFun('#UpImageList' + num, '#ImgListImg' + num);
                            index = num;
                        }
                    });
                    element.init();
                    form.render();
                }
            } else if (len - lodlen < 0) {
                len = lodlen - len;
                if (len > 0) {
                    for (var i = 1; i <= len; i++) {
                        $("#upimglistdiv" + $("#" + AttrButeId + " .inner-contents")[lodlen - i].id.replace("imglist", "")).remove();
                        $("#" + AttrButeId + " .inner-contents")[lodlen - i].remove();
                    }
                }
            }
        }
        $("#" + AttrButeId).attr("data-Row", $("#RowNum").val());
        $("#" + AttrButeId).attr("data-Col", $("#ColNum").val());
    }
}
function UpdateThisStyle(id) {
    $(".title-ele").css("border", "");
    $("#" + id).css("border", "2px solid #41d8e1");
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "title") {
        $("#" + AttrButeId).attr('mode', $("#" + id).attr("mode"));
        $("#" + AttrButeId).html("");
        var markclass;
        if ($("#" + id).attr("mode") == "0")
            markclass = "mark";
        if ($("#" + id).attr("mode") == "1")
            markclass = "mark1";
        if ($("#" + id).attr("mode") == "2")
            markclass = "mark2";
        if ($("#" + id).attr("mode") == "3")
            markclass = "mark3";
        $("#" + AttrButeId).html("<span class='title-text'><span class='" + markclass + "' style='background-color:" + $("#MarkColor").val() + ";'></span><span class='js-text'>" + $("#TitleText").val() + "</span></span><a href='#' data-ajax='false' style='position:absolute;right: 5px;'>更多&gt;&gt;</a><i class='drag'></i>");
        $("#" + AttrButeId).css("height", $("#MarkHeight").val() + "px");

        $("#" + AttrButeId + " .title-text").css('font-size', $("#TitleFontSize").val() + "px");
        $("#" + AttrButeId + " .js-text").css('font-size', $("#TitleFontSize").val() + "px");
        $("#" + AttrButeId + " a").css('font-size', $("#TitleFontSize").val() + "px");
        $("#" + AttrButeId).css("background-color", $("#MarkBgColor").val());
        $("#" + AttrButeId).css("line-height", $("#MarkHeight").val() + "px");
        $("#" + AttrButeId).css("border", "1px solid #c1c1c1");
    }
}
function SetMarkColor(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "title") {
        var markclass;
        if ($("#" + AttrButeId).attr('mode') == "0")
            markclass = "mark";
        if ($("#" + AttrButeId).attr('mode') == "1")
            markclass = "mark1";
        if ($("#" + AttrButeId).attr('mode') == "2")
            markclass = "mark2";
        if ($("#" + AttrButeId).attr('mode') == "3")
            markclass = "mark3";
        $("#" + AttrButeId + " ." + markclass).css("background-color", $("#MarkColor").val());
    }
}
function SavePageHtml() {
    var PageUpIndex = layer.load(1, { shade: [0.5, '#fff'] });
    if ($("#Htmlid").val() == "index") {
        $("#indextop").attr("data-style", $("#dropContent1").attr('style'));
        $("#indextop").html($("#dropContent1").html());
        $("#indexpage").attr("data-style", $("#dropContent2").attr('style'));
        $("#indexpage").html($("#dropContent2").html());
        $("#indexbottom").attr("data-style", $("#dropContent3").attr('style'));
        $("#indexbottom").html($("#dropContent3").html());
    }
    else if ($("#Htmlid").val() == "productList") {
        $("#productList").attr("data-style", $("#dropContent2").attr('style'));
        $("#productList").attr("PageHtml", $("#dropContent2").html());
    }
    else if ($("#Htmlid").val() == "newsList") {
        $("#newsList").attr("data-style", $("#dropContent2").attr('style'));
        $("#newsList").attr("PageHtml", $("#dropContent2").html());
    }
    else if ($("#Htmlid").val() == "aboutList") {
        $("#aboutList").attr("data-style", $("#dropContent2").attr('style'));
        $("#aboutList").attr("PageHtml", $("#dropContent2").html());
    }

    var MobanKey = getQueryString("key");
    var array = new Array();
    array.push({ "PageType": "indexTop", "PageContent": $("#indextop").html(), "PageStyle": $("#indextop").attr("data-style") });
    array.push({ "PageType": "indexPage", "PageContent": $("#indexpage").html(), "PageStyle": $("#indexpage").attr("data-style") });
    array.push({ "PageType": "indexBottom", "PageContent": $("#indexbottom").html(), "PageStyle": $("#indexbottom").attr("data-style") });
    array.push({ "PageType": "productList", "PageContent": $("#productList").attr("PageHtml"), "PageStyle": "" });
    array.push({ "PageType": "newsList", "PageContent": $("#newsList").attr("PageHtml"), "PageStyle": "" });
    array.push({ "PageType": "aboutList", "PageContent": $("#aboutList").attr("PageHtml"), "PageStyle": "" });
    array = JSON.stringify(array);
    $.ajax({
        url: "Handler/order.ashx?pageType=SaveMiniPage",
        type: "post",
        dataType: "text",
        data: { "MiniGUID": MobanKey, "TemplatePage": array },
        success: function (data) {
        },
        error: function (e) {
        }
    });
    $.ajax({
        url: "Handler/order.ashx?pageType=SetHtmlPageIndex",
        type: "post",
        dataType: "text",
        data: { "MobanKey": MobanKey, "ImgBottomIndex": ImgBottomIndex, "ImgIndex": ImgIndex, "ImgTextIndex": ImgTextIndex, "TextIndex": TextIndex, "drapindex": drapindex, "index": index },
        success: function (data) {
            layer.msg("保存成功!", function () { layer.close(PageUpIndex); parent.location.reload(); });
        },
        error: function (e) {
            layer.close(PageUpIndex);
        }
    });
}
function PageUp() {
    var PageUpIndex = layer.load(1, { shade: [0.5, '#fff'] });
    var MobanKey = getQueryString("GroupGuid");
    var array = new Array();
    if ($("#Htmlid").val() == "index") {
        $("#indextop").attr("data-style", $("#dropContent1").attr('style'));
        $("#indextop").html($("#dropContent1").html());
        $("#indexpage").attr("data-style", $("#dropContent2").attr('style'));
        $("#indexpage").html($("#dropContent2").html());
        $("#indexbottom").attr("data-style", $("#dropContent3").attr('style'));
        $("#indexbottom").html($("#dropContent3").html());
        $("#index").attr("htmlcode", $("#dropContent2").html());
    }
    else {
        $("#" + $("#Htmlid").val()).attr("data-style", $("#dropContent2").attr('style'));
        $("#" + $("#Htmlid").val()).attr("PageHtml", $("#dropContent2").html());
        $("#" + $("#Htmlid").val()).attr("htmlcode", $("#dropContent2").html());
    }
    $("#" + $("#Htmlid").val()).attr("data-style", $("#dropContent2").attr('style'));
    $("#" + $("#Htmlid").val()).attr("PageHtml", $("#dropContent2").html());
    $("#" + $("#Htmlid").val()).attr("htmlcode", $("#dropContent2").html());
    $(".page_title").each(function (index, element) {
        if (element.id == "index") {
            array.push({ "PageType": "indexTop", "PageContent": $("#indextop").html(), "PageStyle": $("#indextop").attr("data-style") });
            array.push({ "PageType": "indexPage", "PageContent": $("#indexpage").html(), "PageStyle": $("#indexpage").attr("data-style") });
            array.push({ "PageType": "indexBottom", "PageContent": $("#indexbottom").html(), "PageStyle": $("#indexbottom").attr("data-style") });
        }
        else {
            array.push({ "PageType": element.id, "PageContent": $("#" + element.id).attr("htmlcode"), "PageStyle": "" });
        }
    });
    array = JSON.stringify(array);
    var MobanKey = getQueryString("GroupGuid");
    $.ajax({
        url: "Handler/order.ashx?pageType=SaveMiniPage",
        type: "post",
        async: false,
        dataType: "text",
        data: { "MiniGUID": MobanKey, "TemplatePage": array },
        success: function (data) {
        },
        error: function (e) {
        }
    });
    $(".dragableBoxs").css("width", "99%");
    if ($("#Htmlid").val() == "index") {
        $("#indexpage").attr("data-style", $("#dropContent2").attr('style'));
        $("#indexpage").attr("htmlcode", $("#dropContent2").html());
        $("#index").attr("htmlcode", $("#dropContent2").html());
    }
    else {
        $("#" + $("#Htmlid").val()).attr("data-style", $("#dropContent2").attr('style'));
        $("#" + $("#Htmlid").val()).attr("htmlcode", $("#dropContent2").html());
    }
    if (isNaN(drapindex))
        drapindex = 0;
    if (isNaN(index))
        index = 0;
    if (isNaN(TextIndex))
        TextIndex = 0;
    if (isNaN(ImgIndex))
        ImgIndex = 0;
    if (isNaN(ImgTextIndex))
        ImgTextIndex = 0;
    if (isNaN(ImgBottomIndex))
        ImgBottomIndex = 0;
    $.ajax({
        url: "Handler/order.ashx?pageType=SetHtmlPageIndex",
        type: "post",
        async: false,
        dataType: "text",
        data: { "MobanKey": MobanKey, "ImgBottomIndex": ImgBottomIndex, "ImgIndex": ImgIndex, "ImgTextIndex": ImgTextIndex, "TextIndex": TextIndex, "drapindex": drapindex, "index": index },
        success: function (data) {
        },
        error: function (e) {
        }
    });
    var bgDiv = $(".bgDiv");
    var Topcon = $("#dropContent1");
    var Indexcon = $("#dropContent2");
    var Bottomcon = $("#dropContent3");
    var pagejson = new Array();
    var num = 0;
    $(".leftNav").html("");
    $(".page_title").each(function (index, element) {
        if (element.id == "index") {
            $(".leftNav").append("<span id=\"NavSpan" + (num + 1) + "\" class=\"span\" data-href=\"HomePage.html\">首页</span>");
        }
        else {
            $(".leftNav").append("<span id=\"NavSpan" + (num + 1) + "\" class=\"span\" data-href=\"" + element.id + ".html\">" + $("#" + element.id).attr("HtmlTitle") + "</span>");
        }
        num++;
    });
    $(".page_title").each(function (index, element) {
        if (element.id == "index") {
            $("#indexbottom DelBottomdiv").remove();
            pagejson.push({ "HtmlName": "Main", "HtmlTitle": "首页", "HtmlContent": $("#indextop .con").html(), "HtmlAuthor": $(".leftNav").html(), "HtmlBottom": $("#indexbottom").html() });
            pagejson.push({ "HtmlName": "HomePage", "HtmlTitle": "首页", "HtmlContent": $("#" + element.id).attr("htmlcode").replace(/width:910px/g, 'width:99%'), "HtmlAuthor": "", "HtmlBottom": "" });
        } else {
            pagejson.push({ "HtmlName": element.id, "HtmlTitle": $("#" + element.id).attr("HtmlTitle"), "HtmlContent": $("#" + element.id).attr("htmlcode").replace(/width:910px/g, 'width:99%'), "HtmlAuthor": "", "HtmlBottom": "" });
        }
    });
    pagejson = JSON.stringify(pagejson);
    $.ajax({
        url: "Handler/HtmlHandler.ashx?doType=GeneratingWebPages",
        type: "post",
        async: false,
        dataType: "text",
        data: { "pagejson": pagejson },
        success: function (data) {
            if (data != "") {
                try {
                    var elemIF = document.createElement("iframe");
                    elemIF.src = data;
                    elemIF.style.display = "none";

                    var index = parent.layer.getFrameIndex(window.name);
                    setTimeout(function () {
                        parent.layer.close(index); parent.document.body.appendChild(elemIF);
                    }, 2000);
                } catch (e) {
                    layer.close(PageUpIndex);
                }
            } else {
                layer.close(PageUpIndex);
                layer.alert("失败！");
            }
        },
        error: function (e) {
        }
    });
    layer.close(PageUpIndex);
}
function SetMarkBgColor(id) {
    var AttrButeId = $("#SetAttriButeId").val();
    if ($("#" + AttrButeId).attr("data-type") == "title") {
        $("#" + AttrButeId).css("background-color", $("#MarkBgColor").val());
    }
    else if ($("#" + AttrButeId).attr("data-type") == "text-list") {
        $("#" + AttrButeId + " p").css("background-color", $("#TextListBgColor").val());
    }
    else if ($("#" + AttrButeId).attr("data-type") == "top") {
        $("#IndexTopId").css("background-color", $("#TopBgColor").val());
        $("#IndexBottomId").css("background-color", $("#TopBgColor").val());
    }
    else if ($("#" + AttrButeId).attr("data-type") == "bottom") {
        $("#IndexTopId").css("background-color", $("#BottomBgColor").val());
        $("#IndexBottomId").css("background-color", $("#BottomBgColor").val());
    }
}
function OpenMoban() {
    layer.open({
        type: 2,
        title: '选择模板',
        closeBtn: 1, //不显示关闭按钮
        shade: [0.3],
        area: ['415px', '750px'],
        offset: 'r', //右下角弹出
        anim: 2,
        content: ['page/template/select_template.html', 'yes'], //iframe的url，no代表不显示滚动条
        cancel: function () {
            //右上角关闭回调
        }
    });
}
function setRel(rel) {
    var layuiindex = layer.load(1, { shade: [0.1, '#fff'] });
    $.ajax({
        url: "Handler/Order.ashx?pageType=GetTemplatePage",
        type: "post",
        dataType: "json",
        async: true,
        data: { "MobanKey": rel },
        success: function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    var PageType = data[i].PageType;
                    switch (PageType) {
                        case "indexTop":
                            if (data[i].PageContent != null) {
                                $("#indextop").html(data[i].PageContent);
                            } else {
                                $("#indextop").html("");
                            }
                            if (data[i].PageStyle != null) {
                                $("#indextop").attr('data-style', data[i].PageStyle);
                            } else {
                                $("#indextop").attr('data-style', 'width: 100%; border: 0px; overflow: hidden; height: 100px; display: none; font-size: 40px; text-align: center;');
                            }
                            $("#dropContent1").attr('style', $("#indextop").attr("data-style"));
                            $("#dropContent1").html($("#indextop").html());
                            $("#indextop").html("");
                            break;
                        case "indexPage":
                            if (data[i].PageContent != null) {
                                $("#indexpage").html(data[i].PageContent);
                            } else {
                                $("#indexpage").html("");
                            }
                            if (data[i].PageStyle != null) {
                                $("#indexpage").attr('data-style', data[i].PageStyle);
                            } else {
                                $("#indexpage").attr('data-style', 'width: 100%; border: 0px; overflow-y: auto; overflow-x: hidden; height: 750px;');
                            }
                            $("#dropContent2").attr('style', $("#indexpage").attr("data-style"));
                            $("#dropContent2").html($("#indexpage").html());
                            $("#indexpage").html("");
                            break;
                        case "indexBottom":
                            if (data[i].PageContent != null) {
                                $("#indexbottom").html(data[i].PageContent);
                            } else {
                                $("#indexbottom").html("");
                            }
                            if (data[i].PageStyle != null) {
                                $("#indexbottom").attr('data-style', data[i].PageStyle);
                            } else {
                                $("#indexbottom").attr('data-style', 'width: 100%; margin-top: 0; border-bottom: 0; overflow: hidden; height: 100px; display: none');
                            }
                            $("#dropContent3").attr('style', $("#indexbottom").attr("data-style"));
                            $("#dropContent3").html($("#indexbottom").html());
                            $("#indexbottom").html("");
                            break;
                        case "productList":
                            if (data[i].PageContent != null) {
                                $("#productList").attr('PageHtml', data[i].PageContent);
                            } else {
                                $("#productList").html("");
                            }
                            break;
                        case "newsList":
                            if (data[i].PageContent != null) {
                                $("#newsList").attr('PageHtml', data[i].PageContent);
                            } else {
                                $("#newsList").html("");
                            }
                            break;
                        case "aboutList":
                            if (data[i].PageContent != null) {
                                $("#aboutList").attr('PageHtml', data[i].PageContent);
                            } else {
                                $("#aboutList").html("");
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        error: function (e) {
        }
    });
    $.ajax({
        url: "Handler/Order.ashx?pageType=GetHtmlPageIndex",
        type: "post",
        dataType: "json",
        async: true,
        data: { "MobanKey": rel },
        success: function (data) {
            if (data != null) {
                if (data.drapindex != null)
                    drapindex = data.drapindex;
                if (data.Indexs != null)
                    index = data.Indexs;
                if (data.TextIndex != null)
                    TextIndex = data.TextIndex;
                if (data.ImgIndex != null)
                    ImgIndex = data.ImgIndex;
                if (data.ImgTextIndex != null)
                    ImgTextIndex = data.ImgTextIndex;
                if (data.ImgBottomIndex != null)
                    ImgBottomIndex = data.ImgBottomIndex;
            }
        },
        error: function (e) {
        }
    });
    $("#dropContent1").html("");
    $("#dropContent2").html("");
    $("#dropContent3").html("");
    $("#dropContent1").attr("style", "width: 100%; border: 0; overflow: hidden; height: 100px; display: none");
    $("#dropContent2").attr("style", "width: 100%; border: 0; overflow-y: scroll; overflow-x: hidden;");
    $("#dropContent3").attr("style", "width: 100%; margin-top: 0; border-bottom: 0; overflow: hidden; height: 100px; display: none");
    $("#box8").css('display', 'block');
    $("#box9").css('display', 'block');
    $("#zjk").css('visibility', '');
    $("#rightlist").css('display', 'none');
    $(".page_title").css("color", "#6d6d6d");
    $(".page_hit").remove();
    $("#index").css("color", "#ff5a00").append("<span class=\"page_hit\">正在编辑中...</span>");
    $("#Htmlid").val("index");
    layer.close(layuiindex);
}
function ClickPage(obj) {
    $("#box8").css('display', 'none');
    $("#box9").css('display', 'none');
    $("#zjk").css('visibility', '');
    $("#rightlist").css('display', 'none');
    $(".page_title").css("color", "#6d6d6d");
    $(".page_hit").remove();
    $("#" + obj).css("color", "#ff5a00").append("<span class=\"page_hit\">正在编辑中...</span>");
    if ($("#Htmlid").val() == "") {
        $("#Htmlid").val(obj);
    } else {
        if ($("#Htmlid").val() == "index") {
            $("#indextop").attr("data-style", $("#dropContent1").attr('style'));
            $("#indextop").html($("#dropContent1").html());
            $("#indexpage").attr("data-style", $("#dropContent2").attr('style'));
            $("#indexpage").html($("#dropContent2").html());
            $("#indexbottom").attr("data-style", $("#dropContent3").attr('style'));
            $("#indexbottom").html($("#dropContent3").html());
            $("#index").attr("htmlcode", $("#dropContent2").html());
        }
        else {
            $("#" + $("#Htmlid").val()).attr("data-style", $("#dropContent2").attr('style'));
            $("#" + $("#Htmlid").val()).attr("PageHtml", $("#dropContent2").html());
            $("#" + $("#Htmlid").val()).attr("htmlcode", $("#dropContent2").html());
        }
        $("#Htmlid").val(obj);
    }
    $("#dropContent1").html("");
    $("#dropContent2").html("");
    $("#dropContent3").html("");
    $("#dropContent1").attr("style", "width: 100%; border: 0; overflow: hidden; height: 100px; display: none;");
    $("#dropContent2").attr("style", "width: 100%; height:750px;border: 0; overflow-y: auto; overflow-x: hidden;");
    $("#dropContent3").attr("style", "width: 100%; margin-top: 0; border-bottom: 0; overflow: hidden; height: 100px; display: none;");
    if (obj == "index") {
        $("#box8").css('display', 'block');
        $("#box9").css('display', 'block');
        if ($("#indextop").html() != "" && $("#indextop").html() != null && $("#indextop").html() != undefined && $("#indextop").html().replace(/[\r\n]/g, "") != "&nbsp;") {
            $("#dropContent1").attr('style', $("#indextop").attr("data-style"));
            $("#dropContent1").html($("#indextop").html());
            $("#indextop").html("");
        }
        if ($("#indexpage").html() != "" && $("#indexpage").html() != null && $("#indexpage").html() != undefined && $("#indexpage").html().replace(/[\r\n]/g, "") != "&nbsp;") {
            $("#dropContent2").attr('style', $("#indexpage").attr("data-style"));
            $("#dropContent2").html($("#indexpage").html());
            $("#indexpage").html("");
        }
        if ($("#indexbottom").html() != "" && $("#indexbottom").html() != null && $("#indexbottom").html() != undefined && $("#indexbottom").html().replace(/[\r\n]/g, "") != "&nbsp;") {
            $("#dropContent3").attr('style', $("#indexbottom").attr("data-style"));
            $("#dropContent3").html($("#indexbottom").html());
            $("#indexbottom").html("");
        }
    }
    else {
        if ($("#" + obj).attr("PageHtml") != null && $("#" + obj).attr("PageHtml") != undefined && $("#" + obj).attr("PageHtml").replace(/[\r\n]/g, "") != "") {
            $("#dropContent2").attr('style', $("#" + obj).attr("data-style"));
            $("#dropContent2").html($("#" + obj).attr("PageHtml"));
            $("#" + obj).attr("PageHtml", "");
        }
    }
    swiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
    element.init();
    form.render();
}
function AddHtml() {
    var GroupGuid = getQueryString("GroupGuid");
    layer.prompt({ title: '请输入页面名称', formType: 2 }, function (text, index) {
        var appid = '20180719000186783';
        var key = 'D_TfSu02nXHlk6alVehR';
        var salt = (new Date).getTime();
        var query = text;
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var from = 'zh';
        var to = 'en';
        var str1 = appid + query + salt + key;
        var sign = MD5(str1);
        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function (data) {
                $.ajax({
                    url: "Handler/HtmlHandler.ashx?doType=AddHtml",
                    type: "post",
                    async: false,
                    dataType: "json",
                    data: { "TitleZnName": text, "TitleEnName": data.trans_result[0].dst, "GroupGuid": GroupGuid },
                    success: function (data) {
                        $("#htmldemo").append("<a href='javacript:void(0);' onclick=\"ClickPage('" + data[0].TitleEnName + "')\"><li id='" + data[0].TitleEnName + "' class='page_title' HtmlGuid='" + data[0].Guid + "' page-type='detail' page-path='pages/contact' HtmlCode='" + data[0].HtmlCode + "' HtmlTitle='" + data[0].TitleZnName + "' onmouseover='SetMouseUpSpan(this.id)' onmouseout='SetMouseOutSpan(this.id)'>" + data[0].TitleZnName + "<span class='DeleteSpan' style='position: absolute;right: 0px;background-color:#A7A7A9;width: 60px;text-align:  center;color: white;display:none' onclick='DeleteMouse(this)'>删除</span></li></a>");
                        $(".ListSelect").append("<option value=" + data[0].TitleEnName + ">" + data[0].TitleZnName + "</option>");
                        form.render();;//表单重新渲染，要不然添加完显示不出来新的option
                        layer.close(index);
                    },
                    error: function (e) {
                    }
                });
            }
        });
    });
}
$('.progress_btn').mousedown(function (e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function () {
    tag = false;
});
var progress_width = $('.progress').width();
$('.progress').mousemove(function (e) {
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        } else if (left > progress_width) {
            left = progress_width;
        }
        $('.progress_btn').css('left', left);
        $('.progress_bar').width(left);
        $('.text').html(parseInt((left / progress_width) * 100) + '%');
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "button") {
            var obj = $("#" + AttrButeId + " button");
            obj[0].style.opacity = parseInt((left / progress_width) * 100) / 100;
        } else if ($("#" + AttrButeId).attr("data-type") == "img") {
            var obj = $("#" + AttrButeId + " img");
            obj[0].style.opacity = parseInt((left / progress_width) * 100) / 100;
        }
    }
});
$('.progress_bg').click(function (e) {
    if (!tag) {
        bgleft = $('.progress_bg').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        } else if (left > progress_width) {
            left = progress_width;
        }
        $('.progress_btn').css('left', left);
        $('.progress_bar').animate({ width: left }, progress_width);
        $('.text').html(parseInt((left / progress_width) * 100) + '%');
        var AttrButeId = $("#SetAttriButeId").val();
        if ($("#" + AttrButeId).attr("data-type") == "button") {
            var obj = $("#" + AttrButeId + " button");
            obj[0].style.opacity = parseInt((left / progress_width) * 100) / 100;
        }
        else if ($("#" + AttrButeId).attr("data-type") == "img") {
            var obj = $("#" + AttrButeId + " img");
            obj[0].style.opacity = parseInt((left / progress_width) * 100) / 100;
        }
    }
});
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
$(window).load(function () {
    var MobanKey = getQueryString("GroupGuid");
    $.ajax({
        url: "Handler/Order.ashx?pageType=SetHtmlPage",
        type: "post",
        dataType: "json",
        async: false,
        data: { "MobanKey": MobanKey },
        success: function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    var PageType = data[i].PageType;
                    switch (PageType) {
                        case "indexTop":
                            if (data[i].PageContent != null && data[i].PageContent != undefined) {
                                $("#indextop").html(data[i].PageContent);
                            }
                            if (data[i].PageStyle != null && data[i].PageStyle != undefined) {
                                $("#indextop").attr('data-style', data[i].PageStyle);
                            }
                            break;
                        case "indexPage":
                            if (data[i].PageContent != null && data[i].PageContent != undefined) {
                                $("#indexpage").html(data[i].PageContent);
                            }
                            if (data[i].PageStyle != null && data[i].PageStyle != undefined) {
                                $("#indexpage").attr('data-style', data[i].PageStyle);
                            }
                            break;
                        case "indexBottom":
                            if (data[i].PageContent != null && data[i].PageContent != undefined) {
                                $("#indexbottom").html(data[i].PageContent);
                            }
                            if (data[i].PageStyle != null && data[i].PageStyle != undefined) {
                                $("#indexbottom").attr('data-style', data[i].PageStyle);
                            }
                            break;
                        default:
                            $("#" + PageType).attr("PageHtml", data[i].PageContent);
                            $("#" + PageType).attr("htmlcode", data[i].PageContent);
                            break;
                    }
                }
            }
        },
        error: function (e) {
            layer.close(layuiindex);
        }
    });

    $.ajax({
        url: "Handler/Order.ashx?pageType=GetHtmlPageIndex",
        type: "post",
        dataType: "json",
        async: false,
        data: { "MobanKey": MobanKey },
        success: function (data) {
            if (data != null) {
                if (data.drapindex != null)
                    drapindex = parseInt(data.drapindex);
                if (data.Indexs != null)
                    index = parseInt(data.Indexs);
                if (data.TextIndex != null)
                    TextIndex = parseInt(data.TextIndex);
                if (data.ImgIndex != null)
                    ImgIndex = parseInt(data.ImgIndex);
                if (data.ImgTextIndex != null)
                    ImgTextIndex = parseInt(data.ImgTextIndex);
                if (data.ImgBottomIndex != null)
                    ImgBottomIndex = parseInt(data.ImgBottomIndex);
            }
        },
        error: function (e) {
            layer.close(layuiindex);
        }
    });
    if (isNaN(drapindex))
        drapindex = 0;
    if (isNaN(index))
        index = 0;
    if (isNaN(TextIndex))
        TextIndex = 0;
    if (isNaN(ImgIndex))
        ImgIndex = 0;
    if (isNaN(ImgTextIndex))
        ImgTextIndex = 0;
    if (isNaN(ImgBottomIndex))
        ImgBottomIndex = 0;
    layer.close(layuiindex);
});
function SetMouseUpSpan(id) {
    $("#" + id).find('.DeleteSpan').css('display', 'inline-block');
}
function SetMouseOutSpan(id) {
    $("#" + id).find('.DeleteSpan').css('display', 'none');
}
function DeleteMouse(obj) {
    layer.confirm('是否需要删除？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var object = obj.parentElement.parentElement;
        object.remove();
        var ject = obj.parentElement;
        $.ajax({
            url: "Handler/HtmlHandler.ashx?doType=DelGroupHtml",
            type: "post",
            dataType: "json",
            async: false,
            data: { "MobanKey": MobanKey, "TitleEnName": ject.id },
            success: function (data) {
                if (data != null) {
                    if (data.result == "true") {
                        layer.msg('删除成功', { icon: 1 });
                    }
                    else {
                        layer.msg('删除失败', { icon: 2 });
                    }
                }
            },
            error: function (e) {
                layer.close(layuiindex);
            }
        });
    }, function () {
    });
}