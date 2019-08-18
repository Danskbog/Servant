const talkedRecently = new Set();

exports.run = async (client, message, args, level) => {
  message.delete();
    if (talkedRecently.has(message.author.id)) {
              message.channel.send("You have to wait 1 minute before you can use this command again!" + message.author);
      } else {
    const pika = client.emojis.get("406559216078159882");
    const idiot = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
	
	if (idiot.id === "221373638979485696") {
		message.channel.send(`${idiot} is senpai ${pika}`)
	} else {
		message.channel.send(`${idiot} ur an idiot ${pika}`).then(fgt => {
		  fgt.react("🖕");
		});
		idiot.sendMessage(`Hah! idiot ${pika}`).then(fgt => {
		  fgt.react("🖕");
		});
		talkedRecently.add(message.author.id);
		  setTimeout(() => {
			talkedRecently.delete(message.author.id);
		  }, 60000);
	 }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "idiot",
  category: "Miscellaneous",
  description: "Sends a message to DM and channel.",
  usage: "idiot [user]"
};
