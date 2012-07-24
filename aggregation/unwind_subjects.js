db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$project : {
    subjects: 1
  }},
  {$unwind: "$subjects"}
);
printjson(response.result);
