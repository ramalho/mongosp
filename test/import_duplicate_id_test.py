#!/usr/bin/env python
from subprocess import check_output, CalledProcessError
from pprint import pprint
from mongo_util import conectar


def importar():
    cmd = 'mongoimport -d test -c dup_test --drop --stopOnError --file duplicate_id.mongoimport'

    try:
        print check_output(cmd.split())
    except CalledProcessError as err:
        print '****** CalledProcessError ' + '*'*40
        pprint(err.__dict__)
        raise


def contar_registros():
    db = conectar('test')
    print db.dup_test.count(), 'registros efetivamente salvos'
    for r in db.dup_test.find():
        pprint(r)

if __name__=='__main__':
    importar()
    contar_registros()

