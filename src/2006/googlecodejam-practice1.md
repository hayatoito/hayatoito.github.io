<!--
title: Google Code Jam 2006 - Practice1
date: 2006-08-16
-->

Google Code Jam 2006 、練習部屋が用意されていたので早速練習してみました。

まず、250 点問題。スタート都市(index=0)からゴールの都市(index=1)まで、セールスマ
ンを何人派遣できるでしょうか？という問題です。都市通しのつながり(adj)は、

```
"001111",
"001111",
"110000",
"110000",
"110000",
"110000"
```

このようにマトリックス形式で与えられます。都市の数は最大 12 です。入力の条件とし
てスタート都市とゴール都市は、直接つながっていないことが保障されています
（adj\[0\]\[1\] == adj\[1\]\[0\] == 0 です）。スタート都市とゴールの都市を除いた
、途中の通過都市はそれぞれ最大 1 人のセールスマンだけが通過できます。つまりある
セールスマンが通過した都市は、別のセールスマンは通過できません。この入力の場合は
、正解は 4 人です(\[0 -&gt; 2 -&gt; 1\], \[0 -&gt; 3 -&gt; 1\], \[0 -&gt; 4
-&gt; 1\], \[0 -&gt; 5 -&gt; 1\]の 4 通り)。

いつもは Java ですが、せっかくですので Python で書いてみました。

```python
class SalesRouting:

  def howMany(self, adj):

      def doit(u, mask):
          if (u, mask) in memo: return memo[u,mask]
          if adj[u][1] == '1': return doit(0, mask) + 1
          memo[u,mask] = max([0] +
                             [doit(v, mask | 1<<v) for v in range(2, len(adj))
                              if adj[u][v] == '1' and (mask & (1<<v)) == 0])
          return memo[u,mask]

      memo = {}
      return doit(0, 0)
```

状態空間は、現在いる city: u(N 通り) と、 これまで通過した city 全て: mask(2\^N
通り)の組み合わせになります。 ワーストケースでもたかだか 12 \* 2\^12 = 50,000 ほ
どですので、Python でも十分通ります。
