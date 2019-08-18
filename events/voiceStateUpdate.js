const Discord = require("discord.js");

module.exports = (client, oldMember, newMember) => {
  const settings = client.settings.get(oldMember.guild.id);
  const log = oldMember.guild.channels.find("name", settings.logChannel);

  if (newMember.voiceChannel === oldMember.voiceChannel) return;

  if (oldMember.voiceChannel && newMember.voiceChannel) {
    if (!newMember.user.tag || !newMember.user.avatarURL || !newMember.id || !newMember.voiceChannel || !oldMember.voiceChannel) return;
    const embed = new Discord.RichEmbed()
      .setColor(0x7CFC00)
      .setAuthor(`${newMember.user.tag}`, `${newMember.user.avatarURL}`)
      .setTimestamp()
      .setFooter(`User ID: ${newMember.id}`)
      .addField("Has switched voice channel to:", `${newMember.voiceChannel}`, false)
      .addField("Previous voice channel:", `${oldMember.voiceChannel}`, false);

    return oldMember.guild.channels.get(log.id).send({embed});
  }

  if (!newMember.voiceChannel) {
    if (!newMember.user.tag || !newMember.user.avatarURL || !newMember.id || !oldMember.voiceChannel) return;
    const embed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setAuthor(`${newMember.user.tag}`, `${newMember.user.avatarURL}`)
      .setTimestamp()
      .setFooter(`User ID: ${newMember.id}`)
      .addField("Has left the voice channel:", `${oldMember.voiceChannel}`, true);

    return oldMember.guild.channels.get(log.id).send({embed});
  }

  if (!oldMember.voiceChannel) {
    if (!newMember.user.tag || !newMember.user.avatarURL || !newMember.id || !newMember.voiceChannel) return;
    const embed = new Discord.RichEmbed()
      .setColor(0x7CFC00)
      .setAuthor(`${newMember.user.tag}`, `${newMember.user.avatarURL}`)
      .setTimestamp()
      .setFooter(`User ID: ${newMember.id}`)
      .addField("Has joined the voice channel:", `${newMember.voiceChannel}`, true);

    return oldMember.guild.channels.get(log.id).send({embed});
  }
};
