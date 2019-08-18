exports.run = async (client, message, args, level) => {
  message.delete();
  const msg = await message.channel.send("Cyka");
  msg.edit(`Blyat, Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. 💙: ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['cyka'],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscellaneous",
  description: "Latency stuff",
  usage: "ping"
};
