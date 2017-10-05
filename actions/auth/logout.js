module.exports = (api) => {
    const Token = api.models.Token;

    return function logout(req, res, next) {
        Token.destroy({
            where: {
                id_user: req.id_user
            }
        })
        .then(function(result){
            if(!result){
                return res.status(200).send("No token found");
            }
            return res.status(200).send({result: result});
        })
        .catch(function(err){
            return res.status(500).send("Error : " + err);
        });
    }
};