const Discord = require("discord.js");

exports.run = (client, msg, args, level) => {
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

  let game = args.join(" ").trim();
  if(!game || game.length < 1) game = null;
  client.user.setPresence({ game: { name: game, type: 0 } });
  const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(`${msg.author.tag}`, `${msg.author.avatarURL}`)
    .setDescription(`**Action:** _Change Game Status_\n\n**Game playing now:** __${game}__\n`);
  msg.channel.send({embed}).catch(console.error);
  msg.delete().catch(console.error);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["game"],
  permLevel: "Moderator"
};

exports.help = {
  category: "System",
  name: 'playing',
  description: 'Changes the "Playing" status (game).',
  usage: 'playing [game name]'
};
