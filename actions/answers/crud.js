
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
            return res.send();
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
        findAll,
        findOne,
        update,
        destroy
    };
};