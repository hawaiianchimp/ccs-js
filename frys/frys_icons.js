
//get unique image urls
getUniqueImages = function(){
			var temp = Array.prototype.map.call(document.querySelectorAll("table[border='0'][width='94%'][style='margin: 10px;'] img[src*='http://images.frys.com/art/product/alt_shots/']"), 
				function(el){
						el.parentNode.removeChild(el);
						return el.getAttribute("src");
				});
			return (temp) ? temp.filter(function(elem, pos, self) { 
				console.log("self.indexOf('"+elem+"'):",self.indexOf(elem), "== pos:",pos, self.indexOf(elem) == pos); 
				return self.indexOf(elem) == pos;}) : null;
		};

//create images and image div
var images = getUniqueImages();
var iconsDiv = document.createElement("div");
iconsDiv.id = "icons";
Array.prototype.forEach.call(images, function(el,i){
	var newImg = document.createElement("img")
	newImg.src = el;
	iconsDiv.appendChild(newImg);
})
document.getElementById("ccs-logos").parentNode.insertBefore(iconsDiv, document.getElementById("ccs-logos"));


getCompetitors = function(){
	var temp = Array.prototype.map.call(document.querySelectorAll('img'), function(el,i,array){return el.outerHTML});
	return (temp) ? temp.filter(function(elem, pos, self) { console.log("self.indexOf('"+elem+"'):",self.indexOf(elem), "== pos:",pos, self.indexOf(elem) == pos); return self.indexOf(elem) == pos;}) : null;
};getCompetitors()