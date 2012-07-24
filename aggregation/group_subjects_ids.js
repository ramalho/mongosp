db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$project : {
    subjects: 1
  }},
  {$unwind: "$subjects"},
  {$group : {
    _id : "$subjects",
    book_ids : {$push : "$_id"}
  }}
);
printjson(response.result);
