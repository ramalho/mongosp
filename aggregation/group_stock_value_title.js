// 1) for each item, multiply stock by price.amout if
//    price.currency is USD, otherwise by price.amount
//    divided by 2.0420 (the BRL to USD exchange rate
//    as of 2012-07-27)
// 2) sum

db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$group : {
    _id : "$title",
    value : {$sum :
              {$multiply :
                ["$stock",
                  {$cond : [
                    {$eq : ["$price.currency", "USD"]},
                    "$price.amount",
                    {$divide : ["$price.amount", 2.0420]}
                  ]}
                ]}}
  }}
);
printjson(response.result);
