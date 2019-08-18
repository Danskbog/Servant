exports.run = async (client, message, args, levels) => {
  message.delete();

  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  if (!member) return message.reply("that's not a valid mention or UserID.");
  if (member.id === message.client.config.ownerID) return message.channel.send("Don't steal Donuts!");

  message.channel.send(`Here is the link of the profile picture.\n${member.user.avatarURL}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  category: "Miscellaneous",
  name: "avatar",
  description: "Gets profile picture from a mention or id",
  usage: "avatar <mention> or <id>"
};
