var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('Answer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: Sequelize.STRING,
        },
        id_parent: {
            type: Sequelize.INTEGER,
        },
        id_user: {
            type: Sequelize.INTEGER,
        },
        type_parent: {
            type: Sequelize.STRING,
        }
    });
};