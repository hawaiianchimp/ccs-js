abt = {
	productInformation: {
		product: {
			name: $("[itemtype$='Product'] [itemprop='name']").text(),
			description: $("#product_short_description [itemprop='description']").text(),
			brand: $("[itemtype$='Product'] [itemprop='brand']").attr("content"),
			model: $("[itemtype$='Product'] [itemprop='model']").attr("content"),
			productID:	$("[itemtype$='Product'] [itemprop='productID']").attr("content"),
			url: $("[itemtype$='Product'] [itemprop='url']").attr("content"),
			image: $("[itemtype$='Product'] [itemprop='image']").attr("content"),
			manufacturer: {
				name: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),
				description: $("[itemprop='manufacturer'] [itemprop='description']").attr("content")
			},
			offers: {
				price: $("[itemtype$='Product'] [itemprop='price']").text(),
				priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"),
				priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text(),
				seller: {
					name: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='name']").attr("content"),
					address:{
						streetAddress: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='address'] [itemprop='streetAddress']").attr("content"),
						PostalCode: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='address'] [itemprop='streetAddress']").attr("content"),
						addressLocality: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='address'] [itemprop='addressLocality']").attr("content"),
						telephone: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='address'] [itemprop='telephone']").attr("content"),
						faxNumber: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='address'] [itemprop='faxNumber']").attr("content"),
						email: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='address'] [itemprop='email']").attr("content")
					},
				},
				availability: $("[itemprop='availability']").attr("href"),
				itemCondition: $("[itemprop='itemCondition']").attr("href")
			}
		},
		category: []
	}
};

pie = new Pie(abt);

pie.send();