module.exports =

function (msg) {
  request.get(streamOptions, (err, res, body) => {
		if(err) {
			return console.log(err);
		}
    let response = JSON.parse(body);
    if (response.data.length < 1) { msg.channel.send("no hay"); return };
    request(response.data[0].thumbnail_url.replace("{width}", "1920").replace("{height}", "1080")).pipe(fs.createWriteStream('./directo.jpg')).on('close', ()=>{
      let someImage = new Discord.MessageAttachment(fs.createReadStream('./directo.jpg'));
      client.channels.cache.get(MINIS).send(someImage).then( messymessage => {
        let embed = beto.directoEmbed(response, messymessage);
        msg.channel.send(embed);
      });
    });
	});
}
