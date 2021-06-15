require('dotenv').config();
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.fs = require('fs');
global.download = require('download-file');
global.beto = require('require-all')(__dirname + '/cuak');
global.ajustes = "854227144925904906";
global.settingsOBJ = null;

client.on('ready', () => {
  console.log(`iniciando sesión como ${client.user.tag}!`);
  beto.fetch(ajustes);
  if (settingsOBJ == null) {
      if (!fs.existsSync('./ajustes.txt')) {
        return
      }
      global.settingsOBJ = JSON.parse(fs.readFileSync('./ajustes.txt'));
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('b!')) {
    msg.content = msg.content.replace(/  /gi, " ");
    let pan = msg.content.split(" ");
    let rebanada, sazonador;
    if (pan.length >= 2) {
      rebanada = pan[1].toLowerCase();
      sazonador = pan.slice(2).join(" ");
    }

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
  let channel = client.channels.cache.get(settingsOBJ[member.guild.id].saludo);
  if (!channel) return;
  let embed = new Discord.MessageEmbed()
  .setColor("#427BF5")
  .setThumbnail(member.avatarURL({dynamic: true, size: 4096}))
  .setImage("https://github.com/Betin-y-sus-amigos/BetoBot/blob/main/pato.gif?raw=true")
  .setTitle("Bienvenido " + member.username);
  channel.send(embed);
});

client.login(process.env.TOKEN);
