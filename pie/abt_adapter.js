/* 
 * Product Information (PI) Event Adapter
 * Adapter to grab attributes and send to Product Information Event
 * requires: PI.js
 * 
 * Sean Burke 8/7/14
 */

(function(){
	var adapter= {
		           SKey: 'a62b622d', 	//subrscriber key
		      ProductId: ccs_cc_args['cpn'], //product number
		       SMfgName: ccs_cc_args['mf'], //manufacturer name
		         SMfgPn: ccs_cc_args['pn'],  //manufacturer part number
		      CatalogId: ccs_cc_args['ccid'], //Catalog ID
		           LCID: ccs_cc_args['lang'],  //Locale ID, language
                 Market: ccs_cc_args['market'],  //market of product, 2 letter region code
		        SEanUpc: ccs_cc_args['upcean'],  //UPC/EAN code
		          SkuId: null, 	//sku number
		            upc: $("[itemtype$='Product'] [itemprop='productID']").attr("content").match(/[0-9]+/)[0], 	//upc code
		          upc14: null, 	//upc14 code
		           isbn: null, 	//isbn number
		          MfgId: null,  //manufacturer id
	       		  MfgPn: null, 	//manufacturer part number
		   	  userAgent: null,  //user agent of browser
			  	 ProdId: $("[itemtype$='Product'] [itemprop='productID']").attr("content"),  //Product ID that is grabbed from page 
			  	 ProdMf: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),  //Product Manufacturer grabbed from page
		       ProdName: $("[itemtype$='Product'] [itemprop='name']").text(), 	//name of product
	           ProdDesc: $("#product_short_description [itemprop='description']").text(), 	//description of product
		      ProdModel: $("[itemtype$='Product'] [itemprop='model']").attr("content"), 	//model number
		      ProdImage: $("[itemtype$='Product'] [itemprop='image']").attr("content"), 	//product image
		   ProdCategory: $("[itemprop=breadcrumb]").text().replace(/\s/gi,' ').split(">"), 	//category of product as an Array
		      ProdPrice: $("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)[1], 	//price of product
		  priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"), 	//unit of price, e.g. USD
		    priceSymbol: $("[itemtype$='Product'] [itemprop='price']").text().match(/(.)[\s]*([\d\.,]+)/)[1],  //symbol of price, e.g. $
		priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text(), 	//date of current price 
		   availability: $("[itemprop='availability']").attr("href").match(/schema\.org\/(.+)/)[1], 	//availability of product
		  itemCondition: $("[itemprop='itemCondition']").attr("href").match(/schema\.org\/(.+)/)[1], 	//condition of product
	};
	ccs_pi = new PI(adapter); //create the PI object
	ccs_pi.send(); //send the PI object to hive

})();