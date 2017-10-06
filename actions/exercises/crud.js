module.exports = (api) => {

    const Exercise = api.models.Exercise;

    function create(req, res, next) {
        //TODO a verifier
        let exercice = Exercise.build( req.body );

        exercice.id_user = req.id_user;
        exercice
            .save()
            .then(function(anotherTask) {
                return res.send(exercice);
            }).catch(function(error) {

                return res.status(500).send(error);
        })

    }

    function findAll(req, res, next) {

        Exercise.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    //Concat les deux et voir en fonction du role de l'user ?
    function findExercises(req, res, next) {
        if (req.role === "student"){
            findAllByUserId(req, res, next);
        }else {
            findForProffesseur(req, res, next);
        }

    }
    function findForProffesseur(req, res, next) {


        api.mysql.query("SELECT Exercises.*, Users.name, Users.surname FROM Exercises\n" +
            "    LEFT JOIN Users ON Users.id = Exercises.id_user\n" +
            "    WHERE Exercises.id_lesson =" + req.params.idLess)
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

        api.mysql.query("SELECT Exercises.*, Users.name, Users.surname, Users.role FROM Exercises\n" +
            "LEFT JOIN Users ON Users.id = Exercises.id_user\n" +
            "WHERE (Exercises.id_lesson = " + req.params.idLess + "\n" +
            "\tAND Exercises.id_user IN (SELECT UsersClasses.id_user FROM UsersClasses\n" +
            "\t\tWHERE UsersClasses.id_classe IN\n" +
            "\t\t(SELECT UsersClasses.id_classe FROM UsersClasses WHERE UsersClasses.id_user = " + req.id_user + ")\n" +
            "\t\tGROUP BY UsersClasses.id_user))\n" +
            "OR (Exercises.id_lesson = " + req.params.idLess + " AND favorite = 1)")
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

        Exercise.findAll({
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

    function update(req, res, next) {
        Exercise
            .find({ where: { login: req.params.id} })
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
        Exercise.destroy({
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
        findExercises,
        findOne,
        update,
        destroy
    };
};