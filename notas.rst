--------------------------------
Conversão e importação dos dados
--------------------------------

Para rodar a instância de teste do MongoDB 2.1::

	$ mongod2.1 -f mongosp.conf

Script ``importar.sh``::

	#/bin/bash
	python conversor_ol.py $1 | mongoimport -d openlibrary -c complete --stopOnError

Operação::

	$ time ./importar.sh ../openlibrary/cdumps/ol_cdump_aa
	connected to: 127.0.0.1
				900			300/second
				14000		2333/second
				26600		2955/second
				41700		3475/second
	[...]			
				977900	3819/second
				989700	3821/second
	imported 1000000 objects

	real		4m20.905s
	user		5m22.870s
	sys			0m10.276s

Conferir importação, pois registros com ``_id`` previamente vistos são
descartados silenciosamente (o texto "imported 1000000 objects" reflete
a quantidade de registros lidos, e não a quantidade inserida):

	$ ./contar.py openlibrary complete
	openlibrary.complete: 1000000 registros

Exemplo de registro importado
=============================

::

	{
	  "subtitle": "Ausbau und Planung der petrochemischen und energieintensiven Industrien zum Zeitpunkt des zweiten Golfkriegs", 
	  "subject_place": [
	    "Middle East."
	  ], 
	  "lc_classifications": [
	    "HD9579.C33 M6284 1991"
	  ], 
	  "contributions": [
	    "Helmschrott, Helmut."
	  ], 
	  "title": "Industrialisierung der arabischen OPEC-La\u0308nder und des Iran", 
	  "languages": [
	    {
	      "key": "/languages/ger"
	    }
	  ], 
	  "subjects": [
	    "Petroleum chemicals industry -- Middle East.", 
	    "Petroleum industry and trade -- Middle East.", 
	    "Gas industry -- Middle East."
	  ], 
	  "publish_country": "gw ", 
	  "series": [
	    "Ifo Forschungsberichte der Abteilung Entwicklungsla\u0308nder ;", 
	    "Nr. 74", 
	    "Ifo Forschungsberichte der Abteilung Entwicklungsla\u0308nder ;", 
	    "74."
	  ], 
	  "title_prefix": "Die ", 
	  "type": {
	    "key": "/type/edition"
	  }, 
	  "by_statement": "von Axel J. Halbach, Helmut Helmschrott.", 
	  "revision": 1, 
	  "publishers": [
	    "Ifo Institut fu\u0308r Wirtschaftsforschung", 
	    "Weltforum Verlag"
	  ], 
	  "last_modified": {
	    "type": "/type/datetime", 
	    "value": "2008-04-01T03:28:50.625462"
	  }, 
	  "key": "/books/OL1656964M", 
	  "authors": [
	    {
	      "key": "/authors/OL45038A"
	    }
	  ], 
	  "publish_places": [
	    "Mu\u0308nchen"
	  ], 
	  "pagination": "viii, 270 p. :", 
	  "lccn": [
	    "91218377"
	  ], 
	  "notes": {
	    "type": "/type/text", 
	    "value": "Includes bibliographical references (p. 268-270)."
	  }, 
	  "number_of_pages": 270, 
	  "isbn_10": [
	    "3803903955"
	  ], 
	  "publish_date": "1991", 
	  "_id": "/books/OL1656964M-1"
	}

Indexação da coleção
====================

Para criar um índice::

	db = db.getMongo().getDB('openlibrary'); // use openlibrary
	coll = db.complete;
	coll.ensureIndex({"type.key":1});

Operação::

	$ time mongo2.1 indexar.js 
	MongoDB shell version: 2.1.2
	connecting to: test

	real		0m6.211s
	user		0m0.024s
	sys			0m0.005s

Contar registros dp tipo ``edition``
====================================

Note que existem 609 (606390 - 605781) registros que tem ``_id`` com prefixo
``/book/`` mas com ``type.key`` diferente de ``/type/edition``::

	$ time mongo2.1 contar_edition.js 
	MongoDB shell version: 2.1.2
	connecting to: test
	total: 1000000
	/books/: 606390
	editions: 605781

	real	0m1.810s
	user	0m0.026s
	sys	0m0.003s

----------------------
Exemplos com agregação
----------------------

Contagem de registros por tipo::

	$ time mongo2.1 group_types.js 
	MongoDB shell version: 2.1.2
	connecting to: test
	605781	/type/edition
	382428	/type/author
	9211	/type/work
	1935	/type/redirect
	623	/type/delete
	7	/type/template
	7	/type/page
	5	/type/doc
	3	/type/macro

	real	0m23.145s
	user	0m0.025s
	sys	0m0.005s

Contagem de registros por idioma::

	$ time mongo2.1 group_languages.js 
	MongoDB shell version: 2.1.2
	connecting to: test
	336797	/languages/eng
	41720	/languages/ger
	37653	/languages/spa
	27724	/languages/fre
	25397	/languages/rus
	14138	/languages/ita
	12377	/languages/ara
	10928	/languages/ind
	10805	/languages/por
	5498	/languages/dut
	[...]			
	1	/languages/tem
	1	/languages/tet
	1	/languages/ton

	real	0m21.897s
	user	0m0.023s
	sys	0m0.004s


-----------------------
Exemplos com Map/Reduce
-----------------------

::

	$ time mongo2.1 mr_fields.js 
	MongoDB shell version: 2.1.2
	connecting to: test
	{
		"results" : [
			{
				"_id" : "_id",
				"value" : 605781
			},
			{
				"_id" : "authors",
				"value" : 469305
			},
			{
				"_id" : "by_statement",
				"value" : 538357
			},
			{
				"_id" : "classifications",
				"value" : 3
			},
	[...]			
			{
				"_id" : "works",
				"value" : 4415
			}
		],
		"timeMillis" : 156659,
		"counts" : {
			"input" : 1000000,
			"emit" : 13196408,
			"reduce" : 363448,
			"output" : 61
		},
		"ok" : 1,
	}
	real	2m36.696s
	user	0m0.028s
	sys	0m0.005s


Usando opção ``jsMode: true``::

	var res = db.complete.mapReduce(map, reduce, 
							{	out: { inline : 1}, jsMode: true });


Resultado::

	$ time mongo2.1 mr_fields.js 
	MongoDB shell version: 2.1.2
	connecting to: test
	284396	subtitle
	251678	subject_place
	592707	lc_classifications
	264695	contributions
	605777	title
	604455	languages
	[...]
	1	language_code
	-----
	input	1000000
	emit	13196408
	reduce	363448
	output	61
	-----
	tempo (s)	94.13

	real	1m34.202s
	user	0m0.025s
	sys	0m0.004s

Sem ``jsMode: true``::

	$ time mongo2.1 mr_fields.js 
	MongoDB shell version: 2.1.2
	connecting to: test
	605781	_id
	469305	authors
	538357	by_statement
	3	classifications
	1	collections
	264695	contributions
	5	copyright_date
	[...]
	4415	works
	-----
	input	1000000
	emit	13196408
	reduce	363448
	output	61
	-----
	tempo (s)	160.113

	real	2m40.146s
	user	0m0.024s
	sys	0m0.005s



