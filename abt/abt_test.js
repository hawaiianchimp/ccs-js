parse = function(a, parent){
	if(typeof parent == 'undefined')
	{
		parent = "window";
	}
	for(var f in a)
	{
		if((parent.length < 20))
		{
			var path = parent + "." + f;
			if((Object.prototype.toString.call(a[f]) == "[object Object]") || Object.prototype.toString.call(a[f]) == "[object Array]")
			{
				parse(a[f], path);
				console.log(path ,a[f]);
			}
			else
			{
				if((Object.prototype.toString.call(a[f]) == "[object String]"))
				{
					console.log(path +": "+a[f]);
				}
			}
		}
	}
}

for (var t in window)
{
	if(t.match(/google/))
	{
		parse(window[t]);
	}
}