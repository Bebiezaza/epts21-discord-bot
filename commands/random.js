module.exports = (message) => {
  var rand = Math.floor(Math.random() * (320000 - 1 + 1) ) + 1;
  return message.channel.send(rand + "\nThis post was made by a random number generator\nresult not guaranteed");
};