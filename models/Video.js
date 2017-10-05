var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('video', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descriptions: {
            type: Sequelize.STRING,
        },
        favorite: {
            type: Sequelize.STRING,
        },
        id_user: {
            type: Sequelize.STRING,
        },
        link: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        }
    });
};