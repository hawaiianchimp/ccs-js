// (function ()
// 	{
// 		var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
// 		sc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cbsi.demdex.net/event?category=' + 
// 		var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(sc, n);
// })();
(function(){
var sample_dil = DIL.create({partner:"cbsi", uuidCookie: {name: 'aam_uuid', days: 30}});
sample_dil.api.signals({
  c_mf: document.querySelector("[itemprop='brand']").getAttribute("content"),
  c_pn:"",
  c_upcean:"",
  c_lang:"EN",
  c_market:"US",
  c_cat: document.getElementById("divBreadCrumbs").textContent.trim().split(/\s{4}/).join("|"),
  c_price:document.querySelector("[itemprop='price']").innerHTML,
  c_ptype:"product",
});
sample_dil.api.submit();
})();