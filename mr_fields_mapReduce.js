db = db.getMongo().getDB('openlibrary');

var res = db.complete.mapReduce(map, reduce, {
    "out": { "inline" : 1},
    "jsMode": true
});

res.results.forEach(function (r) {
    print(r.value+"\t"+r._id);
});

print("-----");
for (var chave in res.counts) {
    if (chave !== "_id") {
        print(chave+"\t"+res.counts[chave]);
    }
}
print("-----");
print("tempo (s)\t"+res.timeMillis/1000);
