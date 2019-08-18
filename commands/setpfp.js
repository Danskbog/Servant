const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
  message.delete();

  if (!args[0]) return message.reply('Please provide a link of the image.');
  const asd = args[0].slice(-4);
  if (!asd === ".jpg" || !asd === ".png") return message.reply('Make sure that the last 3 letters of the link is the file extension.');
  if (asd === ".gif") return message.reply('Profile picture can not be a GIF.');

  const embed = new Discord.RichEmbed()
    .setColor(0x7CFC00)
    .setDescription(`**Action:** _Change Profile Picture_\n\n**New Profile Picture ->**\n`)
    .setThumbnail(`${args[0]}`);

  console.log(args[0]);
  client.user.setAvatar(args[0]).then(() => {
    message.channel.send({embed}).catch(console.error);
  }).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "setpfp",
  category: "System",
  description: "Sets the bot's profile picture.",
  usage: "setpfp [link]"
};
