
module.exports = (api) => {

    const Answer = api.models.Answer;
    function create(req, res, next) { //TODO a verifier

        let answer = Answer.build( req.body );
        answer
            .save()
            .then(function(anotherTask) {
                return res.send(answer);
            }).catch(function(error) {

            return res.status(500).send(error);
        })

    }

    function createAnswer(req, res, next, parent) {

        let answer = Answer.build( req.body );
        answer.id_parent = req.params.id;
        answer.id_user = req.id_user;
        answer.type_parent = parent;
        answer
            .save()
            .then(function(anotherTask) {
                return res.send(answer);
            }).catch(function(error) {

            return res.status(500).send(error);
        })

    }

    function createQuestionAnswer(req, res, next) {
        createAnswer(req, res, next, "Questions")
    }
    function createExerciseAnswer(req, res, next) {
        createAnswer(req, res, next, "Exercises")
    }
    function createVideoAnswer(req, res, next) {
        createAnswer(req, res, next, "Videos")
    }

    function findAll(req, res, next) {

        Answer.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findOne(req, res, next) {

        Answer.findAll({
            where: {
                id: req.params.id
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
    function findAllForQuestions(req, res, next) {
        findallForParent(req, res, next, "Questions")
    }
    function findAllForExercises(req, res, next) {
        findallForParent(req, res, next, "Exercises")
    }
    function findAllForVideos(req, res, next) {
        findallForParent(req, res, next, "Videos")
    }

    /**
     *
     id_parent: req.params.id,
     type_parent: parent
     * @param req
     * @param res
     * @param next
     * @param parent
     */
    function findallForParent(req, res, next, parent) {

        api.mysql.query("SELECT Answers.* , Users.name, Users.surname FROM Answers\n" +
            " LEFT JOIN Users ON Users.id = Answers.id_user\n" +
            "WHERE Answers.id_parent = " + req.params.id + " AND Answers.type_parent = '" + parent + "'")
            .then(function(anotherTask) {
                if(anotherTask[0] == null){
                    return res.status(204).send(anotherTask)
                }
                return res.send(anotherTask[0]);
            }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function update(req, res, next) {
        Answer
            .find({ where: { id: req.params.id} })
            .then(function(answer) {
                // Check if record exists in db
                if (!answer) {
                    return res.status(204).send('??');
                }
                answer
                    .updateAttributes(req.body)
                    .then(function (updated) {
                        return res.send(updated);
                    }).catch(function(error) {
                    return res.status(500).send(error)
                });
            });

    }

    function destroy(req, res, next) {
        Answer.destroy({
            where: {
                id: req.params.id
            }
        }).then(function() {
            return res.status(200).send("{toto:toto}");
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    /**
     *condition:
     * type_parent
     * id_parent
     * favoris
     */
    function getAnswer(req, res, next) {


    }


    return {
        create,
        createQuestionAnswer,
        createExerciseAnswer,
        createVideoAnswer,
        findAll,
        findAllForVideos,
        findAllForExercises,
        findAllForQuestions,
        findOne,
        update,
        destroy
    };
};