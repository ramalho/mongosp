/*
for each currency,
multiply the price by the quantity in
stock and sum all such products to
find the value of the stock
*/

db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$group : {
    _id : "$price.currency",
    value : {$sum :
              {$multiply :
                ["$price.amount",
                 "$stock" ]}}
  }}
);
printjson(response.result);
