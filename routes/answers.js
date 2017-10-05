const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.answers.findAll);

    router.get('/:id',
    api.actions.answers.findOne);

    router.post('/',
    api.middlewares.bodyParser.json(),
    api.actions.answers.create);

    router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.answers.update);

    router.delete('/:id',
    api.actions.answers.destroy);

    return router;
};