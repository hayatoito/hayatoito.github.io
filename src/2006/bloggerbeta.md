<!--
title: Blogger Beta に移行
date: 2006-10-30
-->

Blogger Beta に移行してみました。大きな変更点としては

- Label が使えるようになった
- テンプレート・システムがまったく新しくなっている
- ページを動的に作成するようになったので、テンプレートを変更するとすぐにページに
  反映される

といったところでしょうか？

# テンプレート・システム

新しいテンプレート・システムのうりのひとつは、ブラウザ上で GUI でデザインできる
ことです。必ず GUI を使う必要はなく、全部自分で手作業で設定することももちろん可
能でした。いい機会ですので、新規にテンプレート・CSS を作成してみました。テンプレ
ートのタグも新規タグが用意されています。これまでより細部で機能アップしてますね。
ほとんど全ての箇所をいじることができる自由度は相変わらず健在ですので、特にデザイ
ン上支障はありません。 GUI デザイン用に使用されるテンプレート内の変数部分は、わ
ずらわしいので全部消去しました。

# スタイルシートの動的切り替え

「Printer Friendly View」 は
[Alternative Style: Working With Alternate Style Sheets](http://alistapart.com/stories/alternate/)
を参考にしてみました。 スタイルシートを動的に切り替えることができます。

# Google Data APIs

ブラウザから記事を投稿する人には関係のない話ですが、 私の場合は、記事は
[reStructuredText](http://docutils.sourceforge.net/rst.html) 形式でローカルで書
いてから、自作の Python スクリプトで記事を投稿できるようにしています。 Blogger
では、そのために ATOM API が用意されています。こちらも Beta では変更が入り、
[Google Data APIs](http://code.google.com/apis/gdata/) を用いるようになりました
。

主な変更点としては、

- ATOM API のバージョンが 0.3 から 1.0 に変更
- 認証システムも、Basic 認証から、
  [Google Account Authentication](http://code.google.com/apis/accounts/Authentication.html)
  に変更

といったところです。
[Blogger Data API](http://code.google.com/apis/gdata/blogger.html) として使用方
法が解説してありますので、ここを見れば簡単です。

Java や C\#用のクライアント・ライブラリも用意されていましたが、 reStructutedText
の変換を考えるとやはり Python のほうがよいと思い、 Python でクライアントを書きま
した。 ATOM を使用するにあたり、いくつかすんなりとはいかなかった点としては、

1.  指定された Post 先に Post 要求を出すと、Beta のサーバはリダイレクトを返して
    きます。
2.  投稿に成功した場合、ステータスコード 201 を返してきます。

この 2 点です。 Python の標準の API(urllib/urllib2)では、Post 要求に対してリダイ
レクトが返って来ると、リダイレクト先へ Post を再送するのではなく Get 要求を出し
てしまいます。また、ステータスコード 201 もエラー扱いするようになっていました。
そのため、自分で `urllib2.HTTPRedirectHandler` をもとにした、ちょっとしたハック
が必要になります。

その他に気づいた問題点は、新規記事を ATOM 1.0 で送る時、&lt;published&gt;での日
付指定が無視されてしまうことです。これは、現在サーバ側の問題らしく、
[Blogger Dev Group](http://groups.google.com/group/bloggerDev/) で議論されていま
すのでいずれ解決しそうです。

これでほぼ移行作業が完了しましたが、全体としては Beta の方がはるかに使いやすくな
りましたね。なによりラベルが使えるようになったのがいちばんうれしいですね。
