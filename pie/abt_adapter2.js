abt = {
	SKey: 'a62b622d',
	name: $("[itemtype$='Product'] [itemprop='name']").text(),
	description: $("#product_short_description [itemprop='description']").text(),
	model: $("[itemtype$='Product'] [itemprop='model']").attr("content"),
	productID:	$("[itemtype$='Product'] [itemprop='productID']").attr("content"),
	url: $("[itemtype$='Product'] [itemprop='url']").attr("content"),
	image: $("[itemtype$='Product'] [itemprop='image']").attr("content"),
	manufacturer: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),
	description: $("[itemprop='manufacturer'] [itemprop='description']").attr("content"),
	price: $("[itemtype$='Product'] [itemprop='price']").text().match(/\([\d\.,]+)/)[1],
	priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"),
	priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text(),
	availability: $("[itemprop='availability']").attr("href").match(/schema\.org\/(.+)/)[1], //regex this
	itemCondition: $("[itemprop='itemCondition']").attr("href").match(/schema\.org\/(.+)/)[1], //regex this
	category: $("[itemprop=breadcrumb]").text().replace(/\s/gi,' ').split(">")
};

pie = new Pie(abt);

pie.send();