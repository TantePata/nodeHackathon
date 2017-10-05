const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.exercises.findAll);

    router.get('/:login',
    api.actions.exercises.findOne);

    router.post('/',
    api.middlewares.bodyParser.json(),
    api.actions.exercises.create);

    router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.exercises.update);

    router.delete('/:id',
    api.actions.exercises.destroy);

    return router;
};