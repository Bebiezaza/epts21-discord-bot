module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'with Alpha 1.2.1!!'
        }
    });
    console.log('Ready!');
};