<!--
title: Subset の生成
date: 2007-03-02
-->

いままで、あるビットマスク superset のサブセットをすべて生成するには、

```java
for (int subset = 1; subset < superset; subset++) {
 if ((subset|superset) == superset) {
   // do with subset
 }
}
```

としていたんですけど、これだと、 superset = 10011(2)などの場合でも、約 10011(2)
回のループが必要です。生成されるサブセットは、

> {10010, 10001, 00011, 10000, 00010, 00001,}

と 6 つしかないのに。すごい無駄です。

もっとうまい方法がありました。

```java
for (int subset = superset; subset > 0; subset = (subset-1) & superset) {
  // do with subset
}
```

これなら、サブセットのみをうまく生成できます。この場合のサブセットは superset を
含み、空セットは含みません。
