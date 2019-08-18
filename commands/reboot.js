exports.run = async (client, message, args, level) => {
  message.delete();

  await message.reply("rebooting the bot.");
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Restarts the bot automatically.",
  usage: "reboot"
};
