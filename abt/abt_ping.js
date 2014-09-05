/* Before login, the button is an anchor link  */
$('.login_modal_buy').live('click', function()
{
    ccs_cc_log.logEvent("Interaction", "SKey=a62b622d&Action=conversion&ActionContext=addtocart")
});
/* After login, the button is an input */
$('#product_top_add_container input').live('click', function()
{
    ccs_cc_log.logEvent("Interaction", "SKey=a62b622d&Action=conversion&ActionContext=addtocart")
});	

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
		ccs_cc_log.setPing(60,10000, 
			"UserAgent=" + encodeURIComponent(navigator.userAgent) + 
			"&"+ window[f].toString().match(/ccs_cc_log\.logEvent \(et, '(.+)'/)[1] + 
			"&" + "ccs_cc_loge" + "=" + encodeURIComponent(window[f].toString().match(/case '.+': et='ProductHookLoad'(.|\s)*/)[0]));
}