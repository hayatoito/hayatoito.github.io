<!--
title: Rustが最強のプログラミング言語である証明
date: 2017-08-31
toc: true
-->

2017 年現在、Rust が最強のプログラミング言語である証明を以下に示します。

# ICFP プログラミングコンテスト

ICFP プログラミングコンテストの説明については以下をご覧ください。

> ICFP Programming Contest は「なんでもあり」が特徴の，他とは一線を画す特徴的な
> プログラミングコンテストです．ACM の関数型プログラミング言語の学会 ICFP
> (International Conference on Functional Programming) に伴って毎年開催されてい
> まして (1) プログラミング言語自由 (2) 計算資源自由 (2) チーム人数制限なし (3)
> 72 時間勝負 (4) 問題の形式も毎年大きく変化，等の特徴があります．優勝者は「その
> 年のプログラミング言語」を決めることとなっており「その年はその言語の文句は言え
> ない」とか．

<div class='text-right'>
引用元: <a href=http://iwiwi.hatenablog.com/entry/20130927/1380255924>http://iwiwi.hatenablog.com/entry/20130927/1380255924</a>
</div>

<br>

コンテスト優勝チームが使用した言語は「優秀なハッカーに選ばれたプログラミング言語
」として正式に認定されます。さらに優勝チームには「使用したプログラミング言語を一
年間無制限に自慢してよい」という名誉ある権利が与えられます。

そのため ICFP プログラミングコンテストは「最強のプログラミング言語を決める大会」
という側面があります <sup>[[1](#footnote1)]</sup>。

最近は以下のような風潮もあるようなのですが:

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">実は最近のICFPContestに対する参加者の態度にやや疑問を持っているんだ…<br>最強言語認定を自分の好きな言語に与えるために勝利を目指すんだと思ってたんだけど、まず勝つこと先行でそのためには混成言語編成チームでもかまわないみたいなのは風情に欠けるんじゃないかって</p>&mdash; Noriyuki  OHKAWA (@notogawa) <a href="https://twitter.com/notogawa/status/893421960813715456">August 4, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

それでも「自分の好きな言語に優勝させてやる！」という熱い思いをもった参加者が今年
も大勢参加しました。

2017 年、今年のコンテストを主催したのはオックスフォード大学です。

# Rust で参加

私は昨年に引き続き Rust で参加しました。8 月 4 日から 8 月 7 日にかけての 72 時
間です。

# 今年の問題

今年の問題を簡単にいうと「鉱山（λ）に道をつなげてより多くの都市（λ から遠ければ
遠いほど高得点）に到達しましょう。」という問題でした。実際のルールはもっと複雑で
す。興味がある方は
、[実際の問題仕様](https://icfpcontest2017.github.io/problem/)を見てください。

「百聞は一見にしかず」、以下の実際に行われた戦いの様子をご覧ください。私はチーム
hayatox です。

<br>

<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="https://icfpcontest2017.github.io/punttv/tv.html?game=games/full1/plain/randomMedium-ae0.json"></iframe>
</div>

([Link](https://icfpcontest2017.github.io/punttv/tv.html?game=games/full1/plain/randomMedium-ae0.json),
その他の大きなマップでの戦い: Map:
[junction](https://icfpcontest2017.github.io/punttv/tv.html?game=games/full2/futures-splurges/junction-c04.json),
Map:
[nara](https://icfpcontest2017.github.io/punttv/tv.html?game=games/full2/futures/nara-c11.json))

# 結果

参加者から提出されたプログラムをもとにした、コンテスト
の[1st ラウンドの結果](https://icfpcontest2017.github.io/post/full-one/)が今週発
表されました。それによると参加チームは 146 チーム。そのうち 26 チームは提出した
プログラムが仕様を満たしていないことが判明し参加不可能。残りの 120 チームの間で
戦いが行われました。

果たしてどの言語が今年は最強の名を手にするのでしょうか？

各チームの使用した言語は現在のところコンテストのサイトでは明らかになっていません
。そのため以下の条件で各言語を代表するチームを適当に選びました。

1.  GitHub
    を["icfp 2017"で検索](https://github.com/search?utf8=%E2%9C%93&q=icfp+2017&type=Repositories)
2.  メインで使用した言語がほぼひとつであることをチェック(そうでなければスキップ
    ）
3.  チーム名が README 等に記載されている
4.  1st ラウンドの結果にチーム名が載っている -> 採用

<br>

---

各プログラミング言語とそれを使用したチーム <sup>[[2](#footnote2)]</sup> とその人
数 <sup>[[3](#footnote3)]</sup>、そしてチームの獲得ポイント
<sup>[[4](#footnote4)]</sup> です 。

<br>

<div class='row'>
  <div class='col-4 text-right'>使用言語 （チーム名: 人数 ）</div>
  <div class='col-8 text-center'>獲得ポイント</div>
</div>

<br>

<div class='row'>
  <div class='col-4 text-right'>Rust (hayatox: <a href='https://github.com/hayatoito/icfp2017/graphs/contributors'>1</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 100.0%'>
        <span>109</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>C++ (GennAI: <a href='https://github.com/nya3jp/icfpc2017/graphs/contributors'>8</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 97.2%'>
        <span>106</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Haskell (Sampou: <a href='https://github.com/nobsun/icfpc2017/graphs/contributors'>7</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 99.1%'>
        <span>108</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Common Lisp (cvnm: <a href='https://github.com/cybevnm/icfpc-2017/graphs/contributors'>1</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 63.3%'>
        <span>69</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Clojure (drop table teams;: <a href='https://github.com/candera/icfp-2017/graphs/contributors'>2</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 34.9%'>
        <span>38</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Java (A Storm Of Minds: <a href='https://github.com/jandreske/icfpc2017/graphs/contributors'>2</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 100.0%'>
        <span>109</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Kotlin (Lambada Calculus: <a href='https://github.com/PaulTaykalo/icfp-2017/graphs/contributors'>9</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 78.9%'>
        <span>86</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Scala (codingteam: <a href='https://github.com/codingteam/icfpc-2017/graphs/contributors'>4</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 44.0%'>
        <span>48</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>C# (kontur.ru: <a href='https://github.com/skbkontur/icfpc2017-kontur-ru/graphs/contributors'>16</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 64.2%'>
        <span>70</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>F# (lambda-llama: <a href='https://github.com/lambda-llama/icfpc2017/graphs/contributors'>5</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 0.0%'>
        <span>0</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Elixir (The Mikinators: <a href='https://github.com/claytonflesher/punting/graphs/contributors'>8</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 38.5%'>
        <span>42</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Python (Lambding Snakes vs Coding Monkeys: <a href='https://github.com/pankdm/icfpc-2017/graphs/contributors'>4</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 86.2%'>
        <span>94</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Go (MIPT Lambda: <a href='https://github.com/ygorshenin/icfp2017/graphs/contributors'>3</a>)</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar' style='width: 58.7%'>
        <span>64</span>
      </div>
    </div>
  </div>
</div>

---

- Rust 十分強い。しかし最強という感じはまだ受けません。
- ほとんどのチームは複数人で参加していることがわかりました。ひとりで参加している
  「ぼっちチーム」は Rust 以外は Common Lisp だけです。さすが Lisp。孤高の存在。
- 特に C++を用いたチーム GennAI は 8 人中 7(?)人が Google のソフトウェアエンジニ
  アです。
- さらに特筆すべきは C#を用いたチー
  ム[kontur.ru](https://github.com/skbkontur/icfpc2017-kontur-ru)。なんと 16 人
  チーム！もはや数の暴力です。

# 正規化

数の暴力にはこちらも理不尽な理論で対抗するしかありません。「獲得ポイント」を「チ
ームの人数」で割ってやりましょう <sup>[[5](#footnote5)]</sup>。正規化した結果は
以下のようになります。

<br>

<div class='row'>
  <div class='col-4 text-right'>Rust</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 100.0%'>
        <span>109.0</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>C++</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 12.2%'>
        <span>13.2</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Haskell</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 14.2%'>
        <span>15.4</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Common Lisp</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 63.3%'>
        <span>69.0</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Clojure</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 17.4%'>
        <span>19.0</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Java</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 50.0%'>
        <span>54.5</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Kotlin</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 8.8%'>
        <span>9.6</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Scala</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 11.0%'>
        <span>12.0</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>C#</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 4.0%'>
        <span>4.4</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>F#</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 0.0%'>
        <span>0.0</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Elixir</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 4.8%'>
        <span>5.2</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Python</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 21.6%'>
        <span>23.5</span>
      </div>
    </div>
  </div>
</div>

<div class='row'>
  <div class='col-4 text-right'>Go</div>
  <div class='col-8'>
    <div class='progress'>
      <div class='progress-bar progress-bar-success' style='width: 19.6%'>
        <span>21.3</span>
      </div>
    </div>
  </div>
</div>

<br>

以上により Rust が最強であることが示されました <sup>[[6](#footnote6)]</sup>。証
明終わり。

# おまけ

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">RustでICFPCに参加した同僚「コンパイラがチームメイトみたいなもんでしたよ」</p>&mdash; いもす (@imos) <a href="https://twitter.com/imos/status/894884305998036992">August 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

そういえばコンテストの翌日にオフィスで会った時そんなこといった気がします。:)

実際、私は大したことはしていません。今回は合計で 12 時間くらいしか参加しておらず
、仕様もすべては実装していません <sup>[[7](#footnote7)]</sup>。それにもかかわら
ず最低限動くプログラムを完成・提出できたのは、すべては Rust という素晴らしい言語
を作成したコアチームと、[crates.io](http://crates.io) という素晴らしいパッケージ
・エコシステムのおかげです。今回のコンテストではじめて使用したライブラリがいくつ
かありますが、すべて苦労することなく使用することができました。私は巨人の肩に乗っ
かっただけです。

# 来年に向けて

- 「私の愛する JavaScript が Rust ごときに負けるはずがない。」
- 「はっはっはっ。自称最強 Ruby 使いであるこの私が出場していない大会で良い成績を
  とることに何の意味があるというのか？かわいいやつらめ。」
- 「その証明には致命的な誤りがあります。どこが間違っているかというと....」

もっともなご意見でございます。しかしながら、参加しない人に反論する権利はまったく
与えられないのがこの ICFP プログラミングコンテストです。

唯一の正しい反論の方法は「机上の空論を展開」することではなく、実際に「愛する XXX
言語を勝たせてやる」ことです [[8](#footnote8)]。ぜひ来年の ICFP プログラミングコ
ンテスト 2018 に参加してみてください。

興味をもった方は雰囲気をつかむため過去の問題に挑戦してみるとよいかもしれません。
特に 2006 年カーネギーメロン大学が主催した「古代文明が作ったコンピュータの仕様と
その上で動くプログラムを記した古文書」を巡るコンテストは
「[神回](http://www.boundvariable.org/)」として伝説になっています
[[9](#footnote9)]。ぜひ挑戦してみてくださいね。

---

footnotes:

- <a name="footnote1"></a>[1]: ICFP 学会としては、コンテストを通じて「関数型プロ
  グラミングの優位性」を示したいという思いがあったはずなのですが、コンテストでは
  必ずしも Haskell のような「いわゆる関数型プログラミング言語」が優勝するとは限
  りません。主催者かわいそう。
- <a name="footnote2"></a>[2]: チーム名をここに記載すべきかどうか迷ったのですが
  、各言語のコードを見ることは読者にとっても有益だと思い、リンクと共に載せていま
  す。特に C#チームと F#チームの README は非常によく書けていて勉強になります。
- <a name="footnote3"></a>[3]: 各チームの人数は、レポジトリの README にメンバー
  が記載されている場合はそこから、記載されていない場合は実際にレポジトリに貢献し
  た人数で判断しています。
- <a name="footnote4"></a>[4]: 獲得ポイントは 1st Round の結果のみを使用していま
  す。最終結果は[ICFP](http://conf.researchr.org/home/icfp-2017)（学会の方）当日
  、現地オックスフォードで発表されます。最終結果が発表される前のタイミングでない
  とこのような方向性の記事は書けません。:)
- <a name="footnote5"></a>[5]: 参考にした理論:
  [ウォーズマン理論](https://dic.pixiv.net/a/%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%BA%E3%83%9E%E3%83%B3%E7%90%86%E8%AB%96)
- <a name="footnote6"></a>[6]: Common Lisp が 2 位ですが、Lisp は神が作った神言
  語なので妥当な結果といえるでしょう。
- <a name="footnote7"></a>[7]: option という使用すれば絶対有利になる仕様を利用し
  ていません。Timeout 対策も実装していません。想定以上の大きさの Graph では
  Timeout するはずです。
- <a name="footnote8"></a>[8]: もちろんチーム内で複数言語を用いるというのもあり
  です。人数の制限がないのも含めて「なんでもあり」なところがこのコンテストの魅力
  です。
- <a name="footnote9"></a>[9]: 2006 年の ICFP コンテストはその内容があまりに濃か
  ったため、参加者の間で「これ、もう主催者側が優勝でいいんじゃね？」と言われてい
  たそうです。
