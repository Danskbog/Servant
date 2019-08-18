const Discord = require("discord.js");

module.exports = (client, member) => {
  const settings = client.settings.get(member.guild.id);

  if (settings.welcomeEnabled === "true"){
  const RuleChannel = member.guild.channels.find("name", settings.rulesChannel);
  const welcomeMessage1 = settings.welcomeMessage1.replace('{{user}}', member.user.tag);
  const welcomeMessage2 = settings.welcomeMessage2.allReplace({'{{user}}': member.user.id, '{{rules}}': RuleChannel});
  const welcomeTitle = settings["welcomeTitle"];

  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(`${member.user.avatarURL}`)
  .setAuthor(`${welcomeTitle}`, `${member.user.avatarURL}`)
  .addField(`${welcomeMessage1}`, `${welcomeMessage2}`, true);

  member.guild.channels.find("name", settings.welcomeChannel).send({embed}).catch(console.error);
  }

  if (settings.autoroleEnabled === "true") {
    const role = member.guild.roles.find("name", settings.autoRole);

    member.addRole(role).catch(console.error);
  }

};
