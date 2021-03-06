module.exports = (api) => {

    const Question = api.models.Question;

    function create(req, res, next) {

        let question = Question.build( req.body );
        question.id_user = req.id_user;
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
    //Concat les deux et voir en fonction du role de l'user ?
    function findQuestions(req, res, next) {
        if (req.role === "student"){
            findAllByUserId(req, res, next);
        }else {
            findForProffesseur(req, res, next);
        }

    }


    function findForProffesseur(req, res, next) {

        api.mysql.query("SELECT Questions.*, Users.name, Users.surname FROM Questions\n" +
            "    LEFT JOIN Users ON Users.id = Questions.id_user\n" +
            "    WHERE Questions.id_lesson =" + req.params.idLess)
            .then(function(anotherTask) {
                if(anotherTask[0] == null){
                    return res.status(204).send(anotherTask)
                }
                return res.send(anotherTask[0]);
            }).catch(function(error) {
            return res.status(500).send(error)
        });
    }


    function findAllByUserId(req, res, next) {

        api.mysql.query("SELECT Questions.*, Users.name, Users.surname, Users.role FROM Questions\n" +
            "LEFT JOIN Users ON Users.id = Questions.id_user\n" +
            "WHERE (Questions.id_lesson = " + req.params.idLess + "\n" +
            "\tAND Questions.id_user IN (SELECT UsersClasses.id_user FROM UsersClasses\n" +
            "\t\tWHERE UsersClasses.id_classe IN\n" +
            "\t\t(SELECT UsersClasses.id_classe FROM UsersClasses WHERE UsersClasses.id_user = " + req.id_user + ")\n" +
            "\t\tGROUP BY UsersClasses.id_user))\n" +
            "OR (Questions.id_lesson = " + req.params.idLess + " AND favorite = 1)")
            .then(function(anotherTask) {
                if(anotherTask[0] == null){
                    return res.status(204).send(anotherTask)
                }
                return res.send(anotherTask[0]);
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
            .find({ where: { id: req.params.id} })
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
                id: req.params.id
            }
        }).then(function(user) {
            return res.send(user);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }



    return {
        create,
        findAll,
        findAllByUserId,
        findQuestions,
        findOne,
        update,
        destroy
    };
};