module.exports = (client,message,serverQueue,embed) => {
  if (!serverQueue) {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`Nothing is currently playing!`);
    return message.channel.send(embed);
  }

  song = serverQueue.songs[0];
  embed.setAuthor(client.user.username, client.user.avatarURL());
  embed.setColor('#f1c40f');
  embed.setDescription(`Currently playing: **${song.title} (${song.url})**`);
  serverQueue.textChannel.send(embed);
};