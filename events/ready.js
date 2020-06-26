module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'with copied code'
        }
    });
    console.log('Ready!');
};