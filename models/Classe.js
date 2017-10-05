var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('Classe', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        promo: {
            type: Sequelize.DATE,
            allowNull: false
        },
        years: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        speciality: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
};