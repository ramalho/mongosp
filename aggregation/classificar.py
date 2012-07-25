from glob import glob

OPERADORES = 'match project group sort unwind'.split()

class Exemplo(object):
    def __init__(self, nome_arq, fonte):
        self.nome_arq = nome_arq
        self.fonte = fonte
        self.ops = {op for op in OPERADORES if ('$'+op) in fonte}

    def __len__(self):
        return len(self.fonte)

exemplos = []
for nome_arq in sorted(glob('*.js')):
    if nome_arq == 'library.js': continue
    fonte = open(nome_arq).read()
    exemplos.append(Exemplo(nome_arq, fonte))

def titulos():
    print ' '*35,
    for op in OPERADORES:
        print op.center(7),
    print

titulos()
for ex in sorted(exemplos, key=len):
    print '{:4d} {:33}'.format(len(ex), ex.nome_arq),
    print '       '.join([' X'[op in ex.ops] for op in OPERADORES])
titulos()
