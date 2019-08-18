const Discord = require("discord.js");

module.exports = (client, role) => {
  const settings = client.settings.get(role.guild.id);
  const log = role.guild.channels.find("name", settings.logChannel);

  const embed = new Discord.RichEmbed()
    .setColor(0x7CFC00)
    .setAuthor("Role Created")
    .addField("Role Name", `${role.name}`, true)
    .addField("Role Color", `${role.hexColor}`, true)
    .addField("Role Position", `${role.position}`, true)
    .addField("Mentionable:", `${role.mentionable}`, false)
    .setTimestamp()
    .setFooter(`Role ID: ${role.id}`);

    role.guild.channels.get(log.id).send({embed});
};
