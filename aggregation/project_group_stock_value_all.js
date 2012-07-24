/*
1) calculate price_usd: if price.currency is USD, price_usd
   is price.amout, otherwise its price.amount divided by
   2.0420 (the BRL to USD exchange rate as of 2012-07-27)
2) for each item, multiply price_usd by stock
3) sum
*/

db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$project : {
    price_usd : {$cond : [
                  {$eq : ["$price.currency", "USD"]},
                  "$price.amount",
                  {$divide : ["$price.amount", 2.0420]}
                ]},
    stock : 1
  }},
  {$group : {
    _id : null,
    value : {$sum :
              {$multiply :
                ["$price_usd",
                 "$stock" ]}}
  }}
);
printjson(response.result);
