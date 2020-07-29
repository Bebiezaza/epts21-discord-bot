const prefix = process.env.PREFIX;

module.exports = (client,message,embed) => {
    embed.setAuthor(client.user.username + " - Alpha 1.2.2", client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`__**ALL COMMANDS**__\n
    __**General**__
    **${prefix}help** / **bot mentions** = display commands
    **${prefix}hellobot** = response test
    
    __**Music**__
    **${prefix}play** / **${prefix}p** = play/queue songs
    **${prefix}nowplaying** / **${prefix}np** = shows song that is playing in vc
    **${prefix}queue** / **${prefix}q** = shows queue
    **${prefix}skip** / **${prefix}s**= skip a song
    **${prefix}disconnect** / **${prefix}dc** = disconnect
    **${prefix}reset** = in case the bot decided to not play any song
    
    __**Utility**__
    **${prefix}apitest** = Discord's API responsiveness test
    **${prefix}saucerand** = source randomization, result not guaranteed
    **${prefix}random [min] [max]** / **${prefix}r [min] [max]** = random number generator`);

    return message.channel.send(embed);
};