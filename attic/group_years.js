db = db.getMongo().getDB('openlibrary');
db.complete.ensureIndex({publish_date:-1})

var res = db.complete.aggregate(
    { $match : {"type.key" : "/type/edition"} },
    { $group : {
        _id : "$publish_date",
        qt : { $sum : 1 },
    }},
    { $sort : { qt : -1 }}
);
res.result.forEach(function (r) {
    print(r.qt+"\t"+r._id);
});