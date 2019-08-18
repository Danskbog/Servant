const Discord = require("discord.js");

module.exports = (client, message) => {
  if (message.author.bot) return;

  const settings = client.settings.get(message.guild.id);
  const log = message.guild.channels.find("name", settings.logChannel);
  if (!log || !message.content || !message.channel || !message.author) return;
  if (message.content.startsWith(settings.prefix)) {
    let command = message.content.split(" ");
    command = command[0].slice(1);

    if (client.commands.has(command)) return;
  }

  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setAuthor("Message Deleted", `${message.author.avatarURL}`)
    .setTimestamp()
    .setFooter(`User ID: ${message.author.id}`)
    .addField("User", `${message.author.tag}`, true)
    .addField("Channel", `${message.channel}`, true)
    .addField("Message Deleted", `${message.content}`, false);

    message.guild.channels.get(log.id).send({embed});
};
