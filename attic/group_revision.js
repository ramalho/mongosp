db = db.getMongo().getDB('openlibrary');
db.complete.ensureIndex({"revision":1});

var res = db.complete.aggregate(
    { $project : { revision : 1} },
    { $group : {
        _id : "$revision",
        qt : { $sum : 1 }
    }},
    { $sort : { qt : -1 }}
);
res.result.forEach(function (r) {
    print(r.qt+"\t"+r._id);
});
