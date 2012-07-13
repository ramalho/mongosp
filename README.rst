=======
mongosp
=======

Scripts criados para a palestra "Open Library em MongoDB" apresentada no MongoDB São Paulo, em 13/jul/2012.


--------------------------------
Conversão e importação dos dados
--------------------------------

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
				54800		3653/second
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
