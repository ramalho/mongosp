db = db.getMongo().getDB('bookshop');

var response = db.books.aggregate({
	$project : {
        stock: 1
    }
});
printjson(response.result);
