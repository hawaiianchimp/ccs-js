/*
(C) CBS Interactive 2010-2014
*/
/* CCS CC Log */
function ccs_cc_logsvc() {
    var o = this;
    o.pStart = "ccs_cc_log_startTime";
    o.pInit = "ccs_cc_initParams";
    o.pId = o.genGuid();

    if (typeof window[o.pStart] == "undefined")
        window[o.pStart] = new Date().getTime();

    function getParams() {
        if (typeof window[o.pInit] == "undefined")
            return null;
        else
            return window[o.pInit];
    }

    o.ping = function () {
        o.pingCount++;
        if (o.pingCount > 1)
            o.sendEvent("Ping");
        if (o.pingCount <= o.maxPing)
            window.setTimeout(o.ping, o.pingPeriod);
    };

    try {
        o.host = window.location.href.substr(0, 300);
    } catch (e) {

    }

    o.cnt = 0;

    if (getParams() == null) {
        o.ccsHost = "ws.cnetcontent.com";
        o.skey = "undefined";
    } else {
        o.skey = getParams()[0];
        o.ccsHost = getParams()[1];
    }
    o.sendEvent("TInit", null, true);
    o.setPing(0, 15000);
}
ccs_cc_logsvc.prototype.setPing = function (maxCount, period) {
    var o = this;
    o.pingCount = 0;
    o.maxPing = maxCount;
    o.pingPeriod = period;
    o.ping();
};
ccs_cc_logsvc.prototype.genGuid = function () {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        i = Math.floor(Math.random() * 16).toString(16);
        result = result + i;
    }
    return result;
};
ccs_cc_logsvc.prototype.getWaitTime = function () {
    var p = this.pStart;
    if (typeof window[p] == "undefined") {
        return -1;
    }
    var now = new Date().getTime();
    var wait = now - window[p];
    return wait;
};
ccs_cc_logsvc.prototype.getFullId = function (id) {
    return "ccs_cc_log_" + id;
};
ccs_cc_logsvc.prototype.addGif = function (etype, params) {
    var o = this;
    var id = this.cnt++;
    var body = document.getElementsByClassName("body")[0];
    if (body) {
        body = document.appendChild(document.createElement("body"));
        var img = document.createElement("img");
        img.style.visibility = "collapsed";
        img.id = "ccs_cc_tgif";
        img.src = o.getSrc("t.gif", etype, params, id);
        body.appendChild(img);
    }
};
ccs_cc_logsvc.prototype.logEvent = function (etype, genericParamsString, serverParams, clientParams) {
    var o = this;


    var eventParams = serverParams || {};

    for (var paramKey in clientParams) {
        if (clientParams.hasOwnProperty(paramKey)) {
            if (!eventParams[paramKey]) {
                eventParams[paramKey] = clientParams[paramKey];
            } else {
                eventParams[paramKey] += clientParams[paramKey];
            }
        }
    }

    function allParams() {
        var paramsString = genericParamsString || "";

        var newParamsChunk = "";
        for (var paramKey in eventParams) {
            if (eventParams.hasOwnProperty(paramKey)) {
                newParamsChunk += "&" + paramKey + "=" + encodeURIComponent(eventParams[paramKey]);
            }
        }

        paramsString += newParamsChunk;

        return paramsString.indexOf("&") === 0 ? paramsString.substr(1) : paramsString;
    }

    o.sendEvent(etype, allParams(), true);
};
ccs_cc_logsvc.prototype.logEventSync = function (etype, genericParamsString, serverParams, clientParams) {
    this.logEvent(etype, genericParamsString, serverParams, clientParams);
    var ms = 100 + new Date().getTime();
    while (new Date() < ms) {}
};
ccs_cc_logsvc.prototype.sendEvent = function (etype, params, sendhost) {
    var o = this;
    var id = this.cnt++;
    var tmp = !params ? "" : "&" + params;

    var s = 'log?Et=' + etype + '&PId=' + o.pId + '&ClWait=' + o.getWaitTime() + '&_LogId=' + id + tmp;
    if (sendhost)
        s += '&Host=' + escape(o.host);
    var r = ('https:' == window.location.protocol ? 'https://' : 'http://') + o.ccsHost + '/' + s;

    var sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.async = true;
    sc.id = o.getFullId(id);
    sc.src = r > 2000 ? r.substring(0, 2000) : r;
    var n = document.getElementsByTagName('script')[0];
    n.parentNode.insertBefore(sc, n);
};

ccs_cc_logsvc.prototype.clear = function (id) {
    var scid = this.getFullId(id);
    var s = document.getElementById(scid);
    if (s != null) {
        s.parentNode.removeChild(s);
    }
};

/* Init */
if (!ccs_cc_log)
    var ccs_cc_log = new ccs_cc_logsvc();