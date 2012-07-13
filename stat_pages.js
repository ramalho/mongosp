db = db.getMongo().getDB("openlibrary");
db.complete.ensureIndex({"number_of_pages":1});

var res = db.complete.aggregate(
    { $match : {
        "type.key" : "/type/edition",
        number_of_pages : { $type : 16 }
    }},
    { $group : {
        _id : "stat",
        qt :  { $sum : 1 },
        max : { $max : "$number_of_pages" },
        min : { $min : "$number_of_pages" },
        avg : { $avg : "$number_of_pages" }
    }}
);
stat = res.result[0];
for (var chave in stat) {
    if (chave !== "_id") {
        print(chave+"\t"+stat[chave]);
    }
}
