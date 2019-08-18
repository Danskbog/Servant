const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
  message.delete();

  if (!args[0]) {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n[Contact Danskbog if there are any problems.]\n[Use ${settings.prefix}help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
      .addField("**Usage:**", `${settings.prefix}${command.help.usage}`, true)
      .setDescription(`${command.help.description}`)
      .setThumbnail(`${client.user.avatarURL}`)
      .setFooter("Servant v1.0, custom made by: Danskbog#0001");
      if (command.conf.aliases.length) {
        embed.addField("**Aliases:**", `${command.conf.aliases.join(", ")}`, false)
      } else {
        embed.addField("**Aliases:**", "None", false)
      }

      message.channel.send({embed});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Shows commands for ur level.",
  usage: "help [command]"
};
