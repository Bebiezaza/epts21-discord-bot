module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'with Alpha 1.2!!'
        }
    });
    console.log('Ready!');
};