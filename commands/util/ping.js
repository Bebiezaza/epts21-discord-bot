module.exports = (message) => {
  var ping = Date.now() - message.createdTimestamp;
  return message.channel.send("Your ping is " + `${ping}` + " ms");
};