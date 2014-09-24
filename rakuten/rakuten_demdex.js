(function ()
	{
		var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
		sc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cbsi.demdex.net/event?category=' + document.getElementById("divBreadCrumbs").textContent.trim().split(/\s{4}/).join("|");;
		var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(sc, n);
})();


d_nsid:0
d_ld:_ts=1411427234806
c_URLccs_version:10
c_URLhostname:www.rakuten.com
c_URLhref:http://www.rakuten.com/prod/sony-bravia-kdl-32bx330-32-lcd-hdtv-720p/229077336.html?ccs_version=10
c_URLpathname:prod/sony-bravia-kdl-32bx330-32-lcd-hdtv-720p/229077336.html
c_URLprotocol:http:
c_cat1:none
c_cat2:none
c_cat3:none
c_cat4:none
c_cat5:none
c_cat6:none
c_lang:en-US
c_market:US
c_mf:Sony
c_pn:KDL32BX330
c_ptype:product
c_subscriber:Rakuten.com,
c_upcean:027242838604
d_rtbd:json
d_jsonv:1
d_dst:1
d_cts:1
d_cb:demdexRequestCallback_cbsi_0_1411427234806

(function(){
var v,j;
var sample_dil = DIL.create({partner:"cbsi", uuidCookie: {name: 'aam_uuid', days: 30}});
sample_dil.api.signals({
	c_URLccs_version:10
	c_URLhostname:www.rakuten.com
	c_URLhref:http://www.rakuten.com/prod/sony-bravia-kdl-32bx330-32-lcd-hdtv-720p/229077336.html?ccs_version=10
	c_URLpathname:prod/sony-bravia-kdl-32bx330-32-lcd-hdtv-720p/229077336.html
	c_URLprotocol:http:
	c_mf: document.querySelector("[itemprop='brand']").getAttribute("content"),
	c_pn:"",
	c_upcean:document.querySelector("#ProductSummary_divMfgPartNo:not(b)").inner.trim();,
	c_lang:"EN",
	c_market:"US",
	c_cat: document.getElementById("divBreadCrumbs").textContent.trim().split(/\s{4}/).join("|"),
	c_price:document.querySelector("[itemprop='price']").innerHTML,
	c_ptype:"product",
	c_lang:en-US,
	c_market:US,
	c_mf:Sony,
	c_pn:KDL32BX330,
	c_ptype:product,
	c_subscriber:window.location.host.match(/\w+\.(\w+\.\w+)/)[1].replace(/(^\w)/, function(x){return x.toUpperCase()}),
	c_upcean:027242838604
});
sample_dil.api.submit();
})();