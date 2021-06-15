require('dotenv').config();
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.fs = require('fs');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('b!')) {
    msg.reply('Aquibeto.');
  }
});

client.login(process.env.TOKEN);
