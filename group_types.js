db = db.getMongo().getDB('openlibrary');
db.complete.ensureIndex({"type.key":1});

var res = db.complete.aggregate(
    { "$group" : {
        	"_id" : "$type.key",
        	"qt" : { "$sum" : 1 }
    }},
    { "$sort" : { "qt" : -1 }}
);
res.result.forEach(function (r) {
    print(r.qt+"\t"+r._id);
});
