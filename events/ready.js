module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'with Alpha 1.1.4!!'
        }
    });
    console.log('Ready!');
};