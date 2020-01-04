<!--
title: 六本木ではたらくソフトウェアエンジニアへのよくある質問とその答え (FAQ) (2015 - 2017)
date: 2017-03-20
update_date: 2017-09-04
toc: true
-->

- グーグルではたらくソフトウェアエンジニアです。
- ご意見やご質問 あるいは Typo 等を見つけたときは
  [GitHub Issues](https://github.com/hayatoito/hayatoito.github.io/issues) にお
  願いします。答えられる範囲でできるだけ答えますね。
- この記事は不定期にアップデートしてできるだけ最新の状態を反映させるようにしてい
  ますが、いくつか内容が古い可能性があります。

# 連絡先は？ (Contact Info)

- Mail: <mailto:hayato@google.com>
- Google+: [google.com/+HayatoIto](http://google.com/+HayatoIto)
- GitHub: [github.com/hayatoito](http://github.com/hayatoito)
- Twitter (inactive): [@hayatoito](http://twitter.com/hayatoito)
- Twitter: [@shadow_hayato](http://twitter.com/shadow_hayato)
- [IRC freenode](https://freenode.net/): hayato

# テックリード (Tech Lead) <a name="tech-lead"></a>

## Google における Tech Lead (テックリード) とはどのようなお仕事ですか？ <a name="google-tech-lead"></a>

Google では、チームやプロジェクト内でのリードエンジニアのことを Tech Lead と呼び
ます。数人から 10 名ほどのチームに、Tech Lead が１人います。私は Google Chrome
の DOM / HTML Team の Lead であり、Web Components Project の Tech Lead です。

## 普段、何をしていますか？ <a name="what"></a>

主に Google Chrome で使用されているレンダリングエンジン Blink の開発です。

## 普段、どれくらいコードを書いていますか？ <a name="commits"></a>

Blink はオープンソースです。Commits は公開されています:

- [2017 - のコミット](https://chromium-review.googlesource.com/q/owner:hayato%40chromium.org)
- [- 2017 までのコミット](https://codereview.chromium.org/search?owner=hayato&reviewer=&cc=&sort=modified&limit=100)

[DOM][blink dom] / [Shadow DOM][blink shadow dom] / [Events][blink events] /
[CSS][blink css] あたりを触っていることが多いです。

[blink dom]:
  https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/dom/
[blink shadow dom]:
  https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/dom/shadow/
[blink events]:
  https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/events/
[blink css]:
  https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/css/

## 普段、どのようなコードを書いてますか？ <a name="code"></a>

代表的な CL (CL とは Change List の略で、主に Google で使用されている用語。いわ
ゆる"パッチ"に相当します）

2016-2017: Shadow DOM V1 の Distribution Engine 関係の CLs:

- [Minimize the number of reattached nodes after updating distribution by 2D dynamic programming](https://chromium-review.googlesource.com/c/535493/)
- [Rewrite Shadow DOM v1 distribution engine on the top of a new slotchange concept](https://chromium-review.googlesource.com/c/532734/)
- [Rewrite Shadow DOM distribution engine to support partial synchronous distribution for v1](https://codereview.chromium.org/1995203002/)

2014: Google Chrome の Event Dispatching を 400 倍速くした CL。

- [Lazy evaluation of event.path by numbering TreeScopes in DFS order for later O(1) queries](https://codereview.chromium.org/182683002)

このパッチは、Chrome の _[Speed Hall of Fame]_ を受賞しました。

> 3/12/2014 - Improvement of the Week
>
> Last week Hayato Ito reduced checking if a DOM tree is a descendent of another
> from O(N) in the height of the tree of trees to O(1). In smaller trees this
> produces
> [2-3x faster event dispatching](https://chromeperf.appspot.com/report?masters=ChromiumPerf&bots=android-nexus5%2Cchromium-rel-mac8%2Cchromium-rel-win7-dual&tests=blink_perf%2FEvents_EventsDispatchingInShadowTrees&rev=256330&checked=core),
> but in the deeply nested trees Hayato created he saw more than a 400x
> improvement! I'd also like to thank Hayato for the
> [fantastic description](https://codereview.chromium.org/182683002) of the
> patch and its effects in the CL description. Great work!

[speed hall of fame]: http://www.chromium.org/developers/speed-hall-of-fame

## 出張は多いですか？ <a name="trip"></a>

Web Standards に関わると、他のブラウザベンダ(Apple, Mozilla, Microsoft 等)と直接
話をする必要があります。旅行が好きなら、Web Standards のお仕事はオススメです。

- 2015:
  1.  [Jan] Sydney (Midnight Train)
  2.  [Apr] San Francisco, Mountain View (Shadow DOM F2F)
  3.  [May] Sydney (BlinkOn4)
  4.  [Jul] Mountain View (Custom Elements F2F)
  5.  [Oct] San Francisco (BlinkOn5)
  6.  [Nov] Sapporo (W3C TPAC)
- 2016:
  1.  [Jan] Mountain View / Cupertino (Custom Elements F2F)
  2.  [Jun] Munich (BlinkOn6)
  3.  [Nov]: Lisbon (W3C TPAC)
- 2017:
  1.  (Plan) [Jan] Mountain View / San Francisco (BlinkOn7)
  2.  (Plan) [??]: San Francisco (W3C TPAC)

# Web 標準 (Web Standards) <a name="web-standards"></a>

## Spec Editor とはどのようなお仕事ですか？ <a name="spec-editor"></a>

Web そのものの仕組みをつくるお仕事です。Web 標準の仕様書を書きます。私は [Shadow
DOM] の Spec Editor です。[DOM][dom standard] や [HTML][html standard] の仕様策
定もしています。

- [Commits for Shadow DOM Specification](https://github.com/w3c/webcomponents/commits/gh-pages/spec/shadow)
- [Commits for Web Components](https://github.com/w3c/webcomponents/commits/gh-pages?author=hayatoito)

[shadow dom]: http://w3c.github.io/webcomponents/spec/shadow/index.html

## HTML の仕様は WHATWG HTML Standard と W3C HTML5 の両方あります。Chrome の開発ではどちらを参考にしていますか？ <a name="whatwg-w3c"></a>

WHATWG の HTML Standard です。W3C の HTML5 仕様は見ていません。

- 私が仕様の策定をしているのは [WHATWG] の [DOM Living Standard][dom standard]
  や [HTML Living Standard][html standard] です。実際、私は W3C から W3C DOM の
  Editor になりませんか？といわれましたが、依頼を断りました。私は WHATWG DOM
  Standard のみにフォーカスしています。
- 私も含めて Chrome の開発者が実装の際、参考にしているのは W3C DOM 仕様や W3C
  HTML5 仕様ではなく WHATWG の DOM Standard や HTML Standard です。
- Chrome の バグトラッカー [crbug.com](http://crbug.com/) 上でも、WHATWG の HTML
  Living Standard をベースに議論します。バグを報告をするときは、この辺りをぜひ理
  解しておいてください。
- 私の知る限り、W3C HTML5 仕様の準拠を目指しているメジャーなブラウザはひとつもあ
  りません。Chrome, Safari, Firefox などすべてのメジャーなブラウザは WHATWG の
  DOM Standard / HTML Standard の準拠を目指しています。言い方を変えると、W3C
  HTML5 仕様を参考に Web ページをつくったところで、それをサポートしているメジャ
  ーブラウザは現在存在しませんし、今のところでてくる気配もありません。もし誰かが
  そのような HTML5 仕様に準拠したブラウザをつくったとしてもそのブラウザは
  、Chrome, Safari, Firefox とのインターオペラビリティはありません。

[whatwg]: https://whatwg.org/
[dom standard]: https://dom.spec.whatwg.org/
[html standard]: https://html.spec.whatwg.org/multipage/

# Web Components / Shadow DOM <a name="web-components-shadow-dom"></a>

## Web Components とは? <a name="web-components"></a>

早い話がこのような Web を目指します。難しいことは覚えなくてよい、誰もがタグを書
くだけで OK な Web に戻します。

```html
<html>
  <head>
    <link rel="import" href="gmail-app.html" />
  </head>
  <body>
    <google-header></google-header>
    <gmail-app>
      <google-hangout></google-hangout>
      <google-mail></google-mail>
    </gmail-app>
  </body>
</html>
```

昔とある講演のためつくったスライド:
[https://hayato.io/webcomponents-slides/](https://hayato.io/webcomponents-slides/)。

## Shadow DOM とは？ <a name="shadow-dom"></a>

毎回、説明にとても苦労します。簡単に言うと:

1.  Web は DOM Node という基本的単位から成り立ちます。

2.  複数の Node が あつまり Tree を形成して Node Tree になります。みなさんがみて
    いる Web ページは（おおまかにいうと）この Node Tree ひとつからできています。

3.  Web の根本的な問題点のひとつとして、「他の Web ページの特定の部分を再利用す
    ることは本質的に困難である」というのがあげられます:

    - 他の Web ページの Node Tree の Subtree を、自分の Node Tree に「混ぜて」使
      用した場合、なにが起きるかを事前に予期するのは非常に困難です。

    - つまり、これまでの Web は 「混ぜるな危険」でした。少し混ぜただけで、ページ
      全体が容易に壊れてしまいます。

4.  Shadow DOM は Node Tree 自体を _Shadow Tree_ として、他に干渉することなく再
    利用することを可能にします。Node Tree 自体を、コンポーネントの単位とすること
    が可能になります。

    - これにより、抽象化の概念がなかった、DOM に抽象化の概念をもたらします。C に
      Class の概念を持ち込んだのが C++ であるのと同様に、DOM に抽象化の概念をも
      たらすのが Shadow DOM です。

    - これまでの Web ページがひとつの Node Tree から成り立っていたのに対して
      、Shadow DOM の世界では Web ページは Node Tree の Tree から成り立ちます。
      Tree だった Web が これからは Tree of Trees となります。

以下も参考にしてください。

- [Chrome 53 Beta: Shadow DOM, PaymentRequest, and Android autoplay (Posted by Hayato Ito, Shadow DOM Chaffeur)](http://blog.chromium.org/2016/08/chrome-53-beta-shadow-dom.html)
- [Shadow DOM v1: self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/)

## Shadow DOM はどこに使用されているのですか？ <a name="shadow-dom-usage"></a>

- Chrome / Blink の built-in elements (`<input>`, `<video>` など)。つまり
  Electron や Atom Editor や Visual Studio Code なども。
- Chrome / Blink の devtools や Setting Page などたくさん。
- Andoroid の WebView
- [AMP (Accelarated Mobile Pages)](https://www.ampproject.org/)
- [Twitter: Tweet の埋め込み `<twitterwidget>`](https://dev.twitter.com/web/embedded-tweets)
- Polymer を使用しているページ:
  - [YouTube](https://youtube.com/)
  - [YouTube Gaming](https://gaming.youtube.com/)
  - [Google Earch](https://earth.google.com/web/)
  - ...
- Angular (Option)
- その他 (Todo)

## もう少し詳しく Web Components について教えてください <a name="web-components-details"></a>

(...Shadow DOM からの続き) Shadow DOM と Custom Elemenets と HTML Imports を組み
合わせることによって、Web 開発者は、自分のつくった世界そのものを Web Component
として簡単に再利用可能な形で公開することができるようになります。

コンポーネントの利用者は、タグ を書くだけで、他の人がつくったコンポーネントを再
利用できます。ひとつの Web Component は、その内部ではさらに複数の Web Component
を使用しているかもしれませんが、利用者はそれは気にしなくてよいです。

...とここまで聞くと、とても複雑なことをしているように思えますが、実は目指してい
る世界は、むしろその逆です。

1.  複雑高度になり一部の技術者だけのものになりつつある現在の Web を、HTML の"タ
    グ" を手書きするだけで良かった誰もが楽しめる Web に戻します:

    Web プラットフォームは進化を続けています。もはやタグを手書きして HTML を書く
    だけでは、とてもユーザーを満足させるサイトは作成できなくなりました。「きちん
    とした」サイトをつくるには、多くのことを学習する必要があります。

    どうして多くのことを覚えなければいけないのでしょうか？ それは Web プラットフ
    ォームの根幹である DOM に抽象化の仕組みがないのが大きな理由のひとつです。適
    切な抽象化レイヤーがあれば、本来、知らなくてよいことは「隠す」ことができるは
    ずです。

    Web Components の世界では、「タグ」を書くだけで、他の人が書いた Web
    Components をレゴブロックのように組み合わせて利用できます。コンポーネントの
    内部がどのようになっているかは知る必要はありません。そう、古き良きタグを手書
    きするだけでよかったあの時代に戻ります。

2.  ブラウザが本来もつパワーを Web 開発者に開放します:

    たとえば HTML に標準で用意されている `<video>` タグは、誰でもタグを書くだけ
    で、動画を再生することができます。 `<video>` タグの内部がどのように実装され
    ているかは気にしませんよね？実は `<video>` タグは Google Chrome では Shadow
    DOM を内部で使用しています。ある意味、これはひとつの Web Components です。

    現在の Web では、`<video>` タグと同じようなものを、Web 開発者は自分ではつく
    れません。 Web Components の世界では、Web 開発者に Shadow DOM のもつ力を開放
    します。私は、Web 開発者の情熱・想像力を信じています。

    誰もが Web Components を作れるようになり、そしてそれを公開し誰もが再利用でき
    たら、ステキですよね。 Shadow DOM や Web Components はそのような世界を目指し
    ています。

Web Components は 2014 の [The Best New Web Technology new Award] を受賞しました
。

[the best new web technology new award]:
  http://www.w3.org/blog/2014/05/web-components-won-the-best-new-technology-2014-net-award/

## Shadow DOM のコードは 8,800,000 行 あるというのは本当でしょうか？ <a name="shadow-dom-8.8m"></a>

違います。この [CL](https://trac.webkit.org/changeset/164131) や この WebKit の
[Blog](https://webkit.org/blog/2455/last-week-in-webkit-millions-of-lines/) をみ
て、一部でそのような勘違いをしてしまった人がいるようです。

> Purge remaining ENABLE(SHADOW_DOM) cruft.
>
> <​https://webkit.org/b/128827>
>
> Source/WebCore:
>
> Remove the remaining 8.8 million lines of Shadow DOM code to align with goals
> for intent to ship 60fps on mobile in 2014.

この CL はその先日に Google が Blink から WebKit 由来の 8.8 million 行のコードを
削除したとの記事:

[Google Has Already Removed 8.8M Lines Of WebKit Code From Blink](http://techcrunch.com/2013/05/16/google-has-already-removed-8-8m-lines-of-webkit-code-from-blink/)

を受けての Apple さんのジョークです。

## Shadow DOM の Spec の場所は? <a name="shadowdom-spec"></a>

常に 最新の Editors Draft
([http://w3c.github.io/webcomponents/spec/shadow/](http://w3c.github.io/webcomponents/spec/shadow/))
を参照あるいはリンクを貼るようにしてください。

## 今のフロントエンドの現状についてどう思いますか？ <a name="front-end"></a>

- フロントエンドの人はなぜか自虐的なことばかりを言っている印象があるのですが、自
  虐からはなにも生まれないので、もっと誇りと自信をもってください。ユーザーが快適
  に Web を利用できるのは、フロントエンド開発者のおかげです。Web 大好きな人は想
  像以上にいっぱいいますよ。みんな同じ船に乗っている仲間です。

- 自虐するよりは、ちゃんと中の人にフィードバッグしたほうがいいです。今どきはどこ
  でも GitHub Issues 等で声を届けることができます。 Twitter でいくらつぶやいたと
  ころで届かないです。「絶対中の人に届けてやる！」という強い意思が必要です。

- Web プラットフォームは天から降ってきて一方的に与えられるものでは決してなく、人
  間がつくっているものです。自分には関係ないと思うよりは、もっと Web そのものの
  進化に積極的に関わるようにするときっともっと面白いと思いますよ。変えられないも
  のなんてありません。いつでも大歓迎です。

## 今後 Web で取り組みたいことは？ <a name="future-plans"></a>

まだまだ Web Components / Shadow DOM についてはやることが山積みではあるのですが
(HTML Modules 等も控えています)、
[Web プラットフォームの 20 年以上に渡る問題を解決した](https://annevankesteren.nl/2016/04/html-components)あ
とは、以下のことに取り組みたいです。

- DOM と CSS の根本的な問題は Shadow DOM で直した（希望）ので、次に手をつけると
  したらやはり JavaScript ですね。Rust -> WebAssembly, Rust DOM Bining 辺り。
  JavaScript を Rust で置き換えることができれば Web はより面白くなります。いまま
  で JavaScript を使用することに難色があったため参入してこなかった優れたプログラ
  マたちが、その障壁がなくなることにより一挙に Web に参入してくれば、いままで
  JavaScript の壁で守られていた JavaScript 専門のフロントエンドエンジニアさんた
  ちもうかうかしていれられなくなるかもね（適当）。どんなときも健全な競争は良いこ
  とです。

- あるいは Blink 自体を Rust で書き直すとか。現在は主に C++ で書かれています。

あくまで未確定な予定ですので、あまり過度な期待はしないで、温かく見守っていてくだ
さいね。

## 今の Web の DOM/HTML はだめだと思います。そこで私の考えた最強の DOM/HTML のアイデアがあるのですがどう思いますか？ <a name="dom-html"></a>

いいですね。具体的なアイデアがあるなら、まずはデモをつくってみることをオススメし
ます。デモができたら声かけてください。

具体的なアイデアやデモが含まれていない場合は、しかるべきところにアイデアを提案し
たところで、[duplicated] あるいは [Needs concrete proposal] というラベルがついて
すぐに Close されると思います。中の人は、具体的ではない似たようなアイデアを何度
も何度も聞いています。

# 漫画「王様達のヴァイキング」の技術監修 <a name="kingsviking"></a>

## 「王様達のヴァイキング」って？ <a name="what-is-kingsviking"></a>

「[王様達のヴァイキング](http://spi-net.jp/weekly/comic008.html)」は、小学館
の[週刊スピリッツ](http://spi-net.jp/)で連載中の漫画です。ハッカーと投資家が主人
公です。

Twitter 公式アカウントは、[@kingsviking](https://twitter.com/kingsviking) です。

## 漫画の監修とは具体的にはどのようなことをするのでしょうか？ <a name="kingsviking-supervisor"></a>

私は技術監修としてこの漫画をサポートしています。主に次のようなことに関わっていま
す。

- ストーリーや設定について技術面からサポート。
- 是枝くんをはじめとする登場人物たちの「サポート」。
- 毎週のネームやゲラのチェック。 技術的に不自然な箇所やセリフについてアドバイス
  。
- 単行本のカバー下のアイデア出しと巻末用語解説の執筆。

つまり、一般の読者からは「難しいところはわからないです（けれど面白いです！）」と
言われ、詳しい人からは「この設定気にいらない！」と石を投げられる側の役割です
...。

この作品にかかわる方（漫画家さん、担当編集さん、ライターさん等）、みなさん本当に
漫画を面白くするプロ・よい文章を書くプロで、いつもその仕事のプロフェッショナルっ
ぷりに感心しきっています。週刊連載を抱える漫画家さんがコンスタントにアウトプット
を重ねていく姿を、みなさんより近いところで見ることができるのは、とてもよい刺激に
なります。

プログラミングの素晴らしさが、漫画のもつ偉大な力を通じて、多くの読者に伝わればよ
いなと思ってお手伝いしています。

---

漫画家さん宛に届く作品のファンの方からのファンレターをときどき見せてもらうことが
あります（もちろん宛先として「関係者の皆様」となっていた場合です）。そこにはとて
も温かいお言葉があり「あー、漫画家さんってとてもとても大変なお仕事だけど、こうし
てファンの皆様から直接温かいお手紙を頂けるとは素晴らしいお仕事だなー。苦労が報わ
れるわー」とちょっぴり羨ましい気持ちにもなったりします。

それにひきかえ、ソフトウェアエンジニアがいくらコードを書いても、ファンの方ではな
くユーザーの方から「バグさっさとなおせ！」といわれるだけですからね。いや、とても
ありがたいです。いつも貴重なフィードバッグありがとうございます。

一度くらい感謝されてもいいのでは...と思いつつ、それでも好きだからコードを書き続
けるのです。:)

## 是枝くんのモデルですか？ <a name="zer0"></a>

違います。是枝くんが使用するプログラミング言語・ソースコードは私にとてもよく似て
ますが、あくまで偶然です。

## 坂井さんのモデルですか？ <a name="sakai"></a>

違います。パンイチになったりしません。

## 笑い猫のモデルですか？ <a name="laughingcat"></a>

違います。裸になったりしません。

## ヴァルちゃん のモデルですか？ <a name="valkyrja"></a>

違います。ワインを頭からかけたりしません。

## 漫画では、これまでどのようなプログラミング言語が登場しましたか？ <a name="kingsviking-programming-language"></a>

これまで C, C++, PowerPC Assembly, Python 3, Scala, Rust 等が登場しています。

例)

- 是枝くん: PowerPC Assembly (スパコンでパスワードを解析するときに使用 @単行本 2
  巻), Python 3 (ATM に対する Man-in-the-middle Attack への Counter Attack @単行
  本 4 巻), C++ (何度も登場しています。改良型 _Sniper_ @単行本 11 巻 など)
- ヴァルちゃん: Scala (マネーロンダリング Bot @単行本 5 巻, オンライン証券取引の
  クラッキング @単行本 8 巻), Rust (省庁に寄生する自己増殖型 Bot - _Pawn_@単行本
  11 巻)

興味のあるかたは (単行本を買って) コードも読んでみてくださいね。

## 監修をしているということはセキュリティの専門家ですか？ <a name="security"></a>

違います。もちろんブラウザの開発においてセキュリティは最重要視しているので、セキ
ュリティ関連のお仕事をすることもありますがそれはメインではありません。

最近でいうと:

- 世界的に有名なポーランドのセキュリティ研究者 Mariusz Mlynski が報告してきた
  Chrome の Universal XSS 脆弱性についてその原因の調査・修正したり
  ([crbug.com/630870](https://bugs.chromium.org/p/chromium/issues/detail?id=630870))

  (この脆弱性の報告には 賞金 \$7,500 が支払われました。報告してくれた人には賞金
  がでたのに、直した私は 1 ドルももらえません （当たり前））

  引用:
  [https://chromereleases.googleblog.com/2016/12/stable-channel-update-for-desktop.html](https://chromereleases.googleblog.com/2016/12/stable-channel-update-for-desktop.html)

  > [\$7500][630870] High CVE-2016-5204: Universal XSS in Blink. Credit to
  > Mariusz Mlynski

- Rust の iron (Web サーバ）で使用される staticfile crate に脆弱性を見つけたので
  報告したら
  ([iron/staticfile/issues/89](https://github.com/iron/staticfile/issues/89))、
  「よかったら、直してくれない？」といわれたので直してあげたり

してました。だ、だけど、メインのお仕事じゃないからね！

# Google ソフトウェアエンジニアの採用 <a name="google-hiring"></a>

## 今まで何人、Google でソフトウェアエンジニアの面接（インタビュー）をしましたか？ <a name="google-interview-number"></a>

150 人以上です。すべて 1 : 1 での 45 分ほどの面接です。電話インタビューやインタ
ーンの面接も含みます。

## インタビューではどのようなことを聞くのでしょうか？ <a name="google-interview"></a>

Q. 「バスにゴルフボールはいくつ入るでしょうか？」

A. 「そんな問題はもはや聞いていないです。いまはゴルフボールにバスが何台はいるか
を聞いています。」

...といった、変な情報に振り回されないでください。

## Google にソフトウェアエンジニアとして入るにはどのような勉強・経験をしておけばよいでしょうか? <a name="google-join"></a>

「何をすればよいのか」を挙げるのは難しいです...。 (TODO: いつかちゃんと書く)

その反対、「特にやる必要はないこと」を挙げるなら簡単にできます。たとえば、以下の
項目はプログラマとしての能力とはいっさい関係がないことは、みんな理解していますの
で、安心してください。

- Twitter での発言数やフォロワー数
- ブログの記事数・ブックマーク数
- 本や雑誌の記事の執筆
- 勉強会やハッカソンの出席回数・登壇数
- イベントの主催

これらの活動を特にしていなくても、気にしないでください。プログラマ・ソフトウェア
エンジニアとして濃密な時間を過ごした人が正しく報われるインタビューをいつも心がけ
ています。

## ソフトウェアエンジニアとしてはたらくにあたって Google のよいところって? <a name="google-swe"></a>

- ソフトウェアエンジニアリング的に正しいことを正しく行っている

  「正しいことをやりたいのに」技術レベルが下の人に合わせざるを得ずに断念せざるを
  得ない...ということはまずありません。 その逆で、「技術が上」の人にみんなが合わ
  せるように努力している。

- ソフトウェアエンジニアの採用が一貫して実力主義

  採用において、実力のみがものをいう仕組みを制度として持っている・その制度を維持
  しようとしているところ。 これを続けている限り、Google は強いと思います。

- みんなコードを書く

  コードを書くのがソフトウェアエンジニアのお仕事です。

- 無駄なプロジェクトはわりとあっさり切り捨てる。その判断が早い。

  エンジニアのリソースが限られている以上、意識的に切り捨てていかないと、前には進
  めません。

# Google でのインターンについて <a name="google-intern"></a>

## 今まで何人、Google でインターンのホストをしましたか？ <a name="google-intern-number"></a>

6 人です。すべて学部生です。

## Google でのソフトウェアエンジニア・インターンはどのようなことをするのでしょうか？ 応募したいのですが、スキル的に不安です...。 <a name="google-interview-what"></a>

TODO: 書きます。

## 今年(2017 年)も、インターンのホストをしますか？ <a name="google-intern-rust"></a>

いい人がいれば。

（データ構造やアルゴリズムの基本は当たり前として）今年は特に Rust がひと通りでき
る かつ システムプログラミングを苦手にしない人に会えたらいいなー。どこかにいない
かなー。［壁］д・)ﾁﾗｯ

興味があればぜひ応募してくださいね。

## Google STEP インターンではどのようなことを行うのですか？ <a name="google-step-intern"></a>

TODO: 書きます。

当分の間、質問があればこちらに
[GitHub Issues](https://github.com/hayatoito/hayatoito.github.io/issues) どうぞ
。

# 競技プログラミング / レッドコーダー <a name="competitive-programming"></a>

## レッドコーダーになると Google からお誘いがくると聞きました。 <a name="redcoder"></a>

Google から誘いがくるというのは、「よかったら面接をうけてみませんか？」くらいの
意味しかありません。

1.  誘いが来て面接を受ける場合
2.  自ら応募して面接を受ける場合

1 と 2 で採用プロセスは基本変わらないです。

私は今はインタビューする側ですが、インタビュー中は 1 と 2 の違いを意識していませ
ん。

Google の採用担当の人が何度も熱心に声をかけた結果、ようやく面接にきていただいた
にもかかわらず、エンジニアがインタビューした結果、思うような評価が得られなかった
場合は、普通にお断りされてしまいます。

## Google に入るにあたって、競技プログラミングの勉強をしておいたほうがよいでしょうか？ <a name="google-competitive-programming"></a>

これはよく聞かれる質問です。以下、事実のみを書いておきます。

- Google のソフトウェアエンジニアになるにあたって、レッドコーダーになることは必
  須ではありません。
- 私からみて「すごいエンジニアだなー」という人で、競技プログラミングの経験が全く
  ないという人はごろごろいます。
- 競技プログラミングはどうしても競技システムの制限があるため、限られた知識しか身
  につきません。競技プログラミングで必要となる「アルゴリズムとデータ構造」などは
  、ソフトウェアエンジニアにとって必要な経験・知識のほんの一部ですし、それらを身
  につけるにあたってより効率的な学習方法は他にもたくさんあります。
- 競技プログラミングのレートが Resume に書いてあったとしても、その事実自体は 1:1
  インタビューの評価には直接影響しないです。評価はあくまで面接時の実際のパフォー
  マンスで決まるのが原則です。

以下は（事実とは限らない）意見です。

- いわゆる Google などの Tech 企業におけるソフトウェアエンジニア向けのインタビュ
  ーで、いかにも「競技プログラミング」っぽい問題を出すのはひと昔前に流行りました
  が、いまでもそのようなことが行われているとは思わないほうがよいです。世の中のほ
  とんどの記事や本は古い情報にもとづいた推測で書かれていますので、気をつけてくだ
  さい。
- 特に競技プログラミングに力をいれる学生は、US では相当減ったと思います。一部の
  Top の人を除いて、ほとんどの人はそこで差別化はできません。かける時間コストが得
  られるリターンに対してわりにあわないです。それよりは実際のソフトウェアプロジェ
  クトや企業のインターンに参加したり、自らクールなプロダクトを開発する傾向が強く
  なっていると思います。やはりリアルなプロジェクト・プロダクトでの実績がある人は
  強いです。
- いろんなことを経験しておいたほうが長い目でみてお得です。おすすめは学生なら
  [Google Summer of Code] などに参加することです。学生じゃないとしても、Summer
  of Code で記載されている
  [プロジェクトの一覧](https://summerofcode.withgoogle.com/projects/) を見てみま
  しょう。この世の中は解決を待っている素敵な問題たちであふれています。
- Google は「プロダクト（製品）を実際にユーザーに届けてなんぼ」の会社だと思って
  いますので、「プロダクトのコードが書ける」能力が大事です。
- 「競技プログラミングは役に立たない」という意見もありますが、プログラミングとい
  う楽しい行為が「役に立つ」「役に立たない」の観点のみで語られるなんて、実にもっ
  たいないことです。「役に立たない」プログラミングは最高に楽しいですよ。

[google summer of code]: https://developers.google.com/open-source/gsoc/

# プログラミング <a name="programming"></a>

## どのようなプログラミング言語を普段使用していますか？その用途は？ <a name="programming-language"></a>

- C++: Google Chrome が使用しているレンダリングエンジン Blink の開発。
- Rust: CPU Intensive なコードを安全に書きたいとき。JVM に絶望したとき。
- Python: Chrome の開発で使用する Tool や個人の Tool 等を書くとき。Python で書く
  のはおよそ 100 行以下までです。

  - 追記 (2016): 最近は個人用の Tool （100 行以下の規模のものでも) Rust で書くよ
    うにしてます。Python を使う場面はとても減りました。この規模の Tool で Rust
    を使うのが正解と思う人はほとんどいないと思いますが、最近はだいぶ Rust に慣れ
    てきたので、生産性の観点でも Python より Rust のほうが上になりつつあります。

- Scala: 1,000 行以上のある程度大きなものを書くとき。footprint をあまり気にしな
  くてよいとき。ICFP Programming Contest (関数型言語の国際学会が毎年開催している
  プログラミング大会)に参加するとき。

  - 追記 (2016): Rust を使い始めてからは Scala はほとんど使わなくなりました
    。2016 からは ICFP Programming Contest も Rust で参戦しています。

- Haskell: まともな型システムが欲しくなったとき。Scala の型システムに絶望したと
  き。
- JavaScript: Web。
- Shell Script: シェル環境に直接作用するものや、zsh の Line Editor 用の function
  など。
- Emacs Lisp: 趣味と実益。

## 各プログラミング言語において、後世に残すべき価値のあるものはなんだと思いますか？ <a name="programming-language-values"></a>

- C++: Move Semantics, Zero-Overhead Principle, RAII, References, Template and
  Monomorphization
- Lisp: Macro, s-expression
- Haskell: Type System, Type Inference, Type Classes, algebraic data types,
  Pattern Matching
- OCaml: Type Inference, algebraic data types, Pattern Matching
- Scheme: Hygienic macros
- Rust: (後述)

## プログラミング言語がひとつだけしか選べないとしたら何を選びますか？ <a name="best-programming-language"></a>

Rust。

## Rust のよいところを教えてください。 <a name="rust"></a>

Rust は Move Semantics を言語デザインの中心にすることで、驚くほど多くの問題が統
一的に解決できるということを実用的に示した唯一の言語だと思います。

とくに C++ の良いところと危険なところを理解している人には、とてもオススメできる
プログラミング言語だと思います。逆にいうと、C++ への理解が足りない （というより
コンピュータの基礎がわかっていない）人にとっては、とても学習曲線が高いプログラミ
ング言語だと思います...。学習曲線が高いかわりに、いままでのプログラミング言語で
は放置されていた多くの問題が静的に解決できるので、見返りがとても大きいです。

- [Ownership], [Borrowing], [Lifetimes] の仕組み。メモリだけでなくネットワークコ
  ネクションなどのリソース管理全般に関するバグをコンパイル時に発見します。
- 安全性を重点をおきながら、同時に Zero-Cost Abstractions について妥協していませ
  ん。安全性のチェックはコンパイル時に解決済みなので、実行時に余分なオーバーヘッ
  ドはありません。C++ と同等に速いです。Zero-Cost Abstractions を追求しないと、
  C++ の置き換えにはなれないのでとても重要です。
- モダンなプログラミング言語なら当然あってほしい機能（[Pattern Matching],
  [Algebraic data type], [Traits] 等）をちゃんと備えています。Zero-Cost
  Abstraction を保ちつつ、十分に高い抽象化レベルでコードを安全に書けます。高い抽
  象度は高い生産性をもたらします。
- [Macro] や Compiler Plugins があります。Macro は
  [Hygienic macro](https://en.wikipedia.org/wiki/Hygienic_macro) です
  。identifier の衝突の心配はありません。
- vtable が必要になる Dynamic Dispatch よりも、Static Dispatch (Parametric
  Polymorphism) が推奨されています。正しい。
- コストがかかる処理を書くときはプログラマにちゃんと罪悪感を感じてもらうような
  API デザインが意図的に多く採用されています。未熟なプログラマが、知らないうちに
  効率の悪いコードを書くのを防ぐ教育的効果があります。
- C などの他のプログラミング言語との 相互呼び出し ([FFI]) が容易です。ランタイム
  レスですので、Rust で書いておけばすべてのプログラミング言語の資産になりえます
  。
- System Programming Language です。必要に応じて [unsafe] なコードを書けます。OS
  が書けます。
- Type System。あらゆるところに型をつけようという強い意志があります。そのため他
  のプログラミング言語ならランタイム時に行わざるをえないこともコンパイル時に解決
  ・最適化できます。
- コンパイラにしっかり守られている感覚が強いです。ただし unsafe な部分を書くとき
  は、「ここから先はコンパイラは助けてくれない。自分がしっかりしなくては...」と
  いう気分になれます。
- 十分に賢い型推論 （Lifetime のサポートがあるため 厳密には Hindley/Milner では
  ありません）。
- 他のプログラミング言語に備わっている定評のあるアイデアやパラダイムからインスパ
  イアされています。代表的なものとしては:

  - SML, OCaml: algebraic data types, pattern matching, type inference
  - C++: references, RAII, smart pointers, move semantics, monomorphization,
    memory model
  - Cyclone: region based memory management
  - Haskell: typeclasses
  - Scheme: hygienic macros

  などが挙げられます
  ([参考](https://doc.rust-lang.org/reference.html#appendix-influences))。これら
  は、100 人中 99 人が「これは間違いなくよいもの ☆」と思うであろう定評のある機能
  やパラダイムです。

  その一方、100 人中 40 人が「こんなのいらないです。お願いですからやめてください
  。」と思うであろう機能・パラダイム、たとえば

  - よく見かけるタイプのいわゆる Class と Class の継承をもとにした OOP (オブジェ
    クト指向プログラミング) [Java, Scala, C++, Python 等]
  - Function Overloading [C, C++, Java 等]
  - やめてほしい暗黙の型変換: int -> float など [C, C++, Java, Python
    等ほとんどのプログラミング言語]

  などについては「そんなのいりません。出直してきてくだい。」という感じで最初から
  入れる気がまったくないところが素敵です。

[ownership]: https://doc.rust-lang.org/book/ownership.html
[borrowing]: https://doc.rust-lang.org/book/references-and-borrowing.html
[lifetimes]: https://doc.rust-lang.org/book/lifetimes.html
[pattern matching]: https://doc.rust-lang.org/book/patterns.html
[algebraic data type]: https://doc.rust-lang.org/book/enums.html
[traits]: https://doc.rust-lang.org/book/traits.html
[macro]: https://doc.rust-lang.org/book/macros.html
[ffi]: https://doc.rust-lang.org/book/ffi.html
[unsafe]: https://doc.rust-lang.org/book/unsafe.html

## Rust って関数型プログラミング言語なんでしょ？ 難しそう。 <a name="rust-is-functional-programming"></a>

Rust はあえていうなら「型クラス指向 (Type Class Oriented )」「Move Semantics
Oriented」のプログラミング言語です。

Rust のことを関数型プログラミング言語と呼んでいる人がいたら、その人は Rust のこ
とも関数型プログラミングのこともどちらもわかっていない可能性が高いです。「これは
◯◯ 指向だ」「いや ◯◯ 型言語だ」のような抽象的な議論はあまり生産的ではないので、
個々の具体的な特徴についてその背景・意義・有用性についてきちんと学んだほうが生産
的です。

## Rust って学習コストが高いんですよね？ 難しそう。 <a name="rust-is-hard"></a>

Rust は学習コストが高いプログラミング言語と思われていますが、そもそも（ある程度
大規模な）「プログラムを正しく」書くこと自体が普通の人間には相当難しいことです。
これまでの学習コストが低いとされているプログラミング言語は、最初のほうだけ「（な
んとなく）動いている」プログラムを書くのを助けてくれるだけであり、「正しいプログ
ラム」を書くことについては何も助けてくれず放置プレイです。最終的にユーザーにすべ
ての責任・負担がかかります。

Rust は「正しいプログラム」を人間が書くまできちんと指摘してくるので学習コストが
高くなってしまいますが、それらはいずれは何らかの形で身につけなければいけないこと
なのでむしろありがたいことです。これまではユーザーが担っていた責任の一部を、「コ
ンパイラに押し付ける」ことができます。

Rust は「学習コストが高い」言語というよりは「プログラミングの学習コストを可視化
してくれる」言語といったほうがいいかもしれません。これまで「雰囲気でプログラミン
グ」してきた人にとって Rust の学習コストが高く感じるのは、きちんと可視化がうまく
いっている結果です。

## ICFP Programming Contest には何を使用して参加してますか？ <a name="icfpc"></a>

[ICFP Programming Contest](http://www.icfpconference.org/contest.html)。 2009 -
2015 は Scala で、2016, 2017 は Rust で参加しました。

- [2009](http://www.ittc.ku.edu/icfp-contest/):

  Scala で参加。

  シャトルを操縦してスペースデブリを回収するプログラムをつくる問題。コードは VM
  上で動きます。VM も仕様が与えられるので、最初に自分で書きます。惑星の重力をう
  まく利用していかにシャトルの燃料消費を抑えるかとうがポイントだった気が。

- [2010](http://www2010.icfpcontest.org/2010/task/)

  Scala で参加。

  車とそれを動かすための燃料を設計する問題。最初に謎の 3 進数データを解析しない
  といけないのが大変。

- [2011](http://icfpc2011.blogspot.jp/2011/06/task-description-contest-starts-now.html)

  Scala で参加。

  「Magic the Gathering」 からインスパイアされた（であろう） 「Lamda: the
  Gathering」という対戦型カードゲームの AI をつくる問題。基本カードとして SKI
  Combinator などが与えられるので、それらを上手く組み合わせて強いカード(スロット
  )をつくる必要があります。

- [2012](https://icfpcontest2012.wordpress.com/)

  Scala で参加。[Code](https://gist.github.com/hayatoito/3123427)
  ([感想](https://plus.google.com/+HayatoIto/posts/JvydCvGrpAz))

  [バルダーダッシュ](https://www.google.co.jp/search?q=%E3%83%90%E3%83%AB%E3%83%80%E3%83%BC%E3%83%80%E3%83%83%E3%82%B7%E3%83%A5)
  （のような）問題の AI をつくる問題。

- [2013](http://icfpc2013.cloudapp.net/)

  Scala で参加。 [Code](https://github.com/hayatoito/icfpc2013-kirakira/)

  入力と出力が与えられるので、それを満たすプログラム（式）を生成するプログラムを
  つくる問題。

- [2014](https://web.archive.org/web/20140728102535/http://icfpcontest.org/specification.html)
  (archive)

  Scala で参加。

  パックマンの AI をつくる問題。パックマン側とゴースト側の両方をつくる必要があり
  ます。ただし GHost CPU (GHC) という仮想的な CPU （非常に限られたローレベルの命
  令セットしかサポートしていない）上で動かす必要があります。直接 GHC Program を
  書くのは普通の人間には困難ですので、AI 自体はハイレベルな言語で書くようにして
  、それを GHC Program に変換するコンパイラ等を自力で書くといった方針でないと、
  強い AI を書くのは実質不可能です。 Lisp っぽい言語を自分でつくって、それを GHC
  Program にコンパイルしている人が多かった気が。

- [2015](http://2015.icfpcontest.org/)

  Scala で参加。 [Code](https://github.com/hayatoito/icfpc2015/)
  ([感想](https://plus.google.com/+HayatoIto/posts/5xzjW21xGQU))

  六角形のマスをつかったテトリスの AI をつくる問題。

- [2016](http://icfpc2016.blogspot.jp/2016/08/task-description.html)

  Rust で参加。 [Repository](https://github.com/hayatoito/icfpc2016-origami/)

  入力としてすでに折った後の折り紙の形が与えられます。折り方を見つけてくださいと
  いう問題。

- [2017](https://icfpcontest2017.github.io/)

  2 年連続 Rust で参加。
  [Repository](https://github.com/hayatoito/icfp2017)。[Visualizer](https://cdn.rawgit.com/hayatoito/icfp2017/6cb4a567/visualizer/index.html)。[感想(別記事)](../icfp-rust/)。

  Undirected-Graph の Edge をターン制でとっていく n 人 Game。いくつかのノードは
  ラムダになっていて、ラムダから到達できる Node ごとにスコアが d \* d 点加算。た
  だし、距離 d は取っていないすべての Edge を使用して計算します。

## Scala から Rust に変えてよかったところは何ですか？ <a name="rust-vs-scala"></a>

- TODO: 書きます。 (-> draft/faq.md)

## Go は使用しないのですか？ <a name="go"></a>

- TODO: 書きます。 (-> draft/faq.md)

## 動的言語しか使用したことがありません。静的言語も勉強したほうがよいですか? <a name="dynamic-programming-language-is-dead"></a>

これもよく聞かれる質問です。自分で考えましょう。問題解決にあたって最適な道具を選
択するのも、ソフトウェアエンジニアにとって大事なスキルのひとつです。

以下は私の（まとまっていない）意見です。

動的言語の「動的」性がどうしても必要になるプログラムというのは 1%もないのですが
、実際はそれ以上の割合で動的言語が使用されています。

人類が静的型チェックなしの動的スクリプト言語に費やしたこの 20 年くらいは、将来黒
歴史として語り継がれるかもしれません。「原理的に遅い」けれど「コンピュータの速度
は毎年速くなるから大丈夫！」といった「言い訳」のセリフも今となっては、通用しなく
なってしまいました。ムーアの法則も崩壊して、実在する動的言語技術を用いて実用的な
ブラウザや OS が書ける見込みはほぼゼロです。

正しくコンピュータの知識を身につけて「無駄なく」利用するという「いわれてみれば当
たり前」のことが今後より重要視されるようになるでしょう。なんてことはない、もとの
正常な状態に戻っただけです。

「コンパイラ」技術や「ゼロコスト抽象化」といった技術は今後その価値が増す一方、そ
れ以外の「コストが高い抽象化」の価値はどんどん失われていくことでしょう。

「（速度はともかく）小規模なスクリプトだと静的言語より動的言語のほうが生産性が高
いんです！」という主張も個人の限られた経験に基づくものがほとんどでたいていの場合
疑ったほうがよいです。この主張をする人で、そもそもモダンな型システムをもっている
安全で生産性の高いプログラミング言語の習得に、動的言語と同じくらいの時間を投資し
たことのある人はほとんどいないです。

生産性についてちゃんとした議論をするためには、「静的言語」と「動的言語」というあ
いまいな言葉を使わないで、より具体的な個々のプログラミング言語にきちんと向き合う
べきです。

いちサンプルとして、私は Python は 10 年以上、Rust は 2 年弱ほど使用していますが
、小規模な使い捨て「スクリプト」を書くときもすでに私はほとんどのユースケースにお
いて Rust で書くほうが生産性が上になっています。

ひとつの価値観にとらわれることなく、実際に自分で触れて経験して発見することはとて
も大事です。

## 使い捨てのスクリプト等でも Rust を使うって面倒じゃないですか？ <a name="rust-as-scripting"></a>

そう思っていた時期がありました。しかし、Rust は `<crate_root>/src/bin` 以下に
`*.rs` ファイルをおいておくだけで、それぞれの `*.rs` をビルドして別の実行ファイ
ルをつくってくれます。たとえば my-hello-world "スクリプト" を書きたいと思ったら
`<crate_root>/src/bin/my-hello-world.rs` においておけば開発中は:

```shell
% cargo run --bin my-hello-world [args...]
```

ですぐにテスト実行できます。 `<crate_root>/target/release` に PATH を通しておけ
ば

```shell
% cargo build --release
```

と必要に応じてまとめてビルドしておくだけで、普段は

```shell
% my-hello-world
```

で普通に呼び出せるので完全にスクリプト感覚で使用できます。
`<crate_root>/src/bin` の仕組みがなかったら、普段使いの"スクリプト"言語として
Python を Rust で置き換えようとはきっと思わなかったでしょう。

## 初心者にプログラミングを教えるとき「変数は箱」は変ですか？ <a name="variable-is-not-box"></a>

やめましょう。その例えは表現力に乏しく、ほとんどのケースにおいて不適切ですぐに破
綻します。混乱の元です。

オススメは最初からメモリをきちんと意識してもらうこと、これが一番の近道です。

慣れないうちは、以下のようにメモリー上の「表」を自分で書いてみるのがよいです。大
事なのは、それぞれの変数に対して address と value の「両方」を最初から意識するこ
とです。

```
address  variable  value
10:       mut a      0 (u8)
11:       mut b      1 (u8)
12:       mut a1    10 (&mut u8)
13:           a2    12 (&mut &mut u8)
```

慣れてくると、コードを見るだけでこのような「表」が自然と頭の中で構築されるように
なるでしょう。関数呼び出しの際も「値渡し」「参照渡し」という曖昧な言葉を使うのは
できるだけ避けて、最初からメモリ（スタック）を意識して理解するようにすれば、覚え
なければいけない「ルール」はぐっと減ります。

例えば以下のような、Rust のコードの場合:

```rust
let mut a: u8 = 0;
let mut b = 1;
{
    let mut a1 = &mut a;
    assert_eq!(*a1, 0);
    {
        let a2 = &mut a1;
        assert_eq!(**a2, 0);
        **a2 = 2;
        assert_eq!(**a2, 2);
        *a2 = &mut b;
        assert_eq!(**a2, 1);

    }
    assert_eq!(*a1, 1);
    *a1 = 3;
    assert_eq!(*a1, 3);
}
assert_eq!(a, 2);
assert_eq!(b, 3);
```

以下のようになります。変数の型はほとんどの場合省略できますがここではあえて書いて
います。

```rust
let mut a: u8 = 0;
let mut b: u8 = 1;

// address  variable  value
// 10:       mut a      0 (u8)
// 11:       mut b      1 (u8)

{
    let mut a1: &mut u8 = &mut a;

    // address  variable  value
    // 10:       mut a      0 (u8)
    // 11:       mut b      1 (u8)
    // 12:       mut a1    10 (&mut u8)

    assert_eq!(*a1, 0);
    {
        let a2: &mut &mut u8 = &mut a1;

        // address  variable  value
        // 10:       mut a      0 (u8)
        // 11:       mut b      1 (u8)
        // 12:       mut a1    10 (&mut u8)
        // 13:           a2    12 (&mut &mut u8)

        assert_eq!(**a2, 0);

        **a2 = 2;

        // address  variable  value
        // 10:       mut a      2 (u8)
        // 11:       mut b      1 (u8)
        // 12:       mut a1    10 (&mut u8)
        // 13:           a2    12 (&mut &mut u8)

        assert_eq!(**a2, 2);

        *a2 = &mut b;

        // address  variable  value
        // 10:       mut a      2 (u8)
        // 11:       mut b      1 (u8)
        // 12:       mut a1    11 (&mut u8)
        // 13:           a2    12 (&mut &mut u8)

        assert_eq!(**a2, 1);
    }

    // address  variable  value
    // 10:       mut a      2 (u8)
    // 11:       mut b      1 (u8)
    // 12:       mut a1    11 (&mut u8)

    assert_eq!(*a1, 1);
    *a1 = 3;

    // address  variable  value
    // 10:       mut a      2 (u8)
    // 11:       mut b      3 (u8)
    // 12:       mut a1    11 (&mut u8)

    assert_eq!(*a1, 3);
}

// address  variable  value
// 10:       mut a      2 (u8)
// 11:       mut b      3 (u8)

assert_eq!(a, 2);
assert_eq!(b, 3);
```

- address の値はここでは適当です。他と区別するのに必要十分であれば OK です。
- 上の表の `u8`, `&mut u8` など各変数の型や型のサイズも意識するとよいです。上の
  例でいえば、`u8` は 1 byte、`&mut u8` などの 「ポインタ」 は 64bit
  architecture だと 8 bytes です。address の「間隔」も本来であれば型のサイズで調
  整します。
- 実際はスタックに加えてヒープも意識する必要があります。例えば Java だと
  Primitive Type 以外はヒープにアロケートされます。常にヒープの表とスタックの表
  の両方を（最初のうちは）書くようにしましょう。

この FAQ エントリは、何度も同じ説明をホワイトボードに書くのがつらくなったため参
照してもらうために書きました。

Todo: ヒープの例を追加。

_「プログラミングとはメモリの Syntax Sugar である。」_

# 開発環境 <a name="dev-env"></a>

## キーボードは何を使用していますか？ <a name="keyboard"></a>

[Sculpt Ergonomic Keyboard for Business](https://www.microsoft.com/accessories/en-us/business/sculpt-ergonomic-keyboard-for-business/5kv-00001)。

このキーボード（US 配列版）は残念ながら日本では販売していません。

## おすすめのエディタは？ <a name="recommended-editor"></a>

ないです。

## エディタは何を使用してますか？ <a name="editor"></a>

（Scala 以外は） Emacs。C++ は Eclipse CDT も使用します。

---

ちなみに観測範囲においては Google のソフトウェアエンジニアは (Java や
Objective-C を書く人を除くと）Emacs を使う人がほとんどです。Emacs ユーザーの割合
は 80% を超えると思います。

## Emacs で使用しているパッケージは？ <a name="emacs"></a>

使用している e-lisp library をひとつひとつ挙げるのはとても難しいです...。 Emacs
に標準で付属していない・自分でインストールしたパッケージなら、リストにするのは簡
単にできます。以下の通りです。

★ が付いているのは、特定の言語用の Major Mode ではなく、汎用的に使用する・オスス
メできるものです。

- ace-window
- avy
- back-button
- bind-key
- c-eldoc
- company ★
- company-jedi
- company-statistics
- company-tern
- company-web
- counsel ★
- easy-repeat
- epc
- exec-path-from-shell
- expand-region
- flycheck ★
- ggtags
- git-gutter+
- haskell-mode
- htmlize
- imenu-anywhere
- ivy ★
- jedi-core
- jinja2-mode
- js2-mode,
- magit ★
- markdown-mode
- multiple-cursors ★
- racer
- rainbow-delimiters
- rtags
- rust-mode
- scala-mode2
- smart-mode-line
- swiper ★
- term+
- tern
- undo-tree
- visual-regexp
- web-mode
- wgrep ★
- which-key
- yaml-mode
- yasnippet

## Emacs の設定ファイルが 1 万行くらいあると聞いたのですがほんとうですか？ <a name="emacs-el"></a>

一時期そういう噂が流れましたが、いまはぐっと減っていると思います。安心してくださ
い。

`<2016-12-15 Thu>` 数えてみたところ、たったの 5,000 行でした。

```shell
% wc emacs/*.el
     330    1412   17854 emacs/custom.el
     471    1166   13912 emacs/emacs.el
      17      52     459 emacs/my-ace-window.el
      74     316    3137 emacs/my-ansi-color.el
      25      72     869 emacs/my-auto-insert.el
      32      84    1142 emacs/my-back-button.el
      34     121    1224 emacs/my-bookmark.el
      21      42     505 emacs/my-browse-url.el
      59     130    1673 emacs/my-cc.el
     193     521    7040 emacs/my-chrome.el
      52     131    1713 emacs/my-clipboard-sync.el
     113     236    3419 emacs/my-company.el
      67     170    2546 emacs/my-compile.el
     129     372    4947 emacs/my-counsel.el
      41     124    1275 emacs/my-dabbrev.el
      65     196    2568 emacs/my-dir-locals.el
      99     247    2993 emacs/my-dired.el
      17      46     482 emacs/my-dumb-jump.el
      20      30     430 emacs/my-easy-repeat.el
      56     153    2002 emacs/my-ediff.el
      84     218    2548 emacs/my-emacs-lisp.el
      23      53     786 emacs/my-exec-path-from-shell.el
       7      12     131 emacs/my-expand-region.el
      60     157    2160 emacs/my-filecache.el
      36      78    1115 emacs/my-flycheck.el
     105     283    3366 emacs/my-frame.el
       7      12     115 emacs/my-ggtags.el
      13      26     272 emacs/my-go.el
      42     101    1127 emacs/my-google3.el
      12      19     221 emacs/my-haskell.el
      69     163    2038 emacs/my-helm.el
      36      96     896 emacs/my-hydra.el
      29      80     876 emacs/my-imenu-anywhere.el
      38      84     893 emacs/my-init.el
      60     169    1878 emacs/my-ivy.el
      64     185    1796 emacs/my-js2.el
     102     269    3181 emacs/my-kings-viking.el
      14      45     460 emacs/my-linux.el
      27      84     717 emacs/my-mac-ns.el
      16      42     514 emacs/my-mac.el
      47      95    1195 emacs/my-magit.el
      26      69     708 emacs/my-markdown.el
     331     971   10738 emacs/my-memo.el
      89     245    3007 emacs/my-nxml.el
     267     777    9537 emacs/my-org.el
      19      34     370 emacs/my-outline.el
     155     424    5922 emacs/my-perspective.el
      13      34     352 emacs/my-platform.el
      52     117    1322 emacs/my-python.el
      24      41     532 emacs/my-rescue.el
     164     516    5842 emacs/my-rtags.el
     120     313    3926 emacs/my-rust.el
      81     223    2769 emacs/my-scala.el
      27      55     500 emacs/my-scratch.el
      44     130    1400 emacs/my-shackle.el
      27      65     933 emacs/my-smart-mode-line.el
       6      11     118 emacs/my-smartparens.el
      54     133    1657 emacs/my-swiper.el
      76     257    2300 emacs/my-term.el
      19      54     656 emacs/my-undo-tree.el
     476    1197   15433 emacs/my-util.el
     106     300    3727 emacs/my-web.el
      17      31     419 emacs/my-wgrep.el
     151     480    6780 emacs/my-workaround.el
      54     116    1480 emacs/my-xterm-color.el
      34      73     895 emacs/my-yasnippet.el
    5238   14558  177798 total
```

## Emacs の設定ファイルを公開する予定はありますか？ <a name="emacs-el-publish"></a>

ありません。

## Python の開発環境は? <a name="python-dev"></a>

- Emacs (python-mode, jedi-mode, company-mode, flycheck, flycheck-mypy)
- mypy, ipython, pyenv, flake8

## HTML / CSS / JavaScript の開発環境は? <a name="web-dev"></a>

- Emacs (web-mode, nxml-mode, js2-mode, tern-mode, flycheck)
- babel, eslint, csslint, tidy-html5

## C++ の開発環境は? <a name="cpp-dev"></a>

- Emacs (cc-mode, [rtags](https://github.com/Andersbakken/rtags),
  flycheck-rtags, company-rtags)

  rtags はとてもオススメです。

  ビルドツールである ninja や CMake は
  [JSON Compilation Database Format Specification](http://clang.llvm.org/docs/JSONCompilationDatabase.html)
  を出力できます。 rtags はこの情報をもとにコードを解析するので、シンボル・ジャ
  ンプや補完がほぼ正確です。私も実際に Blink の開発で使用しています。

- [Eclipse CDT](https://eclipse.org/cdt/)

  なぜかあまり有名でないけれど、Eclipse CDT も相当便利です。巨大なレポジトリに対
  して使用するにはちょっとしたコツがいるのですけど、 Mozilla のドキュメント
  ([Eclipse CDT](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Eclipse/Eclipse_CDT))
  や、 Chromium のドキュメント
  ([Linux Eclipse Dev](https://chromium.googlesource.com/chromium/src/+/lkcr/docs/linux_eclipse_dev.md))
  が参考になるかもです。

- Build: [waf](https://waf.io/) / make /
  [gn](https://chromium.googlesource.com/chromium/src/tools/gn/) +
  [ninja](https://ninja-build.org/)

## Rust の開発環境は? <a name="rust-dev"></a>

- Emacs (rust-mode, [racer](https://github.com/phildawes/racer), flycheck,
  company-mode)
- [rustup](https://github.com/rust-lang-nursery/rustup.rs)

## Scala の開発環境は? <a name="scala-dev"></a>

- sbt
- Eclipse ([Scala IDE](http://scala-ide.org/)) (+
  [Emacs+ Eclipse plugin](http://www.mulgasoft.com/))

## メモ はどのようにとってますか？ <a name="memo"></a>

Emacs + org-mode (アウトラインエディタとして) + org-babel (コード実行できるメモ
環境として)。

アウトラインエディタはとても重要です。Todo やメモなどはすべて アウトラインエディ
タ ( Emacs + org-mode ) で管理しています。

# オススメの本や勉強方法 <a name="study"></a>

基本的に人にオススメとかはしないです。自分で見つけましょう。

以下は単なる私の感想です。

## オススメの本は？ <a name="book"></a>

- [SICP: Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sicp/):
  ★★★★★★★

  名著です。カバーする範囲はとても多岐に渡ります。大好きな本です。

- [Introduction to the Theory of Computation](http://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/1133187811/):
  ★★★★★

  実用性はあまりないのかもしれませんが、とても面白いです。「計算するとはいったい
  どういうことか？」ということを、「証明の力」で鮮やかに切っていきます。私はこの
  手の本を読むのがわりと好きだったりします。

- [Concreate Mathematics](http://www.amazon.com/Concrete-Mathematics-Foundation-Computer-Science/dp/0201558025):
  ★★★★

  Knuth 先生の隠れた名著。離散数学楽しいです。

- [The C++ Programming Language, 4th Edition](http://www.amazon.com/C-Programming-Language-Bjarne-Stroustrup-ebook/dp/B00DUW4BMS/):
  ★★★★

  C++ 11 に関しての知識が足りないな―と思って読んだ本です。なんといっても、著者は
  、C++ の作者である Stroustrup さんです。古い仕様にとらわれず、最初から C++ 11
  の機能をきっちり使っていきます。最初のほうはチュートリアル形式で解説していくの
  で、C++ の初学書にも実はよいのかもしれません。そのあまりのボリュームのためぜん
  ぶ読むのは大変なのですが、C++ 好きなら読むのを苦痛に感じることはなく楽しく読め
  ると思います。

- [Effective Modern C++](https://www.amazon.com/dp/B00PGCMGDQ/): ★★

  （Effective C++ と比較した場合）ちょっと重箱の隅をつつきすぎ、という感想をもっ
  てはいけないのかもしれませんが、ちょっと蛇足が多いかなーと。

- [Programming Rust](http://shop.oreilly.com/product/0636920040385.do): TODO

- [The Design and Evolution of C++](http://www.amazon.com/gp/product/0201543303):
  ★★★★

  これも Stroustrup さんの本です。技術書というより歴史的な読み物です。C++ 使いな
  ら、涙なしでは読むことのできないノン・フィクションです。とても共感できます。

- [API Design for C++](http://www.amazon.com/API-Design-C-Martin-Reddy-ebook/dp/B004NNUZ6O/):
  ★★

  楽しみにしていたものの、わりと当たり前のことしか書いてなかった気がします。その
  ため、ほとんど内容を覚えていないです...。ごめんなさい。

- [Code Complete (Developer Best Practices)](http://www.amazon.com/Code-Complete-Developer-Best-Practices-ebook/dp/B00JDMPOSY/):
  ★★★

  これも当たり前のことしか書いてなかった気がします。そのため、あまり印象にのこっ
  ていないです...。当たり前のことを当たり前に身につけるにはとてもいいショートカ
  ットになるのかも。

- [Programming in Scala: A Comprehensive Step-by-Step Guide](http://www.amazon.com/Programming-Scala-Comprehensive-Step---Step-ebook/dp/B004Z1FTXS/):
  ★★★★

  Scala をはじめたときに一通りの知識を身につけるため読みました。

- [Hacking: The Art of the Exploitation](http://www.amazon.com/Hacking-Art-Exploitation-ebook/dp/B004OEJN3I/)
  ★★★★

  ハッキングは芸術です。「こんな本、他に誰が読むんだろう」と思っていたら、意外に
  Amazon.com などでの順位が高くて、びっくりした覚えがあります...。前半部分がとて
  もよいです。特に 3 章。1 章、2 章でつくったプログラムには実は脆弱性があって、3
  章ではそこをついて、特権を奪っていく過程がとてもエキサイティングです。

- [Types and Programming Languages](http://www.amazon.com/Types-Programming-Languages-Benjamin-Pierce-ebook/dp/B00AJXZ5JE/):
  ★★★★★

  型理論は、コンピュータ・サイエンスの中でも理論が実際にとても役立っている貴重な
  分野のひとつだと思います。 TAPL では OCaml が使用されていますが、自分の好きな
  言語ですべての演習をやってみるというのもありだと思います。私は以下の章は OCaml
  ではなく [Rust で実装](https://github.com/hayatoito/tapl-in-rust)しました。

  - chapter 4: An ML Implementation of Arithmetic Expressions
  - chapter 7: An ML Implementation of the Lambda-Calculus
  - chapter 10: An ML Implementation of Simple Types
  - chapter 17: An ML Implementation of Subtyping
  - chapter 25: An ML Implementation of System F

- [Functional Programming in Scala](http://www.amazon.com/Functional-Programming-Scala-Paul-Chiusano/dp/1617290653/):
  ★★★★

  「関数型プログラミングとは！」とは頭の中で理解するものではなく体得するものです
  。この本はまさにそれに応えてくれます。前半、いろいろなものを自作させられます。
  そして、後半で、「ほーら、いままで作ってきたものは、全部、同じような類似点があ
  ったでしょ。それが、モ・ナ・ド ♡」と優しく教えてくれます。

- TODO: 追加する

## Coursera や Udacity でのおすすめの オンラインのコースは？ <a name="course"></a>

- [Intro to Artificial Intelligence](https://www.udacity.com/course/intro-to-artificial-intelligence--cs271):
  ★

  [感想](https://plus.google.com/+HayatoIto/posts/GxdKuvVsN5E)

- [Compilers](https://www.coursera.org/course/compilers): ★★★★

  COOL という Mini Object Oriented Language のコンパイラをつくるコースです。一度
  もコンパイラをつくったことがないのなら、とても楽しいと思います。

- [Discreate Optimization](https://www.coursera.org/course/optimization): ★★★

  離散最適化に関する数々の理論とテクニックを学べます。なんといっても、講師の先生
  がノリノリです。

- TODO: 他のコースを追加。

## Python のオススメの勉強方法は? <a name="python-study"></a>

- [The Python Tutorial](https://docs.python.org/3/tutorial/) : ★★★★★

  Python は公式のチュートリアルがとてもよいので、これだけ読めば最初は十分です。

## Haskell のオススメの勉強方法は? <a name="haskell-study"></a>

- [Learn You a Haskell for Great Good!](http://learnyouahaskell.com/): ★★★★★

  最初は圧倒的にこれがオススメです。Haskell そのものは学ぶつもりはないけれど、「
  関数型プログラミングの考え方」だけはきちんと理解したいという人にもよいかもしれ
  ません。

## Scala のオススメの勉強方法は? <a name="scala-study"></a>

- TODO: 書きます。

## Rust のオススメの勉強方法は? <a name="rust-study"></a>

- TODO: 落ち着いたら書きます。

# ソフトウェア・エンジニアリング <a name="software-engineering"></a>

## XXX を Google では行っていますか？ <a name="xxx-at-google"></a>

- テスト駆動開発: 「テスト駆動開発」という言葉が普段の会話にでてくることはありま
  せん。テストを書くのは当たり前のことですが、わざわざ「テスト駆動開発」のような
  大袈裟な言い方はしません。
- ペアプログラミング: している人ほぼいません。XP(eXtreme Programming)とかペアプ
  ログラミングとかはまったく流行ることなく見事に死んでいった印象しかありません。
  忘れましょう。
- コードレビュー: しています。必須です。
- オブジェクト指向: 「オブジェクト指向」というい言葉が会話にでてくることはまずあ
  りません。「ここはオブジェクト指向っぽくない」のようなレビューコメントは見たこ
  とないです。レビューではもっと具体的に指摘します。
- LGTM 画像: レビューで LGTM は使っていますが、LGTM を出すときに LGTM 画像を貼る
  ような人はいません。そこに遊び心はいらないです。
- [みんなヨガ・瞑想をしている](http://diamond.jp/articles/-/91707): してません。
- PM (Product Manager): PM がいないチームで結果を出しているチームは多くあります
  。PM なしでうまくいくに越したことはありません。PM が必要になるケースはもちろん
  あります。
- バランスボールに座っている: 座っていません。
- [グーグル社員はなぜメールを使わないのか](https://dot.asahi.com/dol/2017062600061.html):
  使います。

# その他 <a name="misc"></a>

## タイトルの「六本木ではたらく」とかあたま悪そうなのでやめたほうがいいです。<a name="roppongi"></a>

ほんとそう思います。気にしているんですからそこは触れないでください。ほんとすいま
せん。とある事情で...。
