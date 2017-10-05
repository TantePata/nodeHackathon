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
        Answer: require('./Answer')(api),
        Classe : require ('./Classe')(api),
        Exercise: require('./Exercise')(api),
        Lesson: require('./Lesson')(api),
        Question: require('./Question')(api),
        Subject: require('./Subject')(api),
        User: require('./User')(api),
        Video : require ('./Video')(api),
        Token : require ('./Token')(api)
    };

    //require("./_Generatedb")(api);
    //require("./_Foreignkey")(api);

};