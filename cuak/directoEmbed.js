module.exports =

function () {
  let embed = new Discord.MessageEmbed()
  .setTitle("¡betinraw está en directo!")
  .setAuthor("Twitch", "https://img.icons8.com/nolan/452/twitch.png")
  .setURL("https://www.twitch.tv/betinraw")
  .setColor("#6441A5")
  .setDescription(response.data[0].title)
  .addField(response.data[0].game_name, "Espectadores: " + response.data[0].viewer_count)
  .setImage(new Discord.MessageAttachment(request(response.data[0].thumbnail_url.replace("{width}", "1920").replace("{height}", "1080"))).url)
  .setThumbnail(client.users.cache.get("466753794244345866").avatarURL({dynamic: true, size: 4096}));
  return embed;
}
