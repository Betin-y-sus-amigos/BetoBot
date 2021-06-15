module.exports =

async function (channelID) {
  if (client.channels.cache.get(channelID) == undefined) {
    console.log("no se puede obtener " + channelID);
  }
  client.channels.cache.get(channelID).messages.fetch({ limit: 1 }).then(
    messages => {
      let lastMessage = messages.first();
      download(lastMessage.attachments.first().url)
      console.log("se descargó " + lastMessage.attachments.first().url);
    }
  ).catch(console.error);
}
