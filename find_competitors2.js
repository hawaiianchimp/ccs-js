var r,s,j,m;
var ht = {};
Array.prototype.forEach.call(document.querySelectorAll("script"), function(el, i){
	if(r=((s=el.getAttribute("src"))?s.match(/[[\/]{2}((\w)+(\.|-))+(\w)+/):0))
	{
		ht[(m=r[0])]=(ht[m]>0)?ht[m]+1:1;
	}
});
ht
//regex to get url http://www.regexr.com/393jm