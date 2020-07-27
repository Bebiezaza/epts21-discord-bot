module.exports = (identity,message,min,max,embed,prefix) => {
  var rand = parseInt(Math.floor(Math.random() * (max - min + 1))) + parseInt(min);
  if (identity === "source") 
  {
    return message.channel.send(rand + "\nThis post was made by a random number generator\nresult not guaranteed");
  } 
  else if (identity === "normal")
  {
    message.delete({ timeout: 100 });

    if (max === undefined)
    {
      embed.setDescription(`**You forgot the second input.\n __Usage:__ ${prefix}random [min] [max]** or **${prefix}r [min] [max]** \n\nRequested by <@!` + message.author + `>`);
    }
    else if (min > max)
    {
      embed.setDescription(`**The second input is lower than the first input.\n __Usage:__ ${prefix}random [min] [max]** or **${prefix}r [min] [max]** \n\nRequested by <@!` + message.author + `>`);
    }
    else
    {
      embed.setDescription(`__**Random:**__ ${min} to ${max} \n**= ${rand}** \n\nRequested by <@!` + message.author + `>`);
    }
    embed.setAuthor("", "");
    embed.setColor('#f1c40f');
    return message.channel.send(embed);  
  }
};