module.exports =

function (msg, sazonador) {
  if (msg.channel.type != "text") {
    msg.channel.send("comando solo válido en un servidor.");
    return
  }
  if (settingsOBJ[msg.guild.id] == undefined) {
    settingsOBJ[msg.guild.id] = {};
  }
  let rol = sazonador.match(/<@&[0-9]+>/);
  if (rol == null) {
    msg.channel.send("menciona un rol.");
    return
  }
  settingsOBJ[msg.guild.id].menciona = rol[0];
  msg.channel.send("notificaré de los directos de beto a " + rol);
  fs.writeFile('./ajustes.txt', JSON.stringify(settingsOBJ), console.error);
  beto.backup('ajustes.txt', ajustes);
}
