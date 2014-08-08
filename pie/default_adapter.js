/* 
 * Product Information (PI) Event Adapter
 * Adapter to grab attributes and send to Product Information Event
 * requires: PI.js
 * 
 * Sean Burke 8/7/14
 */

(function(){
	var adapter= {
		           SKey: null, 	//subrscriber key
		           LCID: null,  //Locale ID, language
                 Market: null,  //market of product, 2 letter region code
		            cpn: null, 	//customer product number
		          SkuId: null, 	//sku number
		        SEanUpc: null,  //UPC/EAN code
		            upc: null, 	//upc code
		          upc14: null, 	//upc14 code
		           isbn: null, 	//isbn number
		          MfgId: null,  //manufacturer id
		       SMfgName: null,  //manufacturer name
		         SMfgPn: null,  //manufacturer part number 
	       		  MfgPn: null, 	//manufacturer part number
		   	  userAgent: null,  //user agent of browser
		      	 ProdId: null, 	//product id
		       ProdName: null, 	//name of product
	           ProdDesc: null, 	//description of product
		      ProdModel: null, 	//model number
		      ProdImage: null, 	//product image
		   ProdCategory: [null], 	//category of product as an Array
		      ProdPrice: null, 	//price of product
		  priceCurrency: null, 	//unit of price, e.g. USD
		    priceSymbol: null,  //symbol of price, e.g. $
		priceValidUntil: null, 	//date of current price 
		   availability: null, 	//availability of product
		  itemCondition: null, 	//condition of product
	};
	var pi = new PI(adapter); //create the PI object
	pi.send(); //send the PI object to hive

})();