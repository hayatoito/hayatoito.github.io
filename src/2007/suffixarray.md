<!--
title: Suffix Array
date: 2007-03-27
-->

TopCoder SRM187、
[DNAMultiMatcher](http://www.topcoder.com/stat?c=problem_statement&pm=2224&rd=4755)
は、

> String が 3 つ(それぞれの長さは最大 2500)与えられたとき、 3 つ全てに含まれる最
> 長の Substring の長さを求めなさい。

という問題です。これに対して、

- 長さを Binary-Search で絞りながら、
- String が含まれるかどうかの判定を Java 標準の java.lang.String\#contains を使
  用

という方針で解く場合は、こうなります。

```java
public class DNAMultiMatcher {

  public int longestMatch(String[] sequence1, String[] sequence2, String[] sequence3) {
      String s1 = join(sequence1);
      String s2 = join(sequence2);
      String s3 = join(sequence3);

      int low = 0;
      int high = s1.length();

      while (low < high) {
          int mid = low + (high-low+1)/2;
          boolean found = false;
          for (int i = 0; i + mid <= s1.length(); i++) {
              String p = s1.substring(i, i+mid);
              if (s2.contains(p) && s3.contains(p)) {
                  found = true;
                  break;
              }
          }
          if (found) {
              low = mid;
          } else {
              high = mid-1;
          }
      }
      return low;
  }

  String join(String[] sa) {
      StringBuilder sb = new StringBuilder();
      for (String s : sa) sb.append(s);
      return sb.toString();
  }
}
```

この場合は、ワーストケースで軽く 2 分以上かかってしまい、タイムアウトです。
String A の長さを n、String B の長さを m とした場合、Java の A.contains(B)は、普
通に O(m\*n)っぽいですね。

A が B を含んでいるか?を高速に判定するときに使用できるのが、
[Suffix Array](http://en.wikipedia.org/wiki/Suffix_array) です。

ナイーブに実装してみると、

```java
class SuffixArray {
    int len;
    String[] suffixes;

    SuffixArray(String s) {
        len = s.length();
        suffixes = new String[len];
        for (int i = 0; i < len; i++) {
            suffixes[i] = s.substring(i);
        }
        Arrays.sort(suffixes);
    }

    int find(String p) {
        if (len == 0) {
            return p.length() == 0 ? 0 : -1;
        }
        int low = 0;
        int high = suffixes.length-1;
        while (low < high) {
            int middle = low + (high-low)/2;
            if (suffixes[middle].compareTo(p) >= 0) {
                high = middle;
            } else {
                low = middle+1;
            }
        }
        if (suffixes[high].startsWith(p)) {
            return len - suffixes[high].length();
        }
        return -1;
    }
}
```

Java の java.lang.String\#substring メソッドは、もとの String と内部の配列
char\[\]を共有した String を返すので、この実装でも無駄にメモリを消費しないはずで
す。

オーダーは、

- A に対する Suffix Array の構築: O(n\^2 log(n))
- A が B を含んでいるかの判定: O(m log(n))

になるでしょうか? 改良の余地はまだまだ残っていますが、今回の目的にはこれで十分で
す。 (Suffix Array を O(n)で作成するアルゴリズムもあるようです。。。)

先ほどの例を、Suffix Array を使用して書き直すとこうなります。

```java
public class DNAMultiMatcher {

  public int longestMatch(String[] sequence1, String[] sequence2, String[] sequence3) {
      String s1 = join(sequence1);
      String s2 = join(sequence2);
      String s3 = join(sequence3);

      SuffixArray sa2 = new SuffixArray(s2);
      SuffixArray sa3 = new SuffixArray(s3);

      int low = 0;
      int high = s1.length();

      while (low < high) {
          int mid = low + (high-low+1)/2;
          boolean found = false;
          for (int i = 0; i + mid <= s1.length(); i++) {
              String p = s1.substring(i, i+mid);
              if (sa2.find(p) >= 0 && sa3.find(p) >= 0) {
                  found = true;
                  break;
              }
          }
          if (found) {
              low = mid;
          } else {
              high = mid-1;
          }
      }
      return low;
  }
```

これで、ワーストケースでも 1 秒以内に処理できるようになり、システムテストに通り
ます。 Suffix Array の応用例はほかにもいろいろあり、全文検索などでもよく使われる
ようです。
