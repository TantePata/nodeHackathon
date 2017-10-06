const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.videos.findAll);

    router.get('/:id/answers',
        api.actions.answers.findAllForVideos);

    router.get('/:id',
    api.actions.videos.findOne);


    router.post('/:id/answer',
        api.middlewares.ensureAuthenticated,
        api.middlewares.bodyParser.json(),
        api.actions.answers.createVideoAnswer);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.videos.create);

    router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.videos.update);

    router.delete('/:id',
    api.actions.videos.destroy);

    return router;
};