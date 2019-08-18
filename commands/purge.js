exports.run = async (client, message, args, level) => {
  const settings = client.settings.get(message.guild.id);
  if (isNaN(args[0])) {
    message.channel.send('Please provide how much I need to purge. \n Usage: ' + settings['prefix'] + 'purge <amount>');
    return;
 };

 ammount = parseInt(args[0]);
 ammount += parseInt(1);

 const fetched = await message.channel.fetchMessages({limit: ammount});

 message.channel.bulkDelete(fetched).catch(console.error);
 message.reply(`${args[0]} message(s) has been deleted.`).then(sent => {
   sent.delete(2500);
 });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Trial Moderator"
};

exports.help = {
  category: "Moderation",
  name: "purge",
  description: "Deletes [x] ammount of messages",
  usage: "purge [number of messages]"
};
