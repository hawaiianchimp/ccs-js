abt = {
	partner: 'abt',
	name: $("[itemtype$='Product'] [itemprop='name']").text(),
	description: $("#product_short_description [itemprop='description']").text(),
	brand: $("[itemtype$='Product'] [itemprop='brand']").attr("content"),
	model: $("[itemtype$='Product'] [itemprop='model']").attr("content"),
	productID:	$("[itemtype$='Product'] [itemprop='productID']").attr("content"),
	url: $("[itemtype$='Product'] [itemprop='url']").attr("content"),
	image: $("[itemtype$='Product'] [itemprop='image']").attr("content"),
	manufacturer: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),
	description: $("[itemprop='manufacturer'] [itemprop='description']").attr("content"),
	price: $("[itemtype$='Product'] [itemprop='price']").text().match(/\$([\d\.,]+)/)[1],
	priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"),
	priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text(),
	seller: $("[itemtype$='Product'] [itemprop='seller'] [itemprop='name']").attr("content"),
	availability: $("[itemprop='availability']").attr("href"),
	itemCondition: $("[itemprop='itemCondition']").attr("href").,
	category: $(".breadcrumbs").text()
};

pie = new Pie(abt);

pie.send();