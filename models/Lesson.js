var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('lesson', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        libelle: {
            type: Sequelize.STRING,
        },
        id_user: {
            type: Sequelize.INTEGER,
        },
        type_parent: {
            type: Sequelize.STRING,
        }
    });
};