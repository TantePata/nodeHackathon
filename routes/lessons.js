const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.lessons.findAll);

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