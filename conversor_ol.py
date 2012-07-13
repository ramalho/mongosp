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

def conv_linha(lin, indent=None):
    rec_type, rec_key, rec_revision, rec_modified, rec_json = lin.split(u'\t')
    rec = json.loads(rec_json)
    rec[u'_id'] = rec_key + u'-' + rec_revision
    return json.dumps(rec, indent=indent)

def conv_arquivo(nome_arq, max_lin=sys.maxsize, indent=None):
    with io.open(nome_arq, encoding='utf-8') as arq:
        for num_lin, lin in enumerate(arq, 1):
            if not lin.strip():
                continue
            saida = conv_linha(lin, indent)
            print saida.encode('utf-8')
            if num_lin >= max_lin:
                break

if __name__=='__main__':
    if len(sys.argv) == 2:
        converte_arquivo(sys.argv[1])
    else:
        print 'Modo de usar: %s <ol_dump_file>' % __name__
