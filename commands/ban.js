const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  message.delete();

  const settings = client.settings.get(message.guild.id);
  const reason = args.slice(1).join(' ');
  const blet = message.mentions.members.first();
  const author = message.author;
  const staff2 = message.guild.roles.find('name', settings.modRole);
  const staff3 = message.guild.roles.find('name', settings.adminRole);

  const log = message.guild.channels.find('name', settings['modLogChannel']);

  if (!log) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!reason) return message.reply('You must supply a reason for the ban.').catch(console.error);
  if (!blet) return message.reply('You must mention someone to ban them.').catch(console.error);

  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setThumbnail(`${blet.user.avatarURL}`)
    .setAuthor(`${author.tag}`, `${author.avatarURL}`)
    .setTimestamp()
    .setDescription(`**Action:** __Ban__\n**Target:** ${blet.user.tag}\n**Reason:** _${reason}_`);

    if (blet.roles.has(staff2.id) || blet.roles.has(staff3.id)) return message.reply('this user is a staff member.').catch(console.error);

    blet.ban().then(() => {
      client.channels.get(log.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("Cannot ban the user: " + e));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bean", "hammer"],
  permLevel: "Administrator"
};

exports.help = {
  category: "Moderation",
  name: "ban",
  description: "Bans a mentioned user.",
  usage: "ban [@user] [reason]"
};
