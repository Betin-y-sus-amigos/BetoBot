module.exports =

function (msg) {
  if (msg.author.id != "265257341967007758" && msg.author.id != "466753794244345866") { msg.channel.send("eso es un comando de admin"); return};
  msg.channel.send('me mori');

  setTimeout(()=>{client.destroy()},1000);
  setTimeout(()=>{process.exit()},3600000);
}
