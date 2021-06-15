module.exports =

function (msg) {
  let embed = new Discord.MessageEmbed()
  .setTitle("Twitch: BetinRaw")
  .setAuthor("Twitch", "https://img.icons8.com/nolan/452/twitch.png")
  .setURL("https://www.twitch.tv/betinraw")
  .setColor("#6441A5")
  .setDescription("Vive tu vida haciendo lo que más te guste.")
  .setThumbnail(client.users.cache.get("466753794244345866").avatarURL({dynamic: true, size: 4096}));
  msg.channel.send(embed);
}
