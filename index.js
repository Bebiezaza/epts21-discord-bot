require("dotenv").config()
const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const fs = require("fs");
const ytdl = require('ytdl-core');
const embed = new Discord.MessageEmbed()

const client = new Discord.Client();
const queue = new Map();

fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split(".")[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

const help = require("./commands/help");
const hellobot = require("./commands/hellobot");
const skip = require("./commands/skip");
const stop = require("./commands/stop");
const nowPlaying = require("./commands/nowPlaying");

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content === `${prefix}help`) {
    help(client, message, embed);
    return;
  } else if (message.content === `${prefix}hellobot`) {
    hellobot(client, message, embed);
    return;
  } else if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}p`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content === `${prefix}skip`) {
    skip(client, message, serverQueue, embed);
    return;
  } else if (message.content === `${prefix}s`) {
    skip(client, message, serverQueue, embed);
    return;
  } else if (message.content === `${prefix}disconnect`) {
    stop(client, message, serverQueue, embed);
    return;
  } else if (message.content === `${prefix}dc`) {
    stop(client, message, serverQueue, embed);
    return;
  } else if (message.content === `${prefix}nowplaying`) {
    nowPlaying(client, message, serverQueue, embed);
    return;
  } else if (message.content === `${prefix}np`) {
    nowPlaying(client, message, serverQueue, embed);
    return;
  } /*else {
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setColor('#f1c40f');
    embed.setDescription(`You need to enter a valid command!`);
    message.channel.send(embed);
  }*/
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
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);

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
    embed.setDescription(`Run out of songs to play, disconnected`);
    return serverQueue.textChannel.send(embed);
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  embed.setAuthor(client.user.username, client.user.avatarURL());
  embed.setColor('#f1c40f');
  embed.setDescription(`Start playing: **${song.title}**`);
  serverQueue.textChannel.send(embed);
}

client.login(process.env.BOT_TOKEN);
