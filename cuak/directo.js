module.exports =

function (msg) {
  let embed = new Discord.MessageEmbed()
  .setTitle("Twitch: BetinRaw")
  .setURL("https://www.twitch.tv/betinraw")
  .setColor("#6441A5")
  .setThumbnail(client.users.cache.get("466753794244345866").avatarURL({dynamic: true, size: 4096}));
  msg.channel.send(embed);
}
