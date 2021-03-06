var Sequelize = require('sequelize');
const sha1 = require('sha1');

module.exports = (api) => {

    return api.mysql.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        surname: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING,
        },
        mail: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        }
    });
};