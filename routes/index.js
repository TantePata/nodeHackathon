module.exports = (api) => {
    api.use('/answers', require('./answers')(api));
    api.use('/auth', require('./auth')(api));
    api.use('/classes', require('./classes')(api));
    api.use('/exercises', require('./exercises')(api));
    api.use('/lessons', require('./lessons')(api));
    api.use('/questions', require('./questions')(api));
    api.use('/subjects', require('./subjects')(api));
    api.use('/users', require('./users')(api));
    api.use('/videos', require('./videos')(api));
};