const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.users.findAll);

    router.get('/:login',
    api.actions.users.findOne);

    router.post('/',
    api.middlewares.bodyParser.json(),
    api.actions.users.create);

    router.put('/:login',
    api.middlewares.bodyParser.json(),
    api.actions.users.update);

    router.delete('/:login',
    api.actions.users.destroy);

    return router;
};