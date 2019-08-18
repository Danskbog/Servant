const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  message.delete();

  const friendly = client.config.permLevels.find(l => l.level === level).name;
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

  const embed = new Discord.RichEmbed()
  .setColor(randomColor)
  .setThumbnail(`${message.author.avatarURL}`)
  .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
  .addField("**Permission level:**", `${level}`, true)
  .addField("**Rank:**", `${friendly}`, true);

  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Miscellaneous",
  description: "Tells you your permission level.",
  usage: "mylevel"
};
