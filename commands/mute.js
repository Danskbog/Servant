const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  message.delete();

  const settings = client.settings.get(message.guild.id);
  const blet = message.mentions.members.first();
  const reason = args.slice(1).join(' ');
  const author = message.author;
  const staff2 = message.guild.roles.find('name', settings.modRole);
  const staff3 = message.guild.roles.find('name', settings.adminRole);

  const log = message.guild.channels.find("name", settings.modLogChannel);
  const role = message.guild.roles.find("name", settings.mutedRole);

  if (!log) return message.reply('I cannot find a mod-log channel');
  if (!role) return message.reply('I cannot find a mute role');
  if (!reason) return message.reply('You must supply a reason for the mute.');
  if (!blet) return message.reply('You must mention someone to mute them.');

  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setThumbnail(`${blet.user.avatarURL}`)
    .setAuthor(`${author.tag}`, `${author.avatarURL}`)
    .setTimestamp()
    .setDescription(`**Action:** __Mute__\n**Target:** ${blet.user.tag}\n**Reason:** _${reason}_`);

  if (blet.roles.has(role.id)) return message.reply('This user has already been muted.').catch(console.error);
  if (blet.roles.has(staff2.id) || blet.roles.has(staff3.id)) return message.reply('this user is a staff member.').catch(console.error);

  blet.addRole(role).then(() => {
    blet.guild.channels.get(log.id).send({embed}).catch(console.error);
  })
  .catch(e=>console.error("Cannot add muted role: " + e));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Moderator"
};

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "Mutes a mentioned user.",
  usage: "mute [@user] [reason]"
};
