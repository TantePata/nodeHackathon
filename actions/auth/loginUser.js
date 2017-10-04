const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;
    const Token = api.models.Token;

    return function login(req, res, next) {
        // #1 trying to find the user
        let user = User.build( req.body );
        User.findOne({
            where: {
                login: user.login,
                password : sha1(user.password)
            }
        }).then(function(user) {
            // #2 no user found with this credentials. Forbidden.
            if (!user) {
                return res.status(401).send('invalid.credentials');
            }

            // #3 starting token creation.
            Token.findOne({
                where: {
                    idUser: user.login,
                    createdAt: {
                        $lt: new Date(),
                        $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                    }
                }
            }).then(function(find) {
                if(!find){
                    let token = Token.build();
                    token.idUser = user.login.toString();
                    // #4 persist the token into the database.
                    token.save()
                        .then(function (token) {
                            // #5 encrypting the token with JWT convention.
                            jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24, // 1 day.
                                    tokenId: token.id.toString() // using the ID of the token has identifier.
                                },
                                api.settings.security.salt,
                                {},
                                (err, encryptedToken) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }

                                    // #6 sending the encrypted token.
                                    Token
                                        .find({ where: { id: token.id} })
                                        .then(function(token) {
                                            // Check if record exists in db
                                            token
                                                .updateAttributes({encryptedToken : encryptedToken})
                                                .then(function (updated) {
                                                    return res.send({"encryptedToken" : encryptedToken});
                                                }).catch(function(error) {
                                                return res.status(500).send(error)
                                            });
                                        });
                                }
                            );
                        });
                }
                return res.send({"encryptedToken" : find.encryptedToken});

            });
        });
    }
};