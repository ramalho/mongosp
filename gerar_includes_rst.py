# coding: utf-8

from glob import glob
import os

excluir = ['conf.py']

print '========'
print 'Exemplos'
print '========'
print

for path_arq in glob('*.js')+glob('*.py'):
    _, nome_arq = os.path.split(path_arq)
    if nome_arq in excluir:
        continue
    lang = 'javascript' if path_arq.endswith('javascript') else 'python'
    print nome_arq
    print '-' * len(nome_arq)
    print
    print '.. literalinclude::', path_arq
    print '   :language:', lang
    print '   :linenos:'
    print
    print
