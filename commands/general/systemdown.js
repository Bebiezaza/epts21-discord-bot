const prefix = process.env.PREFIX;

module.exports = (client,message,embed) => {
    embed.setAuthor(`T^T`, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`**I am sorry**\nbut this system is currently broken`);

    return message.channel.send(embed);
};