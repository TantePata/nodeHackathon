var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('exercise', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: Sequelize.STRING,
        },
        descriptions: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        link: {
            type: Sequelize.STRING,
        },
        favorite: {
            type: Sequelize.BOOLEAN,
        },
        id_user: {
            type: Sequelize.INTEGER,
        },
        id_lesson: {
            type: Sequelize.INTEGER,
        }
    });
};