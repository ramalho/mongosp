db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$project : {
    subjects: 1
  }},
  {$unwind : "$subjects"},
  {$sort : {
    subjects: -1
  }},
  {$group : {
  	_id : null,
  	subjects : {$addToSet: "$subjects"}
  }}
);
printjson(response.result);
