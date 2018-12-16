<!--
title: reStructuredTextでblogger
date: 2005-12-16
-->

この Blog は， もともとは
[reStructuredText](http://docutils.sourceforge.net/rst.html) 形式で書いています
．ここで公開しているのはそれを HTML に変換した結果です． Blogger では，
[ATOM API](http://code.blogger.com/archives/atom-docs.html) が用意されているので
，ありがたいことにブラウザを使用しなくても Blog の更新ができます．

以下のような手順をとっています．

1.  reStructuredText 形式で，テキストファイルを作成
2.  Python，docutils で html に変換
3.  2 の html を ATOM API で Blogger.com へ更新

2 と 3 はひとつの Python スクリプト内で行っています． reStructuredText から html
への変換は，docutils で行えます． :

    from docutils.core import publish_parts
    parts = publish_parts(
        content,
        writer_name='blogwriter'
        )

docutils 付属の html_writer を継承して・ほんの少しだけ修正した自作の blogwriter
を使用しています． 変換された，html のタイトル( `parts['title']` )と，body 部分
`parts['body']` を，以下のテンプレートにセットして

```
entrytemplate = u'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<entry xmlns="http://purl.org/atom/ns#">
 <title mode="escaped" type="text/plain">%(title)s</title>
 <published>%(published)s</published>
 <generator url="http://www.yoursitesurlhere.com">python</generator>
 <content type="application/xhtml+xml">
   <div xmlns="http://www.w3.org/1999/xhtml">
   %(content)s
   </div>
 </content>
%(draft)s
</entry>'''
```

ATOM API で送れば，Blog の更新が行えます． これらの一連の作業を行う
`myblogger.py` という Python スクリプト を作成して使用しています．テキストファイ
ルを入力として，コマンド一発で Blog エントリの新規作成・更新を行えます．以下のよ
うな感じです

```
myblogger.py merge 273.txt
```

書きなれた reStructuredText 形式で Blog を書けるのは快適です． ATOM API はほとん
どの Blog サービスがサポートしているはずですので，もし将来 Blog を引越しすること
になっても，ローカルにあるテキストを全部再発行するだけですみます．

TopCoder のコンテストでは，現在，使用できる言語は Java, C\#, C++, VB の 4 つだけ
です． Python が使えるようにならないかなー．
