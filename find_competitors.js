var r,s,j,m;var ht = {};
Array.prototype.forEach.call(document.querySelectorAll("script"), function(el, i){
	if(r=((s=el.getAttribute("src"))?s.match(/[[\/]{2}((\w)+(\.|-))+(\w)+/):0))
		ht[(m=r[0])]=(ht[m]>0)?ht[m]+1:1;});ht


var domains = {};
var script_items = document.querySelectorAll("script");
Array.prototype.forEach.call(script_items, function (el, i) {
	if(el.getAttribute("src")){
		domain = el.getAttribute("src").match(/[[\/]{2}((\w)+(\.|-))+(\w)+/)[0];
	}

	if(domains[domain] == null || domains[domain] == 0){
		domains[domain] = 1;
	}
	else
	{
		domains[domain]++;
	}
});
domains
//regex to get url http://regexr.com/393qq
//regex to get url http://regexr.com/393qq