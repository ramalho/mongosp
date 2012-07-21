db = db.getMongo().getDB('openlibrary');
//db.complete.ensureIndex({"type.key":1});

var res = db.complete.aggregate(
    { $project : { number_of_pages : 1} },
    { $group : {
        _id : "stat",
        max : { $max : "$number_of_pages" },
        min : { $min : "$number_of_pages" },
    }}
);
res.result.forEach(function (r) {
    print(r.qt+"\t"+r._id);
});
