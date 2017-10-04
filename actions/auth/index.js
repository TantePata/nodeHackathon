module.exports = (api) => {
    return {
        login: require('./login')(api),
        loginUser: require('./loginUser')(api),
        logout: require('./logout')(api)
    };
};