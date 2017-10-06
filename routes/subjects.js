const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.middlewares.ensureAuthenticated,
    api.actions.subjects.findSubject);

    router.get('/:idSub/lesson',
    api.middlewares.ensureAuthenticated,
    api.actions.lessons.findBySubject);

    router.get('/:id',
    api.actions.subjects.findOne);

    router.post('/',
    api.middlewares.bodyParser.json(),
    api.actions.subjects.create);

    router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.subjects.update);

    router.delete('/:id',
    api.actions.subjects.destroy);

    return router;
};