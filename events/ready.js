module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'with Alpha 1.2.4!!'
        }
    });
    console.log(`Ready! / ${client.user.username}`);
};