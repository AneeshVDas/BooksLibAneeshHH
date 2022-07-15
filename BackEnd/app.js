const EXPRESS = require('express');
const cors = require('cors');
var bodyparser=require('body-parser');
const express =  require('express');

const CONFIG = require('./config/config');
const PORT = process.env.PORT ||8000;
let env = 'development';

const APP = EXPRESS();
APP.use(cors());
APP.use(bodyparser.json());

const path = require('path');
APP.use(express.static(`./dist/client`));
APP.use(express.urlencoded({extended: true}));
APP.use(express.json());

require('./config/database.config')(CONFIG[env]);
require('./config/express')(APP);
require('./config/routes')(APP);

APP.get('/*', function(req, res){
    console.log(path.join(__dirname + '/dist/client/index.html'));
});

APP.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
//console.log(CONFIG[env]);