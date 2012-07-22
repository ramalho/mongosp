db = db.getMongo().getDB('library');

var response = db.editions.aggregate({
    $match : {
        "language" : "en"
    },
    $group : {
        _id : "$price.currency",
        count : { $sum : 1 }
    }
});
printjson(response);
