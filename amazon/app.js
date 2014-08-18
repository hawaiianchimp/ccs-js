var express = require("express"),
    aws = require("aws-lib"),
    dotenv = require("dotenv");

dotenv.load();

module.exports.prodAdv = aws.createProdAdvClient(process.env.AWS_KEY, process.env.AWS_SECRET, process.env.AWS_ACCID);

var app = express();

app.get("/", function(res,req){
	req.write(getBooks(prodAdv));
})

var getBooks = function(prod){
	prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: "Javascript"}, function(err, result) {
	  console.log(JSON.stringify(result));
	});
}
getBooks(prodAdv);

app.listen(3000);