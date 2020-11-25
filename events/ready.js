module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'Music System Broken'
        }
    });
    console.log(`Ready! / ${client.user.username}`);
};