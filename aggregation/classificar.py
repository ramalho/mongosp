#!/usr/bin/env python

from glob import glob

OPERATORS = 'group project unwind'.split()

class Example(object):
    def __init__(self, filename, source_code):
        self.filename = filename
        self.source_code = source_code
        self.ops = {op for op in OPERATORS if ('$'+op) in source_code}

    def __len__(self):
        return len('\n'.join(lin for lin in self.source_code.split('\n') if not lin.startswith('//')))

examples = []
for filename in sorted(glob('*.js')):
    if filename == 'library.js': continue
    source_code = open(filename).read()
    examples.append(Example(filename, source_code))

def headings():
    print ' '*35,
    for op in OPERATORS:
        print op.center(7),
    print

headings()
for ex in sorted(examples, key=len):
    print '{:4d} {:33}'.format(len(ex), ex.filename),
    print '       '.join([' X'[op in ex.ops] for op in OPERATORS])
headings()
