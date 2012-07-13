#!/usr/bin/env python
# coding: utf-8

"""
conversor_ol.py

Converte arquivo de dump da Open Library para o formato de linhas JSON
aceito pelo utilitário mongoimport

"""

import sys
import json
import io

def converte_linha(lin):
    rec_type, rec_key, rec_revision, rec_modified, rec_json = lin.split(u'\t')
    rec = json.loads(rec_json)
    rec[u'_id'] = rec_key + u'-' + rec_revision
    return json.dumps(rec)

def converte_arquivo(nome_arq):
    with io.open(nome_arq, encoding='utf-8') as arq:
        for lin in arq:
            if not lin.strip():
                continue
            saida = converte_linha(lin)
            print saida.encode('utf-8')

if __name__=='__main__':
    if len(sys.argv) == 2:
        converte_arquivo(sys.argv[1])
    else:
        print 'Modo de usar: %s <ol_dump_file>' % __name__
