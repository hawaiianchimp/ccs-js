
//the price information on different websites
var costco_price = document.querySelector('input[name="price"]').value;
var newegg_price = document.querySelector('[itemprop="price"]').getAttribute('content');
var rakuten_price = document.querySelector('#ctoPrice').innerHTML;
var zones_price = $(".productDetails .redPrice").text().replace(/(^\s*)|(\s*)/g,'');
var zones_price = document.querySelector(".productDetails .redPrice").innerHTML.replace(/\s/g,'');
var pcm_price = document.querySelector('[itemprop="price"]').innerHTML;

//adds a temporary button to the dom from the console for debugging purposes
function addPriceButton(){
        var s = '<button id="testbutton">ADD PRICE BUTTON</button>';
        var div = document.createElement('div');
        div.innerHTML = s;
        var body = document.querySelector('.CCLP-office2013-mid-text').appendChild(div);
        var button = document.querySelector('#testbutton').addEventListener('click', clickHandler);
}

//event handler to be tied to the event listner on the button
function clickHandler(e){
        e.preventDefault();
        $('[class^="CCLP"][class*="price"]').each(addPrice);
        //console.log('button pushed');
}

//ajax call to get the price from the linked content
function addPrice(i, el){
        var start = new Date().getTime();
        url = $(el).parent().find('[class^="CCLP"][class*="info"] a').attr('href');
        $(el).append($("<label class='price_label'></label>"));
        $(el).find(".price_label").load(url + (" .productDetails .redPrice"), onSuccess);
        var end = new Date().getTime();
        console.log(end-start);
}

//success handler, does nothing at the moment
function onSuccess(response, status, xhr){
        console.log("responding to AJAX");
        console.log(response);
        console.log(status);
        console.log(xhr);
        console.log(response.replace(/(^\s*)|(\s*)/g,''));
}
addPriceButton();

//without jQuery
//adds a temporary button to the dom from the console for debugging purposes
function addPriceButton(){
        var div = document.createElement('div');
        div.innerHTML = '<button id="testbutton">ADD PRICE BUTTON</button>';
        document.querySelector('.CCLP-office2013-mid-text').appendChild(div); //add button somewhere in document
        document.querySelector('#testbutton').addEventListener('click', clickHandler);
}

//event handler to be tied to the event listner on the button
function clickHandler(e){
        e.preventDefault();
        console.log('button pushed');
        priceGetAll();
}

//ajax call to get all the prices from the linked content
function priceGetAll(){
        priceElements = document.querySelectorAll('[class^="CCLP"][class*="price"]'); //select the price div
        console.log(priceElements);
        Array.prototype.forEach.call(priceElements, getPrice);
}

//individual function to get one price via AJAX call
function getPrice(el, i){
        var request = new XMLHttpRequest();
        var url = el.parentNode.querySelector('[class^="CCLP"][class*="info"] a').getAttribute('href'); //get the link selector
        console.log(url);
        console.log(request);

        request.onreadystatechange = function() {
                console.log("starting onload");
                //var start = new Date().getTime();
                if (request.status >= 200 && request.status < 400){
                    // Success!
                    response = request.response;
                    //console.log(response);
                        var page = document.createElement('body');
                        page.innerHTML = response;
                        var price = page.querySelector(".productDetails .redPrice").innerHTML.replace(/\s/g,'');
                        var label = document.createElement('label');
                        label.innerHTML = price;
                        label.className += ' ' + 'redPrice';
                        el.appendChild(label);
                }
                else {
                    // We reached our target server, but it returned an error
                    console.log("onload error");
                    console.log(request);
                }
                //var end = new Date().getTime();
                //console.log(end-start);
        };

        request.onerror = function(){
                console.log("error");
                console.log(request);
                // There was a connection error of some sort
        };

        request.open('GET', url, true);
        request.send();
}
addPriceButton();


$('[class^="CCLP"][class*="price"]').each(function(){
        url = $(this).parent().find('[class^="CCLP"][class*="info"] a').attr('href');
        $(this).load( url + " .productDetails .redPrice");
});


function encodeCBS(string)
{
        return "A"+btoa(string);
}

function decodeCBS(string)
{
        return atob(string.substring(1, string.length));
}




//Sandbox feature