<!--
title: Python - generatorで素数生成
date: 2007-07-30
-->

Python の generator は無限ストリームを実現するのに便利。 たとえば、
[SICP 3.5.2](http://mitpress.mit.edu/sicp/full-text/book/book-Z-H-24.html#%_sec_3.5.2)
節にでてくる素数の無限ストリーム

Scheme

```
(define (integers-starting-from n)
  (cons-stream n (integers-starting-from (+ n 1))))

(define (sieve stream)
  (cons-stream
   (stream-car stream)
   (sieve (stream-filter
           (lambda (x)
             (not (divisible? x (stream-car stream))))
           (stream-cdr stream)))))

(define primes (sieve (integers-starting-from 2)))
```

を Python で実現すると、こうなります。

Python

```
>>> from itertools import ifilter, count
>>> def sieve(g):
...      prime = g.next()
...      yield prime
...      for i in sieve(ifilter(lambda x: x%prime, g)):
...          yield i
...
>>> primes = sieve(count(2))
>>> primes.next()
2
>>> primes.next()
3
>>> primes.next()
5
>>> primes.next()
7
>>> primes.next()
11
```

しかし、Scheme と異なり、Python の場合は、

```
>>> for i, prime in enumerate(sieve(count(2))):
...     print "%d th prime is %d" % (i, prime)
...
0 th prime is 2
1 th prime is 3
2 th prime is 5
3 th prime is 7
4 th prime is 11
5 th prime is 13
..
986 th prime is 7793
987 th prime is 7817
988 th prime is 7823
989 th prime is 7829
<type 'exceptions.RuntimeError'>: maximum recursion depth exceeded
```

と、再帰レベルのリミット(デフォルトでは 1000 レベル)に引っかかります。

Scheme では tail-recursion の処理が行われますが、Python では行われないからですね
。パフォーマンスは悪くてもよいとして、上手に再帰を避けつつ、エレガントに無限スト
リームを書くにはどうしたらいいのやら?

\[2007-07-31\] 追記

発見しました。これでいけます。

```
>>> from itertools import ifilter, count
>>> def sieve():
...     g = count(2)
...     while True:
...         prime = g.next()
...         yield prime
...         g = ifilter(lambda x, prime=prime: x%prime, g)
...
>>> primes = sieve()
>>> for i, prime in enumerate(primes):
...     if i%1000 == 0:
...         print "%d th prime is %d" % (i, prime)
...
0 th prime is 2
1000 th prime is 7927
2000 th prime is 17393
3000 th prime is 27457
4000 th prime is 37831
5000 th prime is 48619
6000 th prime is 59369
7000 th prime is 70663
8000 th prime is 81817
9000 th prime is 93187
10000 th prime is 104743
11000 th prime is 116461
12000 th prime is 128201
13000 th prime is 139907
14000 th prime is 151717
..
```

また、標準の itertools.ifilter ではなく、自前のもの、例えば、

```
>>> def sieve():
...
...     def myfilter(pred, g):
...         for i in g:
...             if pred(i):
...                 yield i
...
...     g = count(2)
...     while True:
...         prime = g.next()
...         yield prime
...         g = myfilter(lambda x, prime=prime: x%prime, g)
```

とした場合は、スタックフレームを消費してしまい、成功しません。標準の
itertools.ifilter を使用すると、Stackless になるようです。 面白い。
