module.exports =

async function (filename, where){
  var event = new Date();

  await client.channels.cache.get(where).send("copia de seguridad de __**" + event.toLocaleTimeString('en-US') + "**__", {
    files: [{
      attachment: filename,
      name: filename
    }]
  })
  .then()
  .catch(console.error);
}
