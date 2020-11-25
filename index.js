require("dotenv").config()

//import
///modules
const Discord = require('discord.js');
const fs = require("fs");
const ytdl = require('ytdl-core');
///general
const help = require("./commands/general/help");
const hellobot = require("./commands/general/hellobot");
///music
const skip = require("./commands/music/skip");
const stop = require("./commands/music/stop");
const nowPlaying = require("./commands/music/nowPlaying");
const playQueue = require("./commands/music/queue");
const remove = require("./commands/music/remove");
const reset = require("./commands/music/reset");
///util
const ping = require("./commands/util/ping");
const random = require("./commands/util/random");
const purge = require("./commands/util/purge");

const dead = require("./commands/general/systemdown");

//constant
const prefix = process.env.PREFIX;
const client = new Discord.Client();
const embed = new Discord.MessageEmbed();

const queue = new Map();

//variable
var amountSong = 0;

//init
fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split(".")[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

//get command
client.on("message", async message => {
  const serverQueue = queue.get(message.guild.id);
  if (message.author.bot) return; //don't continue if made by bot

  if (message.content.startsWith("<@!" + client.user.id + ">" + " purge")) {
    const args = message.content.split(" ");
    purge(client, message, embed, args[2]);
    return;
  }
  
  //help by bot mention
  if (message.content === "<@!" + client.user.id + ">") {
    help(client, message, embed);
    return;
  }

  if (!message.content.startsWith(prefix)) return; //don't continue if it doesn't start with prefix
  
  //general
  if (message.content === `${prefix}help`)
  {
    help(client, message, embed);
    return;
  } 
  else if (message.content === `${prefix}hellobot`)
  {
    hellobot(client, message, embed);
    return;
  } 
  //music
  else if (message.content.startsWith(`${prefix}play`) || message.content.startsWith(`${prefix}p`))
  {
    dead(client, message, embed);//execute(message, serverQueue);
    return;
  }
  else if (message.content === `${prefix}skip` || message.content === `${prefix}s`)
  {
    dead(client, message, embed);//skip(client, message, serverQueue, embed);
    return;
  }
  else if (message.content === `${prefix}disconnect` || message.content === `${prefix}dc`)
  {
    dead(client, message, embed);//stop(client, message, serverQueue, embed);
    return;
  }
  else if (message.content === `${prefix}nowplaying` || message.content === `${prefix}np`)
  {
    dead(client, message, embed);//nowPlaying(client, message, serverQueue, embed);
    return;
  }
  else if (message.content === `${prefix}queue` || message.content === `${prefix}q`)
  {
    dead(client, message, embed);//playQueue(client, message, serverQueue, amountSong, embed);
    return;
  } 
  else if (message.content.startsWith(`${prefix}remove`))
  {
    //const args = message.content.split(" ");
    dead(client, message, embed);//remove(client, message, serverQueue, args[1], embed)
    return;
  } 
  else if (message.content === `${prefix}reset`)
  {
    dead(client, message, embed);//reset(client, message, queue, embed);
    return;
  } 
  //util
  else if (message.content === `${prefix}apitest`)
  {
    ping(message);
    return;
  }
  else if (message.content === `${prefix}saucerand`)
  {
    random("sauce", message, 1, 320000);
    return;
  }
  else if (message.content.startsWith(`${prefix}random`) || message.content.startsWith(`${prefix}r`))
  {
    const randargs = message.content.split(" ");
    random("normal", message, randargs[1], randargs[2], embed, prefix);
  }
  //not a valid command
  else
  {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You need to enter a valid command!`);
    message.channel.send(embed);
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You need to be in a voice channel to play music!`);
    return message.channel.send(embed);
  }
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`I need the permissions to join and speak in your voice channel!`);
    return message.channel.send(embed);
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  message.channel.send(url);

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;

      amountSong = amountSong + 1;

      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);

    amountSong = amountSong + 1;

    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`**${song.title}** has been added to the queue`);
    return message.channel.send(embed);
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`Disconnected`);
    return serverQueue.textChannel.send(embed);
  } 
  else if (song.url == "deleted")
  {
    serverQueue.songs.shift();
    amountSong = amountSong - 1;
    play(guild, serverQueue.songs[0]);
  } 
  else 
  {
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
        
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  amountSong = amountSong - 1;

  embed.setAuthor(client.user.username, client.user.avatarURL());
  embed.setColor('#f1c40f');
  embed.setDescription(`Start playing: **${song.title}**`);
  serverQueue.textChannel.send(embed);
  }
}

client.login(process.env.BOT_TOKEN);
