<!--
title: Google Code Jam 2006 - Round1に挑戦 - GenericsとAutoBoxing
date: 2006-09-15
-->

Google Code Jam 2006 Round1 に挑戦。予選を通過した 1000 名のうち 500 名が通過で
きます。

# NearFrac

250 点問題。 問題の条件をまちがって解釈してしまいました。解が複数あった場合、た
とえば「-1/3, -2/3」の場合は、「小さいほう」である「-2/3」を優先しなければいけな
いんですが、「小さいほう」の説明を逆に解釈してしまい、「-1/3」を優先するようなコ
ードを書いてしまいました。よく問題を読めばちゃんと説明してあるんですけどね。反省
。

# BadBinary

500 点問題。 問題自体は難しくなくコーディングはさくさく 10 分ほどで完了。しかし
、Java の罠にはまってしまいました。。。 たとえば、

```java
Map<Long, Long> memo = new HashMap<Long, Long>();
long i = 1;
memo.put(i, 2);
```

として、この Map から値を取得しようと、

```java
int j = 1;
memo.get(j);
```

とします。すると memo.get(j)の結果は、2 ではなく null になってしまいます。 memo
は

```java
Map<Long, Long> memo
```

と宣言しているので、memo.get(j)の部分は、AutoBoxing が働いて

```java
memo.get(new Long(j))
```

と解釈されると思っていたのですが、実際は

```java
memo.get(new Integer(j))
```

と Integer になるようですね。int-&gt;long の変換は行われません。当然
、memo.put(new Long(1), ..)したものは、memo.get(new Integer(1))では取得できませ
ん。

「Generics のもつコンパイル時の型チェックは機能しないのか？」と思ったら、そもそ
も Map のメソッド get は

```java
public interface Map<K,V> {
  V get(Object key);
```

と定義されているんですね。てっきり

```java
public interface Map<K,V> {
  V get(K key);
```

だと思いこんでいました。パラメータの型チェックは行われないのか。。がく。

本番中はまさかこの部分に問題があるとは気づくことができず右往左往。なぜかこういう
ときだけ無駄な想像力が異様に働き、関係ないところばかり追いかけてしまいました。む
なしく時間（50 分も。。）を費やしたあげく、結局最後まで気づくことができないまま
時間切れ。 memo.get(j)ではなく memo.get((long)j)とするだけでよかったんですけど。
気づくべきでした。 Google Code Jam くん、楽しませてもらったよ。また来年までさよ
うなら。
