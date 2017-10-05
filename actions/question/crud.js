module.exports = (api) => {

    const Question = api.models.Question;

    function create(req, res, next) {

        let question = Question.build( req.body );
        question
            .save()
            .then(function(anotherTask) {
                return res.send(question);
            }).catch(function(error) {

                return res.status(500).send(error);
        })

    }

    function findAll(req, res, next) {

        Question.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findOne(req, res, next) {

        Question.findAll({
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
        Question
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
        Question.destroy({
            where: {
                login: req.params.login
            }
        }).then(function(user) {
            return res.send(user);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    /**
     * Condition:
     * id_lesson
     * and (
     * verif une des classe de la personne a acces a la matiere (en jointant sur lesson ?)
     *     or
     * Question Favorite
     * )
     */
    function findForLesson(req, res, next) {
    }


    return {
        create,
        findAll,
        findOne,
        update,
        destroy,
        findProfile
    };
};