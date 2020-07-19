module.exports = (client,message,serverQueue,amountSong,embed) => {
  if (!serverQueue) {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`Nothing is currently playing!`);
    return message.channel.send(embed);
  }

  var text = "";

  song = serverQueue.songs[0];
  text = text + `Currently playing: **${song.title}**\n`;

  for (let index = 1; index < amountSong; index++) {
  song = serverQueue.songs[index];
  text = text + `\n${index}) **${song.title}**`;
  }

  if (amountSong == 0) {}
  else {
  song = serverQueue.songs[amountSong];
  text = text + `\n${amountSong}) **${song.title}**`;
  }
  
  embed.setDescription(text);

  serverQueue.textChannel.send(embed);
};