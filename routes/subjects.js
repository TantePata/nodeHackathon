const router = require('express').Router();

module.exports = (api) => {
    router.post('/',
    api.actions.subjects.findAll);

    router.get('/:idSub/lesson',
    api.actions.lessons.findBySubject);

    router.get('/:id',
    api.actions.subjects.findOne);

    router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.subjects.update);

    router.delete('/:id',
    api.actions.subjects.destroy);

    return router;
};