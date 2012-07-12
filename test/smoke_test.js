db = db.getMongo().getDB('smoke_test') //use smoke_test
db.test_coll.save( { a: 1 } );
res = db.test_coll.findOne();
printjson(res);
db.dropDatabase();
