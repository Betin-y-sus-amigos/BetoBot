module.exports =

function (msg, sazonador) {
  if (settingsOBJ[msg.guild.id] == undefined) {
    settingsOBJ[msg.guild.id] = {};
  }
  let canal = sazonador.match(/<#[0-9]+>/).slice(2,-1);
  if (canal == null) msg.channel.send("menciona un canal.") return;
  settingsOBJ[msg.guild.id].saludo = canal;
  msg.channel.send("saludaré a los nuevos miembros en <#" + canal + ">");
  beto.backup('ajustes.txt', ajustes);
}
