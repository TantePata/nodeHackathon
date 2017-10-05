var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('question', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_lesson: {
            type: Sequelize.INTEGER,
        },
        id_user: {
            type: Sequelize.INTEGER,
        },
        libelle: {
            type: Sequelize.STRING,
        },
        favorite: {
            type: Sequelize.BOOLEAN,
        }
    });
};