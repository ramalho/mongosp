db = db.getMongo().getDB('openlibrary');
db.complete.update({"type.key" : "/type/edition"},
	{ $set : { "publish_year" : }}
    { $group : {
        _id : "$publish_date",
        qt : { $sum : 1 },
    }},
    { $sort : { qt : -1 }}
);
res.result.forEach(function (r) {
    print(r.qt+"\t"+r._id);
});