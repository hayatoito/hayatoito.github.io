<!--
title: google-code-prettifyを導入してみる
date: 2007-03-26
-->

[google-code-prettify](http://code.google.com/p/google-code-prettify/) を導入し
てみました。 JavaScript + CSS でコード部分の色つけをしてくれるものです。

デフォルトでは、class 属性が"prettyprint"となっている、 &lt;pre&gt;タグや
&lt;code&gt;タグがシンタックス・ハイライトの対象になるようです。このブログは
reStructuredText で書いているので、 &lt;pre&gt;タグの class 属性は
、clsss="literal-block"となっています。 &lt;pre&gt;タグの方を直すのはいまさら面
倒なので、prettify.js の方を少し修正して導入しました。 Python と Java は両方とも
サポート言語ですので、どちらもなかなか派手に色がつきます。
