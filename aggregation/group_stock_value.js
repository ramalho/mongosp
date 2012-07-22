db = db.getMongo().getDB('library');

var response = db.editions.aggregate(
    {$match : {
        "price.currency" : "USD"
    }},
    {$group : {
        _id : "all",
        count : { $sum :
                    { $multiply :
                        [ "$price.amount",
                          "$stock" ]
                    }
                }
    }}
);
printjson(response);
