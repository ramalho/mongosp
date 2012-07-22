db = db.getMongo().getDB('library');

var response = db.editions.aggregate({
	$project : {
        _id: 0,
        stock: 1
    }
});
printjson(response.result);
