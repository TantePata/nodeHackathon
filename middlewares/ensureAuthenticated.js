const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const Token = api.models.Token;

    return (req, res, next) => {
        //#1 Verify authorization header exists.
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).send('authentication.required');
        }

        const encryptedToken = req.headers.authorization;

        // #2 Verify the token is valid
        jwt.verify(encryptedToken, api.settings.security.salt, null, (err, decryptedToken) => {
            if (err) {
                return res.status(401).send('invalid.token');
            }
            Token.findOne({
                where: {
                    id: decryptedToken.tokenId,
                }
            }).then(function(find) {
                if (!find) {
                    return res.status(401).send('authentication.expired');
                }

                req.id_user = find.id_user;
                req.role = find.role;
                return next();
            });

        });
    };
};