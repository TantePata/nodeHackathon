module.exports = (api) => {

    const Lesson = api.models.Lesson;

    function create(req, res, next) {

        let lesson = Lesson.build( req.body );
        lesson
            .save()
            .then(function(anotherTask) {
                return res.send(lesson);
            }).catch(function(error) {

                return res.status(500).send(error);
        })

    }

    function findAll(req, res, next) {

        Lesson.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findOne(req, res, next) {

        Lesson.findAll({
            where: {
                login: req.params.login
            }
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function update(req, res, next) {
        Lesson
            .find({ where: { login: req.params.login} })
            .then(function(user) {
                // Check if record exists in db
                if (!user) {
                    return res.status(204).send(anotherTask);
                }
                user
                    .updateAttributes(req.body)
                    .then(function (updated) {
                        return res.send(updated);
                    }).catch(function(error) {
                    return res.status(500).send(error)
                });
            });

    }

    function destroy(req, res, next) {
        Lesson.destroy({
            where: {
                login: req.params.login
            }
        }).then(function(user) {
            return res.send(user);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function findForsubject(req, res, next) {

    }


    return {
        create,
        findAll,
        findOne,
        update,
        destroy
    };
};