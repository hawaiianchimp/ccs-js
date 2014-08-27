/*  
 * CCS Logos Price Grabber 
 * Description: This function will grab the price from the price on the products page
 * Author: Sean Burke
 * Date: 8/27/14
 */

(function(){

    //use this function to get the price from the linked product page
    grabPrice(function(doc){
        //price select for Zones.com
        var zones_price = doc.querySelector(".productDetails .redPrice").innerHTML.match(/[\d\.,]+/);
        return "Price: " + zones_price;
    });

    //use this function if you have the price, and want to pass it into the function
    /*
    var price = "100.00"
    grabPrice("Price: " + price)
    */



    /* ------------------------------------------------------------------
     *  Price Grabber functions below, no need to modify below this line 
     * ------------------------------------------------------------------
     */ 

    function grabPrice(selectPrice){

        //get all the price
        priceGetAll();

        //ajax call to get all the prices from the linked content
        function priceGetAll(){
            priceElements = document.querySelectorAll('[class^="CCLP"][class*="price"]'); //select the price div
            Array.prototype.forEach.call(priceElements, getPrice);
        }

        //individual function to get one price via AJAX call
        function getPrice(el, i){
            if (typeof selectPrice == "function")
            {
                var request = new XMLHttpRequest();
                var url = el.parentNode.querySelector('[class^="CCLP"][class*="info"] a').getAttribute('href'); //get the link selector

                request.onreadystatechange = function() {
                    //var start = new Date().getTime();
                    if(request.readyState == 4)
                    {
                        if (request.status >= 200 && request.status < 400){
                            //success! create a response body to pass to selectPrice as document to run selector
                            var page = document.createElement('body');
                            page.innerHTML = request.response;
                            //if selector is a function, selectPrice, or if not a function, return it, else keep it 
                            el.innerHTML = selectPrice(page);
                        }
                        else {
                            // server reached, but responded with error code 404, or 500 for example
                        }
                    }
                    //var end = new Date().getTime();
                    //console.log(end-start);
                };

                request.onerror = function(){
                    // There was a connection error of some sort
                };

                request.open('GET', url, true);
                request.send();
            }
            else if (typeof selectPrice == "string")
            {
                el.innerHTML = selectPrice;
            }
        }
    };
})();