//pre-JS
(function (){
			if(!(ccs_js_pcr = !($("#overview").contents().not(".print-only, #cnet-content, script, [id^='ccs-']").text().trim().length > 0)))
			{
				$("#pdp-tab-container .tab-content").addClass("ui-tabs-hide");
				$("#pdp-tab-container ul li").removeClass("ui-tabs-selected ui-state-active");
				$("[href='#overview']").parent().addClass("ui-tabs-selected ui-state-active");
				$("#overview").removeClass("ui-tabs-hide");
			}
})();

//post-JS
(function (){
	if(ccs_js_pcr){
			if($("#cnet-content").is(":empty"))
			{
				$("[href='#overview']").parent().hide();
				$("#overview").addClass("ui-tabs-hide");
				$("#pdp-tab-container .tab-content").first().removeClass("ui-tabs-hide");
				$("#pdp-tab-container ul li").first().addClass("ui-tabs-selected ui-state-active");
			}
			else
			{
				$("#pdp-tab-container .tab-content").addClass("ui-tabs-hide");
				$("#pdp-tab-container ul li").removeClass("ui-tabs-selected ui-state-active");
				$("[href='#overview']").parent().show();
				$("#overview").removeClass("ui-tabs-hide");
				$("[href='#overview']").parent().addClass("ui-tabs-selected ui-state-active");
			}
		}
})();