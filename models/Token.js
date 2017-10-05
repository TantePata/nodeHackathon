var Sequelize = require('sequelize');

module.exports = (api) => {
// TODO crée la table !
    return api.mysql.define('Token', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: Sequelize.STRING,
            allowNull: false
        },
        encryptedToken: {
            type: Sequelize.STRING,
        }
    });
};