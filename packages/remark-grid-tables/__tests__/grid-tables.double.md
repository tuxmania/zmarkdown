# Grid table

## Basic example

+------+--------+------+
| テーブル表題  | 表題 |
+------+--------+------+
| 副題 | 見出し | セル |
+======+========+======+
| 行の | 列の結合行    |
+ 結合 +--------+------+
| 列   | 標準   | セル |
+------+--------+------+
| 複数 | *書式つきの*  |
| 行の | **段落**      |
|      | セル          |
| セル |               |
| 結合 |               |
+------+---------------+

+----+----+----+
| あ | い | う |
+====+====+====+
| え | お      |
|    +----+----+
|    | か | き |
+----+----+----+

+----+---------+
| あ | い      |
|    +----+----+
|    | う | え |
|    +----+----+
|    | お      |
+----+---------+

+--------------+
| あ           |
+----+----+----+
| い | う | え |
|    +----+    |
|    | お |    |
+----+----+----+

+----+----+----+
| う | え | お |
|    |    +----+
|    |    | か |
|    +----+----+
|    | き | く |
|    |    +----+
|    |    | け |
+----+----+----+

+----+----+----+
| あ | い | う |
+----+    |    |
| え |    |    |
+----+----+    |
| お | か |    |
+----+    |    |
| き |    |    |
+----+----+----+

+----+----+----+----+
| あ | い | う | え |
+----+----+----+----+
| お      | か      |
+---------+---------+
| き                |
+-------------------+

+-------------------+
| あ                |
+---------+---------+
| い      | う      |
+----+----+----+----+
| え | お | か | き |
+----+----+----+----+


+----+----+----+----+----+----+
| あ | い | う | え | お | か |
|    |    +----+----+    |    |
|    |    | き      |    |    |
|    +----+---------+----+    |
|    | く                |    |
+----+-------------------+----+
| け                          |
+-----------------------------+

+----+-----------------------+
| あ | い                    |
+====+=======================+
| う |                       |
|    | +----+----+----+----+ |
|    | | え | お | か | き | |
|    | +----+----+----+----+ |
|    | | く                | |
|    | +-------------------+ |
|    |                       |
+----+-----------------------+























+----------+
| あ       |
+----------+
Text at the end

+----------+
| あ       |
+----------+
Text at the

## specific tests

In this examples, the second row should always be a full-cell

+-------------------+
| あ                |
+-------------------+
| い | う           |
+----+----+----+----+
| え | お | か | き |
+----+----+----+----+

+----+--------------+
| あ |              |
+----+--------------+
| い | う           |
+---------+----+----+
| え   お | か | き |
+---------+----+----+

+----+----+----+----+
| あ | い | う | え |
+----+----+----+----+
| い | う           |
|                   |
+----+----+----+----+
| え | お | か | き |
+----+----+----+----+

+----+----+----+----+
| あ | い | う | え |
+----+----+----+----+
| い  | う          |
+----+----+----+----+
| え | お | か | き |
+----+----+----+----+

## Failing example

+--- あ ---+

+---------+
+---------+

+---------+
| あ      |
|         |

+---------+
| あ      |
+=========+
| い      |
+=========+

+--- あ ---+
|          |
+----------+
|          |
+----------+

Bug #107

+----+-----+-----+-----+-----+-----+
|    | 例1       | 例2       | 例3 |
+----+-----+-----+-----+-----+-----+
|    | 例4 | 例5 | 例6 | 例7 |     |
+====+=====+=====+=====+=====+=====+
| あ | い  | う  | え  | お  | か  |
+----+-----+-----+-----+-----+-----+

## Emoji

+----+----+----+
| xy | 🐶 | 🍣 |
+====+====+====+
| ✌ | 👏 🌵   |
|    +----+----+
|    | 🦄 | 👨‍👨‍👧‍👦 |
+----+----+----+

## Emoji and Ambiguous Width

+----+----+----+
| xy | 🐶 | é  |
+====+====+====+
| ✌ | 👏 🌵   |
|    +----+----+
|    | è  | 👨‍👨‍👧‍👦 |
+----+----+----+