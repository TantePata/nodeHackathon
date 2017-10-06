const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.questions.findAll);

    router.get('/:id/answers',
        api.actions.answers.findAllForQuestions);

    router.get('/:id',
    api.actions.questions.findOne);

    router.post('/:id/answer',
        api.middlewares.ensureAuthenticated,
        api.middlewares.bodyParser.json(),
        api.actions.answers.createQuestionAnswer);

    router.post('/',
    api.middlewares.bodyParser.json(),
    api.actions.questions.create);

    router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.questions.update);

    router.delete('/:id',
    api.actions.questions.destroy);

    return router;
};