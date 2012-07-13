db = db.getMongo().getDB('openlibrary');

var map = function () {
	if (this.type.key === "/type/edition") {
	    for (field_name in this) {
	    	emit(field_name, 1)
	    }
	}
}

var reduce = function (key, values) { 
    var total = 0;
    values.forEach(function(n) { total += n; });
    return total;
}

var res = db.complete.mapReduce(map, reduce, {
	out: { inline : 1},
	jsMode: true
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
