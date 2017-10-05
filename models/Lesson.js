var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('Lesson', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_subject: {
            type: Sequelize.INTEGER,
        },
        libelle: {
            type: Sequelize.STRING,
        }
    });
};