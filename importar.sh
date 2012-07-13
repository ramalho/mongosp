#/bin/bash
python conversor_ol.py $1 | mongoimport -d openlibrary -c complete --stopOnError
 