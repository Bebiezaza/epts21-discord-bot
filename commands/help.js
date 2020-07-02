const prefix = process.env.PREFIX;

module.exports = (client,message,embed) => {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`command list:
    **${prefix}help** = display commands
    **${prefix}hellobot** = response test
    **${prefix}play** / **${prefix}p** = play/queue songs
    **${prefix}skip** / **${prefix}s**= skip a song
    **${prefix}disconnect** / **${prefix}dc** = disconnect
    **${prefix}nowplaying** / **${prefix}np** = shows now playing song`);

    return message.channel.send(embed);
};