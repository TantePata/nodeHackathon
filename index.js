const express = require('express');
const api = express();

require("./settings")(api);
require("./models")(api);
require("./middlewares")(api);
require("./actions")(api);
require("./routes")(api);

//console.log(`Api listening on port ${api.settings.port}`);
api.listen(api.settings.port);

/**
 * TODO:
 * voire pour les jointure ( veriffier que les ele non acces que a leurs contenue)
 * faire les test
 */