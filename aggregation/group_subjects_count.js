db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$project : {
    subjects: 1
  }},
  {$unwind: "$subjects"},
  {$group : {
    _id : "$subjects",
    count : {$sum : 1}
  }}
);
printjson(response.result);
