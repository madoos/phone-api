module.exports = {
    db : {
        url : process.env.DB_URL || 'mongodb://0.0.0.0:27017/masmovil'
    },
    server : {
        port : process.env.SERVER_PORT || 3000
    }
};
