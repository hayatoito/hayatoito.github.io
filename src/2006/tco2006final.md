<!--
title: 2006 TopCoder Open Final Round
date: 2006-05-07
-->

[2006 TopCoder Open - Algorithm Competition](http://www.topcoder.com/tc?module=Static&d1=tournaments&d2=tco06&d3=alg_description)
の決勝戦が行われました。オンライン・ラウンドを勝ち抜けた 48 人が、ラスベガス・ア
ラジンホテルに招待されオンサイトで 5/3-5/5 の 3 日間にわたり戦いを繰り広げました
。最後に勝ち残った 8 名による決勝戦の模様は通常の TopCoder のアリーナ上でリアル
タイムで見ることができました。といっても、ライブ映像が流れていたわけではなくて、
こんな感じで

![2006 toc final](http://static.flickr.com/44/143378605_08950cdd11_o.png)

競技者が行っている「問題を Open」「コンパイル」「テスト」「コードを提出」等の行
動をリアルタイムで知ることができたわけです。問題の内容や各競技者が提出したコード
もリアルタイムで見ることができました。アリーナ上では見学者が集まって、それを見な
がら「あーだこーだ」いって楽しんでいます。

Final に残ったのは以下の 8 名。

- tomek : ポーランド・Purdue 大学。現在 TopCoder でレーティングトップ。優勝候補
  の最右翼。
- Petr : ロシア・モスクワ大学。TopCoder では珍しい C\#使い。数々のプログラミング
  コンテストで名を残しているそうです。Google Code Jam 2005 でも 3 位に入っていま
  す。いつも綺麗な読みやすいコードを書いてくれるので、参考になります。
- misof : スロバキア・Comenius 大学。
- John Dethridge: オーストラリア・メルボルン大学。
- andrewzta: ロシア。
- cyfra: ポーランド・ワルシャワ大学。
- natori : 上位陣には珍しい Java 使い。日本人です。
- fuwenjie: 中国・TsingHua 大学。

蒼々たる面子です。。ホスト国の US 勢はひとりも Final に残れなかったのか。。問題
セットは Final にふさわしく通常の SRM よりもはるかに難しいものばかりそろっていま
す。

# 実況開始！

250 点問題は比較的容易だったらしく、ほとんどの競技者はそれほど苦労せずに
Submit。 500 点問題も fuwenjie, Petr, tomek と続々と Submit。こんな感じでリアル
タイムに問題と提出されたコードを見ることができました。

![2006 tco final](http://static.flickr.com/51/143382049_7fb44ec2fd_o.png)

優勝するには 1000 点問題を解く必要がある雰囲気が漂いはじめました。そんな中残り時
間 26 分で tomek が 1000 点問題を提出！

![2006 tco final](http://static.flickr.com/54/143380229_903b8124f2_o.png)

この時点でトップに立ちます。

![2006 tco final](http://static.flickr.com/48/143380591_980e98ef5c_o.png)

Petr が続きます。

![2006 tco final](http://static.flickr.com/49/143383228_bb6a895f46_o.png)

Petr 人気者です。「go Petr!!!」

![2006 tco final](http://static.flickr.com/47/143383770_5dc1fffed3_o.png)

見学者たちは、「tomek の 1000 点理解できねー。」「tomek のは greedy algorithm だ
」「Petr のはよさそうだ」とわいわいチャットしてました。

![2006 tco final](http://static.flickr.com/48/143384405_45218e28b4_o.png)

Petr の 1k(1000 点問題）を見てみましたが、binary search を使用しています。。。こ
の問題から binary search を思いつくとは。。その発想がすごい。。そうこういってる
うちに、なんと natori が 1k を提出！

![2006 tco final](http://static.flickr.com/54/143386042_389c1b9fcf_o.png)

Petr 残り 5 分というところで、500 点問題を再提出。。

![2006 tco final](http://static.flickr.com/55/143387190_d16a5b2c2c_o.png)

コーディング・フェーズ終了。現時点での順位はこのとおり。natori がトップ
。tomek、Petr が続きます。

![2006 tco final](http://static.flickr.com/52/143387588_cb6ad21779_o.png)

# チャレンジ・フェーズ

5 分間の休憩後、チャレンジ・フェーズの始まりです。 Petr 開始直後に立て続けに 500
点問題で 3 つ撃破！！いっきょにもりあがります。

![2006 tco final](http://static.flickr.com/46/143388256_b99595593f_o.png)

tomek と natori の 1k も撃墜されました。チャレンジ・フェーズ終了時点で Petr がト
ップにたちます。

![2006 tco final](http://static.flickr.com/49/143389107_eea870cfaa_o.png)

いよいよ、あとはシステム・テストの結果まちです。。。。

# 結果

![2006 tco final](http://static.flickr.com/50/143390301_a35d55d1fe_o.png)

見事、Petr が栄冠に輝きました。賞金 2 万ドル Get です。。おめでとう！！結局 1k
に正解したのは Petr だけでしたね。Petr の 1k は

- Binary Search
- Sort してから Greedy
- union-find

と基本的なアルゴリズムの組み合わせって感じですね。見事です。。。
