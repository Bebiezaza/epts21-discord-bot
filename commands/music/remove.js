module.exports = (client,message,serverQueue,removeSong,embed) => {
  if (removeSong === `0`) {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You cannot remove the song that is currently playing!`);
    return message.channel.send(embed);
  }
  else
  {
  song = serverQueue.songs[removeSong];

  embed.setAuthor(client.user.username, client.user.avatarURL());
  embed.setColor('#f1c40f');
  embed.setDescription(`**${song.title}** removed`);

  song.title = "~~deleted~~";
  song.url = "deleted";

  serverQueue.textChannel.send(embed);
  }
};