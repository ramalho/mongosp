db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$project : {
    sales: 1
  }},
  {$unwind: "$sales"},
  {$group : {
    _id : "$sales.year",
    count : {$sum : "$sales.count"}
  }}
);
printjson(response.result);
