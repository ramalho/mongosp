db = db.getMongo().getDB('library');

var response = db.books.aggregate(
  {$project : {
    creators: 1,
    title: 1
  }},
  {$unwind: "$creators"},
  {$match : {
    "creators.role": "author"
  }},
  {$group : {
    _id : "$creators.name",
    titles : {$push : "$title"}
  }}
);
printjson(response.result);
