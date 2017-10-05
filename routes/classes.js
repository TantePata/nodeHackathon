const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
    api.actions.classes.findAll);

    router.get('/:login',
    api.actions.classes.findOne);

    return router;
};