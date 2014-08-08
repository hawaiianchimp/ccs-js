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
	console.log("source: " + sc.src);
};

ccs_build_query = function(input){
	var query = ""
	for(var f in input)
	{
		query += f + "=" + encodeURIComponent(input[f]) + "&";
	}
	return query;
}

ccs_cc_logsvc.prototype.sendOrder = function (items, params, callback) {
	var o = this;
	for(var i in items)
	{
		o.sendEvent("Order", ccs_build_query(items[i]) + params);
	}
	window.setTimeout(callback, 100);
};

var cart = {};
for (var f in dataLayer){
	for(var e in dataLayer[f])
	{
		cart[e] = String(dataLayer[f][e]).split(",");
	}
}
var items = {};
var userAgent = encodeURIComponent(navigator.userAgent);
for(var f in window){
	if(f.match(/(ccs_cc_loge_[\d]+)/))
	{
		ccs_cc_loge_params =  window[f].toString().match(/ccs_cc_log\.logEvent \(et, '(.+)'/)[1];
		ccs_cc_loge_raw = encodeURIComponent(window[f].toString().match(/case '.+': et='ProductHookLoad'(.|\s)*/)[0]);
	}
}
for(var i=0;i<cart['mpns'].length;i++)
{
	items[i] = {};
	items[i]['pcl'] = cart.pcl[i];
	items[i]['pnl'] = cart.pnl[i];
	items[i]['mpns'] = cart.mpns[i];
	items[i]['price'] = cart.shoup[i];
	items[i]['order_total'] = cart.amt[0];
	items[i]['items_in_cart'] = cart.sCartQty[0];
	items[i]['cart_total'] = cart.order_amt[0];
	items[i]['sessionId'] = (typeof _SessionId != 'undefined')?_SessionId:"";
	items[i]['userAgent'] = userAgent;
	items[i]['ccs_cc_loge'] = ccs_cc_loge_raw;
}
console.log(items);

var origFunc = one_click_only;
one_click_only = function() {
    var args = Array.prototype.slice.call(arguments);
    // run before the call
    var rv = origFunc.apply(this, args);
    // run after the call
    ccs_cc_log.sendOrder(items, ccs_cc_loge_params, rv);
    return rv;
};