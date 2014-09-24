if ("function" != typeof DIL) DIL = function(a, c) {
        var b = [],
            d, e;
        a !== Object(a) && (a = {});
        var f, h, i, q, o, p, k, t, u, D, y;
        f = a.partner;
        h = a.containerNSID;
        i = a.iframeAttachmentDelay;
        q = !!a.disableDestinationPublishingIframe;
        o = a.iframeAkamaiHTTPS;
        p = a.mappings;
        k = a.uuidCookie;
        t = !0 === a.enableErrorReporting;
        u = a.visitorService;
        D = a.declaredId;
        y = !0 === a.removeFinishedScriptsAndCallbacks;
        var E, F, A;
        E = !0 === a.disableScriptAttachment;
        F = !0 === a.disableDefaultRequest;
        A = a.afterResultForDefaultRequest;
        t && DIL.errorModule.activate();
        var G = !0 === window._dil_unit_tests;
        (d = c) && b.push(d + "");
        if (!f || "string" != typeof f) return d = "DIL partner is invalid or not specified in initConfig", DIL.errorModule.handleError({
            name: "error",
            message: d,
            filename: "dil.js"
        }), Error(d);
        d = "DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";
        if (h || "number" == typeof h) h = parseInt(h, 10), !isNaN(h) && 0 <= h && (d = "");
        d && (h = 0, b.push(d), d = "");
        e = DIL.getDil(f, h);
        if (e instanceof DIL && e.api.getPartner() == f && e.api.getContainerNSID() == h) return e;
        if (this instanceof DIL) DIL.registerDil(this, f, h);
        else return new DIL(a, "DIL was not instantiated with the 'new' operator, returning a valid instance with partner = " + f + " and containerNSID = " + h);
        var v = {
                IS_HTTPS: "https:" == document.location.protocol,
                POST_MESSAGE_ENABLED: !!window.postMessage,
                COOKIE_MAX_EXPIRATION_DATE: "Tue, 19 Jan 2038 03:14:07 UTC"
            },
            B = {
                stuffed: {}
            },
            j = {},
            l = {
                firingQueue: [],
                fired: [],
                firing: !1,
                sent: [],
                errored: [],
                reservedKeys: {
                    sids: !0,
                    pdata: !0,
                    logdata: !0,
                    callback: !0,
                    postCallbackFn: !0,
                    useImageRequest: !0
                },
                callbackPrefix: "demdexRequestCallback",
                firstRequestHasFired: !1,
                useJSONP: !0,
                abortRequests: !1,
                num_of_jsonp_responses: 0,
                num_of_jsonp_errors: 0,
                num_of_img_responses: 0,
                num_of_img_errors: 0,
                toRemove: [],
                removed: [],
                readyToRemove: !1,
                adms: {
                    TIME_TO_CATCH_ALL_REQUESTS_RELEASE: 2E3,
                    calledBack: !1,
                    uuid: null,
                    noVisitorAPI: !1,
                    instance: null,
                    releaseType: "no VisitorAPI",
                    admsProcessingStarted: !1,
                    process: function(g) {
                        try {
                            if (!this.admsProcessingStarted) {
                                var a = this,
                                    n, s, d, c, b;
                                if ("function" == typeof g && "function" == typeof g.getInstance) {
                                    if (u === Object(u) && (n = u.namespace) &&
                                        "string" == typeof n) s = g.getInstance(n);
                                    else {
                                        this.releaseType = "no namespace";
                                        this.releaseRequests();
                                        return
                                    } if (s === Object(s) && "function" == typeof s.isAllowed && "function" == typeof s.getGlobalVisitorID) {
                                        if (!s.isAllowed()) {
                                            this.releaseType = "VisitorAPI not allowed";
                                            this.releaseRequests();
                                            return
                                        }
                                        this.instance = s;
                                        this.admsProcessingStarted = !0;
                                        d = function(g) {
                                            if ("VisitorAPI" != a.releaseType) a.uuid = g, a.releaseType = "VisitorAPI", a.releaseRequests()
                                        };
                                        if (G && (c = u.server) && "string" == typeof c) s.server = c;
                                        b = s.getGlobalVisitorID(d);
                                        if ("string" == typeof b && b.length) {
                                            d(b);
                                            return
                                        }
                                        setTimeout(function() {
                                            if ("VisitorAPI" != a.releaseType) a.releaseType = "timeout", a.releaseRequests()
                                        }, this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);
                                        return
                                    }
                                    this.releaseType = "invalid instance"
                                } else this.noVisitorAPI = !0;
                                this.releaseRequests()
                            }
                        } catch (f) {
                            this.releaseRequests()
                        }
                    },
                    releaseRequests: function() {
                        this.calledBack = !0;
                        l.registerRequest()
                    },
                    getGlobalVisitorID: function() {
                        return this.instance ? this.instance.getGlobalVisitorID() : null
                    }
                },
                declaredId: {
                    uuid: null,
                    declaredId: {
                        init: null,
                        request: null
                    },
                    declaredIdCombos: {},
                    dIdAlwaysOn: !1,
                    dIdInRequest: !1,
                    setDeclaredId: function(g, a) {
                        var n = r.isPopulatedString,
                            d = encodeURIComponent;
                        if (g === Object(g) && n(a)) {
                            var b = g.dpid,
                                c = g.dpuuid,
                                f = null;
                            if (n(b) && n(c)) {
                                f = d(b) + "$" + d(c);
                                if (!0 === this.declaredIdCombos[f]) return "setDeclaredId: combo exists for type '" + a + "'";
                                this.declaredIdCombos[f] = !0;
                                this.declaredId[a] = {
                                    dpid: b,
                                    dpuuid: c
                                };
                                if ("init" == a) this.dIdAlwaysOn = !0;
                                else if ("request" == a) this.dIdInRequest = !0;
                                return "setDeclaredId: succeeded for type '" + a + "'"
                            }
                        }
                        return "setDeclaredId: failed for type '" +
                            a + "'"
                    },
                    getDeclaredIdQueryString: function() {
                        var g = this.declaredId.request,
                            a = this.declaredId.init,
                            n = "";
                        null !== g ? n = "&d_dpid=" + g.dpid + "&d_dpuuid=" + g.dpuuid : null !== a && (n = "&d_dpid=" + a.dpid + "&d_dpuuid=" + a.dpuuid);
                        return n
                    },
                    getUUIDQueryString: function() {
                        var g = l.adms,
                            a = r.isPopulatedString,
                            n = !1,
                            b = l.adms.getGlobalVisitorID();
                        if (a(this.uuid)) {
                            if (a(b) && this.uuid != b) this.uuid = b
                        } else this.uuid = b || g.uuid; if (this.dIdAlwaysOn || this.dIdInRequest) n = !0, this.dIdInRequest = !1;
                        return a(this.uuid) && n ? "d_uuid=" + this.uuid + "&" :
                            ""
                    }
                },
                registerRequest: function(g) {
                    var a = this.firingQueue;
                    g === Object(g) && a.push(g);
                    if (!this.firing && a.length)
                        if (this.adms.calledBack) {
                            if (g = a.shift(), g.src = g.src.replace(/demdex.net\/event\?d_nsid=/, "demdex.net/event?" + this.declaredId.getUUIDQueryString() + "d_nsid="), w.fireRequest(g), !this.firstRequestHasFired && "script" == g.tag) this.firstRequestHasFired = !0
                        } else this.processVisitorAPI()
                },
                processVisitorAPI: function() {
                    this.adms.process(window.Visitor)
                },
                requestRemoval: function(g) {
                    if (!y) return "removeFinishedScriptsAndCallbacks is not boolean true";
                    var a = this.toRemove,
                        b, d;
                    if (g === Object(g)) b = g.script, d = g.callbackName, (b === Object(b) && "SCRIPT" == b.nodeName || "no script created" == b) && "string" == typeof d && d.length && a.push(g);
                    if (this.readyToRemove && a.length) {
                        d = a.shift();
                        b = d.script;
                        d = d.callbackName;
                        "no script created" != b ? (g = b.src, b.parentNode.removeChild(b)) : g = b;
                        window[d] = null;
                        try {
                            delete window[d]
                        } catch (c) {}
                        this.removed.push({
                            scriptSrc: g,
                            callbackName: d
                        });
                        DIL.variables.scriptsRemoved.push(g);
                        DIL.variables.callbacksRemoved.push(d);
                        return this.requestRemoval()
                    }
                    return "requestRemoval() processed"
                }
            };
        e = function() {
            var g = "http://fast.";
            v.IS_HTTPS && (g = !0 === o ? "https://fast." : "https://");
            return g + f + ".demdex.net/dest4.html?d_nsid=" + h + "#" + encodeURIComponent(document.location.href)
        };
        var x = {
                THROTTLE_START: 3E4,
                throttleTimerSet: !1,
                id: "destination_publishing_iframe_" + f + "_" + h,
                url: e(),
                iframe: null,
                iframeHasLoaded: !1,
                sendingMessages: !1,
                messages: [],
                messagesPosted: [],
                messageSendingInterval: v.POST_MESSAGE_ENABLED ? 15 : 100,
                jsonProcessed: [],
                attachIframe: function() {
                    var g = this,
                        a = document.createElement("iframe");
                    a.id =
                        this.id;
                    a.style.cssText = "display: none; width: 0; height: 0;";
                    a.src = this.url;
                    m.addListener(a, "load", function() {
                        g.iframeHasLoaded = !0;
                        g.requestToProcess()
                    });
                    document.body.appendChild(a);
                    this.iframe = a
                },
                requestToProcess: function(g, a) {
                    var b = this;
                    g && !r.isEmptyObject(g) && this.process(g, a);
                    if (this.iframeHasLoaded && this.messages.length && !this.sendingMessages) {
                        if (!this.throttleTimerSet) this.throttleTimerSet = !0, setTimeout(function() {
                            b.messageSendingInterval = v.POST_MESSAGE_ENABLED ? 15 : 150
                        }, this.THROTTLE_START);
                        this.sendingMessages = !0;
                        this.sendMessages()
                    }
                },
                process: function(g, a) {
                    var b = encodeURIComponent,
                        d, c, f, e, h, k;
                    a === Object(a) && (k = m.encodeAndBuildRequest([l.declaredId.uuid || "", a.dpid || "", a.dpuuid || ""], ","));
                    if ((d = g.dests) && d instanceof Array && (c = d.length))
                        for (f = 0; f < c; f++) e = d[f], e = [b("dests"), b(e.id || ""), b(e.y || ""), b(e.c || "")], this.addMessage(e.join("|"));
                    if ((d = g.ibs) && d instanceof Array && (c = d.length))
                        for (f = 0; f < c; f++) e = d[f], e = [b("ibs"), b(e.id || ""), b(e.tag || ""), m.encodeAndBuildRequest(e.url || [], ","), b(e.ttl ||
                            ""), "", k], this.addMessage(e.join("|"));
                    if ((d = g.dpcalls) && d instanceof Array && (c = d.length))
                        for (f = 0; f < c; f++) e = d[f], h = e.callback || {}, h = [h.obj || "", h.fn || "", h.key || "", h.tag || "", h.url || ""], e = [b("dpm"), b(e.id || ""), b(e.tag || ""), m.encodeAndBuildRequest(e.url || [], ","), b(e.ttl || ""), m.encodeAndBuildRequest(h, ","), k], this.addMessage(e.join("|"));
                    this.jsonProcessed.push(g)
                },
                addMessage: function(g) {
                    var a = encodeURIComponent;
                    this.messages.push((t ? a("---destpub-debug---") : a("---destpub---")) + g)
                },
                sendMessages: function() {
                    var g =
                        this,
                        a;
                    this.messages.length ? (a = this.messages.shift(), DIL.xd.postMessage(a, this.url, this.iframe.contentWindow), this.messagesPosted.push(a), setTimeout(function() {
                        g.sendMessages()
                    }, this.messageSendingInterval)) : this.sendingMessages = !1
                }
            },
            C = {
                traits: function(g) {
                    if (r.isValidPdata(g)) {
                        if (!(j.sids instanceof Array)) j.sids = [];
                        m.extendArray(j.sids, g)
                    }
                    return this
                },
                pixels: function(g) {
                    if (r.isValidPdata(g)) {
                        if (!(j.pdata instanceof Array)) j.pdata = [];
                        m.extendArray(j.pdata, g)
                    }
                    return this
                },
                logs: function(g) {
                    if (r.isValidLogdata(g)) {
                        if (j.logdata !==
                            Object(j.logdata)) j.logdata = {};
                        m.extendObject(j.logdata, g)
                    }
                    return this
                },
                customQueryParams: function(g) {
                    r.isEmptyObject(g) || m.extendObject(j, g, l.reservedKeys);
                    return this
                },
                signals: function(g, a) {
                    var b, d = g;
                    if (!r.isEmptyObject(d)) {
                        if (a && "string" == typeof a)
                            for (b in d = {}, g) g.hasOwnProperty(b) && (d[a + b] = g[b]);
                        m.extendObject(j, d, l.reservedKeys)
                    }
                    return this
                },
                declaredId: function(g) {
                    l.declaredId.setDeclaredId(g, "request");
                    return this
                },
                result: function(g) {
                    if ("function" == typeof g) j.callback = g;
                    return this
                },
                afterResult: function(g) {
                    if ("function" ==
                        typeof g) j.postCallbackFn = g;
                    return this
                },
                useImageRequest: function() {
                    j.useImageRequest = !0;
                    return this
                },
                clearData: function() {
                    j = {};
                    return this
                },
                submit: function(g) {
                    w.submitRequest(j, g);
                    j = {};
                    return this
                },
                getPartner: function() {
                    return f
                },
                getContainerNSID: function() {
                    return h
                },
                getEventLog: function() {
                    return b
                },
                getState: function() {
                    var g = {},
                        a = {};
                    m.extendObject(g, l, {
                        callbackPrefix: !0,
                        useJSONP: !0,
                        registerRequest: !0
                    });
                    m.extendObject(a, x, {
                        attachIframe: !0,
                        requestToProcess: !0,
                        process: !0,
                        sendMessages: !0
                    });
                    return {
                        pendingRequest: j,
                        otherRequestInfo: g,
                        destinationPublishingInfo: a
                    }
                },
                idSync: function(g) {
                    if (g !== Object(g) || "string" != typeof g.dpid || !g.dpid.length) return "Error: config or config.dpid is empty";
                    if ("string" != typeof g.url || !g.url.length) return "Error: config.url is empty";
                    var a = g.url,
                        b = g.minutesToLive,
                        d = encodeURIComponent,
                        c = l.declaredId,
                        a = a.replace(/^https:/, "").replace(/^http:/, "");
                    if ("undefined" == typeof b) b = 20160;
                    else if (b = parseInt(b, 10), isNaN(b) || 0 >= b) return "Error: config.minutesToLive needs to be a positive number";
                    c =
                        m.encodeAndBuildRequest([l.adms.getGlobalVisitorID() || c.uuid || "", g.dpid, g.dpuuid || ""], ",");
                    g = ["ibs", d(g.dpid), "img", d(a), b, "", c];
                    x.addMessage(g.join("|"));
                    l.firstRequestHasFired && x.requestToProcess();
                    return "Successfully queued"
                },
                aamIdSync: function(a) {
                    if (a !== Object(a) || "string" != typeof a.dpuuid || !a.dpuuid.length) return "Error: config or config.dpuuid is empty";
                    a.url = "//dpm.demdex.net/ibs:dpid=" + a.dpid + "&dpuuid=" + a.dpuuid;
                    return this.idSync(a)
                },
                passData: function(a) {
                    if (r.isEmptyObject(a)) return "Error: json is empty or not an object";
                    w.defaultCallback(a);
                    return "json submitted for processing"
                }
            },
            w = {
                submitRequest: function(a, b) {
                    l.registerRequest(w.createQueuedRequest(a, b));
                    return !0
                },
                createQueuedRequest: function(a, b) {
                    var d = l,
                        c, e = a.callback,
                        H = "img";
                    if (!r.isEmptyObject(p)) {
                        var k, i, q;
                        for (k in p)
                            if (p.hasOwnProperty(k) && (i = p[k], !(null == i || "" === i) && k in a && !(i in a) && !(i in l.reservedKeys))) q = a[k], null == q || "" === q || (a[i] = q)
                    }
                    if (!r.isValidPdata(a.sids)) a.sids = [];
                    if (!r.isValidPdata(a.pdata)) a.pdata = [];
                    if (!r.isValidLogdata(a.logdata)) a.logdata = {};
                    a.logdataArray = m.convertObjectToKeyValuePairs(a.logdata, "=", !0);
                    a.logdataArray.push("_ts=" + (new Date).getTime());
                    if ("function" != typeof e) e = this.defaultCallback;
                    if (d.useJSONP = !a.useImageRequest || "boolean" != typeof a.useImageRequest) H = "script", c = d.callbackPrefix + "_" + f + "_" + h + "_" + (new Date).getTime();
                    return {
                        tag: H,
                        src: w.makeRequestSrc(a, c),
                        internalCallbackName: c,
                        callbackFn: e,
                        postCallbackFn: a.postCallbackFn,
                        useImageRequest: a.useImageRequest,
                        requestData: a,
                        useDocWrite: b === Object(b) && !0 === b.useDocumentWrite
                    }
                },
                defaultCallback: function(a, b) {
                    var d, c, e, f, h, i, o, j, p;
                    if ((d = a.stuff) && d instanceof Array && (c = d.length))
                        for (e = 0; e < c; e++)
                            if ((f = d[e]) && f === Object(f)) {
                                h = f.cn;
                                i = f.cv;
                                o = f.ttl;
                                if ("undefined" == typeof o || "" === o) o = Math.floor(m.getMaxCookieExpiresInMinutes() / 60 / 24);
                                j = f.dmn || "." + document.domain.replace(/^www\./, "");
                                p = f.type;
                                if (h && (i || "number" == typeof i)) "var" != p && (o = parseInt(o, 10)) && !isNaN(o) && m.setCookie(h, i, 1440 * o, "/", j, !1), B.stuffed[h] = i
                            }
                    d = a.uuid;
                    c = l.declaredId;
                    e = r.isPopulatedString;
                    if (e(d)) {
                        if (!e(c.uuid)) c.uuid =
                            d;
                        if (!r.isEmptyObject(k)) {
                            c = k.path;
                            if ("string" != typeof c || !c.length) c = "/";
                            e = parseInt(k.days, 10);
                            isNaN(e) && (e = 100);
                            m.setCookie(k.name || "aam_did", d, 1440 * e, c, k.domain || "." + document.domain.replace(/^www\./, ""), !0 === k.secure)
                        }
                    }!q && !l.abortRequests && x.requestToProcess(a, b)
                },
                makeRequestSrc: function(a, b) {
                    a.sids = r.removeEmptyArrayValues(a.sids || []);
                    a.pdata = r.removeEmptyArrayValues(a.pdata || []);
                    var d = l,
                        c = m.encodeAndBuildRequest(a.sids, ","),
                        e = m.encodeAndBuildRequest(a.pdata, ","),
                        k = (a.logdataArray || []).join("&");
                    delete a.logdataArray;
                    var i = v.IS_HTTPS ? "https://" : "http://",
                        q = d.declaredId.getDeclaredIdQueryString(),
                        o;
                    o = [];
                    var j, p, t, u;
                    for (j in a)
                        if (!(j in d.reservedKeys) && a.hasOwnProperty(j))
                            if (p = a[j], j = encodeURIComponent(j), p instanceof Array)
                                for (t = 0, u = p.length; t < u; t++) o.push(j + "=" + encodeURIComponent(p[t]));
                            else o.push(j + "=" + encodeURIComponent(p));
                    o = o.length ? "&" + o.join("&") : "";
                    return i + f + ".demdex.net/event?d_nsid=" + h + q + (c.length ? "&d_sid=" + c : "") + (e.length ? "&d_px=" + e : "") + (k.length ? "&d_ld=" + encodeURIComponent(k) :
                        "") + o + (d.useJSONP ? "&d_rtbd=json&d_jsonv=" + DIL.jsonVersion + "&d_dst=1&d_cts=1&d_cb=" + (b || "") : "")
                },
                fireRequest: function(a) {
                    if ("img" == a.tag) this.fireImage(a);
                    else if ("script" == a.tag) {
                        var b = l.declaredId,
                            b = b.declaredId.request || b.declaredId.init || {};
                        this.fireScript(a, {
                            dpid: b.dpid || "",
                            dpuuid: b.dpuuid || ""
                        })
                    }
                },
                fireImage: function(a) {
                    var c = l,
                        e, f;
                    if (!c.abortRequests) c.firing = !0, e = new Image(0, 0), c.sent.push(a), e.onload = function() {
                        c.firing = !1;
                        c.fired.push(a);
                        c.num_of_img_responses++;
                        c.registerRequest()
                    }, f = function(e) {
                        d =
                            "imgAbortOrErrorHandler received the event of type " + e.type;
                        b.push(d);
                        c.abortRequests = !0;
                        c.firing = !1;
                        c.errored.push(a);
                        c.num_of_img_errors++;
                        c.registerRequest()
                    }, e.addEventListener ? (e.addEventListener("error", f, !1), e.addEventListener("abort", f, !1)) : e.attachEvent && (e.attachEvent("onerror", f), e.attachEvent("onabort", f)), e.src = a.src
                },
                fireScript: function(a, c) {
                    var e = this,
                        h = l,
                        k, i, o = a.src,
                        q = a.postCallbackFn,
                        j = "function" == typeof q,
                        p = a.internalCallbackName;
                    k = a.useDocWrite;
                    if (!h.abortRequests) {
                        h.firing = !0;
                        window[p] = function(e) {
                            try {
                                e !== Object(e) && (e = {});
                                var k = a.callbackFn;
                                h.firing = !1;
                                h.fired.push(a);
                                h.num_of_jsonp_responses++;
                                k(e, c);
                                j && q(e, c)
                            } catch (n) {
                                n.message = "DIL jsonp callback caught error with message " + n.message;
                                d = n.message;
                                b.push(d);
                                n.filename = n.filename || "dil.js";
                                n.partner = f;
                                DIL.errorModule.handleError(n);
                                try {
                                    k({
                                        error: n.name + "|" + n.message
                                    }), j && q({
                                        error: n.name + "|" + n.message
                                    })
                                } catch (o) {}
                            } finally {
                                h.requestRemoval({
                                    script: i,
                                    callbackName: p
                                }), h.registerRequest()
                            }
                        };
                        var m = function() {
                            h.firing = !1;
                            h.requestRemoval({
                                script: "no script created",
                                callbackName: p
                            })
                        };
                        E ? m() : k ? DIL.windowLoaded || "complete" == document.readyState || "loaded" == document.readyState ? (a.useDocWriteSuccessful = !1, m()) : (document.write('<script type="text/javascript" src="' + o + '" id="' + p + '"><\/script>'), i = document.getElementById(p), a.useDocWriteSuccessful = !0) : (i = document.createElement("script"), i.addEventListener && i.addEventListener("error", function(b) {
                            h.requestRemoval({
                                script: i,
                                callbackName: p
                            });
                            d = "jsonp script tag error listener received the event of type " + b.type + " with src " +
                                o;
                            e.handleScriptError(d, a)
                        }, !1), i.type = "text/javascript", i.src = o, k = DIL.variables.scriptNodeList[0], k.parentNode.insertBefore(i, k));
                        h.sent.push(a);
                        h.declaredId.declaredId.request = null
                    }
                },
                handleScriptError: function(a, d) {
                    var c = l;
                    b.push(a);
                    c.abortRequests = !0;
                    c.firing = !1;
                    c.errored.push(d);
                    c.num_of_jsonp_errors++;
                    c.registerRequest()
                }
            },
            r = {
                isValidPdata: function(a) {
                    return a instanceof Array && this.removeEmptyArrayValues(a).length ? !0 : !1
                },
                isValidLogdata: function(a) {
                    return !this.isEmptyObject(a)
                },
                isEmptyObject: function(a) {
                    if (a !==
                        Object(a)) return !0;
                    for (var b in a)
                        if (a.hasOwnProperty(b)) return !1;
                    return !0
                },
                removeEmptyArrayValues: function(a) {
                    for (var b = 0, c = a.length, d, e = [], b = 0; b < c; b++) d = a[b], "undefined" != typeof d && null != d && e.push(d);
                    return e
                },
                isPopulatedString: function(a) {
                    return "string" == typeof a && a.length
                }
            },
            m = {
                addListener: function() {
                    if (document.addEventListener) return function(a, b, d) {
                        a.addEventListener(b, function(a) {
                            "function" == typeof d && d(a)
                        }, !1)
                    };
                    if (document.attachEvent) return function(a, b, d) {
                        a.attachEvent("on" + b, function(a) {
                            "function" ==
                            typeof d && d(a)
                        })
                    }
                }(),
                convertObjectToKeyValuePairs: function(a, b, d) {
                    var c = [],
                        b = b || "=",
                        e, f;
                    for (e in a) f = a[e], "undefined" != typeof f && null != f && c.push(e + b + (d ? encodeURIComponent(f) : f));
                    return c
                },
                encodeAndBuildRequest: function(a, b) {
                    return this.map(a, function(a) {
                        return encodeURIComponent(a)
                    }).join(b)
                },
                map: function(a, b) {
                    if (Array.prototype.map) return a.map(b);
                    if (void 0 === a || null === a) throw new TypeError;
                    var d = Object(a),
                        c = d.length >>> 0;
                    if ("function" !== typeof b) throw new TypeError;
                    for (var e = Array(c), f = 0; f < c; f++) f in
                        d && (e[f] = b.call(b, d[f], f, d));
                    return e
                },
                filter: function(a, b) {
                    if (!Array.prototype.filter) {
                        if (void 0 === a || null === a) throw new TypeError;
                        var d = Object(a),
                            c = d.length >>> 0;
                        if ("function" !== typeof b) throw new TypeError;
                        for (var e = [], f = 0; f < c; f++)
                            if (f in d) {
                                var h = d[f];
                                b.call(b, h, f, d) && e.push(h)
                            }
                        return e
                    }
                    return a.filter(b)
                },
                getCookie: function(a) {
                    var a = a + "=",
                        b = document.cookie.split(";"),
                        d, c, e;
                    for (d = 0, c = b.length; d < c; d++) {
                        for (e = b[d];
                            " " == e.charAt(0);) e = e.substring(1, e.length);
                        if (0 == e.indexOf(a)) return decodeURIComponent(e.substring(a.length,
                            e.length))
                    }
                    return null
                },
                setCookie: function(a, b, d, c, e, f) {
                    var h = new Date;
                    d && (d *= 6E4);
                    document.cookie = a + "=" + encodeURIComponent(b) + (d ? ";expires=" + (new Date(h.getTime() + d)).toUTCString() : "") + (c ? ";path=" + c : "") + (e ? ";domain=" + e : "") + (f ? ";secure" : "")
                },
                extendArray: function(a, b) {
                    return a instanceof Array && b instanceof Array ? (Array.prototype.push.apply(a, b), !0) : !1
                },
                extendObject: function(a, b, d) {
                    var c;
                    if (a === Object(a) && b === Object(b)) {
                        for (c in b)
                            if (b.hasOwnProperty(c) && (r.isEmptyObject(d) || !(c in d))) a[c] = b[c];
                        return !0
                    }
                    return !1
                },
                getMaxCookieExpiresInMinutes: function() {
                    return ((new Date(v.COOKIE_MAX_EXPIRATION_DATE)).getTime() - (new Date).getTime()) / 1E3 / 60
                }
            };
        "error" == f && 0 == h && m.addListener(window, "load", function() {
            DIL.windowLoaded = !0
        });
        var z = function() {
                J();
                !q && !l.abortRequests && x.attachIframe();
                l.readyToRemove = !0;
                l.requestRemoval()
            },
            J = function() {
                q || setTimeout(function() {
                    !F && !l.firstRequestHasFired && !l.adms.admsProcessingStarted && !l.adms.calledBack && ("function" == typeof A ? C.afterResult(A).submit() : C.submit())
                }, DIL.constants.TIME_TO_DEFAULT_REQUEST)
            },
            I = document;
        "error" != f && (DIL.windowLoaded ? z() : "complete" != I.readyState && "loaded" != I.readyState ? m.addListener(window, "load", z) : DIL.isAddedPostWindowLoadWasCalled ? m.addListener(window, "load", z) : (i = "number" == typeof i ? parseInt(i, 10) : 0, 0 > i && (i = 0), setTimeout(z, i || DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));
        l.declaredId.setDeclaredId(D, "init");
        this.api = C;
        this.getStuffedVariable = function(a) {
            var b = B.stuffed[a];
            !b && "number" != typeof b && (b = m.getCookie(a), !b && "number" != typeof b && (b = ""));
            return b
        };
        this.validators =
            r;
        this.helpers = m;
        this.constants = v;
        this.log = b;
        if (G) this.pendingRequest = j, this.requestController = l, this.setDestinationPublishingUrl = e, this.destinationPublishing = x, this.requestProcs = w, this.variables = B
    },
    function() {
        var a = document,
            c;
        if (null == a.readyState && a.addEventListener) a.readyState = "loading", a.addEventListener("DOMContentLoaded", c = function() {
            a.removeEventListener("DOMContentLoaded", c, !1);
            a.readyState = "complete"
        }, !1)
    }(), DIL.extendStaticPropertiesAndMethods = function(a) {
        var c;
        if (a === Object(a))
            for (c in a) a.hasOwnProperty(c) &&
                (this[c] = a[c])
    }, DIL.extendStaticPropertiesAndMethods({
        version: "4.4",
        jsonVersion: 1,
        constants: {
            TIME_TO_DEFAULT_REQUEST: 50,
            TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT: 500
        },
        variables: {
            scriptNodeList: document.getElementsByTagName("script"),
            scriptsRemoved: [],
            callbacksRemoved: []
        },
        windowLoaded: !1,
        dils: {},
        isAddedPostWindowLoadWasCalled: !1,
        isAddedPostWindowLoad: function(a) {
            this.isAddedPostWindowLoadWasCalled = !0;
            this.windowLoaded = "function" == typeof a ? !!a() : "boolean" == typeof a ? a : !0
        },
        create: function(a) {
            try {
                return new DIL(a)
            } catch (c) {
                return (new Image(0,
                    0)).src = "http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D" + (new Date).getTime(), Error("Error in attempt to create DIL instance with DIL.create()")
            }
        },
        registerDil: function(a, c, b) {
            c = c + "$" + b;
            c in this.dils || (this.dils[c] = a)
        },
        getDil: function(a, c) {
            var b;
            "string" != typeof a && (a = "");
            c || (c = 0);
            b = a + "$" + c;
            return b in this.dils ? this.dils[b] :
                Error("The DIL instance with partner = " + a + " and containerNSID = " + c + " was not found")
        },
        dexGetQSVars: function(a, c, b) {
            c = this.getDil(c, b);
            return c instanceof this ? c.getStuffedVariable(a) : ""
        },
        xd: {
            postMessage: function(a, c, b) {
                var d = 1;
                if (c)
                    if (window.postMessage) b.postMessage(a, c.replace(/([^:]+:\/\/[^\/]+).*/, "$1"));
                    else if (c) b.location = c.replace(/#.*$/, "") + "#" + +new Date + d+++"&" + a
            }
        }
    }), DIL.errorModule = function() {
        var a = DIL.create({
                partner: "error",
                containerNSID: 0,
                disableDestinationPublishingIframe: !0
            }),
            c = {
                harvestererror: 14138,
                destpuberror: 14139,
                dpmerror: 14140,
                generalerror: 14137,
                error: 14137,
                noerrortypedefined: 15021,
                evalerror: 15016,
                rangeerror: 15017,
                referenceerror: 15018,
                typeerror: 15019,
                urierror: 15020
            },
            b = !1;
        return {
            activate: function() {
                b = !0
            },
            handleError: function(d) {
                if (!b) return "DIL error module has not been activated";
                d !== Object(d) && (d = {});
                var e = d.name ? (new String(d.name)).toLowerCase() : "",
                    f = [],
                    d = {
                        name: e,
                        filename: d.filename ? d.filename + "" : "",
                        partner: d.partner ? d.partner + "" : "no_partner",
                        site: d.site ? d.site +
                            "" : document.location.href,
                        message: d.message ? d.message + "" : ""
                    };
                f.push(e in c ? c[e] : c.noerrortypedefined);
                a.api.pixels(f).logs(d).useImageRequest().submit();
                return "DIL error report sent"
            },
            pixelMap: c
        }
    }(), DIL.tools = {}, DIL.modules = {
        helpers: {
            handleModuleError: function(a, c, b) {
                var d = "",
                    c = c || "Error caught in DIL module/submodule: ";
                a === Object(a) ? d = c + (a.message || "err has no message") : (d = c + "err is not a valid object", a = {});
                a.message = d;
                if (b instanceof DIL) a.partner = b.api.getPartner();
                DIL.errorModule.handleError(a);
                return this.errorMessage = d
            }
        }
    };
DIL.tools.getSearchReferrer = function(a, c) {
    var b = DIL.getDil("error"),
        d = DIL.tools.decomposeURI(a || document.referrer),
        e = "",
        f = "",
        h = {
            queryParam: "q"
        },
        e = b.helpers.filter([c === Object(c) ? c : {}, {
            hostPattern: /aol\./
        }, {
            hostPattern: /ask\./
        }, {
            hostPattern: /bing\./
        }, {
            hostPattern: /google\./
        }, {
            hostPattern: /yahoo\./,
            queryParam: "p"
        }], function(a) {
            return !(!a.hasOwnProperty("hostPattern") || !d.hostname.match(a.hostPattern))
        }).shift();
    return !e ? {
        valid: !1,
        name: "",
        keywords: ""
    } : {
        valid: !0,
        name: d.hostname,
        keywords: (b.helpers.extendObject(h,
            e), f = h.queryPattern ? (e = ("" + d.search).match(h.queryPattern)) ? e[1] : "" : d.uriParams[h.queryParam], decodeURIComponent(f || "").replace(/\+|%20/g, " "))
    }
};
DIL.tools.decomposeURI = function(a) {
    var c = DIL.getDil("error"),
        b = document.createElement("a");
    b.href = a || document.referrer;
    return {
        hash: b.hash,
        host: b.host.split(":").shift(),
        hostname: b.hostname,
        href: b.href,
        pathname: b.pathname.replace(/^\//, ""),
        protocol: b.protocol,
        search: b.search,
        uriParams: function(a, b) {
            c.helpers.map(b.split("&"), function(b) {
                b = b.split("=");
                a[b.shift()] = b.shift()
            });
            return a
        }({}, b.search.replace(/^(\/|\?)?|\/$/g, ""))
    }
};
DIL.tools.getMetaTags = function() {
    var a = {},
        c = document.getElementsByTagName("meta"),
        b, d, e, f, h;
    for (b = 0, e = arguments.length; b < e; b++)
        if (f = arguments[b], null !== f)
            for (d = 0; d < c.length; d++)
                if (h = c[d], h.name == f) {
                    a[f] = h.content;
                    break
                }
    return a
};
DIL.modules.siteCatalyst = {
    dil: null,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, b) {
        try {
            var d = this,
                e = {
                    name: "DIL Site Catalyst Module Error"
                },
                f = function(a) {
                    e.message = a;
                    DIL.errorModule.handleError(e);
                    return a
                };
            this.dil = null;
            if (c instanceof DIL) this.dil = c;
            else return f("dilInstance is not a valid instance of DIL");
            e.partner = c.api.getPartner();
            if (a !== Object(a)) return f("siteCatalystReportingSuite is not an object");
            if ("function" != typeof a.m_i || "function" != typeof a.loadModule) return f("s.m_i is not a function or s.loadModule is not a function");
            a.m_DIL = function(a) {
                a = a.m_i("DIL");
                if (a !== Object(a)) return f("m is not an object");
                a.trackVars = d.constructTrackVars(b);
                a.d = 0;
                a._t = function() {
                    var a, b, d = "," + this.trackVars + ",",
                        c = this.s,
                        e, h = [];
                    e = [];
                    var i = {},
                        y = !1;
                    if (c !== Object(c) || !(c.va_t instanceof Array)) return f("Error in m._t function: s is not an object or s.va_t is not an array");
                    if (this.d) {
                        if (c.lightProfileID)(a = c.lightTrackVars) && (a = "," + a + "," + c.vl_mr + ",");
                        else if (c.pe || c.linkType) {
                            a = c.linkTrackVars;
                            if (c.pe && (b = c.pe.substring(0, 1).toUpperCase() +
                                c.pe.substring(1), c[b])) a = c[b].trackVars;
                            a && (a = "," + a + "," + c.vl_l + "," + c.vl_l2 + ",")
                        }
                        if (a) {
                            for (b = 0, h = a.split(","); b < h.length; b++) 0 <= d.indexOf("," + h[b] + ",") && e.push(h[b]);
                            e.length && (d = "," + e.join(",") + ",")
                        }
                        for (e = 0, b = c.va_t.length; e < b; e++) a = c.va_t[e], 0 <= d.indexOf("," + a + ",") && null != c[a] && "" !== c[a] && (i[a] = c[a], y = !0);
                        y && this.d.api.signals(i, "c_").submit()
                    }
                };
                a.setup = function() {
                    this.d = c
                }
            };
            a.loadModule("DIL");
            if (a.DIL !== Object(a.DIL) || "function" != typeof a.DIL.setup) return f("s.DIL is not an object or s.DIL.setup is not a function");
            a.DIL.setup();
            if (e.message) return e.message
        } catch (h) {
            return this.handle(h, "DIL.modules.siteCatalyst.init() caught error with message ", this.dil)
        }
    },
    constructTrackVars: function(a) {
        var c = [],
            b, d, e, f, h;
        if (a === Object(a)) {
            b = a.names;
            if (b instanceof Array && (e = b.length))
                for (d = 0; d < e; d++) f = b[d], "string" == typeof f && f.length && c.push(f);
            a = a.iteratedNames;
            if (a instanceof Array && (e = a.length))
                for (d = 0; d < e; d++)
                    if (b = a[d], b === Object(b) && (f = b.name, h = parseInt(b.maxIndex, 10), "string" == typeof f && f.length && !isNaN(h) && 0 <= h))
                        for (b =
                            0; b <= h; b++) c.push(f + b);
            if (c.length) return c.join(",")
        }
        return this.constructTrackVars({
            names: "pageName,channel,campaign,products,events,pe,pev1,pev2,pev3".split(","),
            iteratedNames: [{
                name: "prop",
                maxIndex: 75
            }, {
                name: "eVar",
                maxIndex: 75
            }]
        })
    }
};
DIL.modules.GA = {
    dil: null,
    arr: null,
    tv: null,
    errorMessage: "",
    defaultTrackVars: ["_setAccount", "_setCustomVar", "_addItem", "_addTrans", "_trackSocial"],
    defaultTrackVarsObj: null,
    signals: {},
    hasSignals: !1,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, b) {
        try {
            this.tv = this.arr = this.dil = null;
            this.errorMessage = "";
            this.signals = {};
            this.hasSignals = !1;
            var d = {
                    name: "DIL GA Module Error"
                },
                e = "";
            c instanceof DIL ? (this.dil = c, d.partner = this.dil.api.getPartner()) : (e = "dilInstance is not a valid instance of DIL",
                d.message = e, DIL.errorModule.handleError(d));
            !(a instanceof Array) || !a.length ? (e = "gaArray is not an array or is empty", d.message = e, DIL.errorModule.handleError(d)) : this.arr = a;
            this.tv = this.constructTrackVars(b);
            this.errorMessage = e
        } catch (f) {
            this.handle(f, "DIL.modules.GA.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    constructTrackVars: function(a) {
        var c = [],
            b, d, e, f;
        if (this.defaultTrackVarsObj !== Object(this.defaultTrackVarsObj)) {
            e = this.defaultTrackVars;
            f = {};
            for (b = 0, d = e.length; b < d; b++) f[e[b]] = !0;
            this.defaultTrackVarsObj = f
        } else f = this.defaultTrackVarsObj; if (a === Object(a)) {
            a = a.names;
            if (a instanceof Array && (d = a.length))
                for (b = 0; b < d; b++) e = a[b], "string" == typeof e && e.length && e in f && c.push(e);
            if (c.length) return c
        }
        return this.defaultTrackVars
    },
    constructGAObj: function(a) {
        var c = {},
            a = a instanceof Array ? a : this.arr,
            b, d, e, f;
        for (b = 0, d = a.length; b < d; b++) e = a[b], e instanceof Array && e.length && (e = [], f = a[b], e instanceof Array && f instanceof Array && Array.prototype.push.apply(e, f), f = e.shift(), "string" == typeof f &&
            f.length && (c[f] instanceof Array || (c[f] = []), c[f].push(e)));
        return c
    },
    addToSignals: function(a, c) {
        if ("string" != typeof a || "" === a || null == c || "" === c) return !1;
        this.signals[a] instanceof Array || (this.signals[a] = []);
        this.signals[a].push(c);
        return this.hasSignals = !0
    },
    constructSignals: function() {
        var a = this.constructGAObj(),
            c = {
                _setAccount: function(a) {
                    this.addToSignals("c_accountId", a)
                },
                _setCustomVar: function(a, b, c) {
                    "string" == typeof b && b.length && this.addToSignals("c_" + b, c)
                },
                _addItem: function(a, b, c, d, e, f) {
                    this.addToSignals("c_itemOrderId",
                        a);
                    this.addToSignals("c_itemSku", b);
                    this.addToSignals("c_itemName", c);
                    this.addToSignals("c_itemCategory", d);
                    this.addToSignals("c_itemPrice", e);
                    this.addToSignals("c_itemQuantity", f)
                },
                _addTrans: function(a, b, c, d, e, f, h, i) {
                    this.addToSignals("c_transOrderId", a);
                    this.addToSignals("c_transAffiliation", b);
                    this.addToSignals("c_transTotal", c);
                    this.addToSignals("c_transTax", d);
                    this.addToSignals("c_transShipping", e);
                    this.addToSignals("c_transCity", f);
                    this.addToSignals("c_transState", h);
                    this.addToSignals("c_transCountry",
                        i)
                },
                _trackSocial: function(a, b, c, d) {
                    this.addToSignals("c_socialNetwork", a);
                    this.addToSignals("c_socialAction", b);
                    this.addToSignals("c_socialTarget", c);
                    this.addToSignals("c_socialPagePath", d)
                }
            },
            b = this.tv,
            d, e, f, h, i, q;
        for (d = 0, e = b.length; d < e; d++)
            if (f = b[d], a.hasOwnProperty(f) && c.hasOwnProperty(f) && (q = a[f], q instanceof Array))
                for (h = 0, i = q.length; h < i; h++) c[f].apply(this, q[h])
    },
    submit: function() {
        try {
            if ("" !== this.errorMessage) return this.errorMessage;
            this.constructSignals();
            return this.hasSignals ? (this.dil.api.signals(this.signals).submit(),
                "Signals sent: " + this.dil.helpers.convertObjectToKeyValuePairs(this.signals, "=", !0) + this.dil.log) : "No signals present"
        } catch (a) {
            return this.handle(a, "DIL.modules.GA.submit() caught error with message ", this.dil)
        }
    },
    Stuffer: {
        LIMIT: 5,
        dil: null,
        cookieName: null,
        delimiter: null,
        errorMessage: "",
        handle: DIL.modules.helpers.handleModuleError,
        callback: null,
        v: function() {
            return !1
        },
        init: function(a, c, b) {
            try {
                this.callback = this.dil = null, this.errorMessage = "", a instanceof DIL ? (this.dil = a, this.v = this.dil.validators.isPopulatedString,
                    this.cookieName = this.v(c) ? c : "aam_ga", this.delimiter = this.v(b) ? b : "|") : this.handle({
                    message: "dilInstance is not a valid instance of DIL"
                }, "DIL.modules.GA.Stuffer.init() error: ")
            } catch (d) {
                this.handle(d, "DIL.modules.GA.Stuffer.init() caught error with message ", this.dil)
            } finally {
                return this
            }
        },
        process: function(a) {
            var c, b, d, e, f, h;
            h = !1;
            var i = 1;
            if (a === Object(a) && (c = a.stuff) && c instanceof Array && (b = c.length))
                for (a = 0; a < b; a++)
                    if ((d = c[a]) && d === Object(d))
                        if (e = d.cn, f = d.cv, e == this.cookieName && this.v(f)) {
                            h = !0;
                            break
                        }
            if (h) {
                c =
                    f.split(this.delimiter);
                if ("undefined" == typeof window._gaq) window._gaq = [];
                d = window._gaq;
                for (a = 0, b = c.length; a < b && !(h = c[a].split("="), f = h[0], h = h[1], this.v(f) && this.v(h) && d.push(["_setCustomVar", i++, f, h, 1]), i > this.LIMIT); a++);
                this.errorMessage = 1 < i ? "No errors - stuffing successful" : "No valid values to stuff"
            } else this.errorMessage = "Cookie name and value not found in json"; if ("function" == typeof this.callback) return this.callback()
        },
        submit: function() {
            try {
                var a = this;
                if ("" !== this.errorMessage) return this.errorMessage;
                this.dil.api.afterResult(function(b) {
                    a.process(b)
                }).submit();
                return "DIL.modules.GA.Stuffer.submit() successful"
            } catch (c) {
                return this.handle(c, "DIL.modules.GA.Stuffer.submit() caught error with message ", this.dil)
            }
        }
    }
};
DIL.modules.Peer39 = {
    aid: "",
    dil: null,
    optionals: null,
    errorMessage: "",
    calledBack: !1,
    script: null,
    scriptsSent: [],
    returnedData: [],
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, b) {
        try {
            this.dil = null;
            this.errorMessage = "";
            this.calledBack = !1;
            this.optionals = b === Object(b) ? b : {};
            var b = {
                    name: "DIL Peer39 Module Error"
                },
                d = [],
                e = "";
            if (this.isSecurePageButNotEnabled(document.location.protocol)) e = "Module has not been enabled for a secure page", d.push(e), b.message = e, DIL.errorModule.handleError(b);
            c instanceof
            DIL ? (this.dil = c, b.partner = this.dil.api.getPartner()) : (e = "dilInstance is not a valid instance of DIL", d.push(e), b.message = e, DIL.errorModule.handleError(b));
            "string" != typeof a || !a.length ? (e = "aid is not a string or is empty", d.push(e), b.message = e, DIL.errorModule.handleError(b)) : this.aid = a;
            this.errorMessage = d.join("\n")
        } catch (f) {
            this.handle(f, "DIL.modules.Peer39.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    isSecurePageButNotEnabled: function(a) {
        return "https:" == a && !0 !== this.optionals.enableHTTPS ?
            !0 : !1
    },
    constructSignals: function() {
        var a = this,
            c = this.constructScript(),
            b = DIL.variables.scriptNodeList[0];
        window["afterFinished_" + this.aid] = function() {
            try {
                var b = a.processData(p39_KVP_Short("c_p", "|").split("|"));
                b.hasSignals && a.dil.api.signals(b.signals).submit()
            } catch (c) {} finally {
                a.calledBack = !0, "function" == typeof a.optionals.afterResult && a.optionals.afterResult()
            }
        };
        b.parentNode.insertBefore(c, b);
        this.scriptsSent.push(c);
        return "Request sent to Peer39"
    },
    processData: function(a) {
        var c, b, d, e, f = {},
            h = !1;
        this.returnedData.push(a);
        if (a instanceof Array)
            for (c = 0, b = a.length; c < b; c++) d = a[c].split("="), e = d[0], d = d[1], e && isFinite(d) && !isNaN(parseInt(d, 10)) && (f[e] instanceof Array || (f[e] = []), f[e].push(d), h = !0);
        return {
            hasSignals: h,
            signals: f
        }
    },
    constructScript: function() {
        var a = document.createElement("script"),
            c = this.optionals,
            b = c.scriptId,
            d = c.scriptSrc,
            c = c.scriptParams;
        a.id = "string" == typeof b && b.length ? b : "peer39ScriptLoader";
        a.type = "text/javascript";
        "string" == typeof d && d.length ? a.src = d : (a.src = (this.dil.constants.IS_HTTPS ?
            "https:" : "http:") + "//stags.peer39.net/" + this.aid + "/trg_" + this.aid + ".js", "string" == typeof c && c.length && (a.src += "?" + c));
        return a
    },
    submit: function() {
        try {
            return "" !== this.errorMessage ? this.errorMessage : this.constructSignals()
        } catch (a) {
            return this.handle(a, "DIL.modules.Peer39.submit() caught error with message ", this.dil)
        }
    }
};