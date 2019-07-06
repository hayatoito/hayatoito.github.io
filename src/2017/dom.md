<!--
title: "ブラウザのしくみ: データ構造とアルゴリズムと雰囲気で理解する DOM と Shadow DOM"
date: 2017-12-24
toc: true
-->

この記事は
[Chromium Browser アドベントカレンダー](https://qiita.com/advent-calendar/2017/chromium)
24 日目の記事です。

内容の一部は Chromium の Git レポジトリの
[renderer/core/dom](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/dom/)
フォルダの
[README ファイル](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/dom/README.md)
（英語）が元になっています。README の想定読者は Chrome の開発者でしたが、この記
事の想定読者は一般の Web 開発者です。この記事の一部は README ファイルに還元（バ
ックポート）する予定です。

この記事は詳細な API の使用方法などには深入りしません。雰囲気で理解するのを目的
としています。記事には読者への課題がいくつか含まれていますが雰囲気で理解するにあ
たって必須ではありません。

課題への解答・記事へのフィードバック・Typo などを発見しましたら
[GitHub Issue](https://github.com/hayatoito/hayatoito.github.io/issues) の方へお
願いします。

更新:

- [2019-07-06 Sat]: Link が切れていた URL を修正
  ([issue #23](https://github.com/hayatoito/hayatoito.github.io/issues/23))

# DOM

DOM は Web の基本です。いってみれば Web を構成する原子のようなものです。

![dom](./dom.svg)

個々の DOM オブジェクトは一般にノード (Node) と呼ばれます。たとえばみなさんが今
現在見ているこの記事に対して、ブラウザは約 700 個の DOM ノードを生成します。大規
模な Web サイトはより多くのノードから構成されています。例えば
[YouTube](https://www.youtube.com/) のトップページは現在 約 3,000 個のノードから
構成されています。

![many dom](./many-dom.svg)

各 Web サイトが何個のノードからできているのかを確認するには
[querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll)
などの API が使用できます。ブラウザの
[DevTools Console](https://developers.google.com/web/tools/chrome-devtools/console/)
上で以下のコードを貼り付けて実行してみましょう。ノードが何個あるかわかります。

```javascript
console.log(document.querySelectorAll('*').length);
```

<div class="article-info">
注意: 正確にはこの方法ではすべてのノードが取得できません。ブラウザ内には「隠れた」DOM が存在します。後ほど説明します。
</div>

DOM はばらばらに存在していません。ブラウザ内部ではノードは木構造 (ツリー: Tree)
を構成します。DOM ノードから構成される木のことをノードツリー (Node Tree) と呼び
ます。

![node tree](./node-tree.svg)

## 例: HTML とノードツリー

たとえば以下のような HTML

```html
<html>
  <head>
    <link style="hello.css" />
  </head>
  <body>
    <div>hello</div>
    <p>world</p>
  </body>
</html>
```

を読み込んだ結果、ブラウザは以下のようなノードツリーを内部に構築します。

![node tree example](./node-tree-example.svg)

# Chrome におけるノードツリーの実装

ツリー ([Tree](<https://en.wikipedia.org/wiki/Tree_(data_structure)>)) はコンピ
ュータサイエンスにおいて頻出するデータ構造です。ツリーをどのように実装するかは状
況によって異なります。例えば:

- 子ノードから親ノードへは辿る必要がないため、親ノードへのポインタはもたない
- 親ノードにはすべての子ノードへのポインタを持たせる

などの選択肢があるでしょう。

Chrome のノードツリーの実装は以下のようになっています。

1\. 各ノードは親ノードへのポインタ `parent` をもっています。

![parent](./parent.svg)

2\. 各ノードはすべての子ノードへのポインタはもっていません。もっているのは 2 つ
だけ、`firstChild` (最初の子供)・ `lastChild` (最後の子供）へのポインタをもって
います。

![firstChild and lastChild](./first-child.svg)

3\. その代わり各ノードは兄弟 (Sibling) ノードへのポインタ `previous` と `next`
をもっています。つまり兄弟ノードは Linked List (連結リスト）として実装されていま
す。

![next sibling and previous sibling](./next-sibling.svg)

合計すると各ノードには 5 つ (`parent`, `firstChild`, `lastChild`, `previous`,
`next`) のポインタがあります。

このツリーの表現により Web で標準で利用できる多くの DOM API は定数時間 O(1) で実
装が可能です。

<div class="article-danger">
<p>
課題 1: あなたが Chrome の開発者になったとしましょう。以下の DOM を操作する API:
</p>
<ul>
<li><a href=https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append>ParentNode.append(node)</a>: node を parentNode の lastChild として追加
<li><a href=https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before>ChildNode.before(node)</a>: node を childNode の前 (previous として) に挿入
<li><a href=https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove>ChildNode.remove()</a>: node を Tree から削除
</ul>
<p>
をそれぞれどのように実装しますか？ どのノードのどのポインタの更新が必要になるでしょうか？ それぞれの API の動作はリンク先の MDN のドキュメントを参照してください。
</p>
<p>
ここでは実際に実装する必要はありません。擬似コードで十分です。
</p>
</div>

<div class="article-danger">
課題 2: 以下の JavaScript の関数 <code>countNodes</code> は「手作業」でノードツリーをトラバースしてツリーに含まれるノードの個数を数えます。
ツリーに含まれるノード数を N とした場合、<code>countNodes(document)</code> は実行時間が O(N)ではなく O(N^2) 時間がかかる可能性があります。それはなぜでしょうか？
<a href=https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes>Node.childNodes</a> の動作についてはリンク先の <a href=https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes>MDN</a> のドキュメントを参照してください。
</div>

```javascript
function countNodes(node) {
  let count = 0;
  for (let i = 0; i < node.childNodes.length; ++i) {
    ++count;
    const child = node.childNodes[i];
    count += countNodes(child);
  }
  return count;
}

console.log(countNodes(document));
```

<div class="article-danger">
課題 3: <code>countNodes(document)</code> の結果、得られるノード数は <code>querySelectorAll('*').length</code> で得られる結果と同じでしょうか？ もし大きな違いがあるならそれはなぜでしょうか？ （注: これは少し意地悪な問題です。思いつかないときは飛ばしてかまいません）
</div>

<div class="article-danger">
課題 4: あなたが Chrome の開発者になったとしましょう。<a href=https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes>Node.childNodes</a> をどのように実装しますか？思いついた実装のメリットとデメリットをそれぞれあげてください。特にメモリ消費量への影響について考えてみましょう。
</div>

<div class="article-danger">
課題 5: <code>countNodes()</code> を改良しましょう。<code>node.childNodes</code> を使用することなく「確実に」実行時間 O(N) でツリーをトラバースする関数に修正してください。
必要に応じて <a href=https://developer.mozilla.org/en-US/docs/Web/API/Node/>Node の Web API</a> を参照してください。
</div>

<div class="article-danger">
課題 6: 再帰を使用しないでノード数を手作業でカウントする関数を JavaScript で書いてください。
</div>

<div class="article-info">
<p><b>この記事を読むかもしれない Chrome 開発者へ</b></p>
Blink 内部では C++ でこのように手作業でツリーをトラバースする必要はありません。Source/core/dom 内の NodeTraversal, ElementTraversal に用意されている抽象化された C++11 の Range-Based for loop を使用しましょう。
手作業でツリーをトラバースする場合と比較して余分なオーバーヘッドはありません（ゼロコスト抽象化）。
詳しくは、<a href="https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/dom/README.md#c_11-range_based-for-loops-for-traversing-a-tree">README 内の説明</a>、
またはこの <a href="https://codereview.chromium.org/642973003">CL</a> の Description を参照してください。
</div>

<div class="article-info">
<p><b>Microsoft Edge について</b></p>
今日のほとんどのモダンブラウザでは DOM はブラウザ内部ではツリーで表現されます。
しかし Microsoft Edge はそうではありませんでした。Edge は歴史的な理由により Microsoft Word などのいわゆるドキュメントビューアで採用されることの多いデータ構造を採用していました。
このデータ構造では近年の DOM の進化、特に Shadow DOM に対応することが難しく、Edge はそのためここ数年大幅なアーキテクチャの変更に取り組んでいました。
詳しくは <a href="https://blogs.windows.com/msedgedev/2017/04/19/modernizing-dom-tree-microsoft-edge/">Modernizing the DOM tree in Microsoft Edge</a> を御覧ください。
</div>

# Hash Map (ハッシュマップ: 連想配列)

ブラウザはユーザーからのクエリに素早く答えるためツリーに関するさまざまな「情報」
を別途もっています。

たとえば
[getElementById()](https://dom.spec.whatwg.org/#interface-nonelementparentnode)
は指定された id を持つノード（正確にはエレメント）を返す DOM API です。

例: 属性 id=foo をもつエレメントを返す

```javascript
> document.getElementById('foo')
=> <div id=foo></div>...
```

ブラウザはこの DOM API が呼ばれるたびに該当 id をもつエレメントを見つけるために
毎回ツリーをトラバースしているわけではありません。ブラウザは id とノードの対応表
を別途持っています。そのため `document.getElementById()` は定数時間 O(1) で応答
可能です。

![id to element mapping](./id2element.svg)

これはほんの一例です。その他にもたくさんのツリーに関する情報を「キャッシュ」とし
て持っています。ただしいたずらになんでもデータ構造を用意すればよいというものでは
ありません。時間と空間のトレードオフについては常に慎重に検討しなければいけません
。

<div class="article-danger">
課題 7: このページに含まれる全ノードのうち id 属性がついているものはいくつありますか？
必要であれば <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute">Element.getAttribute()</a> を参照してください。
</div>

<div class="article-danger">
課題 8: <code>document.getElementById(id)</code> に相当する JavaScript の関数 myGetElementById(root, id) を自分で作成してください。
その際、普通に JavaScript の Object をハッシュマップとして使用してもよいですが、比較的新しい API である
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map">Map</a> を使用してもよいでしょう。
</div>

```javascript
function myGetElementById(root, id) {
  // ...
}

myGetElementById(document, id);
```

<div class="article-info">
<p><b>同じ id が複数ある場合</b></p>
同じ id をもつエレメントがツリー内に複数ある場合は <a href="https://dom.spec.whatwg.org/#concept-tree-order">Tree Order</a> の順番で最初に見つかるものが優先されます。
そのため Chrome 内部では id とエレメントの対応表は単純な HashMap ではなく
<a href="https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/dom/tree_ordered_map.h">TreeOrderedMap</a> で管理しています。
</div>

![tree order](./tree-order.svg)

<div class="article-danger">
課題 9: このページには id が重複しているノードがあるでしょうか？
</div>

この記事はほぼ静的ページです。最初に記事が読み込まれた後はツリーの構造は一部を除
いて変化しません。それに対して多くの Web ページの内容は動的に更新されます。つま
りブラウザ内部で保持しているノードツリーの構造は常にアップデートされています。そ
のためツリーに関する情報もなんらかのタイミングでアップデートする必要があります。
ユーザーに古い情報にもとづいた間違った結果を返すことは許されません。

<div class="article-danger">
課題 10 (やや難): ノードツリーが更新されると、先ほどの課題8 で自分で作成した id と エレメントの対応表は古くなるでしょう。なんらかの方法で最新の状態を反映する必要があります。
どのタイミングでどのように更新するのがよいでしょうか？考えてみましょう。どうすれば更新のコストを抑えることができますか？そのためには何が必要になるでしょうか？
</div>

# Super Tree (スーパーツリー)

ここまでは従来の Web でした。この状況は
[Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) の出現とともに様
子を変えることになります。

Shadow DOM の詳細はこの記事ではカバーしません。ここではできるだけ簡潔に述べます
。

（一定の条件を満たす）すべてのエレメントはエレメント「内部」に別のノードツリーを
「ホスト」できるようになりました。いままで Web の世界を構成する最小構成単位であ
った エレメント（原子）はその内部にもうひとつの世界をもつことができます。

![shadow tree](./shadow-tree.svg)

ホスト側（外側）のツリーは Light Tree (光のツリー)、ホストされる側のツリーは
Shadow Tree (影のツリー）と呼ばれます。

外側の世界と内側の世界は本質的な違いは存在しません。つまり Shadow Tree は同時に
Light Tree にもなります。光と影はあくまで相対的な概念です。外側の世界と同様に、
内側の世界の各エレメントもそれぞれ内部にもうひとつの世界をもつことができます。こ
の世界は何段にもネストできます。

![super tree](./super-tree.svg)

モダン Web においては世界はノードのツリーから構成されるのではなく「ノードツリー
のツリー」(= Super Tree) から構成されます。あなたが見ている世界・つくっている世
界は実は上の世界を構成するほんの一部分にしかすぎないかもしれませんし、あなたが利
用しているエレメントの内部には膨大な世界が広がっているかもしれません。

<div class="article-info">
<p><b>Shadow DOM の実装状況</b></p>

Chrome と Safari はすでに実装済み。Firefox も現在実装中です。Edge も DOM のアー
キテクチャの刷新後に実装開始予定です。

</div>

## 例: Chrome での利用例

動画の再生に使用する
[`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) エ
レメントは Chrome は Shadow DOM を使用して実装しています。Web 開発者は `<video>`
エレメントの中にもうひとつの世界が広がっていることを知る必要はありません。むしろ
「知らなかった」という事実はうまくカプセル化が成功している証拠です。

他にも `<input>` エレメントなど多くのエレメントは Chrome 内部では Shadow Tree を
使って実装されています。

![video element](./video-element.svg)

<div class="article-info">
実際の <code>video</code> エレメントが絵のように実装されているとは限りません。Shadow Tree 内の変更は Web 開発者に影響を与えません。Web を壊すことなく Chrome はいつでも実装を変更できます。
</div>

## Divide and Conquer (分割統治)

さきほど出てきた id とエレメントの対応表はそれぞれのノードツリーごとに存在します
。そのほか、たとえば各ノードツリー内に定義された CSS のルールなどもそれぞれのノ
ードツリー単位で独立に管理されます。これらのルールの適用範囲はそれぞれのノードツ
リーのみであるため、サーチやマッチングの対象を大幅に限定できます。

![tree scope](./tree-scope.svg)

<div class="article-info">
<p><b>この記事を読むかもしれない Chrome 開発者へ</b></p>
Chrome 内部ではノードツリーのルートである <code>Document クラス</code>と <code>ShadowRoot</code> クラスが共通の <code>TreeScope</code> を実装しています。多重継承です。<code>TreeScope</code> がツリーに関する情報をもっています。
</div>

CSS の話がでてきたので次は CSS セレクタのデータ構造とマッチングアルゴリズムにつ
いて簡単に説明します。

# CSS

少しの間 CSS に話を脱線しましょう。CSS の 各セレクタは Chrome では Linked List
として表現しています。たとえば以下の CSS のルール:

```css
a b .foo {
  color: red;
}
```

内に含まれる CSS セレクタ "`a b .foo`" は以下のように表現されます。

![css selector](./css-selector.svg)

CSS ルール上では一番右に表記される `.foo` がリストの先頭であることに注意してくだ
さい。Chrome 内部では CSS セレクタは Right-to-Left (右から左）の順番で Linked
List として表現されます。双方向リストではなく片方向リストです。

<div class="article-info">
<p><b>この記事を読むかもしれないChrome開発者へ</b></p>

CSS セレクタは最終的には Linked List として表現されますが、データの局所性を高め
るため（CPU キャッシュに載りやすくするため）、なるべく隣接するノードは近くのメモ
リ領域にアロケートされるように CSS をパースするときに工夫しています。CSS をパー
スするのは一回ですがその後のセレクタマッチングは何回も起きうるためこれらは十分割
に合う最適化です。

</div>

## CSS セレクタマッチング

一部の特別な CSS ルールを除いてマッチングの処理はそれぞれのノードツリーで独立に
行えます。

それぞれのノードツリーにおいて CSS セレクタとエレメントのマッチングは:

- CSS セレクタは Right-to-Left
- ツリー内のエレメントは (基本的には) Bottom-to-Top

の順序で行います。

例:

![css selector matching](./css-selector-matching.svg)

このように愚直にマッチングしていると Backtracking (バックトラッキング) が何度も
発生してマッチングにかかる時間が O(2^N) (指数関数時間) になると思われるかもしれ
ませんが、実際は数々の最適化・ヒューリスティクルールにより現実時間で終わるように
なっています。

そのうちのひとつ Bloom Filter をここでは紹介します。

## 例: Bloom Filter (ブルームフィルタ)

ブルームフィルタは確率的データ構造です。ある程度の False Positive (偽陽性）を受
け入れることで極めて省スペースで「存在するかしないか」をチェックすることが可能で
す。詳しい説明はここでは省きます
。[Wikipedia](https://en.wikipedia.org/wiki/Bloom_filter) を参照してください。

Chrome では CSS セレクタフィルタ
[core/css/SelectorFilter](https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/css/selector_filter.h)
内でブルームフィルタを使用しています。

例えば id 属性を使用してフィルタを行う場合は、セレクタ内に登場する id をもつエレ
メントがツリーの先祖に「存在するかしないか」のチェックにブルームフィルタが使用で
きます。多くのケースでは「存在しない」ことが確実にわかるため早期にセレクタマッチ
ングを終了することが可能です。False Positive (偽陽性）レートは、仮にユニークな
id が 100 あるとして 12 bits のスロットを使用することで、0.2% まで落とすことがで
きます。

ブルームフィルタは Chrome では CSS セレクタマッチング以外にもマルウェアサイトの
検出などでも使用しています。

<div class="article-danger">
課題 11: 以下のような CSS セレクタマッチングを実現する関数を JavaScript で擬似的に実装してください。<code>selector</code> としてどのようなものが指定可能かはおまかせします。
まずは例のように タグネームの配列のみでやってみましょう。
</div>

```javascript
function selectorMatch(selector, node) {
  // ...
}

console.log(selectorMatch(['div', 'p', 'p'], getElementById('foo')));
```

<div class="article-danger">
課題 12: 先ほど作成した自作セレクタマッチングはどのような入力のときに時間がかかりますか？悪意のある入力を考えてみましょう。
</div>

<div class="article-danger">
課題 13 (やや難): Bloom Filter を課題 11 に組み込んでください。マッチングの実行時間は改善されますか？
</div>

<div class="article-danger">
課題 14: ブラウザの CSS エンジンの裏を書いてみましょう。Chrome が固まるような悪意のあるノードツリーと CSS ルールの組み合わせをつくることは可能でしょうか？ノード数 100、スタイルシートのサイズ 1KB という条件で可能でしょうか？
</div>

# Event (イベント)

Super Tree に戻りましょう。一部の
[DOM Event](https://dom.spec.whatwg.org/#events) (イベント) は Super Tree を駆け
抜けてディスパッチされます。たとえば下図のノード `1` がクリックされたとしましょ
う。

![event dispatch](./event-dispatch.svg)

このとき、イベントの Bubbling フェーズでは:

1.  緑のノードツリー: `1` -> `2` -> `3` の順
2.  （その後）水色のノードツリー: `4` -> `5` -> `6` の順
3.  （その後）一番上のノードツリー: `7` -> `8` -> `9` の順

イベントがディスパッチされます。この際、カプセル化を壊さないようにイベントが下の
世界（Shadow Tree)で起きたとしても、あたかも自分の世界 (Light Tree) で起きたかの
ようにブラウザはイベントを「書き換えます」。たとえば、水色のノードツリーではあた
かもノード `4` がクリックされたかのようにユーザーからは見えます（ `event.target`
の値が ノード `4` にアジャストされます）。

## 例: Tweet 埋め込み

Twitter が提供するツイートを埋め込むためのコードは、内部で Shadow DOM を使用して
います。ツイート埋め込みのコードは`<twitterwidget>` エレメントを生成しますが、実
際の表示はすべて shadow tree 上で行われます。

![tweett](./twitter.svg)

`<twitterwidget>` がホストする shadow tree 内のどこかのノードがクリックされたと
しましょう。このとき:

- `<twitterwidget>` エレメントの実装者（つまりここでは Twitter のエンジニアのこ
  とです）はクリックされたのが「RT ボタン」かあるいは「Like」ボタンかどうかを知
  りたいでしょう。
- `<twitterwidget>`エレメントのユーザー（つまりツイートを埋め込みたいページの作
  者）から見た場合はそこまでの詳細は興味がないです。他の普通のエレメントと同様に
  `<twitterwidget>` エレメントそのものがクリックされたことだけ知ることができれば
  十分でしょう。

もし詳細が知りたいのであればクリックイベントといったローレベルなものを通じて知る
のは極めてよくない API デザインです。必要に応じて抽象的できちんと定義されたイン
ターフェース（たとえばカスタムイベント）を通じて伝えるべきです。

一部のイベントはそもそも上の世界に伝える必要がありません。たとえばページを訪れて
いるユーザーがマウスを shadow tree 内のあるノード A からあるノード B に動かした
とします。このとき `<twitterwidget>` エレメントの実装者はこの `mousemove` イベン
トを拾いたいと思うかもしれません。一方 `<twitterwidget>` エレメントのユーザーか
ら見た場合マウスはエレメントの内部を移動しているだけです。イベントは上の世界に伝
える必要はありません。

<div class="article-info">
Event がどのような「パス」を通ってきたかを知るには <a href="https://dom.spec.whatwg.org/#dom-event-composedpath"><code>Event.composedPath()</code></a> API が使用できます。
</div>

## 例: 関連ターゲット (relatedTarget) をもつイベント

下の図でマウスポインタがノード `A` から ノード `B` に移動したとしましょう。

![event related](./event-dispatch-related.svg)

このときは以下のように `mousemove` 関連のイベント はディスパッチされます。

1.  緑のノードツリー: `B` -> `2` -> `3` の順。このときイベントのプロパティ:

    - `event.relatedTarget` は `A` ではなく `C`
    - `event.target` は `B`

    すわわちこのノードツリーではマウスが `C` から `B` に移動したとみなされます。

2.  （その後）水色のノードツリー: `4` -> `5` -> `6` の順。このときイベントのプロ
    パティ:

    - `event.relatedTarget` は `A` ではなく `C`
    - `event.target` は `4`

    すなわちこのノードツリーではマウスが `C` から `4` に移動したとみなされます。

3.  （その後）一番上のノードツリー: イベントはティスパッチされません。

<div class="article-info">
内側のノードツリーから外側のノードツリー内のノードが「見える」のは一般には OK です。これは Shadow DOM のデザイン原則のひとつです。
これは一般のプログラミング言語における原則、たとえば「インナークラス」が「アウタークラス」のフィールドにアクセスできるのと同様です。
</div>

## Event Re-Targeting (イベントリターゲティング） / ノード間の関係の判断

このようにブラウザはイベントをあたかも自分のノードツリー内だけで起きたかのように
ユーザーに見せるためさまざまなアジャストをおこないます。これをリターゲティングと
呼びます。イベントディスパッチの際にリターゲティングを素早く行うためにはツリー上
でのノードの先祖・子孫関係 (Ancestor-Descendant relationships) を何度も判断する
必要がでてきます。

例として次のようなノードツリーに対しては:

![ancestor](.//ancestor.svg)

- A は B の先祖 ? -> Yes
- B は A の先祖 ? -> No
- A は D の先祖 ? -> Yes
- B は F の先祖 ? -> No

等が成り立ちます。

<div class="article-danger">
課題 15: ノード間の先祖・子孫関係を判断する以下の JavaScript 関数を実装してください。
</div>

```javascript
function isAncestorOf(ancestor, descendant) {
  // ...
}

console.log(isAncestorOf(a, b)); // -> true
console.log(isAncestorOf(b, a)); // -> false
console.log(isAncestorOf(a, d)); // -> true
console.log(isAncestorOf(b, f)); // -> false
```

<div class="article-info">
課題ではノードツリー上のノード間の関係を判断していますが、実際の Chrome は イベント・ディスパッチの際は Super Tree 上でのツリー同士の関係で判断しています。
Super Tree を使用することで大幅に計算量を削減できます。
</div>

`isAncestorOf` は素直に実装すると O(N) かかることでしょう。

## ノード間の関係の判断 / O(1)

`isAncestorOf` は少しの工夫で定数時間 O(1) で答えることができるようになります。
ただし以下の条件が必要です。

- イベントの開始前に事前にツリーを 1 回だけトラバースしてもよい
- 一時的に O(N) のメモリを消費してもよい

イベントディスパッチの開始前にツリーをトラバースして各ノードに以下のように 2 つ
の番号をつけることにしましょう。

![pre post order](./pre-post-order.svg)

これらの 2 つの番号 (`pre` と `post`) を利用すれば「A は B の先祖でしょうか？」
という問いには、

    A.pre < B.pre && B.post < A.post

の条件をチェックするだけで済みます。これは定数時間 O(1) で判断できます。

<div class="article-danger">
課題 16: 先ほど実装した <code>isAncestorOf</code> を 実行時間が O(1) になるように改良してください。メモリはいくら使用してかまいません。どれくらい速度が改善したか計測してください？もし速度が改善しないようならなにが原因が考えてみましょう。
</div>

<div class="article-info">
<p><b>最適化するべき？</b></p>

<p>
最適化の教訓として有名なものに「時期尚早な最適化は諸悪の根源である」があります。
この文は残念なことに文脈から切り離されて使用されることが多いです。

幸いなことに Chrome はユーザー数が多いため、最適化のための人的コストをかけてもよ
い場面が多々あります。

例として、さきほどのイベントディスパッチを早くする実際の
<a href="https://codereview.chromium.org/182683002">CL</a> を見てみましょう。平
均的なツリーに対しては 1 イベントあたり 0.1 ms ほどしか早くなりません。たかだが
0.1 ms 早くすることにソフトウェアエンジニアが数時間をかける価値はあるでしょうか
？

</p>
<p>
大雑把に最適化の効果を計算してみましょう。
</p>
<ul>
<li>Chrome のアクティブユーザー数: 1,000,000,000 (= a)
<li>1 ユーザーあたりの1日あたりの平均 Web サイト閲覧数: 100 / day (= b)
<li>1 Webサイトあたりの重みを考慮した平均発生イベント数: 1,500 (= c)
<li>1 イベントあたり節約できた時間: 0.1 ms (= d)
</ul>
<p>
合計すると 1 年あたり a * b * c * d * 365 = 5475 兆 (ms)。
すなわち地球上から毎年 5475 兆 ms (== 約 15 億時間) を節約できたことになります。
その分バッテリーの消費も少なくなり二酸化炭素の排出量も少なくなるでしょう。十分に価値があるといえます。
ブラウザのレンダリングエンジンは Chrome だけではなく WebView あるいは Visual Studio Code や Atom などの Electron アプリでも使用されていますので、この数字はもっと大きいかもしれません。
</p>
</div>

# レンダリング

Super Tree はそのままではレンダリングできません。「ツリーのツリー」 をひとつの「
ツリー」に合成する必要があります。そのことを 「Flattening （平らにすること）」と
呼んでいます。レイアウトのために平らになったツリーは Flat Tree （フラットツリー
）と呼ばれます。

![pre post order](./flat-tree.svg)

Flattening のための詳細なデータ構造とアルゴリズムについては・・・もう十分でしょ
う。魔法すぎるので省きましょう。

ひとついえることは現在 Chrome は Flat Tree はメモリ上には物理的に保持していませ
ん。Flat Tree はあくまでコンセプト上に存在する仮想的なツリーであり、レイアウト時
に仮想的に作成されます。

<div class="article-info">
<p><b>Incremental Shadow DOM</b></p>

現在、Flat Tree のつくりかたを根本的に改善する新しい魔法
(<a href="https://docs.google.com/document/d/1R9J8CVaSub_nbaVQwwm3NjCoZye4feJ7ft7tVe5QerM/edit?usp=sharing">Incremental
Shadow DOM</a>) を開発中です。そのため現代の魔法は古の魔法になってしまうでしょう
。

</div>

# まとめ

この記事は主にデータ構造とアルゴリズムを通じて DOM と Shadow DOM を雰囲気で理解
することを目的にしました。課題に実際に挑戦してみた人は「エンジンの外側」の環境で
ある JavaScript で問題を解く際に何かと不便に感じることが多かったと思います。「エ
ンジン内部の情報やエンジンがもっているデータ構造を利用できればはるかにいろいろな
ことができるのでは？」と感じたかもしれません。それはとても正しいことです。それこ
そがエンジン内部をハックする動機です。

明日の
[Chromium Browser アドベントカレンダー](https://qiita.com/advent-calendar/2017/chromium)
最終日は実際のソフトウェアエンジニアリングにフォーカスし
た[「Web のつくりかた: ソフトウェアエンジニアリングと雰囲気で理解する Web 標準とブラウザのつくりかた」](/2017/making-web/)で
す。お楽しみに。
