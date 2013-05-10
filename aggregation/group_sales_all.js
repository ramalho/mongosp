var response = db.books.aggregate(
  {$project : {
    sales: 1
  }},
  {$unwind: "$sales"},
  {$group : {
    _id : null,
    count : {$sum : "$sales.count"}
  }}
);

response.result.forEach(printjson);

