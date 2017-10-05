var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('token', {
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