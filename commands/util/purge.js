module.exports = (client,message,embed,args) => {
  if (!args)
  {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You haven\'t given the amount of messages which should be deleted!`);
    message.delete();
    message.channel.send(embed);
  }
  else if(args < 1)
  {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You have to delete at least 1 message!`);
    message.delete();
    message.channel.send(embed);
  }
  else if(args > 99)
  {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You can\`t delete more than 99+1 messages at once!`);
    message.delete();
    message.channel.send(embed);
  }
  else
  {
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES'))
    {
      message.channel.bulkDelete(parseInt(args, 10) + parseInt('1', 10));
    }
    else
    {
      embed.setAuthor(client.user.username, client.user.avatarURL());
      embed.setColor('#f1c40f');
      embed.setDescription(`You don\'t have the permission to delete messages`);
      message.delete();
      message.channel.send(embed);
    }  
  }
};