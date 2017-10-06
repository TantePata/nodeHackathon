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

    function findBySubject(req, res, next) {
        if (req.role === "student"){
            findForStudent(req, res, next);
        }else {
            findForProffesseur(req, res, next);
        }

    }

    function findForProffesseur(req, res, next) {
        api.mysql.query("SELECT Lessons.id, Lessons.id_subject, Lessons.libelle, count(DISTINCT Videos.id) as nbVideo, count(DISTINCT Questions.id) as nbQuestion, count(DISTINCT Exercises.id) as nbExercise FROM Lessons\n" +
            "LEFT JOIN Videos ON Videos.id_lesson = Lessons.id\n" +
            "LEFT JOIN Questions ON Questions.id_lesson = Lessons.id\n" +
            "LEFT JOIN Exercises ON Exercises.id_lesson = Lessons.id\n" +
            "WHERE id_subject = 1\n" +
            "GROUP BY Lessons.id, Lessons.id_subject, Lessons.libelle;")
            .then(function(anotherTask) {
                if(anotherTask[0] == null){
                    return res.status(204).send(anotherTask)
                }
                return res.send(anotherTask[0]);
            }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function findForStudent(req, res, next) {
        api.mysql.query("SELECT Lessons.id, Lessons.id_subject, Lessons.libelle, count(DISTINCT Videos.id) as nbVideo, count(DISTINCT Questions.id) as nbQuestion, count(DISTINCT Exercises.id) as nbExercise FROM Lessons\n" +
            "  LEFT JOIN Videos ON (Videos.id_lesson = Lessons.id\n" +
            "                       AND Videos.id_user IN (SELECT UsersClasses.id_user FROM UsersClasses\n" +
            "  WHERE UsersClasses.id_classe IN\n" +
            "        (SELECT UsersClasses.id_classe FROM UsersClasses WHERE UsersClasses.id_user = " + req.id_user + ")\n" +
            "  GROUP BY UsersClasses.id_user)\n" +
            "                       OR (Videos.id_lesson = Lessons.id AND Videos.favorite = 1))\n" +
            "  LEFT JOIN Questions ON (Questions.id_lesson = Lessons.id\n" +
            "                          AND Questions.id_user IN (SELECT UsersClasses.id_user FROM UsersClasses\n" +
            "  WHERE UsersClasses.id_classe IN\n" +
            "        (SELECT UsersClasses.id_classe FROM UsersClasses WHERE UsersClasses.id_user = " + req.id_user + ")\n" +
            "  GROUP BY UsersClasses.id_user)\n" +
            "                          OR (Videos.id_lesson = Lessons.id AND Questions.favorite = 1))\n" +
            "  LEFT JOIN Exercises ON (Exercises.id_lesson = Lessons.id\n" +
            "                          AND Exercises.id_user IN (SELECT UsersClasses.id_user FROM UsersClasses\n" +
            "  WHERE UsersClasses.id_classe IN\n" +
            "        (SELECT UsersClasses.id_classe FROM UsersClasses WHERE UsersClasses.id_user = " + req.id_user + ")\n" +
            "  GROUP BY UsersClasses.id_user)\n" +
            "                          OR (Videos.id_lesson = Lessons.id AND Exercises.favorite = 1))\n" +
            "WHERE id_subject = " + req.params.idSub + "\n" +
            "GROUP BY Lessons.id, Lessons.id_subject, Lessons.libelle;")
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

        Lesson.findAll({
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
        Lesson
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
        Lesson.destroy({
            where: {
                id: req.params.id
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
        findBySubject,
        findOne,
        update,
        destroy
    };
};