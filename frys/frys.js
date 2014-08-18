var c={};
$("#ProductAttributes li").each(function(i,e)
	{
		var t = $(e).text().match(/[(\w).:]+ #?(\w+)/); 
		console.log(t);
	});