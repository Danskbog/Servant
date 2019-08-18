const Discord = require("discord.js");
const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

exports.run = (client, message, args, level) => {
  message.delete();
  const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
    .setDescription(args.join(" "))
  message.channel.send({embed}).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "0"
};

exports.help = {
  category: "Miscellaneous",
  name: 'embed',
  description: 'Embeds some text.',
  usage: 'Embed [Text]'
};
