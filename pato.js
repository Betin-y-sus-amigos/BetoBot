require('dotenv').config();
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.fs = require('fs');
global.download = require('download-file');
global.request = require('request');

global.MINIS = "858933837764886528";

global.beto = require('require-all')(__dirname + '/cuak');
global.ajustes = "854227144925904906";
global.settingsOBJ = null;

global.GET_TOKEN = "https://id.twitch.tv/oauth2/token";
global.GET_STREAM = "https://api.twitch.tv/helix/streams";

global.DIRECTOS = "854984443046658048";

getToken = (url, callback) => {
	const options = {
		url: GET_TOKEN,
		json: true,
		body: {
			client_id: process.env.TWITCH,
			client_secret: process.env.TWITCHSECRET,
			grant_type: "client_credentials"
		}
	};

	request.post(options, (err, res, body) => {
		if(err) {
			return console.log(err);
		}

		callback(res);
	});
};

global.AT = '';
getToken(GET_TOKEN,(res) => {
	console.log(res.body);
	global.AT = res.body.access_token;
	global.streamOptions = {
		url: GET_STREAM,
		method: "GET",
		headers: {
			'Client-ID': process.env.TWITCH,
				'Authorization': 'Bearer ' + AT
				},
				qs: {
			'user_login': 'betinraw'
		}
	}
});

const getStream = () => {
  request.get(streamOptions, (err, res, body) => {
		if(err) {
			return console.log(err);
		}
		console.log(`Status: ${res.statusCode}`);
		let response = JSON.parse(body);
		if (response.data.length < 1) return;
		request(response.data[0].thumbnail_url.replace("{width}", "1920").replace("{height}", "1080")).pipe(fs.createWriteStream('./directo.jpg')).on('close', ()=>{
      let someImage = new Discord.MessageAttachment(fs.createReadStream('./directo.jpg'));
				client.channels.cache.get(DIRECTOS).messages.fetch({ limit: 1 }).then(
					messages => {
						let shouldReNotify = messages.first().content;
						console.log("el directo actual data de " + response.data[0].started_at + " => " + response.data[0].game_name);
						if (shouldReNotify == response.data[0].started_at + " => " + response.data[0].game_name) {
							console.log("ya hay una notificación del mismo");
							return;
						}
						client.channels.cache.get(MINIS).send(someImage).then( messymessage => {
							for (servidor in settingsOBJ) {
								let channel = client.channels.cache.get(settingsOBJ[servidor].notificaciones);
								if (!channel) return;

								let embed = beto.directoEmbed(response, messymessage);
								channel.send(settingsOBJ[servidor].menciona, embed);
							}
							client.channels.cache.get(DIRECTOS).send(response.data[0].started_at + " => " + response.data[0].game_name);
						});
					}
				).catch(console.error);
		});
	});
};

client.on('ready', async () => {
  	console.log(`iniciando sesión como ${client.user.tag}!`);
  	await beto.fetch(ajustes);
    if (!fs.existsSync('./ajustes.txt')) {
    	return
    }
	global.settingsOBJ = JSON.parse(fs.readFileSync('./ajustes.txt'));
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
      	case "notifica":
        	beto.notificar(msg, sazonador)
      	break;
		case "menciona":
        	beto.mencionar(msg, sazonador)
      	break;
      	case "directo":
        	beto.directo(msg)
      	break;
		case "muere":
        	beto.morir(msg)
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
  .setDescription("ponte cómodo, beto y su bot te dan la bienvenida.\ncheca el canal de beto en twitch:\nhttps://www.twitch.tv/betinraw")
  .setThumbnail(member.user.avatarURL({dynamic: true, size: 4096}))
  .setImage("https://github.com/Betin-y-sus-amigos/BetoBot/blob/main/patosaludando.gif?raw=true")
  .setTitle("Bienvenido " + member.user.username);
  channel.send(embed);
});

setInterval(
  function(){
	 if (settingsOBJ === null || Object.keys(settingsOBJ).length === 0) {
		console.log('objeto global de ajustes recargado');
		global.settingsOBJ = JSON.parse(fs.readFileSync('./ajustes.txt'));
	 }
    getStream()
  },
  60000
);

setInterval(
  function(){
    getToken(GET_TOKEN,(res) => {
    	console.log(res.body);
    	global.AT = res.body.access_token;
			global.streamOptions = {
				url: GET_STREAM,
				method: "GET",
				headers: {
					'Client-ID': process.env.TWITCH,
						'Authorization': 'Bearer ' + AT
						},
						qs: {
					'user_login': 'betinraw'
				}
			}
    });
  },
  5000000
)

client.login(process.env.TOKEN);
