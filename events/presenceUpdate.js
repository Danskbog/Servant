const Discord = require("discord.js");
const request = require("request");
const streamedRecently = new Set();

module.exports = async (client, oldMember, newMember) => {
  const settings = client.settings.get(oldMember.guild.id);
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

  if (settings.streamroleEnabled === "true") {
    const verified = newMember.guild.roles.find('id', '573459086293598209');
    const liverole = newMember.guild.roles.find('name', settings.liveRole);
    const general  = newMember.guild.channels.find('name', 'general');

    if(newMember.roles.has(verified.id)){
      if(newMember.roles.has(liverole.id)){
        if(newMember.presence.game){
          if(newMember.presence.game.streaming == null) {
            newMember.removeRole(liverole).catch(console.error);
          }
        } else {
          newMember.removeRole(liverole).catch(console.error);
        }
      }

      if(newMember.presence.game) {
        if(newMember.presence.game.streaming) {
          if(!newMember.roles.has(liverole.id)){
            newMember.addRole(liverole).catch(console.error);
          }
        }
        else if(newMember.roles.has(liverole.id)) {
          newMember.removeRole(liverole).catch(console.error);
        }
      }
    }
  }

  if (settings.streamshoutEnabled === "true"){
  if (!oldMember || !newMember) return;

  const settings = client.settings.get(oldMember.guild.id);
  const channel = oldMember.guild.channels.find("name", settings.streamChannel);

  if (!channel) return;
  if (!newMember.presence.game) return;
  const game = newMember.presence.game;
  const streamStat = game.streaming;

  if (streamStat) {
    const clientId = '<twitch api here>';
    const stremerurl = game.url;
    if (!stremerurl) return;
    const stremer = stremerurl.substr(22);
    const gaylink = stremerurl.replace('https://www.twitch.tv/', 'https://api.twitch.tv/helix/streams?user_login=');

    console.log(stremer);

    const options = {
          method: 'GET',
          url: gaylink,
          headers:
          {
              'Client-ID': clientId,
          }
        }

    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    await sleep(120000);
      request(options, function (error, response, body) {
        if (error) return;
        const data = JSON.parse(body);

        if (!data) return console.log(data);
        const strem = data.data[0];
        console.log(strem);
        const thumb = strem.thumbnail_url.replace('{width}x{height}', '384x216');
        if (streamedRecently.has(strem.title)) return;

        if (strem.game_id === "503116"){
          // if (oldMember.presence.game.name === null) return;
          if (newMember.presence.game.streaming && oldMember.presence.game.streaming) return console.log(`already streming ${newMember.user.tag}`);

          const embed = new Discord.RichEmbed()
          .setColor(randomColor)
          .setAuthor(`${newMember.user.tag}`, `${newMember.user.avatarURL}`)
          .setImage(thumb)
          .setDescription(`**Streamer:** ${strem.user_name}`)
          .addField("**Stream Title:**", `${strem.title}`, false)
          .addField("**Stream URL:**", `${game.url}`, false);

          streamedRecently.add(strem.title);
            setTimeout(() => {
              streamedRecently.delete(strem.title);
            }, 7200000);

          return newMember.guild.channels.get(channel.id).send({embed});
        }
        return console.log("not bs");
      });

    // return oldMember.channels.get(channel.id).send(`${newMember.user.tag} is now streaming! ${game.url}`).catch(console.error);
  }

  return;
  }
};
