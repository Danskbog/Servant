const Discord = require("discord.js");

module.exports = (client, message) => {
  if (message.author.bot) return;

  const settings = message.guild
    ? client.settings.get(message.guild.id)
    : client.config.defaultSettings;

  message.settings = settings;

  if (message.content.toUpperCase().includes("UR MOM GAY")) return message.channel.send("no u");

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const level = client.permlevel(message);
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      const friendly = client.config.permLevels.find(l => l.level === level).name;
      const embed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setThumbnail(`${message.author.avatarURL}`)
      .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
      .addField("**This command requires level:**", `${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`)
      .addField("**Your permission level:**", `${level}`, true)
      .addField("**Rank:**", `${friendly}`, true)
      .setFooter("Servant v1.0, custom made by: Danskbog#0001");
      return message.channel.send({embed});
    } else {
      return;
    }
  }

  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);
};
