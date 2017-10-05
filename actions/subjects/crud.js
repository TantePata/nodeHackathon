module.exports = (api) => {

    const Subject = api.models.User;

    function create(req, res, next) {

        let subject = Subject.build( req.body );
        subject.password = sha1(subject.password);
        Subject.findAll({
            where: {
                login: subject.login // libelle selon prof?
            }
        }).then(function(anotherTask) {
            if(anotherTask[0] != null){
                return res.status(401).send('libelle.already.exists');
            }
            subject
                .save()
                .then(function(anotherTask) {
                    return res.send(subject);
                }).catch(function(error) {

                    return res.status(500).send(error);
            })

        }).catch(function(error) {
            return res.status(500).send(error)
        });


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
        Subject
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
        Subject.destroy({
            where: {
                login: req.params.login
            }
        }).then(function(user) {
            return res.send(user);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    //Concat les deux et voir en fonction du role de l'user ?
    function findForProffesseur(req, res, next) {


    }
    function findForStudent(req, res, next) {


    }


    return {
        create,
        findAll,
        findOne,
        update,
        destroy
    };
};