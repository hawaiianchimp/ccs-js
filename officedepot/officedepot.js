//pre JS
(function(){
	$("<div>",{id: "ccs-inline-content"}).insertAfter("#contentManuf");
	var sc = document.createElement('style');
	sc.setAttribute("id","ods");
    sc.innerHTML = "[id^='sp_'],[id^='_sp'],[class^='_sp'],[class='sp_'] {display:none !important;}"+
 				   "[class^='wc-'],[id^='wc-'] {display:none !important}"+
 				   "[id^='inpage-'],[id^='inpage_'],[class^='inpage-'],[class^='inpage_'] {display:none !important}";
    var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(sc, n);
})();

//post JS
(function(){
if($("#ccs-inline-content") && $("#ccs-inline-content").is(':empty')){
	document.querySelector("#ods").innerHTML = "";
}
})();



//minified
//pre
(function(){$("<div>",{id: "ccs-inline-content"}).insertAfter("#contentManuf");var sc = document.createElement('style');sc.setAttribute("id","ods");sc.innerHTML = "[id^='sp_'],[id^='_sp'],[class^='_sp'],[class='sp_'],[class^='wc-'],[id^='wc-'],[id^='inpage-'],[id^='inpage_'],[class^='inpage-'],[class^='inpage_']{display:none !important}";var n = document.getElementsByTagName('script')[0];n.parentNode.insertBefore(sc, n);})();
//post
(function(){if($("#ccs-inline-content") && $("#ccs-inline-content").is(':empty')){document.querySelector("#ods").innerHTML = "";}})();