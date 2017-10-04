module.exports = (api) => {
    api.middlewares = {
        ensureAuthenticated: require('./ensureAuthenticated')(api),
        checkEmployee: require('./checkEmployee')(api),
        bodyParser: require('body-parser')
    };
};
