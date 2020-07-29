module.exports = (client,message,queue,embed) => {
const serverQueue = queue.get(message.guild.id);
    serverQueue.voiceChannel.leave();
    queue.delete(message.guild.id);
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`Reseted, you now should be able to play songs again (yay)`);
    return serverQueue.textChannel.send(embed);
};