module.exports = (api) => {

    const Subject = api.models.Subject;

    function create(req, res, next) {

        let subject = Subject.build( req.body );

        subject
            .save()
            .then(function(anotherTask) {
                return res.send(subject);
            }).catch(function(error) {

                return res.status(500).send(error);
        })

    }

    function findAll(req, res, next) {

        Subject.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findOne(req, res, next) {

        Subject.findAll({
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
        Subject
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
        Subject.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            return res.send(user);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    //Concat les deux et voir en fonction du role de l'user ?
    function findSubject(req, res, next) {
        if (req.role === "student"){
            findForStudent(req, res, next);
        }else {
            findForProffesseur(req, res, next);
        }

    }

    function findForProffesseur(req, res, next) {
        api.mysql.query("SELECT * FROM Subjects\n" +
            "WHERE id_user = 1;", { model: api.models.subjects })
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
        /* si je recois la classe
SELECT * FROM Classes
LEFT JOIN ClassesSubjects ON ClassesSubjects.id_classe = Classes.id
LEFT JOIN Subjects ON Subjects.id = ClassesSubjects.id_subject
WHERE Classes.id = 1;
         */
        /* sinon ....
SELECT Subjects.* FROM Classes
  LEFT JOIN ClassesSubjects ON ClassesSubjects.id_classe = Classes.id
  LEFT JOIN Subjects ON Subjects.id = ClassesSubjects.id_subject
WHERE Classes.id = (SELECT Classes.id FROM Users
    LEFT JOIN UsersClasses ON UsersClasses.id_user = Users.id
    LEFT JOIN Classes ON Classes.id = UsersClasses.id_classe
  WHERE Users.id = 2
  ORDER BY Classes.promo DESC
  LIMIT 1 )
         */

        api.mysql.query("SELECT * FROM Classes \n"+
        "LEFT JOIN ClassesSubjects ON ClassesSubjects.id_classe = Classes.id \n"+
       "LEFT JOIN Subjects ON Subjects.id = ClassesSubjects.id_subject \n"+
        "WHERE Classes.id = 1;")
            .then(function(anotherTask) {
                if(anotherTask[0] == null){
                    return res.status(204).send(anotherTask)
                }
                return res.send(anotherTask[0]);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }


    return {
        create,
        findAll,
        findOne,
        update,
        destroy,
        findSubject
    };
};