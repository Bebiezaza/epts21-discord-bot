module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'with Alpha 1.1.3!!'
        }
    });
    console.log('Ready!');
};