db = db.getMongo().getDB('library');

var response = db.editions.aggregate({
	$group : {
        _id : "all",
        count : { $sum : "$stock" }
    }
});
printjson(response.result);
