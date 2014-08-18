Pie = function(input){
	this.productInformation = {};
	this.productInformation.product = {};
	this.productInformation.product = input.productInformation.product;
	this.productInformation.product.name = input.productInformation.product.name;
	this.productInformation.product.description= input.productInformation.product.description;
	this.productInformation.product.brand= input.productInformation.product.brand;
	this.productInformation.product.model= input.productInformation.product.model;
	this.productInformation.product.productID=	input.productInformation.product.productID;
	this.productInformation.product.url= input.productInformation.product.url;
	this.productInformation.product.image= input.productInformation.product.image;
	this.productInformation.product.manufacturer = {};
	this.productInformation.product.manufacturer.name= input.productInformation.product.manufacturer.name;
	this.productInformation.product.manufacturer.description= input.productInformation.product.manufacturer.description;
	this.productInformation.offers = ['price', 'priceCurrency', 'priceValidUntil'];
	this.productInformation.offers.price= input.productInformation.offers.price;
	this.productInformation.offers.priceCurrency= input.productInformation.offers.priceCurrency;
	this.productInformation.offers.priceValidUntil= input.productInformation.offers.priceValidUntil;
	this.productInformation.seller.name= input.productInformation.seller.name;
	this.productInformation.seller = {};
	this.productInformation.seller.address = {};
	this.productInformation.seller.address.streetAddress= productInformation.seller.address.streetAddress;
	this.productInformation.seller.address.PostalCode= input.productInformation.seller.address.PostalCode;
	this.productInformation.seller.address.addressLocality= input.productInformation.seller.address.addressLocality;
	this.productInformation.seller.address.telephone= input.productInformation.seller.address.telephone;
	this.productInformation.seller.address.faxNumber= input.productInformation.seller.address.faxNumber;
	this.productInformation.seller.address.email= input.productInformation.seller.address.email;
	this.productInformation.availability= input.productInformation.availability;
	this.productInformation.itemCondition= input.productInformation.itemCondition;
	this.productInformation.category= input.productInformation.category;

	this.getProductInformation= function(){
		return this.productInformation;
	};

	this.getCompetitors= function(){
		return $(document).text().match(/(flix|sellpoint|webcollage|ccs)/g).filter(function(elem, pos, self) {
    		return self.indexOf(elem) == pos;
    	});
	};

	this.send = function(event, type, category, action, label, value){
		var params = "event=" + event + "&type=" + type + "&category=" + category;
		if(action && typeof action != 'undefined')
			params += "&action=" + action;
		if(label && typeof action != 'undefined')
			params += "&label=" + label;
		if(value && typeof action != 'undefined')
			params += "&value=" + value;
		ccs_cc_log.setPing(1,1000, params);
	};

	this.debug = function(){
		console.log(this);
	};
};