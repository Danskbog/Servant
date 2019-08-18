const Discord = require("discord.js");

module.exports = (client, oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;

  const settings = client.settings.get(oldMessage.guild.id);
  const log = newMessage.guild.channels.find("name", settings.logChannel);

  if (!log || !oldMessage || !newMessage) return;
  if (oldMessage.content === newMessage.content) return;

  if (newMessage.content || oldMessage.content || newMessage.author.tag  || oldMessage.channel) {
    const embed = new Discord.RichEmbed()
      .setColor(0xFFa500)
      .setAuthor("Message Edited", `${newMessage.author.avatarURL}`)
      .addField("User", `${newMessage.author.tag}`, true)
      .addField("Channel", `${oldMessage.channel}`, true)
      .addField("Before", `${oldMessage.content}`, false)
      .addField("After", `${newMessage.content}`, false)
      .setTimestamp()
      .setFooter(`User ID: ${newMessage.author.id}`);

    oldMessage.guild.channels.get(log.id).send({embed});
  }
};
