module.exports = (client,message,serverQueue,embed) => {
  if (!message.member.voice.channel) {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You have to be in a voice channel to stop the music!`);
    return message.channel.send(embed);
    }
    if (!serverQueue) {
      embed.setAuthor(client.user.username, client.user.avatarURL());
      embed.setColor('#f1c40f');
      embed.setDescription(`Nothing is playing.`);
      return message.channel.send(embed);
    }
  
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
};