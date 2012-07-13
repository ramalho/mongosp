#!/usr/bin/env python
# coding: utf-8

"""
contar.py

Contar número de registros de uma coleção
"""

import sys
from pymongo import Connection
from pymongo.collection import Collection

def contar_registros(nome_db, nome_colecao):
    return Collection(Connection()[nome_db], nome_colecao).count()

if __name__=='__main__':
    if len(sys.argv) == 3:
        nome_db, nome_colecao = sys.argv[1:] 
        qtd = contar_registros(nome_db, nome_colecao)
        print '%s.%s: %s registros' % (nome_db, nome_colecao, qtd)
    else:
        print 'Modo de usar: %s <nome_db> <nome_colecao>' % __name__
