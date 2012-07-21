db = db.getMongo().getDB('openlibrary');
//db.complete.ensureIndex({"type.key":1});

var res = db.complete.aggregate(
    { $project : { revision : 1} },
    { $group : {
        _id : "stat",
        max : { $max : "$revision" },
        min : { $min : "$revision" },
        avg : { $avg : "$revision" }
    }}
);
res.result.forEach(function (r) {
    print(r.qt+"\t"+r._id);
});
