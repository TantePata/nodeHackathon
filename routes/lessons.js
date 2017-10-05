const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.lessons.findAll);

    router.get('/:idless/videos',
        api.actions.videos.findAll);

    router.get('/:idless/exercises',
        api.actions.exercises.findAll);

    router.get('/:idless/questions',
        api.actions.questions.findAll);

    router.get('/:id',
    api.actions.lessons.findOne);

    router.post('/',
    api.middlewares.bodyParser.json(),
    api.actions.lessons.create);

    router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.lessons.update);

    router.delete('/:id',
    api.actions.lessons.destroy);

    return router;
};