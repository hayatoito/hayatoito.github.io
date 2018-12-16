<!--
title: lxmlでHTMLスクレーピング
date: 2007-07-19
-->

たまには Python で TopCoder の問題を解いてみようと思ってはみたものの，書いたコー
ドが正しいがどうかどうやってチェックすればいいんだろう？サポートされている Java
や C++なら，TopCoder のプラクティスルームで Submit して，テストを走らせればいい
んですけど．

問題文に付属しているような数個のサンプルケースだけでは，テストとしてはもちろん不
十分．実際のシステムテストで使用された入力と正解のフルセットさえ入手できれば，ロ
ーカルでもテストを走らせることができるはず．そう思い，そのようなデータが
TopCoder で提供されているかというとちょっと探してみる．
[Data Feeds](http://www.topcoder.com/tc?module=Static&d1=help&d2=dataFeed) を発
見したけど，該当データは提供されていない．

システムテストでどのようなテストが走ったかは，たしか Web でもみれたはず．たとえ
ば，SRM354 の Hard 問題，RookPlacement なら，正解を提出した Petr の
[Code](http://www.topcoder.com/stat?c=problem_solution&rm=265123&rd=10711&pm=7658&cr=10574855)
を見れば， システムテストで使用されたテストケースもすべて載っています．

「この HTML ページから抜き出せばいいじゃん．」ということでスクレーピングしてみる
．

まずは、HTML ファイルの取得。もちろん，ブラウザ上でアクセスして HTML を保存して
もいいですけど、ここでは、プログラムの中から取得してみる。認証チェックがあるので
、ページを取得する際は，認証済み Cookie が入ったリクエストでないとはじかれてしま
います．ふだんブラウザで使用している Cookie を渡してしまうのが一番楽． Python な
ら，こんな感じ．

```
In [1]: import cookielib, urllib2
In [2]: cj = cookielib.MozillaCookieJar()
In [3]: cj.load('cookies.txt')
In [4]: opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
In [5]: html = opener.open(url).read()
```

あとは，HTML をパース． [lxml](http://codespeak.net/lxml/) を使用．

    In [6]: from StringIO import StringIO
    In [7]: from lxml import etree
    In [8]: tree = etree.parse(StringIO(html), etree.HTMLParser())

lxml は，HTML が多少壊れていても，リカバーしてくれるので，このようなスクレーピン
グ用途にはもってこいです． Well-Formatted でない HTML や XML をパースするのって
，結構，テーマとしては奥が深いような気もするんですけど，どういうアルゴリズムにな
ってるんですかね．

HTML を見る限り、欲しいデータはすべて、このような

```
<td class='statText' ...>190</td>
```

エレメント内であることがわかりますので、 xpath で該当エレメント内テキストをとり
あえず全部取得．

```
In [9]: ts = [t.strip() for t in tree.xpath("//td[@class='statText']/text()")]
```

結果を表示してみると，最初の方は余分なごみです．

```
In [10]: ts[30:40]
Out[11]:
['',
 '',
 '',
 'Test\n            Arguments',
 'Expected Results',
 'Success',
 '4,\n5,\n2',
 '190',
 'Passed',
 '2,\n3,\n3']
```

'Success'文字列以降だけに絞る．

```
In [12]: ts = ts[ts.index('Success')+1:]
In [13]: ts
Out[14]:
['4,\n5,\n2',
 '190',
 'Passed',
 '2,\n3,\n3',
 '6',
 'Passed',
 '6,\n7,\n20',
 '0',
 'Passed',
 '50,\n25,\n50',
 '879507',
 'Passed',
```

入力，正解はそれぞれ，3 つおきに出現するので

```
In [15]: testcases = zip(ts[::3], ts[1::3])
In [16]: testcases
Out[17]:
[('4,\n5,\n2', '190'),
 ('2,\n3,\n3', '6'),
 ('6,\n7,\n20', '0'),
```

入力の各パラメータは，',\\n'がセパレータになってるので

```
In [18]: import re
In [19]: testcases = [(re.split(r',\n', input), expected) for (input, expected) in testcases]
In [20]: testcases
Out[21]:
[(['4', '5', '2'], '190'),
 (['2', '3', '3'], '6'),
 (['6', '7', '20'], '0'),
```

各データは文字列ですので、eval します．今回のデータには含まれていないですけど
、TopCoder の配列のリテラルは'{..}'形式ですので、eval できるように'\[..\]'に変換
してから． eval が怖いなら，JSON としてパースしてもいいです．

```
In [22]: def evalf(s):
    ...:     if len(s) >= 2 and s[0] == '{' and s[-1] == '}':
    ...:         s = '[' + s[1:-1] + ']'
    ...:     return eval(s)
    ...:
In [23]: testcases = [(map(evalf, input), evalf(expected)) for (input, expected) in testcases]
In [24]: testcases
Out[25]:
[([4, 5, 2], 190),
 ([2, 3, 3], 6),
 ([6, 7, 20], 0),
```

これで OK。あとはテストするだけ。

```
In [26]: for input, expected in testcases:
    ...:     assert RooksPlacement().countPlacements(*input) == expected
```

テストケースを抜き出す部分は、まとめると最終的にはこうなります。

```python
def extract_testcases(url, cookie_file='cookies.txt'):
    cj = cookielib.MozillaCookieJar()
    cj.load(cookie_file)
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
    html = opener.open(url).read()
    tree = etree.parse(StringIO(html), etree.HTMLParser())
    ts = [t.strip() for t in tree.xpath("//td[@class='statText']/text()")]
    ts = ts[ts.index('Success')+1:]
    return [(map(evalf, re.split(r',\n', input)), evalf(expected))
            for (input, expected) in zip(ts[::3], ts[1::3])]
```

昔はこういうことをしたかったら，Perl で正規表現を書いて抜きだしていたけど，どう
してもコードが長くなりがち．いまは，大抵どの言語でも便利な XML ライブラリが付属
しているので，楽ちん．
