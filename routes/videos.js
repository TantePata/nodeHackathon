const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.videos.findAll);

    router.get('/:id/answers',
        api.actions.answers.findAll);

    router.get('/:id',
    api.actions.videos.findOne);

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