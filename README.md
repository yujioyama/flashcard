# README

## 本アプリについて

本アプリは英単語を暗記することに特化した、暗記カードアプリです。<br>
覚えたい単語を追加すると、暗記カードの裏に自動で意味や例文などが記入されます。<br>
英英辞典のapiを使用しているため、意味は英語で表示されます。

## 使用した技術

- Next.js(Next 13.4.19)
- Typescript
- SCSS Modules

## Node
18.17.1
## 起動方法

npmインストール：`npm i `

起動：`npm run dev`

## 各画面の仕様

### トップページ
![トップページ](https://github.com/yujioyama/flashcard/assets/43977868/c131914f-8cd2-4856-8de8-3e88d1eacd59)


### トップページ 編集モード


![トップページ - 編集モード](https://github.com/yujioyama/flashcard/assets/43977868/8c13b8fc-703d-490d-b71d-c85c1769ec93)


### テストページ


**表示される単語はページをリロードするたびにシャッフルされてランダムな順番で表示されます。**


![テストページ](https://github.com/yujioyama/flashcard/assets/43977868/55540b35-60f2-4533-9450-45d83d4be239)

### データの扱い方法

[無料レンタルサーバー Xfree](https://www.xfree.ne.jp/) を使用<br>
jsonファイルを格納し、phpでGETなどのhttpメソッドを処理
