(function (a) {
    a.paramquery = (a.paramquery == null) ? {} : a.paramquery;
    a.paramquery.xmlToArray = function (d, e) {
        var c = e.itemParent;
        var g = e.itemNames;
        var b = [];
        var f = a(d).find(c);
        f.each(function (k, l) {
            var j = a(l);
            var h = [];
            a(g).each(function (i, m) {
                h.push(j.find(m).text())
            });
            b.push(h)
        });
        return b
    };
    a.paramquery.tableToArray = function (h) {
        var i = a(h);
        var c = [];
        var f = [];
        var g = [];
        var e = [];
        var b = i.find("tr:first");
        var d = i.find("tr:eq(1)");
        b.find("th,td").each(function (p, m) {
            var j = a(m);
            var r = j.html();
            var k = j.width();
            var s = "string";
            var n = d.find("td:eq(" + p + ")");
            var l = n.text();
            var q = n.attr("align");
            l = l.replace(/,/g, "");
            if (parseInt(l) == l && (parseInt(l) + "").length == l.length) {
                s = "integer"
            } else {
                if (parseFloat(l) == l) {
                    s = "float"
                }
            }
            var o = {
                title: r,
                width: k,
                dataType: s,
                align: q,
                dataIndx: p
            };
            c.push(o)
        });
        i.find("tr").each(function (k, m) {
            if (k == 0) {
                return
            }
            var l = a(m);
            var j = [];
            l.find("td").each(function (n, o) {
                j.push(a.trim(a(o).html()))
            });
            f.push(j)
        });
        return {
            data: f,
            colModel: c
        }
    };
    a.paramquery.formatCurrency = function (h) {
        h = Math.round(h * 10) / 10;
        h = h + "";
        if (h.indexOf(".") == -1) {
            h = h + ".0"
        }
        var c = h.length;
        var e = h.substring(0, c - 2),
            g = h.substring(c - 2, c),
            b = e.match(/\d/g).reverse(),
            d = [];
        for (var f = 0; f < b.length; f++) {
            if (f > 0 && f % 3 == 0) {
                d.push(",")
            }
            d.push(b[f])
        }
        d = d.reverse();
        e = d.join("");
        return e + g
    }
})(jQuery); (function (b) {
    var a = {};
    a.options = {
        currentPage: 0,
        totalPages: 0,
        totalRecords: 0,
        msg: "",
        rPPOptions: [10, 15, 20, 30, 40, 50, 100],
        rPP: 15
    };
    a._regional = {
        strPage: "第 {0} 页 / 共 {1} 页",
        strFirstPage: "第一页",
        strPrevPage: "上一页",
        strNextPage: "下一页",
        strLastPage: "尾页",
        strRefresh: "刷新",
        strRpp: "每页记录:",
        strDisplay: "检索到 {2} 条记录，显示 第 {0} 条 - 第 {1} 条"
    };
    b.extend(a.options, a._regional);
    a._create = function () {
        var d = this,
            c = this.options;
        this.element.addClass("pq-pager").css({});
        this.first = b("<button type='button' title='" + this.options.strFirstPage + "'></button>", {}).appendTo(this.element).button({
            icons: {
                primary: "pq-page-first"
            },
            text: false
        }).bind("click.paramquery",
            function (e) {
                if (d.options.currentPage > 1) {
                    if (d._trigger("change", e, {
                        curPage: 1
                    }) !== false) {
                        d.option({
                            currentPage: 1
                        })
                    }
                }
            });
        this.prev = b("<button type='button' title='" + this.options.strPrevPage + "'></button>").appendTo(this.element).button({
            icons: {
                primary: "pq-page-prev"
            },
            text: false
        }).bind("click",
            function (e) {
                if (d.options.currentPage > 1) {
                    var f = d.options.currentPage - 1;
                    if (d._trigger("change", e, {
                        curPage: f
                    }) !== false) {
                        d.option({
                            currentPage: f
                        })
                    }
                }
            });
        b("<span class='pq-separator'></span>").appendTo(this.element);
        this.pagePlaceHolder = b("<span class='pq-pageholder'></span>").appendTo(this.element);
        b("<span class='pq-separator'></span>").appendTo(this.element);
        this.next = b("<button type='button' title='" + this.options.strNextPage + "'></button>").appendTo(this.element).button({
            icons: {
                primary: "pq-page-next"
            },
            text: false
        }).bind("click",
            function (e) {
                var f = d.options.currentPage + 1;
                if (d._trigger("change", e, {
                    curPage: f
                }) !== false) {
                    d.option({
                        currentPage: f
                    })
                }
            });
        this.last = b("<button type='button' title='" + this.options.strLastPage + "'></button>").appendTo(this.element).button({
            icons: {
                primary: "pq-page-last"
            },
            text: false
        }).bind("click",
            function (e) {
                var f = d.options.totalPages;
                if (d._trigger("change", e, {
                    curPage: f
                }) !== false) {
                    d.option({
                        currentPage: f
                    })
                }
            });
        b("<span class='pq-separator'></span>").appendTo(this.element);
        this.$strRpp = b("<span>" + this.options.strRpp + " </span>").appendTo(this.element);
        this.$rPP = b("<select></select>").appendTo(this.element).change(function (e) {
            var f = b(this).val();
            if (d._trigger("change", e, {
                rPP: f
            }) !== false) {
                d.options.rPP = f
            }
        });
        b("<span class='pq-separator'></span>").appendTo(this.element);
        this.$refresh = b("<button type='button' title='" + this.options.strRefresh + "'></button>").appendTo(this.element).button({
            icons: {
                primary: "pq-refresh"
            },
            text: false
        }).bind("click",
            function (e) {
                if (d._trigger("refresh", e) !== false) { }
            });
        b("<span class='pq-separator'></span>").appendTo(this.element);
        this.$msg = b("<span class='pq-pager-msg'></span>").appendTo(this.element);
        this._refresh()
    };
    a._refreshPage = function () {
        var d = this;
        this.pagePlaceHolder.empty();
        var g = this.options.strPage;
        var c = g.split(" ");
        var f = "";
        b(c).each(function (h, j) {
            f += "<span>" + j + "</span>"
        });
        g = f.replace("<span>{0}</span>", "<span class='textbox'></span>");
        g = g.replace("<span>{1}</span>", "<span class='total'></span>");
        var e = b(g).appendTo(this.pagePlaceHolder);
        this.page = b("<input type='text' tabindex='0' />").replaceAll("span.textbox", e).bind("change",
            function (h) {
                var i = b(this);
                var j = i.val();
                if (isNaN(j) || j < 1) {
                    i.val(d.options.currentPage);
                    return false
                }
                j = parseInt(j);
                if (j > d.options.totalPages) {
                    i.val(d.options.currentPage);
                    return false
                }
                if (d._trigger("change", h, {
                    curPage: j
                }) !== false) {
                    d.option({
                        currentPage: j
                    })
                } else {
                    i.val(d.options.currentPage);
                    return false
                }
            });
        this.$total = e.filter("span.total")
    };
    a._refresh = function () {
        this._refreshPage();
        var e = (this.$rPP);
        var l = this.options;
        this.$strRpp.text(l.strRpp);
        this.first.attr("title", l.strFirstPage);
        this.prev.attr("title", l.strPrevPage);
        this.next.attr("title", l.strNextPage);
        this.last.attr("title", l.strLastPage);
        this.$refresh.attr("title", l.strRefresh);
        e.empty();
        var c = this.options.rPPOptions;
        for (var g = 0; g < c.length; g++) {
            var d = document.createElement("option");
            d.text = c[g];
            d.value = c[g];
            d.setAttribute("value", c[g]);
            d.innerHTML = c[g];
            e.append(d)
        }
        e.find("option[value=" + this.options.rPP + "]").attr("selected", true);
        if (this.options.currentPage >= this.options.totalPages) {
            this.next.button({
                disabled: true
            });
            this.last.button({
                disabled: true
            })
        } else {
            this.next.button({
                disabled: false
            });
            this.last.button({
                disabled: false
            })
        }
        if (this.options.currentPage <= 1) {
            this.first.button({
                disabled: true
            });
            this.prev.button({
                disabled: true
            })
        } else {
            this.first.button({
                disabled: false
            });
            this.prev.button({
                disabled: false
            })
        }
        this.page.val(this.options.currentPage);
        this.$total.text(this.options.totalPages);
        if (this.options.totalRecords > 0) {
            var h = this.options.rPP;
            var j = this.options.currentPage;
            var k = this.options.totalRecords;
            var n = (j - 1) * h;
            var m = j * h;
            if (m > k) {
                m = k
            }
            var f = this.options.strDisplay;
            f = f.replace("{0}", n + 1);
            f = f.replace("{1}", m);
            f = f.replace("{2}", k);
            this.$msg.html(f)
        } else {
            this.$msg.html("")
        }
    };
    a._destroy = function () {
        this.element.empty().removeClass("pq-pager").enableSelection()
    };
    a._setOption = function (c, d) {
        if (c == "currentPage" || c == "totalPages") {
            d = parseInt(d)
        }
        b.Widget.prototype._setOption.call(this, c, d)
    };
    a._setOptions = function () {
        b.Widget.prototype._setOptions.apply(this, arguments);
        this._refresh()
    };
    b.widget("paramquery.pqPager", a);
    b.paramquery.pqPager.regional = {};
    b.paramquery.pqPager.regional.en = a._regional;
    b.paramquery.pqPager.setDefaults = function (d) {
        for (var c in d) {
            a.options[c] = d[c]
        }
        b.widget("paramquery.pqPager", a);
        b(".pq-pager").each(function (f, e) {
            b(e).pqPager("option", d)
        })
    }
})(jQuery); (function (b) {
    var a = {};
    a.options = {
        length: 200,
        num_eles: 3,
        cur_pos: 0,
        timeout: 350,
        pace: "optimum",
        direction: "vertical"
    };
    a._destroy = function () {
        this.element.removeClass("pq-scrollbar-vert").enableSelection().removeClass("pq-scrollbar-horiz").unbind("click.pq-scrollbar").empty();
        this.element.removeData()
    };
    a._create = function () {
        this.length = this.options.length;
        this.direction = this.options.direction;
        this.num_eles = this.options.num_eles;
        var e = this;
        var f = this.element.empty();
        if (this.direction == "vertical") {
            f.addClass("pq-scrollbar-vert");
            f.html("<div class='top-btn pq-sb-btn'></div>			<div class='pq-sb-slider'>				<div class='vert-slider-top'></div>				<div class='vert-slider-bg'></div>				<div class='vert-slider-center'></div>				<div class='vert-slider-bg'></div>				<div class='vert-slider-bottom'></div>			</div>		<div class='bottom-btn pq-sb-btn'></div>")
        } else {
            f.addClass("pq-scrollbar-horiz");
            f.width(this.width);
            f.html("<div class='left-btn pq-sb-btn'></div>			<div class='pq-sb-slider pq-sb-slider-h'>				<span class='horiz-slider-left'></span><span class='horiz-slider-bg'></span><span class='horiz-slider-center'></span><span class='horiz-slider-bg'></span><span class='horiz-slider-right'></span>			</div>		<div class='right-btn pq-sb-btn'></div>")
        }
        this.element.disableSelection().bind("click.pq-scrollbar",
            function (i) {
                if (e.options.disabled) {
                    return
                }
                if (e.$slider.is(":hidden")) {
                    return
                }
                if (e.direction == "vertical") {
                    var n = i.pageY;
                    var l = e.element.offset().top;
                    var k = l + e.length;
                    var h = e.$slider.offset().top;
                    var j = h + e.$slider.height();
                    if (n < h && n > l + 17) {
                        var o = n - l;
                        e.$slider.css("top", o);
                        e._updateCurPosAndTrigger(i)
                    } else {
                        if (n > j && n < k - 17) {
                            e.$slider.css("top", n - l - e.$slider.height());
                            e._updateCurPosAndTrigger(i)
                        }
                    }
                } else {
                    var m = i.pageX;
                    var h = e.$slider.offset().left;
                    var j = h + e.$slider.width();
                    if (m < h) {
                        e.$slider.css("left", m - e.element.offset().left);
                        e._updateCurPosAndTrigger(i)
                    } else {
                        if (m > j) {
                            e.$slider.css("left", m - e.element.offset().left - e.$slider.width());
                            e._updateCurPosAndTrigger(i)
                        }
                    }
                }
            });
        var d = "x";
        if (this.direction == "vertical") {
            d = "y"
        }
        this.$slider = b("div.pq-sb-slider", this.element).draggable({
            axis: d,
            helper: function (h, i) {
                e._setDragLimits();
                return this
            },
            start: function (h) {
                e.topWhileDrag = null
            },
            drag: function (h) {
                e.dragging = true;
                var i = e.options.pace;
                if (i == "optimum") {
                    e._setNormalPace(h)
                } else {
                    if (i == "fast") {
                        e._updateCurPosAndTrigger(h)
                    }
                }
            },
            stop: function (h) {
                e._updateCurPosAndTrigger(h);
                e.dragging = false;
                e._refresh()
            }
        });
        function c(h) {
            if (e.options.cur_pos > 0) {
                e.options.cur_pos--;
                e.updateSliderPos();
                e.scroll(h)
            }
        }
        this.$top_btn = b("div.top-btn,div.left-btn", this.element).click(function (h) {
            if (e.options.disabled) {
                return
            }
            c(h);
            h.preventDefault();
            return false
        }).mousedown(function (h) {
            if (e.options.disabled) {
                return
            }
            e.mousedownTimeout = window.setTimeout(function () {
                e.mousedownInterval = window.setInterval(function () {
                    c(h)
                },
                    50)
            },
                e.options.timeout)
        }).bind("mouseup mouseout",
            function (h) {
                if (e.options.disabled) {
                    return
                }
                e._mouseup(h)
            });
        function g(h) {
            if (e.options.cur_pos < e.num_eles - 1) {
                e.options.cur_pos++
            }
            e.updateSliderPos();
            e.scroll(h)
        }
        this.$bottom_btn = b("div.bottom-btn,div.right-btn", this.element).click(function (h) {
            if (e.options.disabled) {
                return
            }
            g(h);
            h.preventDefault();
            return false
        }).mousedown(function (h) {
            if (e.options.disabled) {
                return
            }
            e.mousedownTimeout = window.setTimeout(function () {
                e.mousedownInterval = window.setInterval(function () {
                    g(h)
                },
                    50)
            },
                e.options.timeout)
        }).bind("mouseup mouseout",
            function (h) {
                if (e.options.disabled) {
                    return
                }
                e._mouseup(h)
            });
        this._refresh()
    };
    a._mouseup = function (c) {
        if (this.options.disabled) {
            return
        }
        var d = this;
        window.clearTimeout(d.mousedownTimeout);
        d.mousedownTimeout = null;
        window.clearInterval(d.mousedownInterval);
        d.mousedownInterval = null
    };
    a._setDragLimits = function () {
        if (this.direction == "vertical") {
            var c = this.element.offset().top + 17;
            var d = (c + this.length - 34 - this.slider_length);
            this.$slider.draggable("option", "containment", [0, c, 0, d])
        } else {
            var c = this.element.offset().left + 17;
            var d = (c + this.length - 34 - this.slider_length);
            this.$slider.draggable("option", "containment", [c, 0, d, 0])
        }
    };
    a._refresh = function () {
        if (this.options.num_eles <= 1) {
            this.element.css("display", "none")
        } else {
            this.element.css("display", "")
        }
        this.num_eles = this.options.num_eles;
        this.length = this.options.length;
        this._validateCurPos();
        this.$slider.css("display", "");
        if (this.direction == "vertical") {
            this.element.height(this.length);
            this._setSliderBgLength();
            this.scroll_space = this.length - 34 - this.slider_length;
            if (this.scroll_space < 4 || this.num_eles <= 1) {
                this.$slider.css("display", "none")
            }
            this.updateSliderPos(this.options.cur_pos)
        } else {
            this.element.width(this.length);
            this._setSliderBgLength();
            this.scroll_space = this.length - 34 - this.slider_length;
            if (this.scroll_space < 4 || this.num_eles <= 1) {
                this.$slider.css("display", "none")
            }
            this.updateSliderPos(this.options.cur_pos)
        }
    };
    a._setSliderBgLength = function () {
        var e = this.length;
        var f = this.num_eles * 40 + e;
        var d = e - 34;
        var c = d * e / f;
        var g = Math.round((c - (8 + 3 + 3)) / 2);
        if (g < 1) {
            g = 1
        }
        this.slider_length = 8 + 3 + 3 + 2 * g;
        if (this.direction == "vertical") {
            b("div.vert-slider-bg", this.element).height(g);
            this.$slider.height(this.slider_length)
        } else {
            b(".horiz-slider-bg", this.element).width(g);
            this.$slider.width(this.slider_length)
        }
    };
    a._updateCurPosAndTrigger = function (c, g) {
        var e = this;
        var h = e.$slider;
        if (g == null) {
            g = (e.direction == "vertical") ? parseInt(h[0].style.top) : parseInt(h[0].style.left)
        }
        var f = e.length - 34 - ((e.direction == "vertical") ? h[0].offsetHeight : h[0].offsetWidth);
        var d = (g - 17) * (e.num_eles - 1) / f;
        d = Math.round(d);
        if (e.options.cur_pos != d) {
            if (this.dragging) {
                if (this.topWhileDrag != null) {
                    if (this.topWhileDrag < g && e.options.cur_pos > d) {
                        return
                    } else {
                        if (this.topWhileDrag > g && e.options.cur_pos < d) {
                            return
                        }
                    }
                }
                this.topWhileDrag = g
            }
            e.options.cur_pos = d;
            this.scroll(c)
        }
    };
    a._setNormalPace = function (c) {
        if (this.timer) {
            window.clearInterval(this.timer);
            this.timer = null
        }
        var d = this;
        d.timer = window.setInterval(function () {
            var f = d.$slider;
            var e = (d.direction == "vertical") ? parseInt(f[0].style.top) : parseInt(f[0].style.left);
            if (d.prev_top == e) {
                d._updateCurPosAndTrigger(c, e);
                window.clearInterval(d.timer);
                d.timer = null
            }
            d.prev_top = e
        },
            20)
    };
    a.setNumEles = function (c) {
        this.num_eles = this.options.num_eles = c;
        this.updateSliderPos()
    };
    a._validateCurPos = function () {
        if (this.options.cur_pos >= this.num_eles) {
            this.options.cur_pos = this.num_eles - 1
        }
        if (this.options.cur_pos < 0) {
            this.options.cur_pos = 0
        }
    };
    a.updateSliderPos = function () {
        var c = (this.scroll_space * (this.options.cur_pos)) / (this.num_eles - 1);
        if (this.direction == "vertical") {
            this.$slider.css("top", 17 + c)
        } else {
            this.$slider.css("left", 17 + c)
        }
    };
    a.scroll = function (c) {
        var d = this.options;
        this._trigger("scroll", c, {
            cur_pos: d.cur_pos,
            num_eles: d.num_eles
        })
    };
    a._setOption = function (c, d) {
        if (c == "disabled") {
            if (d == true) {
                this.$slider.draggable("disable")
            } else {
                this.$slider.draggable("enable")
            }
        }
        b.Widget.prototype._setOption.call(this, c, d)
    };
    a._setOptions = function () {
        b.Widget.prototype._setOptions.apply(this, arguments);
        this._refresh()
    };
    b.widget("paramquery.pqScrollBar", a)
})(jQuery); (function (h) {
    var c = function (i) {
        this.that = i
    };
    var d = c.prototype;
    d._generateTables = function (m) {
        var t = this.that,
            z = t.colModel,
            I = z.length,
            y = t.options,
            G = y.columnBorders,
            q = y.rowBorders,
            A = y.scrollModel,
            v = t.outerWidths;
        t._bufferObj_calcInitFinal();
        var s = (m) ? 0 : t.init,
            o = (m) ? m.data.length - 1 : t["final"],
            H = (m && m.data) ? m.data : t.data,
            r = t.getRowIndxOffset();
        if (!m && (s == null || o == null)) {
            t.$cont.empty();
            t.$tbl = null;
            return
        }
        if (!m) {
            t._trigger("beforeTableView", null, {
                data: t.data,
                curPos: s,
                finalPos: o,
                curPage: t.dataModel.curPage
            })
        }
        var F = "pq-grid-cell ";
        if (!y.wrap || m) {
            F += "pq-wrap-text "
        }
        var l = "pq-grid-table ";
        if (G) {
            l += "pq-grid-td-border-right "
        }
        if (q) {
            l += "pq-grid-td-border-bottom "
        }
        var D = ["<table class='" + l + "' cellpadding=0 cellspacing=0 >"];
        var B = [];
        if (1 == 1) {
            D.push("<tr class='pq-row-hidden'>");
            if (t.numberCell) {
                var u = t.numberCellWidth + 1;
                D.push("<td style='width:" + u + "px;' ></td>")
            }
            for (var p = 0; p < I; p++) {
                var n = z[p];
                if (n.hidden) {
                    continue
                } else {
                    if (t.hidearrHS[p]) {
                        B.push(p);
                        continue
                    }
                }
                var u = v[p];
                D.push("<td style='width:" + u + "px;' pq-top-col-indx=" + p + "></td>")
            }
            for (var C = 0; C < B.length; C++) {
                var p = B[C];
                var n = z[p];
                var u = v[p];
                D.push("<td style='width:" + u + "px;'></td>")
            }
            D.push("</tr>")
        }
        this.offsetRow = null;
        do {
            var j = H[s],
                x = j,
                w = s,
                E = x.hidden,
                i = "";
            if (E) {
                if (s == o) {
                    break
                }
                s++;
                continue
            }
            if (this.offsetRow == null && w != null) {
                this.offsetRow = (s - w)
            }
            this._generateRow(x, w, z, I, B, r, F, D, m);
            if (A.scrollTillLastRow) { } else {
                if (s == o) {
                    break
                }
                s++
            }
        }
        while (1 == 1);
        t.scrollMode = false;
        if (!A.scrollTillLastRow) {
            h.measureTime(function () {
                D.push("</table>");
                var L = D.join("");
                if (m) {
                    m.$cont.empty();
                    var M = h(L);
                    m.$cont.append(M);
                    if (!t.tables) {
                        t.tables = []
                    }
                    var K = -1;
                    for (var J = 0; J < t.tables.length; J++) {
                        var k = t.tables[J].cont;
                        if (k == m.$cont[0]) {
                            K = J
                        }
                    }
                    if (K == -1) {
                        t.tables.push({
                            $tbl: M,
                            cont: m.$cont[0]
                        })
                    } else {
                        t.tables[K].$tbl = M
                    }
                } else {
                    if (t.$tbl == undefined) {
                        t.$tbl = h(L);
                        t.$cont.append(t.$tbl)
                    } else {
                        if (t.$td_edit != null) {
                            t.quitEditMode()
                        }
                        t.$cont.empty();
                        t.$tbl = h(L);
                        t.$cont.append(t.$tbl)
                    }
                }
            },
                "append stuff inside _generateTable")
        }
        if (!m) {
            window.setTimeout(function () {
                t._fixTableViewPort();
                t._trigger("refresh", null, {
                    dataModel: t.dataModel,
                    data: t.data,
                    initV: t.init,
                    initH: t.initH
                })
            },
                0)
        }
    };
    d._renderCell = function (v) {
        var p = this.that,
            i = v.rowIndxPage,
            o = v.rowIndx,
            m = v.rowData,
            l = v.colIndx,
            k = v.$td,
            n = v.column,
            q = n.dataIndx,
            j = v.wrap,
            u = v.customData;
        var t;
        if (n.render) {
            t = n.render({
                data: p.data,
                dataModel: p.dataModel,
                rowData: m,
                rowIndxPage: i,
                rowIndx: o,
                colIndx: l,
                column: n,
                dataIndx: q,
                customData: u
            })
        } else {
            t = m[q]
        }
        if (t === "" || t == undefined) {
            t = "&nbsp;"
        }
        var s = "pq-td-div";
        if (j == false) {
            s += " pq-wrap-text"
        }
        var r = "<div class='" + s + "'>" + t + "</div>";
        if (k != undefined) {
            k.html(r)
        }
        return r
    };
    d._generateRow = function (r, q, x, I, y, n, F, B, j) {
        var s = "pq-grid-row";
        var p = this.that,
            u = p.options,
            G = u.columnBorders,
            t = u.wrap,
            D = u.customData;
        var E = {
            rowIndx: q + n,
            rowIndxPage: q,
            rowData: r,
            wrap: t,
            customData: D
        };
        if (u.oddRowsHighlight && (q / 2 == parseInt(q / 2))) {
            s += " pq-grid-oddRow"
        }
        if (r.selectedRow) {
            s += " pq-row-select ui-state-highlight"
        }
        B.push("<tr pq-row-indx='" + q + "' class='" + s + "' >");
        if (p.numberCell) {
            B.push("<td style='width:" + p.numberCellWidth + "px;' class='pq-grid-number-cell ui-state-default'>		<div class='pq-td-div'>" + ((j) ? "&nbsp;" : (q + 1)) + "</div></td>")
        }
        for (var m = 0; m < I; m++) {
            var l = x[m],
                w = l.dataIndx;
            E.column = l;
            E.colIndx = m;
            var v = false;
            var o = r.selectedDataIndices;
            if (o) {
                v = o[w]
            }
            if (l.hidden) {
                continue
            } else {
                if (p.hidearrHS[m]) {
                    continue
                }
            }
            var H = "";
            var i = F;
            if (l.align == "right") {
                i += " pq-align-right"
            } else {
                if (l.align == "center") {
                    i += " pq-align-center"
                }
            }
            if (m == p.freezeCols - 1 && G) {
                i += " pq-last-freeze-col"
            }
            if (l.className) {
                i = i + " " + l.className
            }
            if (v) {
                i = i + " pq-cell-select ui-state-highlight"
            }
            var C = "pq-col-indx='" + m + "'";
            if (j) {
                C += " pq-dataIndx='" + w + "'"
            }
            var z = "<td class='" + i + "' style='" + H + "' " + C + " >			" + this._renderCell(E) + "</td>";
            B.push(z)
        }
        for (var A = 0; A < y.length; A++) {
            var m = y[A];
            var l = x[m],
                w = l.dataIndx;
            E.column = l;
            E.colIndx = m;
            var H = "";
            H += "visibility:hidden;";
            var i = F;
            if (l.align == "right") {
                i += " pq-align-right"
            } else {
                if (l.align == "center") {
                    i += " pq-align-center"
                }
            }
            var C = "pq-col-indx='" + m + "'";
            if (j) {
                C += " pq-dataIndx='" + w + "'"
            }
            var z = "<td class='" + i + "' style='" + H + "' " + C + ">			" + this._renderCell(E) + "</td>";
            B.push(z)
        }
        B.push("</tr>");
        return B
    };
    var e = function (i) {
        this.that = i;
        this.options = i.options;
        this.selectedRows = [];
        this.isDirty = false
    };
    var b = e.prototype;
    b._addToData = function (i) {
        var j = this.options.dataModel.location;
        var m = (j == "remote") ? this.that.data : this.options.dataModel.data,
            k = (j == "remote") ? i.rowIndxPage : i.rowIndx,
            l = m[k];
        l.selectedRow = true
    };
    b.setDirty = function () {
        if (this.selectedRows.length > 0) {
            this.isDirty = true
        }
    };
    b.removeAll = function (k) {
        if (this.isDirty) {
            this.refresh()
        }
        var o = k.raiseEvent,
            n = this.that,
            q = (k.offset == null) ? n.getRowIndxOffset() : obj.offset;
        var p = this.selectedRows.slice(0);
        for (var l = 0; l < p.length; l++) {
            var j = p[l];
            var m = j.rowIndx;
            this.remove({
                rowIndx: m,
                offset: q
            })
        }
    };
    b.refresh = function () {
        this.selectedRows = [];
        var m = this.options.dataModel.data;
        if (!m) {
            return
        }
        for (var k = 0, j = m.length; k < j; k++) {
            var l = m[k];
            if (l.selectedRow) {
                this.selectedRows.push({
                    rowIndx: k
                })
            }
        }
        this.isDirty = false
    };
    b.replace = function (m) {
        if (this.isDirty) {
            this.refresh()
        }
        var l = m.rowIndx,
            n = m.offset = (m.offset == null) ? this.that.getRowIndxOffset() : m.offset,
            i = m.rowIndxPage = l - n,
            k = m.$tr,
            j = m.evt;
        this.removeAll({
            raiseEvent: true
        });
        this.add(m)
    };
    b.add = function (t) {
        if (this.isDirty) {
            this.refresh()
        }
        var m = t.rowIndx,
            p = this.that,
            l = (t.offset == null) ? p.getRowIndxOffset() : t.offset,
            i = t.rowIndxPage = m - l,
            o = t.$tr,
            s = t.evt,
            k = this.selectedRows,
            j = this.isSelected(t);
        if (j == null) {
            return false
        } else {
            if (this.isSelected(t) == false) {
                var q = this._boundRow(t),
                    o = q;
                k.push({
                    rowIndx: m
                });
                this._addToData(t);
                p._trigger("rowSelect", s, {
                    rowIndx: m,
                    rowIndxPage: i,
                    data: p.data,
                    dataModel: p.dataModel,
                    $tr: o
                })
            } else {
                var n = this.indexOf(t);
                var r = this.selectedRows.splice(n, 1);
                this.selectedRows = this.selectedRows.concat(r)
            }
        }
    };
    b.remove = function (r) {
        if (this.isDirty) {
            this.refresh()
        }
        var l = r.rowIndx,
            o = this.that,
            k = (r.offset == null) ? o.getRowIndxOffset() : r.offset,
            i = r.rowIndxPage = l - k,
            p = r.evt,
            q = (o.init + k - o.offsetRow),
            j = (o["final"] + k - o.offsetRow);
        if (this.isSelected(r)) {
            var n = o.getRow({
                rowIndxPage: i
            });
            if (n) {
                n.removeClass("pq-row-select ui-state-highlight")
            }
            o._trigger("rowUnSelect", p, {
                rowIndx: l,
                dataModel: o.dataModel,
                $tr: n
            });
            this._removeFromData(r)
        }
        var m = this.indexOf(r);
        if (m != -1) {
            this.selectedRows.splice(m, 1)
        }
    };
    b.indexOf = function (m) {
        if (this.isDirty) {
            this.refresh()
        }
        var k = m.rowIndx,
            l = this.selectedRows;
        for (var j = 0; j < l.length; j++) {
            if (l[j].rowIndx == k) {
                return j
            }
        }
        return -1
    };
    b.isSelected = function (i) {
        if (this.isDirty) {
            this.refresh()
        }
        var j = this.options.dataModel.location;
        var m = (j == "remote") ? this.that.data : this.options.dataModel.data,
            k = (j == "remote") ? i.rowIndxPage : i.rowIndx,
            l = m[k];
        return (l) ? ((l.selectedRow == null) ? false : l.selectedRow) : null
    };
    b.getSelection = function () {
        if (this.isDirty) {
            this.refresh()
        }
        return this.selectedRows
    };
    b._removeFromData = function (i) {
        var j = this.options.dataModel.location;
        var m = (j == "remote") ? this.that.data : this.options.dataModel.data,
            k = (j == "remote") ? i.rowIndxPage : i.rowIndx,
            l = m[k];
        l.selectedRow = false
    };
    b._boundRow = function (m) {
        var i = m.rowIndxPage,
            l = m.rowIndx,
            k = this.that,
            j = (m.$tr == null) ? k.getRow({
                rowIndxPage: i
            }) : m.$tr;
        if (j == null || j.length == 0) {
            return false
        }
        j.addClass("pq-row-select ui-state-highlight");
        return j
    };
    var a = function (i) {
        this.options = i.options,
            this.that = i,
            this.selectedCells = []
    };
    var g = a.prototype;
    g._addToData = function (i) {
        var j = this.options.dataModel.location;
        var m = (j == "remote") ? this.that.data : this.options.dataModel.data,
            k = (j == "remote") ? i.rowIndxPage : i.rowIndx,
            l = m[k];
        if (!l.selectedDataIndices) {
            l.selectedDataIndices = {}
        }
        l.selectedDataIndices[i.dataIndx] = true
    };
    g._removeFromData = function (i) {
        var j = this.options.dataModel.location;
        var m = (j == "remote") ? this.that.data : this.options.dataModel.data,
            k = (j == "remote") ? i.rowIndxPage : i.rowIndx,
            l = m[k];
        if (l && l.selectedDataIndices) {
            l.selectedDataIndices[i.dataIndx] = false
        }
    };
    g.setDirty = function () {
        if (this.selectedCells.length > 0) {
            this.isDirty = true
        }
    };
    g.removeAll = function (r) {
        if (this.isDirty) {
            this.refresh()
        }
        var j = r.raiseEvent,
            o = this.that,
            k = (r.offset == null) ? o.getRowIndxOffset() : obj.offset;
        var q = this.selectedCells.slice(0);
        for (var m = 0; m < q.length; m++) {
            var n = q[m];
            var l = n.rowIndx,
                p = n.dataIndx;
            this.remove({
                rowIndx: l,
                offset: k,
                dataIndx: p
            })
        }
    };
    g.isSelected = function (i) {
        if (this.isDirty) {
            this.refresh()
        }
        var j = this.options.dataModel.location;
        var m = this.that,
            o = (j == "remote") ? m.data : this.options.dataModel.data,
            l = (j == "remote") ? i.rowIndxPage : i.rowIndx,
            k = (i.dataIndx == null) ? m.colModel[i.colIndx].dataIndx : i.dataIndx,
            n = o[l];
        if (n == null) {
            return null
        }
        if (n.selectedDataIndices) {
            if (n.selectedDataIndices[k]) {
                return true
            }
        }
        return false
    };
    g.refresh = function () {
        this.selectedCells = [];
        var m = this.options.dataModel.data;
        if (!m) {
            return
        }
        for (var k = 0, j = m.length; k < j; k++) {
            var l = m[k];
            if (l.selectedIndices && l.selectedDataIndices[dataIndx]) {
                this.selectedCells.push({
                    rowIndx: k,
                    dataIndx: dataIndx
                })
            }
        }
        this.isDirty = false
    };
    g.replace = function (m) {
        if (this.isDirty) {
            this.refresh()
        }
        var k = m.rowIndx,
            l = m.colIndx,
            o = m.offset = (m.offset == null) ? this.that.getRowIndxOffset() : m.offset,
            i = m.rowIndxPage = k - o,
            n = m.$td,
            j = m.evt;
        this.removeAll({
            raiseEvent: true
        });
        this.add(m)
    };
    g.add = function (u) {
        if (this.isDirty) {
            this.refresh()
        }
        var n = u.rowIndx,
            p = this.that,
            m = (u.offset == null) ? p.getRowIndxOffset() : u.offset,
            i = u.rowIndxPage = n - m,
            l = u.colIndx = (u.colIndx == null) ? p.getColIndxFromDataIndx(u.dataIndx) : u.colIndx,
            q = u.dataIndx = (u.dataIndx == null) ? p.colModel[l].dataIndx : u.dataIndx,
            t = u.evt,
            s = this.selectedCells,
            k = this.isSelected(u);
        if (k == null) {
            return false
        } else {
            if (k == false) {
                var j = p.getCell({
                    rowIndxPage: i,
                    colIndx: l
                });
                if (j) {
                    j.addClass("pq-cell-select ui-state-highlight")
                }
                s.push({
                    rowIndx: n,
                    dataIndx: q
                });
                this._addToData(u);
                p._trigger("cellSelect", t, {
                    rowIndx: n,
                    rowIndxPage: i,
                    colIndx: l,
                    dataIndx: q,
                    data: p.data,
                    dataModel: p.dataModel,
                    $td: j
                })
            } else {
                var o = this.indexOf(u);
                var r = this.selectedCells.splice(o, 1);
                this.selectedCells = this.selectedCells.concat(r)
            }
        }
    };
    g.remove = function (t) {
        if (this.isDirty) {
            this.refresh()
        }
        var n = t.rowIndx,
            p = this.that,
            q = (t.dataIndx == null) ? p.colModel[t.colIndx].dataIndx : t.dataIndx,
            k = (t.colIndx == null) ? p.getColIndxFromDataIndx(q) : t.colIndx,
            m = (t.offset == null) ? p.getRowIndxOffset() : t.offset,
            i = t.rowIndxPage = n - m,
            r = t.evt,
            s = (p.init + m),
            l = (p["final"] + m);
        if (this.isSelected(t)) {
            var j = p.getCell({
                rowIndxPage: i,
                colIndx: k
            });
            if (j) {
                j.removeClass("pq-cell-select ui-state-highlight")
            }
            p._trigger("cellUnSelect", r, {
                rowIndx: n,
                colIndx: k,
                dataIndx: q,
                dataModel: p.dataModel,
                $td: j
            });
            this._removeFromData(t)
        }
        var o = this.indexOf(t);
        if (o != -1) {
            this.selectedCells.splice(o, 1)
        }
    };
    g.indexOf = function (p) {
        if (this.isDirty) {
            this.refresh()
        }
        var o = p.rowIndx,
            n = this.that,
            k = p.dataIndx = (p.dataIndx == null) ? n.colModel[p.colIndx].dataIndx : p.dataIndx;
        var j = this.selectedCells;
        for (var l = 0; l < j.length; l++) {
            var m = j[l];
            if (m.rowIndx == o && m.dataIndx == k) {
                return l
            }
        }
        return -1
    };
    g.getSelection = function () {
        if (this.isDirty) {
            this.refresh()
        }
        return this.selectedCells
    };
    var f = {};
    f.options = {
        bottomVisible: true,
        colModel: null,
        columnBorders: true,
        customData: null,
        dataModel: {
            cache: false,
            curPage: 0,
            totalPages: 0,
            rPP: 10,
            location: "local",
            sorting: "local",
            sortDir: "up",
            method: "GET",
            rPPOptions: [10, 20, 50, 100]
        },
        direction: "",
        draggable: false,
        editable: true,
        editModel: {
            clicksToEdit: 1,
            saveKey: ""
        },
        flexHeight: false,
        flexWidth: false,
        freezeCols: 0,
        getDataIndicesFromColIndices: true,
        height: 400,
        hoverMode: "row",
        minWidth: 50,
        numberCell: true,
        numberCellWidth: 50,
        oddRowsHighlight: true,
        resizable: false,
        roundCorners: true,
        rowBorders: true,
        scrollModel: {
            pace: "fast",
            horizontal: true
        },
        selectionModel: {
            type: "row",
            mode: "range"
        },
        sortable: true,
        title: "&nbsp;",
        topVisible: true,
        treeViewModel: null,
        width: 600,
        wrap: true
    };
    f._regional = {
        strLoading: "Loading",
        strAdd: "Add",
        strEdit: "Edit",
        strDelete: "Delete",
        strSearch: "Search",
        strNothingFound: "Nothing found",
        strSelectedmatches: "Selected {0} of {1} match(es)",
        strPrevResult: "Previous Result",
        strNextResult: "Next Result"
    };
    h.extend(f.options, f._regional);
    f._destroyResizable = function () {
        if (this.element.data("resizable")) {
            this.element.resizable("destroy")
        }
    };
    f._destroyDraggable = function () {
        if (this.element.data("draggable")) {
            this.element.draggable("destroy")
        }
    };
    f._disable = function () {
        if (this.$disable == null) {
            this.$disable = h("<div class='pq-grid-disable'></div>").css("opacity", 0.2).appendTo(this.element)
        }
    };
    f._enable = function () {
        if (this.$disable) {
            this.element[0].removeChild(this.$disable[0]);
            this.$disable = null
        }
    };
    f._destroy = function () {
        this._destroyResizable();
        this._destroyDraggable();
        this.element.empty();
        this.element.css("height", "");
        this.element.css("width", "");
        this.element.removeClass("pq-grid ui-widget ui-widget-content ui-corner-all").removeData()
    };
    f._findCellFromEvtCoords = function (t) {
        if (this.$tbl == null) {
            return {
                $td: null,
                rowIndxPage: null,
                colIndx: null
            }
        }
        var s = t.pageY - this.$cont.offset().top;
        var n = t.pageX - this.$cont.offset().left;
        var m = this.$tbl.find("tr");
        var r = 0,
            k = 0,
            o = 0;
        for (var p = 1; p < m.length; p++) {
            if (m[p].offsetTop > s) {
                break
            } else {
                r++
            }
        }
        var q = h(m[r]);
        k = parseInt(q.attr("pq-row-indx"));
        var j = q.find("td");
        r = 0;
        for (var p = 1; p < j.length; p++) {
            if (j[p].offsetLeft > n) {
                break
            } else {
                r++
            }
        }
        var l = h(j[r]);
        if (l[0].nodeName.toUpperCase() != "TD") {
            l = h(t.target).parent("td")
        }
        o = parseInt(l.attr("pq-col-indx"));
        return {
            $td: l,
            rowIndxPage: k,
            colIndx: o
        }
    };
    f._rangeSelectRow = function (l, o, q) {
        var n = this,
            p = n.sRows.getSelection(),
            j = p.slice(0);
        for (var m = 0; m < j.length; m++) {
            var k = j[m],
                r = k.rowIndx;
            if (r < l || r > o) {
                n.sRows.remove({
                    rowIndx: r
                })
            }
        }
        for (var r = l; r <= o; r++) {
            n.sRows.add({
                rowIndx: rowIndx
            })
        }
    };
    f._rangeSelect = function (q, n, u, r, v) {
        var s = this,
            k = s.sCells.getSelection(),
            m = k.slice(0);
        for (var p = 0; p < m.length; p++) {
            var o = m[p],
                w = o.rowIndx,
                t = o.dataIndx,
                j = this.getColIndxFromDataIndx(t);
            if (w < q || w > u) {
                s.sCells.remove({
                    rowIndx: w,
                    colIndx: j,
                    dataIndx: t
                })
            } else {
                if (w == q && j < n) {
                    s.sCells.remove({
                        rowIndx: w,
                        colIndx: j,
                        dataIndx: t
                    })
                } else {
                    if (w == u && j > r) {
                        s.sCells.remove({
                            rowIndx: w,
                            colIndx: j,
                            dataIndx: t
                        })
                    }
                }
            }
        }
        for (var j = 0; j < s.colModel.length; j++) {
            var l = s.colModel[j];
            if (l.hidden) {
                continue
            }
            var t = l.dataIndx;
            var w = q;
            do {
                if (w == q && j < n) { } else {
                    if (w == u && j > r) {
                        break
                    } else {
                        s.sCells.add({
                            rowIndx: w,
                            colIndx: j,
                            dataIndx: t
                        })
                    }
                }
                w++
            }
            while (w <= u)
        }
    };
    f._blockSelect = function (q, n, u, r, v) {
        var s = this,
            k = s.sCells.getSelection(),
            m = k.slice(0);
        for (var p = 0; p < m.length; p++) {
            var o = m[p],
                w = o.rowIndx,
                t = o.dataIndx,
                j = this.getColIndxFromDataIndx(t);
            if (j < n || j > r) {
                s.sCells.remove({
                    rowIndx: w,
                    dataIndx: t,
                    colIndx: j
                })
            } else {
                if (w < q || w > u) {
                    s.sCells.remove({
                        rowIndx: w,
                        dataIndx: t,
                        colIndx: j
                    })
                }
            }
        }
        for (var j = n; j <= r; j++) {
            var l = s.colModel[j];
            var t = l.dataIndx;
            if (l.hidden) {
                continue
            }
            var w = q;
            do {
                s.sCells.add({
                    rowIndx: w,
                    colIndx: j,
                    dataIndx: t
                });
                w++
            }
            while (w <= u)
        }
    };
    f._create = function () {
        this.cTable = new c(this);
        this.minWidth = this.options.minWidth;
        this.cols = [];
        this.dataModel = this.options.dataModel;
        this.widths = [];
        this.outerWidths = [];
        this.rowHeight = 22;
        this.hidearr = [];
        this.hidearrHS = [];
        this.numberCell = this.options.numberCell;
        this.numberCellWidth = this.options.numberCellWidth;
        this.freezeCols = this.options.freezeCols;
        this.tables = [];
        var l = this;
        this.$tbl = null;
        this._refreshHeader();
        this._refreshWidths();
        this._computeOuterWidths();
        this.element.empty().addClass("pq-grid ui-widget ui-widget-content" + (this.options.roundCorners ? " ui-corner-all" : "")).append("<div class='pq-grid-top ui-widget-header" + (this.options.roundCorners ? " ui-corner-top" : "") + "'>		<div class='pq-grid-title'>&nbsp;</div></div>	<div class='pq-grid-inner' tabindex='0'><div class='pq-grid-right'> 		<div class='pq-header-outer ui-widget-header'>			<span class='pq-grid-header ui-state-default'></span><span class='pq-grid-header ui-state-default'></span>		</div>		<div class='pq-cont-right' >		<div class='pq-cont' ></div>		</div> 		</div></div>	<div class='pq-grid-bottom" + (this.options.roundCorners ? " ui-corner-bottom" : "") + "'>	<div class='pq-grid-footer'>&nbsp;</div>	</div>");
        if (this.options.direction == "rtl") {
            this.element.addClass("pq-rtl")
        }
        this._trigger("render", null, {
            dataModel: this.options.dataModel,
            colModel: this.colModel
        });
        this.$top = h("div.pq-grid-top", this.element);
        this.$title = h("div.pq-grid-title", this.element);
        this.$toolbar = h("div.pq-grid-toolbar", this.element);
        this.$grid_inner = h("div.pq-grid-inner", this.element);
        this.$grid_right = h(".pq-grid-right", this.element);
        this.$header_o = h("div.pq-header-outer", this.$grid_right);
        if (!this.options.topVisible) {
            this.$top.css("display", "none")
        }
        this.$header = h(".pq-grid-header", this.$grid_right);
        this.$header_left = h(this.$header[0]);
        this.$header_right = h(this.$header[1]);
        this.$bottom = h("div.pq-grid-bottom", this.element);
        if (!this.options.bottomVisible) {
            this.$bottom.css("display", "none")
        }
        this.$footer = h("div.pq-grid-footer", this.element);
        this.$cont_o = h("div.pq-cont-right", this.$grid_right);
        this.$cont_fixed = h("div.pq-cont-fixed", this.$grid_right);
        this.$cont = h("div.pq-cont", this.$grid_right);
        this.$cont.on("click",
            function (n) {
                return l._onClickCont(n)
            });
        this.$cont.on("click", ".pq-tree-expand-icon",
            function (n) {
                return l.cTreeView._onClickTreeExpandIcon(n)
            });
        this.$cont.on("click", "td.pq-grid-cell",
            function (n) {
                return l._onClickCell(n)
            });
        this.$cont.on("click", "tr.pq-grid-row",
            function (n) {
                return l._onClickRow(n)
            });
        this.$cont.on("dblclick", "td.pq-grid-cell",
            function (n) {
                return l._onDblClickCell(n)
            });
        this.$cont.on("dblclick", "tr.pq-grid-row",
            function (n) {
                return l._onDblClickRow(n)
            });
        this.$cont.on("mouseenter", "td.pq-grid-cell",
            function (n) {
                var o = h(this);
                if (l._trigger("cellMouseEnter", n, {
                    $td: o,
                    dataModel: l.options.dataModel
                }) == false) {
                    return false
                }
                if (l.options.hoverMode == "cell") {
                    l.highlightCell(o)
                }
            });
        this.$cont.on("mouseenter", "tr.pq-grid-row",
            function (n) {
                var o = h(this);
                if (l._trigger("rowMouseEnter", n, {
                    $tr: o,
                    dataModel: l.options.dataModel
                }) == false) {
                    return false
                }
                if (l.options.hoverMode == "row") {
                    l.highlightRow(o)
                }
            });
        this.$cont.on("mouseleave", "td.pq-grid-cell",
            function (n) {
                var o = h(this);
                if (l._trigger("cellMouseLeave", n, {
                    $td: o,
                    dataModel: l.options.dataModel
                }) == false) {
                    return false
                }
                if (l.options.hoverMode == "cell") {
                    l.unHighlightCell(o)
                }
            });
        this.$cont.on("mouseleave", "tr.pq-grid-row",
            function (n) {
                var o = h(this);
                if (l._trigger("rowMouseLeave", n, {
                    $tr: o,
                    dataModel: l.options.dataModel
                }) == false) {
                    return false
                }
                if (l.options.hoverMode == "row") {
                    l.unHighlightRow(o)
                }
            });
        this.$cont.bind("mousewheel DOMMouseScroll",
            function (n) {
                return l._onMouseWheel(n)
            });
        var i = 0;
        this.$hvscroll = h("<div class='pq-hvscroll-square ui-widget-content'></div>").appendTo(this.$grid_inner);
        this.$vscroll = h("<div class='pq-vscroll'></div>").appendTo(this.$grid_inner);
        this.prevVScroll = 0;
        this.$vscroll.pqScrollBar({
            pace: l.options.scrollModel.pace,
            direction: "vertical",
            cur_pos: 0,
            scroll: function (n, o) {
                l.scrollMode = true;
                l.selectCellRowCallback(function () {
                    l.cTable._generateTables()
                });
                h.measureTime(function () {
                    var p;
                    if (n.originalEvent && n.originalEvent.type == "drag") {
                        p = l._setScrollVNumEles()
                    } else {
                        p = l._setScrollVNumEles(true)
                    }
                    if (p <= 1) {
                        l._setScrollHLength()
                    }
                },
                    "scrollBar setNumEles stuff")
            }
        });
        var k = 0;
        this.$hscroll = h("<div class='pq-hscroll'></div>").appendTo(this.$grid_inner);
        this.$hscroll.pqScrollBar({
            direction: "horizontal",
            pace: l.options.scrollModel.pace,
            cur_pos: 0,
            scroll: function (n, o) {
                l._bufferObj_calcInitFinalH();
                l._refreshHideArrHS();
                l.scrollMode = true;
                l.selectCellRowCallback(function () {
                    l._createHeader();
                    l._refreshHeaderSortIcons();
                    l.cTable._generateTables();
                    l._refreshOtherTables()
                })
            }
        });
        this.element.width(this.options.width).height(this.options.height);
        this.element.width(this.element.width());
        this.disableSelection();
        if (window.opera) {
            this.$grid_inner.bind("keypress.pq-grid", {
                that: this
            },
                function (n) {
                    l.keyPressDown(n)
                })
        } else {
            this.$grid_inner.bind("keydown.pq-grid", {
                that: this
            },
                function (n) {
                    l.keyPressDown(n)
                })
        }
        this._refreshOptions();
        this._refreshTitle();
        var j = this.options.dataModel;
        if (j.sortIndx != null && j.sorting == "local" && j.location == "local") {
            this._refreshDataIndices();
            var m = this.getColIndxFromDataIndx(j.sortIndx);
            this._sortLocalData(j.sortIndx, j.sortDir, this.colModel[m].dataType, j.data)
        }
        this._initData();
        this._createSelectedRowsObject();
        this._createSelectedCellsObject();
        this._refresh()
    };
    f._onMouseWheel = function (j) {
        var m = this;
        var l = 0;
        var j = j.originalEvent;
        if (j.wheelDelta) {
            l = j.wheelDelta / 120
        } else {
            if (j.detail) {
                l = j.detail * -1 / 3
            }
        }
        var k = parseInt(m.$vscroll.pqScrollBar("option", "cur_pos"));
        var i = k - l;
        if (i >= 0) {
            m.$vscroll.pqScrollBar("option", "cur_pos", k - l).pqScrollBar("scroll")
        }
        return false
    };
    f._onDblClickCell = function (j) {
        var l = this;
        var p = h(j.currentTarget);
        var n = l.getCellIndices(p);
        var i = n.rowIndxPage,
            o = l.getRowIndxOffset(),
            k = i + o,
            m = n.colIndx;
        if (l._trigger("cellDblClick", j, {
            $td: p,
            dataModel: l.options.dataModel,
            rowIndxPage: i,
            rowIndx: k,
            colIndx: m
        }) == false) {
            return false
        }
        if (this.isEditableCell({
            colIndx: m
        }) && l.options.editModel.clicksToEdit > 1) {
            l._setSelection(null);
            if (l.options.selectionModel.type == "cell") {
                l._setSelection({
                    rowIndx: k,
                    colIndx: m
                })
            } else {
                if (l.options.selectionModel.type == "row") {
                    l._setSelection({
                        rowIndx: k
                    })
                }
            }
            l._editCell(p)
        }
    };
    f._onClickCont = function (i) {
        var j = this;
        if (j.$td_edit) {
            if (!j._isEditCell(i)) {
                j.quitEditMode(i)
            }
        }
    };
    f._onClickRow = function (x) {
        var u = this;
        var t = h(x.currentTarget);
        var j = parseInt(t.attr("pq-row-indx")),
            o = u.getRowIndxOffset(),
            p = j + o;
        var z = {
            rowIndx: p,
            evt: x
        };
        if (u._trigger("rowClick", x, {
            $tr: t,
            rowIndxPage: j,
            rowIndx: p,
            dataModel: u.options.dataModel
        }) == false) {
            return false
        }
        var k = u.options.selectionModel;
        if (k.type == "row") {
            var w = u.sRows.getSelection();
            if (w.length > 0) {
                if (x.ctrlKey && k.mode != "single") {
                    if (u.sRows.indexOf(z) != -1) {
                        u.sRows.remove(z)
                    } else {
                        u._setSelection(z)
                    }
                } else {
                    if (x.shiftKey && k.mode != "single") {
                        var n = w[w.length - 1],
                            l = n.rowIndx,
                            r = l,
                            v = p;
                        if (l > p) {
                            r = p;
                            v = l
                        }
                        var m = w.slice(0);
                        for (var q = 0; q < m.length; q++) {
                            var s = m[q],
                                y = s.rowIndx;
                            if (y < r || y > v) {
                                u.sRows.remove({
                                    rowIndx: y,
                                    evt: x
                                })
                            }
                        }
                        for (var y = r; y <= v; y++) {
                            u.sRows.add({
                                rowIndx: y,
                                evt: x
                            })
                        }
                        u._setSelection(z)
                    } else {
                        u.sRows.removeAll({
                            raiseEvent: true
                        });
                        u._setSelection(z)
                    }
                }
            } else {
                u._setSelection(z)
            }
        }
    };
    f._onDblClickRow = function (k) {
        var n = this;
        var m = h(k.currentTarget);
        var j = parseInt(m.attr("pq-row-indx")),
            o = n.getRowIndxOffset(),
            l = j + o;
        var i = {
            rowIndx: l,
            evt: k
        };
        if (n._trigger("rowDblClick", k, {
            $tr: m,
            rowIndxPage: j,
            rowIndx: l,
            dataModel: n.options.dataModel
        }) == false) {
            return false
        }
    };
    f.isEditableCell = function (l) {
        var k = l.colIndx,
            j = (l.column == null) ? (this.colModel[k]) : l.column,
            i = true;
        if (this.options.editable == false) {
            i = false
        }
        if (j.editable == false) {
            i = false
        }
        return i
    };
    f._getRowPQData = function (i, j, k) {
        var k = (k == null) ? this.data[i] : k;
        return k ? k[j] : null
    };
    f._setRowPQData = function (j, i, l) {
        var l = (l == null) ? this.data[j] : l;
        if (!l) {
            return
        }
        for (var k in i) {
            l[k] = i[k]
        }
    };
    f._onClickCell = function (t) {
        var n = this,
            q = this.options,
            x = q.selectionModel;
        var m = h(t.currentTarget);
        var j = n.getCellIndices(m);
        var i = j.rowIndxPage,
            l = n.getRowIndxOffset(),
            o = j.rowIndx = i + l,
            w = j.colIndx,
            s = j.dataIndx = this.colModel[w].dataIndx,
            k = n.colModel[w];
        j.evt = t;
        if (n._trigger("cellClick", t, {
            $td: m,
            rowIndxPage: i,
            rowIndx: o,
            colIndx: w,
            dataIndx: s,
            column: k,
            dataModel: n.options.dataModel
        }) == false) {
            return false
        }
        if (n.$td_edit) {
            n.quitEditMode(t)
        }
        if (this.isEditableCell({
            column: k
        }) && q.editModel.clicksToEdit == "1") {
            n._setSelection(null);
            if (x.type == "cell") {
                n._setSelection(j)
            } else {
                n.bringRowIntoView({
                    rowIndxPage: i
                });
                m = n._bringCellIntoView({
                    rowIndxPage: i,
                    colIndx: w
                })
            }
            window.setTimeout(function () {
                n.editCell(j)
            },
                0);
            return
        }
        if (x.type == "cell") {
            var r = n.sCells.getSelection();
            if (r.length > 0) {
                if (t.ctrlKey && x.mode != "single") {
                    if (n.sCells.isSelected(j)) {
                        n.sCells.remove(j)
                    } else {
                        n._setSelection(j)
                    }
                } else {
                    if (t.shiftKey && x.mode != "single") {
                        var A = r[r.length - 1],
                            p = A.rowIndx,
                            v = n.getColIndxFromDataIndx(A.dataIndx),
                            u = p,
                            z = o,
                            y = v,
                            B = w;
                        if (p > o) {
                            u = o;
                            z = p
                        }
                        if (n.options.selectionModel.mode == "range") {
                            if (p > o) {
                                y = w;
                                B = v
                            }
                            if (o == p && w < v) {
                                y = w;
                                B = v
                            }
                            n._rangeSelect(u, y, z, B, t)
                        } else {
                            if (n.options.selectionModel.mode == "block") {
                                if (v > w) {
                                    y = w;
                                    B = v
                                }
                                n._blockSelect(u, y, z, B, t)
                            }
                        }
                        n._setSelection(j)
                    } else {
                        n.sCells.removeAll({
                            raiseEvent: true
                        });
                        n._setSelection(j)
                    }
                }
            } else {
                n._setSelection(j)
            }
        }
    };
    f.highlightCell = function (i) {
        i.addClass("pq-grid-cell-hover ui-state-hover")
    };
    f.unHighlightCell = function (i) {
        i.removeClass("pq-grid-cell-hover ui-state-hover")
    };
    f.highlightRow = function (i) {
        i.addClass("pq-grid-row-hover ui-state-hover")
    };
    f.unHighlightRow = function (i) {
        i.removeClass("pq-grid-row-hover ui-state-hover")
    };
    f._createSelectedRowsObject = function () {
        this.sRows = new e(this)
    };
    f._createSelectedCellsObject = function () {
        this.sCells = new a(this)
    };
    f._getCreateEventData = function () {
        return {
            dataModel: this.options.dataModel,
            data: this.data,
            colModel: this.options.colModel
        }
    };
    f._refreshOptions = function () {
        this._refreshDataOptions()
    };
    f._refreshDataOptions = function () { };
    f.enableSelection = function () {
        this.$grid_inner.enableSelection()
    };
    f.disableSelection = function () {
        this.$grid_inner.disableSelection()
    };
    f._isEditCell = function (k) {
        var i = h(k.target);
        var j = i.closest("div.pq-cell-selected-border-edit");
        if (j && j.length > 0) {
            return true
        }
        return false
    };
    f._findCellFromEvt = function (j) {
        var i = h(j.target);
        var l = i.closest(".pq-grid-cell");
        if (l == null || l.length == 0) {
            return {
                rowIndxPage: null,
                colIndx: null,
                $td: null
            }
        } else {
            var k = this.getCellIndices(l);
            k.$td = l;
            return k
        }
    };
    f._initPager = function () {
        var i = this.options.dataModel;
        var j = this;
        var k = {
            rPP: i.rPP,
            rPPOptions: i.rPPOptions,
            change: function (l, n) {
                var m = j.options.dataModel;
                if (n.curPage != undefined) {
                    m.prevPage = m.curPage;
                    m.curPage = n.curPage
                }
                if (n.rPP != undefined) {
                    m.rPP = n.rPP
                }
                if (m.paging == "remote") {
                    j.remoteRequest()
                } else {
                    j.$td_edit = null;
                    j._refreshDataFromDataModel();
                    j._refresh()
                }
            },
            refresh: function (l) {
                j.refreshDataAndView()
            }
        };
        if (i.paging) {
            this.$footer.pqPager(k)
        } else { }
    };
    f._initData = function () {
        var j = this;
        var i = this.options.dataModel;
        if (i == undefined) {
            throw ("dataModel not found.")
        }
        this._initPager();
        if (i.location == "remote") {
            var j = this;
            this.generateLoading();
            this.remoteRequest()
        } else {
            this._refreshDataFromDataModel()
        }
    };
    f._refreshHideArrHS = function () {
        var l = this;
        for (var j = 0; j < l.colModel.length; j++) {
            l.hidearrHS[j] = false
        }
        if (l.initH > 0) {
            var k = l.freezeCols - 1 + l.initH;
            for (var j = l.freezeCols; j <= k; j++) {
                if (l.colModel[j].hidden) {
                    continue
                }
                l.hidearrHS[j] = true
            }
        } else { }
    };
    f.generateLoading = function () {
        if (this.$loading) {
            this.$loading.remove()
        }
        //this.$loading = h("<div class='pq-loading'></div>").appendTo(this.element);
        //h("<div class='pq-loading-bg'></div><div class='pq-loading-mask ui-state-highlight'><div>" + this.options.strLoading + "...</div></div>").appendTo(this.$loading);
        //this.$loading.find("div.pq-loading-bg").css("opacity", 0.0)
    };
    f.showLoading = function () {
        //this.element.find("div.pq-loading").hide();
        //Loading(true)
        top.$("#loading").show();
    };
    f.hideLoading = function () {
        top.$("#loading").hide();
    };
    f._refreshDataFromDataModel = function () {
        var k = this.options,
            j = k.dataModel;
        if (j.data == null || j.data.length == 0) {
            if (j.paging) {
                j.curPage = 0;
                j.totalPages = 0;
                j.totalRecords = 0
            }
            return
        }
        if (j.paging && j.paging == "local") {
            j.totalRecords = j.data.length;
            j.totalPages = Math.ceil(j.data.length / j.rPP);
            if (j.curPage > j.totalPages) {
                j.curPage = j.totalPages
            }
            if (j.curPage < 1 && j.totalPages > 0) {
                j.curPage = 1
            }
            var l = (j.curPage - 1) * j.rPP;
            var i = j.curPage * j.rPP;
            if (i > j.data.length) {
                i = j.data.length
            }
            this.data = j.data.slice(l, i)
        } else {
            this.data = j.data
        }
    };
    f.remoteRequest = function (n) {
        if (this.loading) {
            this.xhr.abort()
        }
        var k = this;
        var j = "";
        var m = "";
        var i = this.options.dataModel;
        if (typeof i.getUrl == "function") {
            var l = i.getUrl();
            if (l && l.url) {
                j = l.url
            }
            if (l && l.data) {
                m = l.data
            }
        }
        if (!j) {
            return
        }
        this.loading = true;
        this.showLoading();
        this.xhr = h.ajax({
            url: j,
            dataType: i.dataType,
            async: true,
            cache: i.cache,
            type: i.method,
            data: m,
            beforeSend: function (p, o) {
                if (typeof i.beforeSend == "function") {
                    return i.beforeSend(p, o)
                }
            },
            success: function (o, s, q) {
                var p = false;
                if (typeof i.getData == "function") {
                    var r = i.getData(o, s, q);
                    i.data = r.data;
                    if (i.paging) {
                        if (i.paging == "remote") {
                            if (r.curPage) {
                                i.curPage = r.curPage
                            }
                            if (r.totalRecords) {
                                i.totalRecords = r.totalRecords;
                                i.totalPages = Math.ceil(i.totalRecords / i.rPP)
                            }
                        }
                    }
                    k._refreshDataFromDataModel();
                    if (i.sorting == "local" && i.sortIndx != undefined) {
                        k._refreshSortingDataAndView({
                            sorting: true
                        })
                    } else {
                        k._refreshViewAfterDataSort()
                    }
                } else {
                    throw ("getData callback not found!")
                }
                k.hideLoading();
                k.loading = false;
                k._trigger("load", null, {
                    dataModel: k.options.dataModel,
                    data: k.data
                });
                if (typeof n == "function") {
                    n()
                }
            },
            error: function (o, q, p) {
                k.hideLoading();
                k.loading = false;
                if (typeof i.error == "function") {
                    i.error(o, q, p)
                }
            }
        })
    };
    f._fixFireFoxContentEditableIssue = function () {
        if (window.postMessage) {
            this.$grid_inner.focus()
        }
    };
    f.selectCellRowCallback = function (i) {
        var k,
            l;
        if (this.$td_edit) {
            this.quitEditMode()
        }
        var j = this;
        h.measureTime(function () {
            i.call(j)
        },
            "_generateTables");
        if (this.options.flexHeight) {
            this.setGridHeightFromTable()
        }
        if (this.options.flexWidth) {
            this._setGridWidthFromTable()
        }
    };
    f._refreshTitle = function () {
        this.$title.html(this.options.title)
    };
    f._refreshDraggable = function () {
        if (this.options.draggable) {
            this.$title.addClass("draggable");
            this.element.draggable({
                handle: this.$title,
                start: function (i, j) { }
            })
        } else {
            this._destroyDraggable()
        }
    };
    f._refreshResizable = function () {
        var i = this;
        if (this.options.resizable) {
            this.element.resizable({
                helper: "ui-state-highlight",
                delay: 0,
                start: function (j, k) {
                    h(k.helper).css({
                        opacity: 0.5,
                        background: "#ccc",
                        border: "1px solid steelblue"
                    })
                },
                resize: function (j, k) { },
                stop: function (j, k) {
                    i.options.height = i.element.height();
                    i.options.width = i.element.width();
                    i._refresh();
                    i.element.css("position", "relative")
                }
            })
        } else {
            this._destroyResizable()
        }
    };
    f.refresh = function () {
        this._refresh()
    };
    f._refreshDataIndices = function () {
        if (this.options.getDataIndicesFromColIndices == false) {
            return
        }
        var j = this.colModel;
        for (var k = 0; k < j.length; k++) {
            var l = j[k];
            if (l.dataIndx == null) {
                l.dataIndx = k
            }
        }
    };
    f._refresh = function () {
        var i = this;
        this._refreshDataIndices();
        this._refreshResizable();
        this._refreshDraggable();
        this._setScrollHNumEles();
        this._bufferObj_calcInitFinalH();
        this._refreshHideArrHS();
        this._computeOuterWidths(true);
        this._createHeader();
        this._refreshHeaderSortIcons();
        this._setInnerGridHeight();
        this._setRightGridHeight();
        this.selectCellRowCallback(function () {
            i.cTable._generateTables();
            i._computeOuterWidths()
        });
        this._setScrollHLength();
        this._setScrollVLength();
        this._setScrollVNumEles(true);
        this._setScrollHLength();
        this._refreshPager()
    };
    f._refreshPager = function () {
        var i = this.options.dataModel;
        if (i.paging) {
            this.$footer.pqPager("option", {
                currentPage: i.curPage,
                totalPages: i.totalPages,
                totalRecords: i.totalRecords,
                rPP: i.rPP,
                rPPOptions: i.rPPOptions
            })
        }
    };
    f._refreshViewAfterDataSort = function () {
        this.selectCellRowCallback(function () {
            this.cTable._generateTables();
            this._computeOuterWidths()
        });
        this._refreshHeaderSortIcons();
        this._setRightGridHeight();
        this._setScrollVLength();
        this._setScrollVNumEles(true);
        this._setScrollHLength();
        this._refreshPager()
    };
    f.refreshSortingDataAndView = function () {
        this._refreshSortingDataAndView({
            sorting: true
        })
    };
    f.refreshDataAndView = function (j) {
        this.data = null;
        this.sRows.setDirty();
        this.sCells.setDirty();
        var i = this.options.dataModel;
        if (i.location == "remote") {
            i.data = null;
            this.remoteRequest()
        } else {
            this._refreshSortingDataAndView({
                keepSelection: j,
                sorting: true
            })
        }
    };
    f.getColIndxFromDataIndx = function (k) {
        var j = this.colModel;
        for (var l = 0; l < j.length; l++) {
            if (j[l].dataIndx == k) {
                return l
            }
        }
    };
    f._refreshSortingDataAndView = function (m) {
        var n = m.sorting,
            q = m.fn,
            i = m.keepSelection;
        if (!i) {
            this.sRows.removeAll({
                raiseEvent: true
            });
            this.sCells.removeAll({
                raiseEvent: true
            })
        }
        var s = this.options.dataModel,
            t = this.colModel,
            o = s.sortIndx,
            k = this.getColIndxFromDataIndx(o);
        if (o == null || k == null) {
            n = false
        }
        var j = s.sortDir;
        var p = this;
        if (n == true) {
            if (s.sorting == "remote") {
                this.remoteRequest(q)
            } else {
                var l = t[k];
                var r = l.dataType;
                this._sortLocalData(o, j, r, s.data);
                this.sRows.setDirty();
                this.sCells.setDirty();
                this._refreshDataFromDataModel();
                p._refreshViewAfterDataSort();
                if (typeof q == "function") {
                    q()
                }
            }
        } else {
            if (s.location == "remote") {
                this.remoteRequest(q)
            } else {
                if (this.data == null) {
                    this._refreshDataFromDataModel()
                }
                p._refreshViewAfterDataSort();
                if (typeof q == "function") {
                    q()
                }
            }
        }
    };
    f._computeOuterWidths = function (l) {
        var k = this.options,
            n = k.columnBorders,
            j = this.colModel,
            p = j.length;
        for (var m = 0; m < p; m++) {
            var o = j[m];
            this.outerWidths[m] = parseInt(o.width) + ((n) ? 1 : 0)
        }
        this.numberCell_outerWidth = this.numberCellWidth + 1;
        return
    };
    f._setOption = function (j, k) {
        this.refreshRequired = true;
        if (j == "height") {
            this.element.height(k);
            h.Widget.prototype._setOption.call(this, j, k)
        } else {
            if (j == "width") {
                this.element.width(k);
                h.Widget.prototype._setOption.call(this, j, k)
            } else {
                if (j == "title") {
                    h.Widget.prototype._setOption.call(this, j, k);
                    this._refreshTitle()
                } else {
                    if (j == "roundCorners") {
                        if (k) {
                            this.element.addClass("ui-corner-all");
                            this.$top.addClass("ui-corner-top");
                            this.$bottom.addClass("ui-corner-bottom")
                        } else {
                            this.element.removeClass("ui-corner-all");
                            this.$top.removeClass("ui-corner-top");
                            this.$bottom.removeClass("ui-corner-bottom")
                        }
                        this.refreshRequired = false
                    } else {
                        if (j == "freezeCols") {
                            if (!isNaN(k) && k >= 0 && parseInt(k) <= this.colModel.length - 2) {
                                this.options.freezeCols = this.freezeCols = parseInt(k);
                                this._setScrollHLength();
                                h.Widget.prototype._setOption.call(this, j, k)
                            }
                        } else {
                            if (j == "resizable") {
                                h.Widget.prototype._setOption.call(this, j, k)
                            } else {
                                if (j == "scrollModel") {
                                    var l = k;
                                    for (var j in l) {
                                        this.options.scrollModel[j] = l[j]
                                    }
                                } else {
                                    if (j == "dataModel") {
                                        h.Widget.prototype._setOption.call(this, j, k);
                                        var i = k.paging;
                                        if (this.$footer.hasClass("pq-pager") == false && (i == "local" || i == "remote")) {
                                            this._initPager()
                                        } else {
                                            if (this.$footer.hasClass("pq-pager") && (i != "local" && i != "remote")) {
                                                this.$footer.pqPager("destroy");
                                                this.$footer.html("&nbsp;")
                                            }
                                        }
                                        this.refreshDataAndView()
                                    } else {
                                        if (j == "selectionModel") {
                                            var l = k;
                                            for (var j in l) {
                                                this.options.selectionModel[j] = l[j]
                                            }
                                            this.refreshRequired = false
                                        } else {
                                            if (j == "colModel") {
                                                h.Widget.prototype._setOption.call(this, j, k);
                                                this._refreshHeader();
                                                this._refreshWidths();
                                                this._refreshDataIndices()
                                            } else {
                                                if (j == "disabled") {
                                                    if (k == true) {
                                                        this._disable()
                                                    } else {
                                                        this._enable()
                                                    }
                                                    this.refreshRequired = false
                                                } else {
                                                    if (j == "numberCell") {
                                                        this.numberCell = k;
                                                        h.Widget.prototype._setOption.call(this, j, k)
                                                    } else {
                                                        if (j == "numberCellWidth") {
                                                            this.numberCellWidth = k;
                                                            h.Widget.prototype._setOption.call(this, j, k)
                                                        } else {
                                                            if (j == "customData") {
                                                                h.Widget.prototype._setOption.call(this, j, k);
                                                                this.refreshRequired = false
                                                            } else {
                                                                if (j == "strLoading") {
                                                                    h.Widget.prototype._setOption.call(this, j, k);
                                                                    this.generateLoading();
                                                                    this.refreshRequired = false
                                                                } else {
                                                                    if (j == "topVisible") {
                                                                        if (k == true) {
                                                                            this.$top.css("display", "")
                                                                        } else {
                                                                            this.$top.css("display", "none")
                                                                        }
                                                                    } else {
                                                                        if (j == "bottomVisible") {
                                                                            if (k == true) {
                                                                                this.$bottom.css("display", "")
                                                                            } else {
                                                                                this.$bottom.css("display", "none")
                                                                            }
                                                                        } else {
                                                                            h.Widget.prototype._setOption.call(this, j, k)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    f._setOptions = function () {
        h.Widget.prototype._setOptions.apply(this, arguments);
        if (this.refreshRequired) {
            this._refresh()
        }
        this.refreshRequired = true
    };
    f._generateCellRowOutline = function (l) {
        var j = l.$td,
            m = l.$tr,
            n = this;
        if (m) {
            var k = n._calcRightEdgeCol(n.colModel.length - 1);
            k -= 4;
            var p = m[0].offsetHeight - 4;
            var q = h(m[0].offsetParent);
            var i = q[0].offsetParent;
            var r = m[0].offsetLeft + q[0].offsetLeft;
            var o = m[0].offsetTop + q[0].offsetTop;
            n._generateCellHighlighter(i, r, o, k, p)
        } else {
            if (j) {
                var q = h(j[0].offsetParent);
                var i = q[0].offsetParent;
                var k = j[0].offsetWidth - 4;
                var p = j[0].offsetHeight - 4;
                var r = j[0].offsetLeft + q[0].offsetLeft;
                var o = j[0].offsetTop + q[0].offsetTop;
                n._generateCellHighlighter(i, r, o, k, p)
            }
        }
    };
    f._removeCellRowOutline = function () {
        if (this.$div_focus) {
            this._fixFireFoxContentEditableIssue();
            this.$div_focus.remove();
            this.$div_focus = null
        }
    };
    f._generateCellHighlighter = function (k, l, m, j, i) {
        if (this.$div_focus && this.$div_focus[0].offsetParent == k) {
            if (this.$td_edit != null) {
                this._fixFireFoxContentEditableIssue();
                this.$div_focus.empty().removeClass("pq-cell-selected-border-edit");
                this.$td_edit = null
            }
            this.$div_focus.css({
                left: l,
                top: m,
                height: i,
                width: j
            })
        } else {
            if (this.$div_focus) {
                this.$div_focus.remove()
            }
            this.$div_focus = h("<div class='pq-cell-selected-border'></div>").appendTo(k);
            this.$div_focus.css({
                left: l,
                top: m,
                height: i,
                width: j
            })
        }
    };
    f._selectRow = function (j, i) {
        this.selectRow(j, i)
    };
    f._findfirstUnhiddenColIndx = function () {
        for (var j = 0; j < this.colModel.length; j++) {
            if (!this.colModel[j].hidden) {
                return j
            }
        }
    };
    f.selectRow = function (k) {
        var j = k.rowIndx,
            i = k.evt,
            l = k.offset;
        if (i && (i.type == "keydown" || i.type == "keypress")) {
            if (this.sRows.replace(k) == false) {
                return false
            }
        } else {
            if (this.sRows.add(k) == false) {
                return false
            }
        }
        if (i != null) {
            this._setGridFocus()
        }
        return true
    };
    f.scrollY = function (i) {
        this.$vscroll.pqScrollBar("option", "cur_pos", i).pqScrollBar("scroll")
    };
    f.bringRowIntoView = function (n) {
        var i = n.rowIndxPage;
        var u = this.init - this.offsetRow;
        var l = this._calcCurPosFromRowIndxPage(i);
        if (l < this.scrollCurPos) {
            this.$vscroll.pqScrollBar("option", "cur_pos", l).pqScrollBar("scroll")
        }
        var p = this.$tbl.find("tr[pq-row-indx=" + i + "]");
        if (p[0] == undefined) {
            this.$vscroll.pqScrollBar("option", "cur_pos", l).pqScrollBar("scroll")
        } else {
            var t = p[0].offsetTop + p[0].offsetHeight,
                k = this.$cont[0].offsetHeight,
                m = this._getScollBarHorizontalHeight();
            if (t > k - m) {
                var s = t - (k - m);
                var j = this.$tbl.children().children("tr");
                var r = 0,
                    o = 0;
                j.each(function (w, x) {
                    r += x.offsetHeight;
                    if (r >= s) {
                        o = w;
                        return false
                    }
                });
                var q = this.scrollCurPos + o;
                var v = this.$vscroll.pqScrollBar("option", "num_eles");
                if (v < q + 1) {
                    v = q + 1
                }
                this.$vscroll.pqScrollBar("option", {
                    num_eles: v,
                    cur_pos: q
                }).pqScrollBar("scroll")
            }
        }
    };
    f._bringCellIntoView = function (s) {
        var k = s.rowIndxPage,
            o = s.colIndx,
            p = false;
        var l;
        if (this.hidearrHS[o]) {
            this.hidearrHS[o] = false;
            var u = o - this.freezeCols - this._calcNumHiddenUnFrozens(o);
            this.$hscroll.pqScrollBar("option", "cur_pos", u).pqScrollBar("scroll");
            p = true
        } else {
            var l = this.$tbl.find("tr[pq-row-indx=" + k + "]>td[pq-col-indx=" + o + "]");
            if (l.length == 0) {
                return false
            }
            var q = this._calcRightEdgeCol(o).width;
            var w = 17;
            if (this.$vscroll.css("visibility") == "hidden" || this.$vscroll.css("display") == "none") {
                w = 0
            }
            if (q > this.$cont[0].offsetWidth - w) {
                var v = this._calcWidthCols(o) - (this.$cont[0].offsetWidth - w);
                var j = l.parent("tr").children("td");
                var m = this.colModel.length;
                var n = 0,
                    t = 0;
                for (var r = this.freezeCols; r < m; r++) {
                    if (!this.colModel[r].hidden) {
                        n += this.outerWidths[r]
                    }
                    if (r == o) {
                        t = r - this.freezeCols - this._calcNumHiddenUnFrozens(r);
                        break
                    } else {
                        if (n >= v) {
                            t = r - this.freezeCols - this._calcNumHiddenUnFrozens(r) + 1;
                            break
                        }
                    }
                }
                this.$hscroll.pqScrollBar("option", "cur_pos", t).pqScrollBar("scroll");
                p = true
            }
        }
        if (p) {
            var l = this.$tbl.find("tr[pq-row-indx=" + k + "]>td[pq-col-indx=" + o + "]");
            return l
        } else {
            return l
        }
    };
    f.selection = function (l) {
        var j = l.rowIndx,
            k = l.colIndx,
            m = l.method,
            i = l.type;
        if (i == "row") {
            return this["sRows"][m](l)
        } else {
            if (i == "cell") {
                return this["sCells"][m](l)
            }
        }
        return
    };
    f.setSelection = function (i) {
        if (i == null || i.rowIndx == null) {
            this.sRows.removeAll({
                raiseEvent: true
            });
            this.sCells.removeAll({
                raiseEvent: true
            });
            return
        }
        this._bringPageIntoView(i);
        return this._setSelection(i)
    };
    f._bringPageIntoView = function (p) {
        var n = p.rowIndx,
            m = this;
        var j = this.options.dataModel;
        if (j.paging == "local" && n >= 0) {
            var l = j.curPage;
            var o = j.rPP;
            var k = (l - 1) * o;
            var i = l * o;
            if (n >= k && n < i) { } else {
                j.curPage = Math.ceil((n + 1) / o);
                this._refreshDataFromDataModel();
                this._refreshViewAfterDataSort()
            }
        }
    };
    f._setSelection = function (m) {
        if (m == null) {
            this.sRows.removeAll({
                raiseEvent: true
            });
            this.sCells.removeAll({
                raiseEvent: true
            });
            return false
        }
        var n = m.offset = (m.offset == null) ? this.getRowIndxOffset() : m.offset,
            k = m.rowIndx = (m.rowIndx == null) ? m.rowIndxPage + n : m.rowIndx,
            i = m.rowIndxPage = (m.rowIndxPage == null) ? m.rowIndx - n : m.rowIndxPage,
            l = m.colIndx,
            j = m.evt;
        if (i < 0 || l < 0) {
            return false
        }
        if (this.data == null || this.data.length == 0) {
            return false
        }
        if (i >= this.data.length || l >= this.colModel.length) {
            return false
        }
        this.bringRowIntoView({
            rowIndxPage: i
        });
        if (l == null) {
            return this.selectRow({
                rowIndx: k,
                evt: j
            })
        }
        this._bringCellIntoView({
            rowIndxPage: i,
            colIndx: l
        });
        return this.selectCell({
            rowIndx: k,
            colIndx: l,
            evt: j
        })
    };
    f.saveEditCell = function () {
        if (this.$td_edit == null) {
            return
        }
        var j = this.$td_edit,
            p = this.getCellIndices(j),
            n = this.getRowIndxOffset(),
            k = p.colIndx,
            i = p.rowIndxPage,
            o = p.rowIndx = i + n,
            t = this.colModel,
            l = p.column = t[k],
            r = p.dataIndx = l.dataIndx,
            m = this.data[i][r];
        if (i != null) {
            var s = this._getEditCellData(p);
            if (s != m) {
                this.data[i][r] = s;
                p.data = this.data;
                if (this._trigger("cellSave", null, p) == false) {
                    return
                }
                this.refreshRow(p);
                this._fixTableViewPort();
                var q = this;
                if (q.options.flexHeight) {
                    q.setGridHeightFromTable();
                    q._fixIEFooterIssue()
                } else {
                    q.bringRowIntoView({
                        rowIndxPage: i
                    })
                }
            }
        }
    };
    f._fixTableViewPort = function () {
        var i = this.$cont[0];
        i.scrollTop = 0;
        i.scrollLeft = 0
    };
    f._fixIEFooterIssue = function () {
        h(".pq-grid-footer").css({
            position: "absolute"
        });
        h(".pq-grid-footer").css({
            position: "relative"
        })
    };
    f.refreshColumn = function (l) {
        var o = this.options.customData,
            k = l.colIndx = (l.colIndx == null) ? this.getColIndxFromDataIndx(l.dataIndx) : l.colIndx,
            n = this.getRowIndxOffset();
        for (var m = this.init; m <= this["final"]; m++) {
            var i = l.rowIndxPage = m;
            l.rowIndx = i + n;
            var j = l.column = this.colModel[k];
            l.$td = this.getCell(l);
            l.rowData = this.data[i];
            l.customData = o;
            this.cTable._renderCell(l)
        }
    };
    f.refreshCell = function (q) {
        if (!this.data) {
            return
        }
        var o = q.offset = (q.offset == null) ? this.getRowIndxOffset() : q.offset,
            p = q.rowIndx = (q.rowIndx == null) ? q.rowIndxPage + o : q.rowIndx,
            i = q.rowIndxPage = (q.rowIndxPage == null) ? q.rowIndx - o : q.rowIndxPage,
            r = q.dataIndx,
            k = q.colIndx = (q.colIndx == null) ? this.getColIndxFromDataIndx(r) : q.colIndx,
            j = q.$td = (q.$td == null) ? this.getCell(q) : q.$td,
            m = q.column = this.colModel[k],
            l = this.data[i];
        if (!l) {
            return
        }
        var n = q;
        n.rowData = l;
        n.customData = this.options.customData;
        if (j && j.length > 0) {
            this.cTable._renderCell(n)
        }
    };
    f.refreshRow = function (q) {
        if (!this.data) {
            return
        }
        var s = this.options,
            o = q.offset = (q.offset == null) ? this.getRowIndxOffset() : q.offset,
            p = q.rowIndx = (q.rowIndx == null) ? q.rowIndxPage + o : q.rowIndx,
            i = q.rowIndxPage = (q.rowIndxPage == null) ? q.rowIndx - o : q.rowIndxPage,
            r = (q.$tr == null) ? this.getRow(q) : q.$tr,
            t = this.colModel,
            m = this.data[i];
        if (!m) {
            return
        }
        var n = {
            rowIndx: p,
            rowIndxPage: i,
            rowData: m,
            customData: s.customData
        };
        for (var k = 0; k < t.length; k++) {
            var l = t[k];
            var j = r.find("td[pq-col-indx=" + k + "]");
            n.$td = j;
            n.colIndx = k;
            n.column = l;
            if (j && j.length > 0) {
                this.cTable._renderCell(n)
            }
        }
    };
    f.quitEditMode = function (i) {
        if (this.$td_edit) {
            var j = this.$td_edit;
            this.disableSelection();
            this._setGridFocus();
            this._trigger("quitEditMode", i, {
                $td: j,
                dataModel: this.options.dataModel
            });
            this._removeCellRowOutline();
            this.$td_edit = null
        }
    };
    f.getData = function () {
        return this.data
    };
    f.getViewPortRowsIndx = function () {
        return {
            beginIndx: this.init,
            endIndx: this["final"]
        }
    };
    f.getRowIndxOffset = function () {
        var j = this.options.dataModel,
            i = j.paging,
            m = 0;
        if (i == "local" || i == "remote") {
            var k = j.curPage;
            var l = j.rPP;
            m = (l * (k - 1))
        }
        return m
    };
    f.getRowOffset = function () {
        return this.offsetRow
    };
    f._cellblurred = function () {
        this.$div_focus.remove();
        this.$div_focus = null;
        this.$td_focus = null;
        this.$tr_focus = null
    };
    f.selectCell = function (l) {
        var j = l.rowIndx,
            k = l.colIndx,
            i = l.evt;
        if (i && (i.type == "keydown" || i.type == "keypress")) {
            if (this.sCells.replace(l) == false) {
                return false
            }
        } else {
            if (this.sCells.add(l) == false) {
                return false
            }
        }
        if (i != null) {
            this._setGridFocus()
        }
        return true
    };
    f._setGridFocus = function () {
        var i = this;
        window.setTimeout(function () {
            if (i.$td_edit == null) {
                i.$grid_inner.focus()
            }
        },
            0)
    };
    f.getEditCell = function () {
        if (this.$td_edit) {
            return {
                $td: this.$td_edit,
                $cell: this.$div_focus
            }
        } else {
            return null
        }
    };
    f.editCell = function (i) {
        var j = this.getCell(i);
        if (j != null && j.length == 1) {
            if (this.$td_edit && this.$td_edit[0] != j[0]) {
                this.quitEditMode()
            }
            this._editCell(j);
            return j
        }
    };
    f.getFirstEditableColIndx = function () {
        if (!this.options.editable) {
            return -1
        }
        var j = this.colModel;
        for (var k = 0; k < j.length; k++) {
            var l = j[k];
            if (l.editable == false) {
                continue
            }
            return k
        }
        return -1
    };
    f._editFirstCellInRow = function (k) {
        var j = this.getFirstEditableColIndx();
        if (j != -1) {
            var i = k.rowIndxPage;
            k.colIndx = j;
            this.bringRowIntoView(k);
            var l = this._bringCellIntoView(k);
            if (l && l.length > 0) {
                this._editCell(l)
            }
        }
    };
    f._editCell = function (j) {
        var p = this;
        var o = p.getCellIndices(j);
        var i = o.rowIndxPage,
            m = this.getRowIndxOffset(),
            n = i + m,
            k = o.colIndx,
            l = this.colModel[k],
            q = l.dataIndx;
        if (this.$td_edit && this.$td_edit[0] == j[0]) {
            return false
        }
        this.$td_edit = j;
        this.enableSelection();
        this._removeCellRowOutline();
        this._generateCellRowOutline({
            $td: j
        });
        var r = this.$div_focus.addClass("pq-cell-selected-border-edit");
        if (l.align == "right") {
            r.css("text-align", "right")
        } else {
            if (l.align == "center") {
                r.css("text-align", "center")
            } else {
                r.css("text-align", "left")
            }
        }
        if (l.editor) {
            l.editor({
                $cell: r,
                data: this.data,
                dataModel: this.dataModel,
                rowIndx: n,
                rowIndxPage: i,
                colIndx: q
            })
        } else {
            r.html("<div contenteditable='true' tabindx='0' class='pq-grid-editor-default'></div>");
            var p = this;
            r.children().html(p.data[i][q])
        }
        var p = this;
        window.setTimeout(function () {
            if (p.$td_edit != null) {
                var s = p.$div_focus;
                s.children().focus()
            }
        },
            0)
    };
    f.getRow = function (k) {
        var i = k.rowIndxPage;
        var j;
        if (this.$tbl != undefined) {
            j = this.$tbl.find("tr[pq-row-indx=" + i + "]")
        }
        return j
    };
    f.getCell = function (k) {
        var i = (k.rowIndxPage == null) ? (k.rowIndx - this.getRowIndxOffset()) : k.rowIndxPage,
            j = k.colIndx;
        var l;
        if (this.$tbl != undefined) {
            l = this.$tbl.find("tr[pq-row-indx=" + i + "]>td[pq-col-indx=" + j + "]")
        }
        return l
    };
    f.getEditCellData = function () {
        if (this.$td_edit) {
            var i = this.getCellIndices(this.$td_edit);
            return this._getEditCellData(i)
        } else {
            return null
        }
    };
    f._getEditCellData = function (o) {
        var n = o.colIndx,
            i = o.rowIndxPage,
            k = (o.rowIndx != null) ? o.rowIndx : i + this.getRowIndxOffset(),
            j = (o.column) ? o.column : this.colModel[n],
            l = (o.$cell) ? o.$cell : this.$div_focus;
        if (j.getEditCellData) {
            var m = j.getEditCellData({
                $cell: l,
                data: this.data,
                dataIndx: j.dataIndx,
                dataModel: this.dataModel,
                rowIndx: k,
                rowIndxPage: i,
                colIndx: n
            })
        } else {
            var m = l.children().html()
        }
        return m
    };
    f.getCellIndices = function (l) {
        if (l == null || l.length == 0) {
            return {
                rowIndxPage: null,
                colIndx: null
            }
        }
        var j = l.parent("tr");
        var m = j.parent("tbody");
        var i = parseInt(j.attr("pq-row-indx"));
        var k = parseInt(l.attr("pq-col-indx"));
        return {
            rowIndxPage: i,
            colIndx: k
        }
    };
    f._incrRowIndx = function (k, n) {
        var m = k,
            n = (n == null) ? 1 : n,
            l = 0;
        for (var o = k + 1, j = this.data.length; o < j; o++) {
            var p = this._getRowPQData(o, "hidden");
            if (!p) {
                l++;
                m = o;
                if (l == n) {
                    return m
                }
            }
        }
        return m
    };
    f._decrRowIndx = function (j, m) {
        var l = j,
            m = (m == null) ? 1 : m,
            k = 0;
        for (var n = j - 1; n >= 0; n--) {
            var o = this._getRowPQData(n, "hidden");
            if (!o) {
                k++;
                l = n;
                if (k == m) {
                    return l
                }
            }
        }
        return l
    };
    f._incrIndx = function (i, l) {
        var k = this;
        if (l == null) {
            if (i == this._getLastVisibleRowIndxPage(this.data)) {
                return null
            }
            i = this._incrRowIndx(i);
            return {
                rowIndxPage: i
            }
        }
        var j;
        do {
            l++;
            if (l >= k.colModel.length) {
                if (i == this._getLastVisibleRowIndxPage(this.data)) {
                    return null
                }
                i = this._incrRowIndx(i);
                l = 0
            }
            j = k.colModel[l]
        }
        while (j && j.hidden);
        return {
            rowIndxPage: i,
            colIndx: l
        }
    };
    f._decrIndx = function (i, l) {
        var k = this;
        if (l == null) {
            if (i == this._getFirstVisibleRowIndxPage(this.data)) {
                return null
            }
            i = this._decrRowIndx(i);
            return {
                rowIndxPage: i
            }
        }
        var j;
        do {
            l--;
            if (l < 0) {
                if (i == this._getFirstVisibleRowIndxPage(this.data)) {
                    return null
                }
                i = this._decrRowIndx(i);
                l = k.colModel.length - 1
            }
            j = k.colModel[l]
        }
        while (j && j.hidden);
        return {
            rowIndxPage: i,
            colIndx: l
        }
    };
    f._incrEditIndx = function (i, l) {
        var k = this;
        var j;
        do {
            l++;
            if (l >= k.colModel.length) {
                if (i == this._getLastVisibleRowIndxPage(this.data)) {
                    return null
                }
                i = this._incrRowIndx(i);
                l = 0
            }
            j = k.colModel[l]
        }
        while (j && (j.hidden || j.editable === false));
        return {
            rowIndxPage: i,
            colIndx: l
        }
    };
    f._decrEditIndx = function (i, l) {
        var k = this;
        var j;
        do {
            l--;
            if (l < 0) {
                if (i == this._getFirstVisibleRowIndxPage(this.data)) {
                    return null
                }
                i = this._decrRowIndx(i);
                l = k.colModel.length - 1
            }
            j = k.colModel[l]
        }
        while (j && (j.hidden || j.editable === false));
        return {
            rowIndxPage: i,
            colIndx: l
        }
    };
    f.addColumn = function (m, n) {
        var l = this.options,
            j = l.colModel,
            p = l.dataModel.data;
        j.push(m);
        this._refreshHeader();
        for (var k = 0; k < p.length; k++) {
            var o = p[k];
            o.push("")
        }
    };
    f.keyPressDown = function (y) {
        var t = this,
            w = this.sCells.getSelection(),
            o = this.sRows.getSelection(),
            p = t.getRowIndxOffset(),
            k = t.options.selectionModel,
            q,
            l;
        var v = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            tab: 9,
            enter: 13,
            pageDown: 34,
            pageUp: 33,
            spaceBar: 32,
            esc: 27,
            home: 36,
            end: 35
        };
        if (t.$td_edit) {
            var j = h(t.$td_edit[0]);
            var r = t.getCellIndices(j),
                i = r.rowIndxPage,
                q = i + p,
                l = r.colIndx,
                n = this.colModel[l],
                m = (n.editModel) ? n.editModel.saveKey : null;
            if (t._trigger("cellEditKeyDown", y, {
                dataModel: this.dataModel,
                $cell: this.$div_focus,
                rowIndx: q,
                rowIndxPage: i,
                colIndx: l,
                $td: j,
                column: t.colModel[l]
            }) == false) {
                return false
            }
            if (y.keyCode == v.tab) {
                var r;
                if (y.shiftKey) {
                    r = t._decrEditIndx(i, l)
                } else {
                    r = t._incrEditIndx(i, l)
                }
                t.saveEditCell();
                if (r == null) {
                    y.preventDefault();
                    return false
                }
                t.quitEditMode(y);
                if (this.options.selectionModel.type == "row") {
                    if (r.rowIndxPage != i) {
                        t._setSelection(null);
                        t._setSelection({
                            rowIndxPage: r.rowIndxPage
                        })
                    }
                    t._bringCellIntoView({
                        rowIndxPage: r.rowIndxPage,
                        colIndx: r.colIndx
                    })
                } else {
                    if ((r.rowIndxPage != i || r.colIndx != l) && this.options.selectionModel.type == "cell") {
                        t._setSelection(null);
                        t._setSelection({
                            rowIndxPage: r.rowIndxPage,
                            colIndx: r.colIndx
                        })
                    }
                }
                i = r.rowIndxPage;
                l = r.colIndx;
                var x = this.getCell({
                    rowIndxPage: r.rowIndxPage,
                    colIndx: r.colIndx
                });
                if (x && x.length > 0) {
                    this._editCell(x)
                }
                y.preventDefault();
                return false
            } else {
                if (y.keyCode == m) {
                    t.saveEditCell();
                    t.quitEditMode(y)
                } else {
                    if (m == null && y.keyCode == this.options.editModel.saveKey) {
                        t.saveEditCell();
                        t.quitEditMode(y)
                    } else {
                        if (y.keyCode == v.esc) {
                            t.quitEditMode(y);
                            y.preventDefault();
                            return false
                        } else {
                            if (y.keyCode == v.pageUp || y.keyCode == v.pageDown) {
                                y.preventDefault();
                                return false
                            }
                        }
                    }
                }
            }
            return
        } else {
            if (o.length > 0 && k.type == "row") {
                var r = o[o.length - 1],
                    q = r.rowIndx,
                    i = q - p
            } else {
                if (w.length > 0 && k.type == "cell") {
                    var r = w[w.length - 1],
                        q = r.rowIndx,
                        i = q - p,
                        u = r.dataIndx,
                        l = this.getColIndxFromDataIndx(u);
                    if (q == null || l == null) {
                        return
                    }
                    t._trigger("cellKeyDown", y, {
                        dataModel: this.dataModel,
                        rowIndx: q,
                        colIndx: l,
                        $td: r.$td,
                        column: t.colModel[l]
                    });
                    if (y.cancelBubble) {
                        return
                    }
                } else {
                    return
                }
            }
        }
        if (y.keyCode == v.left) {
            var r = t._decrIndx(i, l);
            if (r) {
                t._setSelection({
                    rowIndxPage: r.rowIndxPage,
                    colIndx: r.colIndx,
                    evt: y
                })
            }
            y.preventDefault();
            return
        } else {
            if (y.keyCode == v.right) {
                var r = t._incrIndx(i, l);
                if (r) {
                    t._setSelection({
                        rowIndxPage: r.rowIndxPage,
                        colIndx: r.colIndx,
                        evt: y
                    })
                }
                y.preventDefault();
                return
            } else {
                if (y.keyCode == v.tab) {
                    var r;
                    if (y.shiftKey) {
                        r = t._decrIndx(i, l)
                    } else {
                        r = t._incrIndx(i, l)
                    }
                    if (r) {
                        t._setSelection({
                            rowIndxPage: r.rowIndxPage,
                            colIndx: r.colIndx,
                            evt: y
                        })
                    }
                    y.preventDefault();
                    return
                } else {
                    if (y.keyCode == v.up) {
                        i = t._decrRowIndx(i);
                        if (r) {
                            t._setSelection({
                                rowIndxPage: i,
                                colIndx: l,
                                evt: y
                            })
                        }
                        y.preventDefault();
                        return
                    } else {
                        if (y.keyCode == v.down) {
                            i = t._incrRowIndx(i);
                            if (r) {
                                t._setSelection({
                                    rowIndxPage: i,
                                    colIndx: l,
                                    evt: y
                                })
                            }
                            y.preventDefault();
                            return
                        } else {
                            if (y.keyCode == v.pageDown || y.keyCode == v.spaceBar) {
                                var q = this._incrRowIndx(i, this.pageSize + 1) + p;
                                t._setSelection({
                                    rowIndx: q,
                                    colIndx: l,
                                    evt: y
                                });
                                y.preventDefault();
                                return
                            } else {
                                if (y.keyCode == v.pageUp) {
                                    var q = this._decrRowIndx(i, this.pageSize + 1) + p;
                                    t._setSelection({
                                        rowIndx: q,
                                        colIndx: l,
                                        evt: y
                                    });
                                    y.preventDefault();
                                    return
                                } else {
                                    if (y.keyCode == v.home) {
                                        q = 0 + p;
                                        t._setSelection({
                                            rowIndx: q,
                                            colIndx: l,
                                            evt: y
                                        });
                                        y.preventDefault();
                                        return
                                    } else {
                                        if (y.keyCode == v.end) {
                                            q = t.data.length - 1 + p;
                                            t._setSelection({
                                                rowIndx: q,
                                                colIndx: l,
                                                evt: y
                                            });
                                            y.preventDefault();
                                            return
                                        } else {
                                            if (y.keyCode == v.enter) {
                                                if (this.options.selectionModel.type == "row") {
                                                    var s,
                                                        j;
                                                    if (o.length > 0) {
                                                        t._editFirstCellInRow({
                                                            rowIndxPage: i
                                                        })
                                                    }
                                                } else {
                                                    if (w.length > 0) {
                                                        var j = this.getCell({
                                                            rowIndxPage: i,
                                                            colIndx: l
                                                        });
                                                        if (j && j.length > 0) {
                                                            if (this.isEditableCell({
                                                                colIndx: l
                                                            })) {
                                                                t._editCell(j)
                                                            }
                                                        }
                                                    }
                                                }
                                                y.preventDefault();
                                                return
                                            } else { }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    f._calcNumHiddenFrozens = function () {
        var j = 0;
        for (var k = 0; k < this.freezeCols; k++) {
            if (this.colModel[k].hidden) {
                j++
            }
        }
        return j
    };
    f._calcNumHiddenUnFrozens = function (m) {
        var k = 0;
        var j = (m != null) ? m : this.colModel.length;
        for (var l = this.freezeCols; l < j; l++) {
            if (this.colModel[l].hidden) {
                k++
            }
        }
        return k
    };
    f._setScrollHLength = function () {
        if (!this.options.scrollModel.horizontal) {
            this.$hscroll.css("visibility", "hidden");
            this.$hvscroll.css("visibility", "hidden");
            return
        } else {
            this.$hscroll.css("visibility", "");
            this.$hvscroll.css("visibility", "")
        }
        var n = this.$cont[0].offsetWidth;
        if (this.numberCell) {
            n -= this.numberCell_outerWidth
        }
        var j = this.colModel;
        for (var l = 0; l < this.freezeCols; l++) {
            var m = j[l];
            if (!m.hidden) {
                n -= this.outerWidths[l]
            }
        }
        var k = this._getScollBarVerticalWidth();
        if (k == 0) {
            this.$hscroll.css("right", 0)
        } else {
            this.$hscroll.css("right", "")
        }
        n -= k;
        this.$hscroll.pqScrollBar("option", "length", n)
    };
    f._setScrollHNumEles = function () {
        var i = this.colModel.length - this.freezeCols - this._calcNumHiddenUnFrozens();
        this.$hscroll.pqScrollBar("option", "num_eles", (i))
    };
    f._getScollBarHorizontalHeight = function () {
        var i = 17;
        if (this.$hscroll.css("visibility") == "hidden" || this.options.scrollModel.horizontal == false || this.$hscroll.css("display") == "none") {
            i = 0
        }
        return i
    };
    f._getScollBarVerticalWidth = function () {
        var i = 17;
        if (this.$vscroll.css("visibility") == "hidden" || this.options.flexHeight || this.$vscroll.css("display") == "none") {
            i = 0
        }
        return i
    };
    f._setScrollVNumEles = function (t) {
        var q = this,
            o = this.$vscroll,
            v = o.pqScrollBar("option"),
            u = parseInt(v.num_eles),
            r = parseInt(v.cur_pos);
        var n = this._getScollBarHorizontalHeight();
        var p = this.data;
        var m = p ? this._getTotalVisibleRows(p) : 0;
        var l = this.$cont[0].offsetHeight;
        var k = (this.$tbl) ? this.$tbl[0].offsetHeight : 0;
        if (k > 0 && k > l - n) {
            var j = this.$tbl.children().children("tr");
            var s = 0,
                i = 0;
            j.each(function (w, x) {
                s += x.offsetHeight;
                if (s >= l - n) {
                    i = (w > 1) ? (w - 1) : 0;
                    return false
                }
            });
            u = m - i + 1
        } else {
            u = r + 1
        }
        if (u < r + 1) {
            u = r + 1
        }
        if (t) {
            q.$vscroll.pqScrollBar("option", "num_eles", u)
        } else {
            q.$vscroll.pqScrollBar("setNumEles", u)
        }
        return u
    };
    f._getFirstVisibleRowIndxPage = function (m) {
        for (var k = 0, j = m.length; k < j; k++) {
            var l = this._getRowPQData(k, "hidden");
            if (!l) {
                return k
            }
        }
    };
    f._getLastVisibleRowIndxPage = function (l) {
        for (var j = l.length - 1; j >= 0; j--) {
            var k = this._getRowPQData(j, "hidden");
            if (!k) {
                return j
            }
        }
    };
    f._getTotalVisibleRows = function (n) {
        if (this.options.treeViewModel) {
            var k = 0;
            for (var l = 0, j = n.length; l < j; l++) {
                var m = this._getRowPQData(l, "hidden");
                if (!m) {
                    k++
                }
            }
            return k
        } else {
            return n.length
        }
    };
    f._setScrollVLength = function () {
        var k = this.$cont.height();
        var j = this._getScollBarHorizontalHeight();
        this.$vscroll.css("bottom", j);
        var i = (k - j);
        this.$vscroll.pqScrollBar("option", "length", i);
        return
    };
    f._setInnerGridHeight = function () {
        if (this.options.flexHeight) {
            return
        }
        var i = (this.element.height() - ((this.options.topVisible) ? this.$top[0].offsetHeight : 0) - ((this.options.bottomVisible) ? this.$bottom[0].offsetHeight : 0));
        this.$grid_inner.height(i + "px")
    };
    f._setRightGridHeight = function () {
        this.$header_o.height(this.$header_left.height() - 2);
        if (this.options.flexHeight) {
            return
        }
        this.$vscroll.css("visibility", "");
        if (this.$tbl) {
            this.$tbl.css("marginBottom", 0)
        }
        var j = (this.element.height() - this.$header_o[0].offsetHeight - ((this.options.topVisible) ? this.$top[0].offsetHeight : 0) - ((this.options.bottomVisible) ? this.$bottom[0].offsetHeight : 0));
        var i = 0;
        this.$cont.height((j - i) + "px")
    };
    f.setGridHeightFromTable = function () {
        var k = 0;
        var j = this._getScollBarHorizontalHeight();
        if (this.$tbl) {
            k = (this.$tbl[0].offsetHeight - 1);
            this.$tbl.css("marginBottom", j)
        } else {
            k = 22
        }
        var i = k + j;
        this.$cont.height("");
        this.element.height("");
        this.$grid_inner.height("");
        this.$vscroll.css("visibility", "hidden")
    };
    f._setGridWidthFromTable = function () {
        var i = 17;
        if (this.$vscroll.css("visibility") == "hidden" || this.$vscroll.css("display") == "none") {
            i = 0
        }
        if (this.$tbl) {
            this.element.width((this.$tbl[0].scrollWidth + i) + "px")
        } else {
            var j = this.$header_left.find("table")[0].scrollWidth;
            this.element.width((j) + "px")
        }
    };
    f._setRightGridWidth = function () { };
    f._bufferObj_getInit = function () {
        return this.init
    };
    f._bufferObj_getFinal = function () {
        return this["final"]
    };
    f._bufferObj_minRowsPerGrid = function () {
        var i = this.$cont[0].offsetHeight;
        return Math.ceil(i / this.rowHeight)
    };
    f._calcCurPosFromRowIndxPage = function (k) {
        if (!this.options.treeViewModel) {
            return k
        }
        var l = 0;
        for (var m = 0, j = this.data.length; m < j; m++) {
            if (m == k) {
                break
            }
            var n = this._getRowPQData(m, "hidden");
            if (!n) {
                l++
            }
        }
        return l
    };
    f._bufferObj_calcInitFinal = function () {
        var k = this.data;
        if (k == null || k.length == 0) {
            this["final"] = this["init"] = null
        } else {
            if (this.options.flexHeight) {
                this.init = 0;
                this["final"] = k.length - 1
            } else {
                var j = parseInt(this.$vscroll.pqScrollBar("option", "cur_pos"));
                this.scrollCurPos = parseInt(j);
                if (isNaN(j) || j < 0) {
                    this.init = 0
                } else {
                    this.init = j
                }
                if (this.init + 1 > k.length) {
                    this.init = k.length - 1
                }
                var i = this._bufferObj_minRowsPerGrid();
                this.pageSize = i;
                this["final"] = this.init + i;
                if (this["final"] + 1 > k.length) {
                    this["final"] = k.length - 1
                }
            }
        }
    };
    f._bufferObj_calcInitFinalH = function () {
        var l = parseInt(this.$hscroll.pqScrollBar("option", "cur_pos"));
        var o = 0;
        var n = 0,
            k = this.colModel;
        for (var m = this.freezeCols, j = k.length; m < j; m++) {
            if (k[m].hidden) {
                o++
            } else {
                if (n == l) {
                    break
                } else {
                    o++;
                    n++
                }
            }
        }
        this.initH = o
    };
    f._calcWidthCols = function (l) {
        var k = 0;
        if (this.numberCell) {
            k += this.numberCell_outerWidth
        }
        for (var j = 0; j <= l; j++) {
            if (!this.colModel[j].hidden) {
                k += this.outerWidths[j]
            }
        }
        return k
    };
    f._calcRightEdgeCol = function (m) {
        var k = 0,
            l = 0;
        if (this.numberCell) {
            k += this.numberCell_outerWidth;
            l++
        }
        for (var j = 0; j <= m; j++) {
            if (!this.colModel[j].hidden && this.hidearrHS[j] == false) {
                k += this.outerWidths[j];
                l++
            }
        }
        return {
            width: k,
            cols: l
        }
    };
    f._getDragHelper = function (j) {
        var i = h(j.currentTarget);
        this.$cl = h("<div class='pq-grid-drag-bar'></div>").appendTo(this.$grid_inner);
        this.$clleft = h("<div class='pq-grid-drag-bar'></div>").appendTo(this.$grid_inner);
        var l = parseInt(i.attr("pq-grid-col-indx"));
        var k = this.$grid_inner.outerHeight();
        this.$cl.height(k);
        this.$clleft.height(k);
        var n = h("td[pq-grid-col-indx=" + l + "]", this.$header)[0];
        var m = n.offsetLeft + ((l > this.options.freezeCols) ? parseInt(this.$header[1].style.left) : 0);
        this.$clleft.css({
            left: m
        });
        m = m + n.offsetWidth;
        this.$cl.css({
            left: m
        })
    };
    f._setDragLimits = function (p) {
        var o = this;
        var i = o.$header_left;
        if (p >= this.options.freezeCols) {
            i = o.$header_right
        }
        var n = i.find("div.pq-grid-col-resize-handle[pq-grid-col-indx=" + p + "]");
        var k = i.find("td.pq-grid-col[pq-grid-col-indx=" + p + "]");
        var m = k.offset().left + o.minWidth;
        var j = 17;
        if (this.options.flexHeight || this.$vscroll.css("visibility") == "hidden") {
            j = 0
        }
        var l = o.$cont.offset().left + o.$cont[0].offsetWidth - j + 20;
        n.draggable("option", "containment", [m, 0, l, 0])
    };
    f._getOrderIndx = function (j) {
        var i = this.options.columnOrder;
        if (i != null) {
            return i[j]
        } else {
            return j
        }
    };
    f.nestedCols = function (t, s, u) {
        var r = t.length;
        var p = [];
        if (s == null) {
            s = 1
        }
        var o = s,
            q = 0,
            j = 0,
            l = 0;
        for (var n = 0; n < r; n++) {
            var k = t[n];
            if (u == true) {
                k.hidden = u
            }
            if (k.colModel != null) {
                var m = this.nestedCols(k.colModel, s + 1, k.hidden);
                p = p.concat(m.colModel);
                if (m.colSpan > 0) {
                    if (m.depth > o) {
                        o = m.depth
                    }
                    k.colSpan = m.colSpan;
                    q += m.colSpan
                } else {
                    k.colSpan = 0;
                    k.hidden = true
                }
                k.childCount = m.childCount;
                l += m.childCount
            } else {
                if (k.hidden) {
                    k.colSpan = 0
                } else {
                    k.colSpan = 1;
                    q++
                }
                k.childCount = 0;
                l++;
                p.push(k)
            }
        }
        return {
            depth: o,
            colModel: p,
            colSpan: q,
            width: j,
            childCount: l
        }
    };
    f.getHeadersCells = function () {
        var s = this.options.colModel,
            A = this.colModel.length,
            B = this.depth;
        var j = [];
        for (var q = 0; q < B; q++) {
            j[q] = [];
            var y = 0;
            var r = 0,
                m = 0;
            for (var p = 0; p < A; p++) {
                var u;
                if (q == 0) {
                    u = s[y]
                } else {
                    var n = j[q - 1][p];
                    var o = n.colModel;
                    if (o == null) {
                        u = n
                    } else {
                        var x = (p - n.leftPos);
                        var v = 0,
                            l = 0;
                        var i = 0;
                        for (var w = 0; w < o.length; w++) {
                            l += (o[w].childCount > 0) ? o[w].childCount : 1;
                            if (x < l) {
                                i = w;
                                break
                            }
                        }
                        u = o[i]
                    }
                }
                var z = (u.childCount) ? u.childCount : 1;
                if (p == m) {
                    u.leftPos = p;
                    j[q][p] = u;
                    m += z;
                    if (s[y + 1]) {
                        y++
                    }
                } else {
                    j[q][p] = j[q][p - 1]
                }
            }
        }
        this.headerCells = j;
        return j
    };
    f.assignRowSpan = function () {
        var m = this.options.colModel,
            i = this.colModel.length,
            p = this.headerCells,
            k = this.depth;
        for (var j = 0; j < i; j++) {
            for (var r = 0; r < k; r++) {
                var o = p[r][j];
                if (j > 0 && o == p[r][j - 1]) {
                    continue
                } else {
                    if (r > 0 && o == p[r - 1][j]) {
                        continue
                    }
                }
                var n = 1;
                for (var q = r + 1; q < k; q++) {
                    var l = p[q][j];
                    if (o == l) {
                        n++
                    }
                }
                o.rowSpan = n
            }
        }
        return p
    };
    f._refreshHeader = function () {
        var i = this.nestedCols(this.options.colModel);
        this.colModel = i.colModel;
        this.depth = i.depth;
        this.getHeadersCells();
        this.assignRowSpan()
    };
    f._refreshWidths = function () {
        var i = this;
        h(this.colModel).each(function (k, j) {
            if (j.width != undefined) {
                var l = parseInt(j.width);
                if (l < i.minWidth) {
                    l = i.minWidth;
                    j.width = l
                }
            } else {
                j.width = i.minWidth
            }
        })
    };
    f._createHeader = function () {
        var u = this;
        var I = "<table class='pq-grid-header-table' cellpadding=0 cellspacing=0>";
        var H = [];
        var y = this.options,
            x = y.colModel,
            F = x.length,
            G = this.colModel,
            K = G.length,
            Q = this.depth,
            N = y.columnBorders,
            L = this.headerCells;
        if (Q >= 1) {
            I += "<tr>";
            if (this.numberCell) {
                I += "<td style='width:" + (this.numberCellWidth + 1) + "px;' ></td>"
            }
            for (var s = 0; s < K; s++) {
                var n = G[s];
                if (n.hidden) {
                    continue
                }
                var w = parseInt(n.width) + ((N) ? 1 : 0);
                I += "<td style='width:" + w + "px;'></td>"
            }
            I += "</tr>"
        }
        for (var t = 0; t < Q; t++) {
            I += "<tr>";
            if (t == 0 && this.numberCell) {
                I += "<td class='pq-grid-number-col' rowspan='" + Q + "'>				<div class='pq-grid-header-table-div'>&nbsp;</div></td>"
            }
            for (var s = 0; s < K; s++) {
                var n = L[t][s];
                var v = n.colSpan;
                if (t > 0 && n == L[t - 1][s]) {
                    continue
                } else {
                    if (s > 0 && n == L[t][s - 1]) {
                        continue
                    }
                }
                if (n.hidden) {
                    continue
                }
                var m = "pq-grid-col";
                if (n.align == "right") {
                    m += " pq-align-right"
                } else {
                    if (n.align == "center") {
                        m += " pq-align-center"
                    }
                }
                if (s == u.freezeCols - 1 && Q == 1) {
                    m += " pq-last-freeze-col"
                }
                var E = "",
                    C = "";
                if (n.colModel == null) {
                    E = "pq-grid-col-indx='" + s + "'"
                }
                I += "<td " + E + " " + C + " class='" + m + "' rowspan=" + n.rowSpan + " colspan=" + v + ">				<div class='pq-grid-header-table-div' >" + n.title + "<span class='pq-col-sort-icon'>&nbsp;</span></div></td>"
            }
            I += "</tr>"
        }
        I += "</table>";
        this.$header.empty();
        this.$header.append(I);
        var r = h(this.$header[0]);
        var k = h(this.$header[1]);
        var B = parseInt(this.options.freezeCols);
        var w = this._calcWidthCols(B - 1);
        r.css({
            width: w,
            zIndex: 1
        });
        var R = 0;
        for (var J = B; J < (this.initH + B); J++) {
            var n = G[J];
            if (n.hidden) {
                continue
            }
            var P = this.outerWidths[J];
            if (P == null) {
                throw ("Assert: unknown width")
            }
            R += P
        }
        k.css({
            left: "-" + R + "px"
        });
        this.$header.find("td").click(function () {
            if (!u.options.sortable) {
                return
            }
            var V = h(this).attr("pq-grid-col-indx");
            if (V == null) {
                return
            }
            var U = u.colModel[V];
            if (U.sortable == false) {
                return
            }
            var T = U.dataIndx;
            if (u._trigger("beforeSort", null, {
                dataModel: u.dataModel,
                data: u.data,
                sortIndx: T
            }) == false) {
                return
            }
            var S = "up";
            var i = u.options.dataModel;
            if (i.sortIndx == T) {
                S = (i.sortDir == "up") ? "down" : "up"
            }
            i.sortIndx = T;
            i.sortDir = S;
            u._refreshSortingDataAndView({
                sorting: true,
                keepSelection: true,
                fn: function () {
                    u._trigger("sort", null, {
                        dataModel: u.dataModel,
                        data: u.data
                    })
                }
            })
        });
        var R = 0;
        var D = u.$header[0].offsetHeight;
        var O = this.options.direction;
        for (var J = 0; J < this.colModel.length; J++) {
            var A = u.colModel[J];
            if (u.hidearrHS[J]) {
                continue
            } else {
                if (A.hidden) {
                    continue
                }
            }
            if (A.resizable != undefined && A.resizable == false) {
                continue
            }
            var z = u.$header_left;
            if (J >= u.options.freezeCols) {
                z = u.$header_right
            }
            var l = h("<div pq-grid-col-indx='" + J + "' class='pq-grid-col-resize-handle'>&nbsp;</div>").appendTo(z);
            var M = u.$header_right.find("td[pq-grid-col-indx=" + J + "]")[0];
            R = parseInt(M.offsetLeft) + parseInt((O == "rtl") ? 0 : (M.offsetWidth - 10));
            l.css({
                left: R,
                height: D
            })
        }
        var q,
            p,
            o;
        var j = u.$header.find(".pq-grid-col-resize-handle").draggable({
            axis: "x",
            helper: function (S, U) {
                var i = h(S.target);
                var T = parseInt(i.attr("pq-grid-col-indx"));
                u._setDragLimits(T);
                u._getDragHelper(S, U);
                return i
            },
            start: function (i, S) {
                q = S.position.left;
                o = parseInt(u.$cl[0].style.left)
            },
            drag: function (i, T) {
                p = T.position.left;
                var S = (p - q);
                u.$cl[0].style.left = o + S + "px"
            },
            stop: function (T, X) {
                u.$clleft.remove();
                u.$cl.remove();
                p = X.position.left;
                var U = (p - q);
                var S = h(X.helper);
                var Y = parseInt(S.attr("pq-grid-col-indx"));
                var W = u.colModel[Y];
                W.width = parseInt(W.width) + U;
                u._computeOuterWidths(true);
                u._refresh();
                for (var V = 0; V < u.tables.length; V++) {
                    var Z = u.tables[V].$tbl;
                    Z.find("td[pq-top-col-indx='" + Y + "']").width(u.outerWidths[Y])
                }
            }
        })
    };
    f._refreshHeaderSortIcons = function () {
        var i = this.options.dataModel;
        if (i.sortIndx == undefined) {
            return
        }
        var l = this.$header.find(".pq-grid-col");
        l.removeClass("pq-col-sort-asc pq-col-sort-desc ui-state-active");
        var m = i.sortIndx;
        var k = this.getColIndxFromDataIndx(m);
        var j = "ui-state-active pq-col-sort-" + (i.sortDir == "up" ? "asc" : "desc");
        this.$header.find(".pq-grid-col[pq-grid-col-indx=" + k + "]").addClass(j)
    };
    f._generateSummaryRow = function (q, p, u, E, w, n, B, z) {
        var r = "pq-summary-row",
            i = "",
            C = this.options.columBorders;
        i += "<tr pq-row-indx='" + p + "' class='" + r + "'>";
        z.push(i);
        if (this.numberCell) {
            z.push("<td style='width:" + this.numberCellWidth + "px;' class='pq-grid-number-cell pq-row-selector'>		<div class='pq-td-div'></div></td>")
        }
        var A = {
            rowIndx: p + n,
            rowIndxPage: p,
            rowData: q,
            summaryCell: true
        };
        for (var m = 0; m < E; m++) {
            var l = u[m],
                t = l.dataIndx;
            A.column = l;
            A.colIndx = m;
            var s = false;
            var o = q.selectedDataIndices;
            if (o) {
                s = o[t]
            }
            if (l.hidden) {
                continue
            } else {
                if (this.hidearrHS[m]) {
                    continue
                }
            }
            var D = "";
            var j = B;
            if (l.align == "right") {
                j += " pq-align-right"
            } else {
                if (l.align == "center") {
                    j += " pq-align-center"
                }
            }
            if (m == this.freezeCols - 1 && C) {
                j += " pq-last-freeze-col"
            }
            if (l.className) {
                j = j + " " + l.className
            }
            if (s) {
                j = j + " pq-cell-select"
            }
            var v = (q[t] == null) ? "" : q[t];
            var x = "<td class='" + j + "' style='" + D + "' >			<div>" + v + "</div></td>";
            z.push(x)
        }
        for (var y = 0; y < w.length; y++) {
            var m = w[y];
            var l = u[m],
                t = l.dataIndx;
            A.column = l;
            A.colIndx = m;
            var D = "";
            D += "visibility:hidden;";
            var j = B;
            if (l.align == "right") {
                j += " pq-align-right"
            } else {
                if (l.align == "center") {
                    j += " pq-align-center"
                }
            }
            var v = (q[t] == null) ? "" : q[t];
            var x = "<td class='" + j + "' style='" + D + "' >			<div>" + v + "</div></td>";
            z.push(x)
        }
        z.push("</tr>");
        return z
    };
    f.createTable = function (i) {
        this.cTable._generateTables(i)
    };
    f._refreshOtherTables = function () {
        return;
        var z = this.colModel,
            v = z.length,
            t = this.options.columBorders;
        for (var s = 0; s < this.tables.length; s++) {
            var r = this.tables[s];
            var m = r.$tbl,
                u = m.find("tr:first");
            for (var o = 0; o < v; o++) {
                var p = z[o],
                    w = p.dataIndx;
                if (p.hidden) {
                    var n = u.find("td[pq-dataIndx='" + w + "']");
                    if (n.length > 1) {
                        var l = m.find("td[pq-dataIndx='" + w + "']").remove();
                        r.$tds.add(l)
                    }
                } else {
                    if (this.hidearrHS[o]) {
                        var n = u.find("td[pq-dataIndx='" + w + "']");
                        if (n.css("visibility") != "hidden") { }
                    }
                }
                var j = "";
                var y = const_cls;
                if (p.align == "right") {
                    y += " pq-align-right"
                } else {
                    if (p.align == "center") {
                        y += " pq-align-center"
                    }
                }
                if (o == this.freezeCols - 1 && t) {
                    y += " pq-last-freeze-col"
                }
                if (p.className) {
                    y = y + " " + p.className
                }
                if (cellSelection) {
                    y = y + " pq-cell-select"
                }
                var x = "<td class='" + y + "' style='" + j + "' pq-col-indx='" + o + "'>				" + this.cTable._renderCell(objRender) + "</td>";
                buffer.push(x)
            }
            for (var q = 0; q < hidearrHS1.length; q++) {
                var o = hidearrHS1[q];
                var p = z[o];
                objRender.column = p;
                objRender.colIndx = o;
                var j = "";
                j += "visibility:hidden;";
                var y = const_cls;
                if (p.align == "right") {
                    y += " pq-align-right"
                } else {
                    if (p.align == "center") {
                        y += " pq-align-center"
                    }
                }
                var x = "<td class='" + y + "' style='" + j + "' pq-col-indx='" + o + "'>				" + this.cTable._renderCell(objRender) + "</td>";
                buffer.push(x)
            }
        }
    };
    f._sortLocalData = function (m, l, k, o) {
        var j = l,
            n = this;
        if (o == null || o.length == 0) {
            return
        }
        function i() {
            function t(x, w) {
                var v = x[m];
                var u = w[m];
                v = v ? parseInt(v) : 0;
                u = u ? parseInt(u) : 0;
                return (v - u)
            }
            function p(x, w) {
                var v = x[m];
                var u = w[m];
                return k(v, u)
            }
            function s(x, w) {
                var v = (x[m] + "").replace(/,/g, "");
                var u = (w[m] + "").replace(/,/g, "");
                v = v ? parseFloat(v) : 0;
                u = u ? parseFloat(u) : 0;
                return (v - u)
            }
            var q = 0;
            function r(x, w) {
                q++;
                var v = x[m];
                var u = w[m];
                v = v ? v : "";
                u = u ? u : "";
                if (v > u) {
                    return 1
                } else {
                    if (v < u) {
                        return -1
                    }
                }
                return 0
            }
            if (k == "integer") {
                o = o.sort(t)
            } else {
                if (k == "float") {
                    o = o.sort(s)
                } else {
                    if (typeof k == "function") {
                        o = o.sort(p)
                    } else {
                        o = o.sort(r)
                    }
                }
            }
            if (j == "down") {
                o = o.reverse()
            }
        }
        h.measureTime(i, "innerSort")
    };
    h.widget("paramquery.pqGrid", f);
    h.paramquery.pqGrid.regional = {};
    h.paramquery.pqGrid.regional.en = f._regional;
    h.paramquery.pqGrid.setDefaults = function (j) {
        for (var i in j) {
            f.options[i] = j[i]
        }
        h.widget("paramquery.pqGrid", f);
        h(".pq-grid").each(function (l, k) {
            h(k).pqGrid("option", j)
        })
    };
    h.measureTime = function (m, l) {
        var j = (new Date()).getTime();
        m();
        var i = (new Date()).getTime();
        var k = i - j
    }
})(jQuery);