/*
for books with price in USD,
multiply the price by the quantity in
stock and sum all such products to
find the value of the stock
*/

db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$match : {
    "price.currency" : "USD"
  }},
  {$group : {
    _id : "all",
    value : {$sum :
              {$multiply :
                ["$price.amount",
                 "$stock" ]}}
  }}
);
printjson(response);
