var Sequelize = require('sequelize');

module.exports = (api) => {

    api.mysql = new Sequelize(api.settings.db.database, api.settings.db.user, api.settings.db.password, {
        host: api.settings.db.host,
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    api.models = {
        User: require('./User')(api),
        Classe : require ('./Classe')(api),
        Token : require ('./Token')(api)
    };

    //require("./_Generatedb")(api);
    //require("./_Foreignkey")(api);

};