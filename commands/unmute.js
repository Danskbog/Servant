const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  message.delete();

  const settings = client.settings.get(message.guild.id);
  const reason = args.slice(1).join(' ');
  const blet = message.mentions.members.first();
  const author = message.author;

  const log = message.guild.channels.find('name', settings['modLogChannel']);
  const role = message.guild.roles.find('name', settings['mutedRole']);

  if (!log) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!role) return message.reply('I cannot find a muted role').catch(console.error);
  if (!reason) return message.reply('You must supply a reason for the unmute.').catch(console.error);
  if (!blet) return message.reply('You must mention someone to unmute them.').catch(console.error);

  const embed = new Discord.RichEmbed()
    .setColor(0x7CFC00)
    .setThumbnail(`${blet.user.avatarURL}`)
    .setAuthor(`${author.tag}`, `${author.avatarURL}`)
    .setTimestamp()
    .setDescription(`**Action:** __Unmute__\n**Target:** ${blet.user.tag}\n**Reason:** _${reason}_`);

  if (!blet.roles.has(role.id)) {
    message.reply('This user is not muted.').catch(console.error);
    }
  else {
    blet.removeRole(role).then(() => {
      client.channels.get(log.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("Cannot remove muted role: " + e));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Moderator"
};

exports.help = {
  name: "unmute",
  category: "Moderation",
  description: "Unmutes a mentioned user.",
  usage: "unmute [@user] [reason]"
};
