# coding: utf-8

from glob import glob
import os

print '========'
print 'Exemplos'
print '========'
print

for path_arq in glob('*.js')+glob('*.py'):
    _, nome_arq = os.path.split(path_arq)
    lang = 'javascript' if path_arq.endswith('javascript') else 'python'
    print nome_arq
    print '-' * len(nome_arq)
    print
    print '.. literalinclude::', path_arq
    print '   :language:', lang
    print '   :linenos:'
    print
    print
