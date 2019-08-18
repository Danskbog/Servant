const Discord = require("discord.js");
const request = require("request");

exports.run = async (client, message, args, level) => {
  const clientId = 'iv0p2rfrqqqs6e23d12e1mr07a7h7h';
  const gaylink = 'https://api.twitch.tv/helix/streams?user_login=';

  const options = {
        method: 'GET',
        url: gaylink + args[0],
        headers:
        {
            'Client-ID': clientId,
        }
      }

  const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    request(options, function (error, response, body) {
      if (error) return console.log(error);
      // const req_data = JSON.parse(body);
      // message.channel.send();
      const data = JSON.parse(body);
      console.log(data.data[0]);

      const strem = data.data[0];

      // const embed = new Discord.RichEmbed()
      // .setColor(0x7CFC00)
      // .setThumbnail(`${strem.thumbail_url}`)
      // .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
      // .addField("**Stream Title:**", `${strem.title}`, true)
      // .addField("**Stream URL:**", `komt nog`, true);

      const thumb = strem.thumbnail_url.replace('{width}x{height}', '192x108');

      message.channel.send(thumb);
    });

  // const embed = new Discord.RichEmbed()
  // .setColor(randomColor)
  // .setThumbnail(`${message.author.avatarURL}`)
  // .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
  // .addField("**Permission level:**", `${level}`, true)
  // .addField("**Rank:**", `${friendly}`, true);
  //
  //
  // message.channel.send()
  // const settings = client.settings.get(message.guild.id);
  // const blet = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  // const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
  // const commandNames = myCommands.keyArray();
  // const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

  // let currentCategory = "";
  // let page = [0];
  // const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
  // sorted.forEach( c => {
  //   const fgt = c.help.category.toProperCase();
  //   page++;
  //   if (currentCategory !== fgt) {
  //     const blet[page] = new Discord.RichEmbed()
  //     .setColor(randomColor)
  //     .setThumbnail(`${message.author.avatarURL}`)
  //     .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
  //     .setTitle(`**${fgt}**`);
  //     currentCategory = fgt;
  //   }
  //   output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
  // });
  // const embed = new Discord.RichEmbed()
  // .setColor('RANDOM')
  // .setAuthor(`Page | 1`, `${message.author.avatarURL}`)
  // .setTitle(`Category :: yo mom`)
  // .setDescription("Command1 - _blabla_\nCommand2 - __blerghh__");

  // message.delete();
  //
  // const blet = message.mentions.members.first() || message.guild.members.get(mention);
  // const allow = message.guild.roles.find('name', 'Talkative Kawaii !');
  // if (!blet) return message.reply("please provide a valid user.");
  // if (!rolename) return message.reply("you must specify a name for the custom role.");
  // if (!color) return message.reply("you must provide a color code for the custom role!");
  // if (!blet.roles.has(allow.id)) return message.reply('this user is not allowed to have a custom role yet! (You have to be __Talkative Kawaii__)');
  // const isHexColor = /(^#[0-9A-F]{6}$)/i.test(color);
  // if (isHexColor === false) return message.reply("The hex color you provided is invalid.");
  //
  // message.guild.createRole({
  //   name: rolename,
  //   color: color,
  //   position: 58,
  //   permissions: []
  // }).then((idk) => {
  //   message.reply(`the role has succesfully been created with the name ${rolename} and the color ${color}`).then((lul) => {
  //     lul.delete(1000);
  //   });
  //   const customrole = message.guild.roles.find('name', rolename);
  //   blet.addRole(customrole).then(() => {
  //     message.channel.send(`The role ${rolename} has succesfully been given to ${blet}!\nYou are allowed to request any changes to ur role whenever u want!`).then((pleb) => {
  //       pleb.delete(50000);
  //     });
  //   });
  // });

  // message.delete();
  // const ayy = client.emojis.find("name", "blerghh");
  // const embed = new Discord.RichEmbed()
  //     .setColor(0xFF0000)
  //     .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
  //     .setTitle(`This baka has left the server! ${ayy}`);
  //
  //     message.channel.send({embed}).then(function (msg) {
  //       const yeet = client.emojis.get("431494951868825601");
  //       msg.react(yeet.id).then(function () {
  //         msg.react("🖕");
  //       });
  //     });
  // const gay = args[0];
  // console.log(gay);
  // client.user.setAvatar(gay);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "test",
  category: "Miscellaneous",
  description: "gay",
  usage: "test"
};
