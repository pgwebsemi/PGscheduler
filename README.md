## アプリ概要

- **アプリ名**: PG-scheduler
- **Figma デザイン**:  
  https://www.figma.com/design/JJE1jHAiLqNzcMf0CrBVbd/2025-PGsemi-ReactNext-PGscheduler?node-id=0-1&p=f&t=iWnrT1cxN02C2xZ7-0
- **主な目的**:
  - ゼミなど少人数グループの「空き時間」を可視化し、理想的なスケジュール（候補時間帯）を導き出す。
  - 複数メンバーが登録した空き時間をもとに、最も多くのメンバーが空いている時間帯や、複数グループに分割しても効率よく予定を組める時間帯を提示する。
- **特徴**:
  - 曜日ごとに登録された「メンバーが行ける時間帯」を集計し、最適と思われる時間帯・スケジュールを自動出力（グラフ表示）。
  - 管理者（admin）用のグループ管理機能。

## 技術構成

- フレームワーク: Next.js (App Router, Route Handler)
- 言語: TypeScript, React
- スタイリング: Tailwind CSS
- 認証・DB ホスティング: Firebase
- デプロイ: Vercel
- Linter: ESLint
- その他: GraphQL, shadcn

## ディレクトリ構成

```
/
├ package.json         # 依存パッケージ & スクリプト定義
├ tsconfig.json        # TypeScript コンパイラ設定
├ next.config.ts       # Next.js 固有の設定 (リダイレクト, 環境変数など)
├ postcss.config.mjs   # PostCSS (Tailwind CSS) 設定
├ eslint.config.mjs    # ESLint 設定
├ dataconnect/         # DB 接続設定 & スキーマ定義
│  └ schema/           # GraphQL 用スキーマ
├ public/              # 静的アセット (画像, フォント, favicon)
├ src/                 # アプリケーション本体
│  ├ app/              # Next.js App Router 用ルート
│  │  ├ layout.tsx     # 全ページ共通レイアウト
│  │  ├ globals.css    # グローバルスタイル
│  │  └ …
│  ├ components/       # コンポーネント
│  ├ lib/              # ユーティリティ関数, フック, API クライアント
│  └ …
└ …
```

## 環境構築

1. `.env.example` をコピーして `.env` ファイルを作成
2. 環境変数の値を知っている人から取得
3. 依存パッケージをインストール

   ```bash
   npm install
   ```

4. 開発サーバーを起動
   ```bash
   npm run dev
   ```

ブラウザで http://localhost:3000 にアクセスし、開発環境が立ち上がれば OK です。

## その他

命名規則はケバブケース
ex)`kebab-case.tsx`
