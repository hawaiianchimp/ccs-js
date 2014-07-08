//ccs_cc_logsvc.prototype.SKey = ccs_cc_initParams[0]

ccs_cc_logsvc.prototype.sendEvent = function (etype, params, sendhost) {
	var o = this;
	var id = this.cnt++;
	var tmp = !params ? "" : "&" + params;

	var s = 'log?Et=' + etype + '&PId=' + o.pId + '&ClWait=' + o.getWaitTime() + '&_LogId=' + id + tmp;
	if (sendhost)
		s += '&Host=' + escape(o.host);
	if (o.SKey)
		s += '&SKey=' + o.SKey;
	var r = ('https:' == window.location.protocol ? 'https://' : 'http://') + o.ccsHost + '/' + s;

	var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
	sc.id = o.getFullId(id);
	sc.src = r > 2000 ? r.substring(0, 2000) : r;
	var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(sc, n);
	console.log(sc.src);
};
//ccs_cc_log.sendEvent
//try 2

ccs_cc_logsvc.prototype.setPing = function (maxCount, period, params) {
	var o = this;
	o.pingCount = 0;
	o.maxPing = maxCount;
	o.pingPeriod = period;
	o.ping = function () {
		o.pingCount++;
		if (o.pingCount > 1)
			o.sendEvent("Ping", params);
		if (o.pingCount <= o.maxPing)
			window.setTimeout(o.ping, o.pingPeriod);
	};
	o.ping();
};

for(var f in window){
	if(f.match(/(ccs_cc_loge_[\d]+)/))
		elog = window[f];
}
ccs_cc_log.setPing(1,1000, "SKey=" + ccs_cc_log.skey + "&ZoneVer=57&UserAgent=" + navigator.userAgent + "&eLog=" + elog);