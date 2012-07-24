db = db.getMongo().getDB('library');

var response = db.books.aggregate(
	{$group : {
    _id : null,
    count : {$sum : 1}
  }}
);
printjson(response.result);
