db = db.getMongo().getDB('library');

var response = db.editions.aggregate({
	$group : {
        _id : "all",
        count : { $sum : 1 }
    }
});
printjson(response.result);
