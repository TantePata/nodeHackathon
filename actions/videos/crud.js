module.exports = (api) => {

    const Video = api.models.Video;
    function create(req, res, next) {

        let video = Video.build( req.body );

        video.id_user = req.id_user;
        video
        .save()
        .then(function(anotherTask) {
            return res.send(video);
        }).catch(function(error) {

            return res.status(500).send(error);
        })

    }

    function findAll(req, res, next) {

        Video.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    //Concat les deux et voir en fonction du role de l'user ?
    function findVideos(req, res, next) {
        if (req.role === "student"){
            findAllByUserId(req, res, next);
        }else {
            findForProffesseur(req, res, next);
        }

    }
    function findForProffesseur(req, res, next) {

        Video.findAll({
            where: {
                id_user: req.user_id
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

    function findAllByUserId(req, res, next) {

        api.mysql.query("SELECT Videos.*, Users.name, Users.surname, Users.role FROM Videos\n" +
            "LEFT JOIN Users ON Users.id = Videos.id_user\n" +
            "WHERE (Videos.id_lesson = " + req.params.idLess + "\n" +
            "\tAND Videos.id_user IN (SELECT UsersClasses.id_user FROM UsersClasses\n" +
            "\t\tWHERE UsersClasses.id_classe IN\n" +
            "\t\t(SELECT UsersClasses.id_classe FROM UsersClasses WHERE UsersClasses.id_user = " + req.id_user + ")\n" +
            "\t\tGROUP BY UsersClasses.id_user))\n" +
            "OR (Videos.id_lesson = " + req.params.idLess + " AND favorite = 1)")
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

        Video.findAll({
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
        Video
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
        Video.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            return res.send(user);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function findForLesson(req, res, next) {

    }


    return {
        create,
        findAll,
        findOne,
        update,
        findAllByUserId,
        findVideos,
        destroy
    };
};