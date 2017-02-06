/*! Custom Sidebars - v2.1.13
 * https://premium.wpmudev.org/project/custom-sidebars-pro/
 * Copyright (c) 2016; * Licensed GPLv2+ */
function trim(e) {
    e = e.replace(/^\s\s*/, "");
    for (var i = e.length - 1; i >= 0; i--)
        if (/\S/.test(e.charAt(i))) {
            e = e.substring(0, i + 1);
            break
        }
    return e
}

function CsSidebar(e, i) {
    var s;
    this.id = e.split("%").join("\\%"), this.type = i, this.sb = jQuery("#" + this.id), this.widgets = "", this.name = trim(this.sb.find(".sidebar-name h2").text()), this.description = trim(this.sb.find(".sidebar-description").text()), s = "custom" === i ? window.csSidebars.extras.find(".cs-custom-sidebar").clone() : window.csSidebars.extras.find(".cs-theme-sidebar").clone(), this.sb.parent().append(s), s.find("label").each(function() {
        var i = jQuery(this);
        window.csSidebars.addIdToLabel(i, e)
    })
}
CsSidebar.prototype.getID = function() {
        return this.id.split("\\").join("")
    }, window.csSidebars = null,
    function() {
        window.csSidebars = {
            sidebars: [],
            sidebar_prefix: "cs-",
            edit_form: null,
            delete_form: null,
            export_form: null,
            location_form: null,
            right: null,
            extras: null,
            action_handlers: {},
            init: function() {
                "undefined" != typeof csSidebarsData && csSidebars.initControls().initTopTools().initSidebars().initToolbars().initColumns()
            },
            initControls: function() {
                return csSidebars.right = jQuery("#widgets-right"), csSidebars.extras = jQuery("#cs-widgets-extra"), null === csSidebars.edit_form && (csSidebars.edit_form = csSidebars.extras.find(".cs-editor").clone(), csSidebars.extras.find(".cs-editor").remove()), null === csSidebars.delete_form && (csSidebars.delete_form = csSidebars.extras.find(".cs-delete").clone(), csSidebars.extras.find(".cs-delete").remove()), null === csSidebars.export_form && (csSidebars.export_form = csSidebars.extras.find(".cs-export").clone(), csSidebars.extras.find(".cs-export").remove()), null === csSidebars.location_form && (csSidebars.location_form = csSidebars.extras.find(".cs-location").clone(), csSidebars.extras.find(".cs-location").remove()), jQuery("#cs-title-options").detach().prependTo(csSidebars.right), csSidebars
            },
            initColumns: function() {
                function e() {
                    var e = jQuery(this),
                        i = e.closest(".sidebars-column-1, .sidebars-column-2"),
                        s = i.data("sort-dir");
                    s = "asc" === s ? "desc" : "asc", csSidebars.sort_sidebars(i, s)
                }
                var i = csSidebars.right.find(".sidebars-column-1"),
                    s = csSidebars.right.find(".sidebars-column-2"),
                    t = jQuery('<div class="cs-title"><h2></h2></div>'),
                    a = csSidebars.right.find(".widgets-holder-wrap");
                s.length || (s = jQuery('<div class="sidebars-column-2"></div>'), s.appendTo(csSidebars.right)), t.find("h2").append('<span class="cs-title-val"></span><i class="cs-icon dashicons dashicons-sort"></i>').css({
                    cursor: "pointer"
                }), t.clone().prependTo(i).click(e).find(".cs-title-val").text(csSidebarsData.custom_sidebars), t.clone().prependTo(s).click(e).find(".cs-title-val").text(csSidebarsData.theme_sidebars), i = jQuery('<div class="inner"></div>').appendTo(i), s = jQuery('<div class="inner"></div>').appendTo(s), a.each(function() {
                    var e = jQuery(this),
                        t = e.find(".widgets-sortables");
                    csSidebars.isCustomSidebar(t) ? e.appendTo(i) : e.appendTo(s)
                })
            },
            initSidebars: function() {
                return csSidebars.right.find(".widgets-sortables").each(function() {
                    var e, i, s = !1,
                        t = jQuery(this),
                        a = t.attr("id");
                    if (t.data("cs-init") !== !0)
                        if (t.data("cs-init", !0), csSidebars.isCustomSidebar(this)) i = csSidebars.add(a, "custom");
                        else {
                            i = csSidebars.add(a, "theme");
                            for (e in csSidebarsData.replaceable)
                                if (csSidebarsData.replaceable.hasOwnProperty(e) && csSidebarsData.replaceable[e] === a) {
                                    s = !0;
                                    break
                                }
                            csSidebars.setReplaceable(i, s, !1)
                        }
                }), csSidebars
            },
            initTopTools: function() {
                var e = jQuery(".btn-create-sidebar"),
                    i = jQuery(".btn-export"),
                    s = jQuery(".cs-options"),
                    t = jQuery('<input type="search" class="cs-filter" />'),
                    a = {};
                return e.click(function() {
                    a.id = "", a.title = csSidebarsData.title_new, a.button = csSidebarsData.btn_new, a.description = "", a.name = "", csSidebars.showEditor(a)
                }), i.click(csSidebars.showExport), t.appendTo(s).attr("placeholder", csSidebarsData.filter).keyup(csSidebars.filter_sidebars).on("search", csSidebars.filter_sidebars), csSidebars
            },
            initToolbars: function() {
                function e(e) {
                    var i = jQuery(e.target).closest(".cs-tool"),
                        s = i.data("action"),
                        t = csSidebars.getIdFromEditbar(i),
                        a = csSidebars.find(t);
                    return !csSidebars.handleAction(s, a)
                }
                return csSidebars.registerAction("edit", csSidebars.showEditor), csSidebars.registerAction("location", csSidebars.showLocations), csSidebars.registerAction("delete", csSidebars.showRemove), csSidebars.registerAction("replaceable", csSidebars.setReplaceable), csSidebars.right.on("click", ".cs-tool", e), csSidebars
            },
            handleAction: function(e, i) {
                return "function" == typeof csSidebars.action_handlers[e] ? !!csSidebars.action_handlers[e](i) : !1
            },
            registerAction: function(e, i) {
                csSidebars.action_handlers[e] = i
            },
            showAjaxError: function(e) {
                var i = {};
                i.message = csSidebarsData.ajax_error, i.details = e, i.parent = "#widgets-right", i.insert_after = "#cs-title-options", i.id = "editor", i.type = "err", wpmUi.message(i)
            },
            sort_sidebars: function(e, i) {
                var s = e.find(".widgets-holder-wrap"),
                    t = e.find(".cs-title .cs-icon");
                s.sortElements(function(e, s) {
                    var t = jQuery(e).find(".sidebar-name h2").text(),
                        a = jQuery(s).find(".sidebar-name h2").text();
                    return "asc" === i ? t > a ? 1 : -1 : a > t ? 1 : -1
                }), e.data("sort-dir", i), "asc" === i ? t.removeClass("dashicons-arrow-down dashicons-sort").addClass("dashicons-arrow-up") : t.removeClass("dashicons-arrow-up dashicons-sort").addClass("dashicons-arrow-down")
            },
            filter_sidebars: function() {
                var e = jQuery("input.cs-filter").val().toLowerCase(),
                    i = csSidebars.right.find(".widgets-holder-wrap");
                i.each(function() {
                    var i = jQuery(this),
                        s = i.find(".sidebar-name h2").text(); - 1 !== s.toLowerCase().indexOf(e) ? i.show() : i.hide()
                }), jQuery(window).trigger("cs-resize")
            },
            showEditor: function(e) {
                function i() {
                    d.$().removeClass("csb-has-more"), d.size(782, 215)
                }

                function s() {
                    d.$().addClass("csb-has-more"), d.size(782, 545)
                }

                function t() {
                    jQuery(this).prop("checked") ? s() : i()
                }

                function a(e, i) {
                    return d.loading(!1), e ? i ? (e.sidebar && (e = e.sidebar), e.id && d.$().find("#csb-id").val(e.id), e.name && d.$().find("#csb-name").val(e.name), e.description && d.$().find("#csb-description").val(e.description), e.before_title && d.$().find("#csb-before-title").val(e.before_title), e.after_title && d.$().find("#csb-after-title").val(e.after_title), e.before_widget && d.$().find("#csb-before-widget").val(e.before_widget), e.after_widget && d.$().find("#csb-after-widget").val(e.after_widget), e.button && d.$().find(".btn-save").text(e.button), void 0) : (d.destroy(), csSidebars.showAjaxError(e), !1) : !1
                }

                function r(e, i) {
                    var s, t = {};
                    d.loading(!1), d.destroy(), t.message = e.message, t.parent = "#widgets-right", t.insert_after = "#cs-title-options", t.id = "editor", i ? "update" === e.action ? (s = csSidebars.find(e.data.id), csSidebars.updateSidebar(s, e.data)) : "insert" === e.action && csSidebars.insertSidebar(e.data) : t.type = "err", wpmUi.message(t)
                }

                function n() {
                    var e = d.$().find("form");
                    return d.loading(!0), o.reset().data(e).ondone(r).load_json(), !1
                }
                var d = null,
                    o = null;
                return e instanceof CsSidebar && (e = {
                    id: e.getID(),
                    title: csSidebarsData.title_edit.replace("[Sidebar]", e.name),
                    button: csSidebarsData.btn_edit
                }), d = wpmUi.popup().modal(!0).title(e.title).onshow(i).content(csSidebars.edit_form), i(), a(e, !0, null), o = wpmUi.ajax(null, "cs-ajax"), e.id && (d.loading(!0), o.reset().data({
                    "do": "get",
                    sb: e.id
                }).ondone(a).load_json()), d.show(), d.$().find("#csb-name").focus(), d.$().on("click", "#csb-more", t), d.$().on("click", ".btn-save", n), d.$().on("click", ".btn-cancel", d.destroy), !0
            },
            updateSidebar: function(e, i) {
                return e.sb.find(".sidebar-name h2").text(i.name), e.sb.find(".sidebar-description").html('<p class="description"></p>').find(".description").text(i.description), csSidebars
            },
            insertSidebar: function(e) {
                var i = jQuery('<div class="widgets-holder-wrap"></div>'),
                    s = jQuery('<div class="widgets-sortables ui-sortable"></div>'),
                    t = jQuery('<div class="sidebar-name"><div class="sidebar-name-arrow"><br></div><h2></h2></div>'),
                    a = jQuery('<div class="sidebar-description"></div>'),
                    r = csSidebars.right.find(".sidebars-column-1 > .inner:first");
                return s.attr("id", e.id), t.find("h2").text(e.name), a.html('<p class="description"></p>').find(".description").text(e.description), t.appendTo(s), a.appendTo(s), s.appendTo(i), i.prependTo(r), jQuery("#widgets-right .sidebar-name").unbind("click"), jQuery("#widgets-left .sidebar-name").unbind("click"), jQuery(document.body).unbind("click.widgets-toggle"), jQuery(".widgets-chooser").off("click.widgets-chooser").off("keyup.widgets-chooser"), jQuery("#available-widgets .widget .widget-title").off("click.widgets-chooser"), jQuery(".widgets-chooser-sidebars").empty(), window.wpWidgets.init(), csSidebars.initSidebars(), csSidebars
            },
            showExport: function() {
                function e(e) {
                    var i = jQuery(this).closest("form");
                    return d.reset().data(i).load_http(), n.destroy(), e.preventDefault(), !1
                }

                function i(e, i) {
                    var s = {};
                    n.loading(!1), i ? n.size(900, 600).content(e.html) : (s.message = e.message, s.parent = n.$().find(".wpmui-wnd-content"), s.insert_after = !1, s.id = "export", s["class"] = "wpmui-wnd-err", s.type = "err", wpmUi.message(s))
                }

                function s(e) {
                    var s = jQuery(this).closest("form");
                    return n.loading(!0), d.reset().data(s).ondone(i).load_json("cs-ajax"), e.preventDefault(), !1
                }

                function t() {
                    var e = jQuery(this),
                        i = e.prop("checked"),
                        s = n.$().find(".column-widgets, .import-widgets");
                    i ? s.show() : s.hide()
                }

                function a() {
                    n.size(782, 480), n.content(csSidebars.export_form)
                }

                function r() {
                    var e = n.$().find(".frm-import");
                    n.loading(!0), d.reset().data(e).load_http("_self")
                }
                var n = null,
                    d = null;
                return n = wpmUi.popup().modal(!0).size(782, 480).title(csSidebarsData.title_export).content(csSidebars.export_form).show(), d = wpmUi.ajax(null, "cs-ajax"), n.$().on("submit", ".frm-export", e), n.$().on("submit", ".frm-preview-import", s), n.$().on("change", "#import-widgets", t), n.$().on("click", ".btn-cancel", a), n.$().on("click", ".btn-import", r), !0
            },
            showRemove: function(e) {
                function i(e) {
                    e.find(".name").text(o)
                }

                function s() {
                    r.loading(!1), r.destroy()
                }

                function t(e, i) {
                    var s = {};
                    r.loading(!1), r.destroy(), s.message = e.message, s.parent = "#widgets-right", s.insert_after = "#cs-title-options", s.id = "editor", i ? (csSidebars.right.find("#" + d).closest(".widgets-holder-wrap").remove(), csSidebars.remove(d)) : s.type = "err", wpmUi.message(s)
                }

                function a() {
                    r.loading(!0), n.reset().data({
                        "do": "delete",
                        sb: d
                    }).ondone(t).load_json()
                }
                var r = null,
                    n = null,
                    d = e.getID(),
                    o = e.name;
                return r = wpmUi.popup().modal(!0).size(560, 160).title(csSidebarsData.title_delete).content(csSidebars.delete_form).onshow(i).show(), n = wpmUi.ajax(null, "cs-ajax"), r.$().on("click", ".btn-cancel", s), r.$().on("click", ".btn-delete", a), !0
            },
            showLocations: function(e) {
                function i(e, i) {
                    function s(e, i, s) {
                        var t = jQuery("<option></option>");
                        t.attr("value", s).text(e.name), i.append(t)
                    }

                    function t(e, i, s, t) {
                        var a = t.closest(".cs-replaceable").filter("." + i),
                            r = a.find('option[value="' + s + '"]'),
                            n = a.find("optgroup.used"),
                            d = a.find(".detail-toggle");
                        e === o ? (r.prop("selected", !0), !0 !== d.prop("checked") && (d.prop("checked", !0), a.addClass("open"), wpmUi.upgrade_multiselect(a))) : (n.length || (n = jQuery('<optgroup class="used">').attr("label", a.data("lbl-used")).appendTo(a.find(".details select"))), r.detach().appendTo(n))
                    }
                    var a, n, d;
                    if (r.loading(!1), !i) return r.destroy(), csSidebars.showAjaxError(e), void 0;
                    r.$().find(".sb-name").text(e.sidebar.name);
                    var o = e.sidebar.id,
                        c = r.$().find(".cs-replaceable");
                    c.hide(), e.replaceable = wpmUi.obj(e.replaceable);
                    for (var l in e.replaceable) e.replaceable.hasOwnProperty(l) && c.filter("." + e.replaceable[l]).show();
                    var b = r.$().find(".cs-datalist.cs-cat"),
                        p = r.$().find(".cs-datalist.cs-arc-cat"),
                        f = e.categories;
                    p.empty(), b.empty();
                    for (var u in f) s(f[u], p, u), s(f[u], b, u);
                    for (var h in f) {
                        if (f[h].single)
                            for (a in f[h].single) t(f[h].single[a], a, h, b);
                        if (f[h].archive)
                            for (a in f[h].archive) t(f[h].archive[a], a, h, p)
                    }
                    var m = r.$().find(".cs-datalist.cs-pt"),
                        g = e.posttypes;
                    m.empty();
                    for (var v in g) n = jQuery("<option></option>"), d = g[v].name, n.attr("value", v).text(d), m.append(n);
                    for (var w in g)
                        if (g[w].single)
                            for (a in g[w].single) t(g[w].single[a], a, w, m);
                    var S = r.$().find(".cs-datalist.cs-arc"),
                        y = e.archives;
                    S.empty();
                    for (var j in y) n = jQuery("<option></option>"), d = y[j].name, n.attr("value", j).text(d), S.append(n);
                    for (var x in y)
                        if (y[x].archive)
                            for (a in y[x].archive) t(y[x].archive[a], a, x, S);
                    var _ = r.$().find(".cs-datalist.cs-arc-aut"),
                        Q = e.authors;
                    _.empty();
                    for (var k in Q) n = jQuery("<option></option>"), d = Q[k].name, n.attr("value", k).text(d), _.append(n);
                    for (var $ in Q)
                        if (Q[$].archive)
                            for (a in Q[$].archive) t(Q[$].archive[a], a, $, _)
                }

                function s() {
                    var e = jQuery(this),
                        i = e.closest(".cs-replaceable"),
                        s = i.find("select");
                    e.prop("checked") ? (i.addClass("open"), wpmUi.upgrade_multiselect(i), s.trigger("change.select2")) : (i.removeClass("open"), s.val([]))
                }

                function t(e, i) {
                    var s = {};
                    r.loading(!1), r.destroy(), s.message = e.message, s.parent = "#widgets-right", s.insert_after = "#cs-title-options", s.id = "editor", i || (s.type = "err"), wpmUi.message(s)
                }

                function a() {
                    r.loading(!0), n.reset().data(d).ondone(t).load_json()
                }
                var r = null,
                    n = null,
                    d = null,
                    o = e.getID();
                return r = wpmUi.popup().modal(!0).size(782, 560).title(csSidebarsData.title_location).content(csSidebars.location_form).show(), r.loading(!0), d = r.$().find(".frm-location"), d.find(".sb-id").val(o), n = wpmUi.ajax(null, "cs-ajax"), n.reset().data({
                    "do": "get-location",
                    sb: o
                }).ondone(i).load_json(), r.$().on("click", ".detail-toggle", s), r.$().on("click", ".btn-save", a), r.$().on("click", ".btn-cancel", r.destroy), !0
            },
            setReplaceable: function(e, i, s) {
                function t(e) {
                    e instanceof Object && "object" == typeof e.replaceable && (csSidebarsData.replaceable = wpmUi.obj(e.replaceable), r.find(".widgets-sortables").each(function() {
                        var e = !1,
                            i = jQuery(this),
                            s = i.attr("id"),
                            t = csSidebars.find(s);
                        for (var a in csSidebarsData.replaceable)
                            if (csSidebarsData.replaceable.hasOwnProperty(a) && csSidebarsData.replaceable[a] === s) {
                                e = !0;
                                break
                            }
                        csSidebars.setReplaceable(t, e, !1)
                    })), r.find(".cs-toolbar .chk-replaceable").prop("disabled", !1), r.find(".cs-toolbar .btn-replaceable").removeClass("wpmui-loading")
                }
                var a, r = csSidebars.right.find(".sidebars-column-2 .widgets-holder-wrap"),
                    n = jQuery(e.sb).closest(".widgets-holder-wrap"),
                    d = n.find(".cs-toolbar .chk-replaceable"),
                    o = n.find(".replace-marker");
                return n.find(".cs-toolbar .btn-replaceable"), void 0 === i && (i = d.prop("checked")), void 0 === s && (s = !0), d.data("active") === i ? !1 : (d.data("active", i), d.prop("checked", i), i ? (o.length || jQuery("<div></div>").appendTo(n).attr("data-label", csSidebarsData.lbl_replaceable).addClass("replace-marker"), n.addClass("replaceable")) : (o.remove(), n.removeClass("replaceable")), s && (r.find(".cs-toolbar .chk-replaceable").prop("disabled", !0), r.find(".cs-toolbar .btn-replaceable").addClass("wpmui-loading"), a = wpmUi.ajax(null, "cs-ajax"), a.reset().data({
                    "do": "replaceable",
                    state: i,
                    sb: e.getID()
                }).ondone(t).load_json()), !1)
            },
            find: function(e) {
                return csSidebars.sidebars[e]
            },
            add: function(e, i) {
                return csSidebars.sidebars[e] = new CsSidebar(e, i), csSidebars.sidebars[e]
            },
            remove: function(e) {
                delete csSidebars.sidebars[e]
            },
            isCustomSidebar: function(e) {
                var i = jQuery(e).attr("id"),
                    s = i.substr(0, csSidebars.sidebar_prefix.length);
                return s === csSidebars.sidebar_prefix
            },
            addIdToLabel: function(e, i) {
                if (!0 !== e.data("label-done")) {
                    var s = e.attr("for");
                    e.attr("for", s + i), e.find(".has-label").attr("id", s + i), e.data("label-done", !0)
                }
            },
            getIdFromEditbar: function(e) {
                var i = e.closest(".widgets-holder-wrap"),
                    s = i.find(".widgets-sortables:first"),
                    t = s.attr("id");
                return t
            }
        }, jQuery(function(e) {
            e("#csfooter").hide(), e("#widgets-right").length > 0 && csSidebars.init(), e(".defaultsContainer").hide(), e("#widgets-right .widgets-sortables").on("sort", function(i, s) {
                e("#widgets-right").top, s.position.top = -e("#widgets-right").css("top")
            })
        })
    }(jQuery), jQuery.fn.sortElements = function() {
        var e = [].sort;
        return function(i, s) {
            s = s || function() {
                return this
            };
            var t = this.map(function() {
                var e = s.call(this),
                    i = e.parentNode,
                    t = i.insertBefore(document.createTextNode(""), e.nextSibling);
                return function() {
                    if (i === this) throw Error("You can't sort elements if any one is a descendant of another.");
                    i.insertBefore(this, t), i.removeChild(t)
                }
            });
            return e.call(this, i).each(function(e) {
                t[e].call(s.call(this))
            })
        }
    }();