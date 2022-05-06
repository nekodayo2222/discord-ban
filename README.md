# discord-ban
サーバーに参加していないユーザーをBANする為だけのDiscord Bot.

## 動作確認済環境
Raspberry Pi 3 Model B+
Ubuntu Server 20.04 LTS
Node.js v16.14.2
NPM v8.8.0
Discord.js v12.5.3

## セットアップ
1. config-template.jsonをconfig.jsonにリネーム
2. config.json内のDISCORD-BOT-TOKENを使用するBotアカウントのトークンに置き換え
3. npm installでDiscord.jsをインストール
4. node index.jsまたはnpm startで起動

## 使い方
1. Botをサーバーに追加
2. d!ban ユーザーID(@メンション でも可)を入力後、60秒以内に理由を送信
3. Botから「@〇〇 をBANしました。」とメッセージが返ってきたらBAN完了