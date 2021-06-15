require('dotenv').config();
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.fs = require('fs');
global.beto = require('require-all')(__dirname + '/cuak');
global.ajustes = "854227144925904906";
global.settingsOBJ = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  beto.fetch(ajustes);
});

client.on('message', msg => {
  if (settingsOBJ == null) {
      if (!fs.existsSync('./ajustes.txt')) {
        return
      }
      global.settingsOBJ = JSON.parse(fs.readFileSync('./ajustes.txt'));
  }
  if (msg.content.startsWith('b!')) {
    msg.content = msg.content.replace(/  /gi, " ");
    let pan = msg.content.split(" ");
    let rebanada = pan[1].toLowerCase();
    let sazonador = pan.slice(2).join(" ");

    switch (rebanada) {
      case "saluda":
        beto.saludar(msg, sazonador)
      break;
      default:
        msg.channel.send("dime");
      break;
    }
  }
});

client.on('guildMemberAdd', member => {
  let channel = client.channels.get(settingsOBJ[member.guild].saludo);
  if (!channel) return;
  channel.send("saludos " + member.toString());
});

client.login(process.env.TOKEN);
