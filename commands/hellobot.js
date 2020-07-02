module.exports = (client,message,embed) => {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`hello people`);

    return message.channel.send(embed);
};