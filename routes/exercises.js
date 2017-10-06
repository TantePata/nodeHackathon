const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.exercises.findAll);

    router.get('/:id/answers',
        api.actions.answers.findAllForExercises);

    router.get('/:login',
    api.actions.exercises.findOne);

    router.post('/:id/answers',
        api.middlewares.ensureAuthenticated,
        api.middlewares.bodyParser.json(),
        api.actions.answers.createExerciseAnswer);

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