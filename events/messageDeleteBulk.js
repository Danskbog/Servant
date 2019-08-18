const Discord = require("discord.js");

module.exports = (client, messages) => {
  blergh = messages.array();
  pleb = messages.first();

  const settings = client.settings.get(pleb.guild.id);
  const log = pleb.guild.channels.find("name", settings.logChannel);

  let output = `= Bulk Deletion =\n[Contact Danskbog#0001 if there are any problems.]\n`;

  blergh.forEach( c => {
    output += `${c.author.tag} -> ${c.content}\n`;
  });

  pleb.guild.channels.get(log.id).send(output, {code: "asciidoc", split: { char: "\u200b" }});
};
