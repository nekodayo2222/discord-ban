//Configファイルの読み込み
const config = require("./config.json");
//Discord.jsの読み込み
const discord = require("discord.js");
//clientのインスタンス作成
const client = new discord.Client({ws : { intents: discord.Intents.ALL } });

//起動直後の処理
client.on("ready", () => {
    client.user.setActivity(
        client.user.tag + " is ready!"
    );
    console.log(client.user.tag + `としてDiscordにログインしました。`);
    console.log("Botの使い方");
    console.log("d!ban ユーザーID でユーザーをBAN！")
});

client.on("message", async message => {
    if (!message.content.match(/^d!/)) return;
    var command = message.content;
    command = command.replace("d!", "");
    if (command == "ban") {
    if (message.mentions.members.size == 1) {
              const member = await message.mentions.members.first();
              const id = member.user.id;
              const mee = await message.channel.send({
                embed: {
                  color: 16757683,
                  description: "このユーザーをBANする理由を60秒以内に送信してください。"
                }
              });
              const filter = msg => msg.author.id === message.author.id;
              const collected = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000
              });
              const response = collected.first();
              if (!response)
                return mee.edit({
                  embed: {
                    description: "BAN理由を認識できませんでした。"
                  }
                });
              mee.edit({
                embed: {
                  description: "BANしています…"
                }
              });
              message.guild.members.ban(id, { reason: response.content });
              mee.edit({
                embed: {
                  description: `<@${id}>をBANしました。`
                }
              });
            } else { //IDの場合
              let me = message.content;
              me = me.replace("d!ban ", "");
              let id = me
              const banreason = await message.channel.send({
                embed: {
                  color: 16757683,
                  description: "このユーザーをBANする理由を60秒以内に送信してください。"
                }
              });
              const filter = msg => msg.author.id === message.author.id;
              const collected = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000
              });
              const response = collected.first();
              if (!response)
                return banreason.edit({
                  embed: {
                    description: "BAN理由を認識できませんでした。"
                  }
                });
              banreason.edit({
                embed: {
                  description: "BANしています…"
                }
              });
              message.guild.members.ban(id, { reason: response.content });
              banreason.edit({
                embed: {
                  description: `<@${id}>をBANしました。`
                }
              });
    
            }
    }
    });

//トークンが設定されてない場合の処理
if (config.token == "DISCORD-BOT-TOKEN") {
    console.log("Discordトークンが指定されていません。");
    process.exit(0);
}

//Discordにログイン
client.login(config.token);