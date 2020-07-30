module.exports = client => {
    client.user.setPresence({
        activity: {
            name: 'with Alpha 1.2.3_03!!'
        }
    });
    console.log('Ready!');
};