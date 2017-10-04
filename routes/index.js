module.exports = (api) => {
    api.use('/auth', require('./auth')(api));
    api.use('/users', require('./users')(api));
};