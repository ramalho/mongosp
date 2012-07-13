db = db.getMongo().getDB('openlibrary');
coll = db.complete;
coll.ensureIndex({"type.key":1});
print('total:', coll.count());
print('/books/:', coll.count({_id : /^\/books\//}));
print('editions:', coll.count({"type.key" : "/type/edition"}));
