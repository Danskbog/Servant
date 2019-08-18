const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
exports.run = async (client, msg, args, levels) => {
  msg.delete();
  const member = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.member;
  if (!member) return msg.reply("Please provide a vaild Mention or USER ID");
  let bot = "idk";
  if (member.user.bot === true) {
    bot = "Yes";
  } else {
    bot = "No";
  }
  const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setThumbnail(`${member.user.avatarURL}`)
    .setAuthor(`${member.user.tag} -> UserID: ${member.id}`, `${member.user.avatarURL}`)
    .addField("Nickname:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
    .addField("Bot?", `${bot}`, true)
    .addField("Status", `${status[member.user.presence.status]}`, true)
    .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}`, true)
    .addField("Roles", `${member.roles.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
    .addField("Joined At", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .addField("Created At", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true);

  msg.channel.send({
    embed
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uinfo"],
  permLevel: "User"
};

exports.help = {
  category: "Miscellaneous",
  name: "userinfo",
  description: "Gets userinfo from a mention or id",
  usage: "userinfo <mention> or <id>"
};
