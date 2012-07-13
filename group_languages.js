db = db.getMongo().getDB('openlibrary');
db.complete.ensureIndex({"revision":1});

var res = db.complete.aggregate(
    { $match : {"type.key" : "/type/edition"} },
    { $project : { languages : 1} },
    { $unwind : "$languages" },
    { $group : {
        _id : "$languages.key",
        qt : { $sum : 1 }
    }},
    { $sort : { qt : -1, _id : 1 }}
);
res.result.forEach(function (r) {
    print(r.qt+"\t"+r._id);
});
