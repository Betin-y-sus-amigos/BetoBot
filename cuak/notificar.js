module.exports =

function (msg, sazonador) {
  if (msg.channel.type != "text") {
    msg.channel.send("comando solo válido en un servidor.");
    return
  }
  if (settingsOBJ[msg.guild.id] == undefined) {
    settingsOBJ[msg.guild.id] = {};
  }
  let canal = sazonador.match(/<#[0-9]+>/);
  if (canal == null) {
    msg.channel.send("menciona un canal.");
    return
  }
  settingsOBJ[msg.guild.id].notificaciones = canal[0].slice(2,-1);
  msg.channel.send("notificaré de los directos de beto en " + canal);
  fs.writeFile('./ajustes.txt', JSON.stringify(settingsOBJ), console.error);
  beto.backup('ajustes.txt', ajustes);
}
