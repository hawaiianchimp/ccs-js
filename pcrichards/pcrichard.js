//pre
(function (){
			console.log($("#overview").contents(":not(.print-only, #ccs-logos, #cnet-content, script)").text().trim());
			if(!(c = !($("#overview").contents(":not(.print-only, #ccs-logos, #cnet-content, script)").text().trim().length > 0)))
			{
				$("#pdp-tab-container .tab-content").addClass("ui-tabs-hide");
				$("#pdp-tab-container ul li").removeClass("ui-tabs-selected ui-state-active");
				$("[href='#overview']").parent().addClass("ui-tabs-selected ui-state-active");
				$("#overview").removeClass("ui-tabs-hide");
			}
})();




//post
(function (){
	console.log("c: " + c);
	if(c){
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