const keystone = require('keystone');
const AWS = require('aws-sdk');
require('dotenv').config();
// const handlebars = require('express-handlebars');
keystone.init({
    'name': 'Hospital app',
    'cookie secret': process.env.COOKIE_SECRET || 'secure string goes here',
    'user model': 'User',
    'auto update': true,
    'auth': true,
    //'favicon': 'public/favicon.ico',
    'less': 'public',
    'static': 'public',
    'views': 'templates/views',
    'session': true,
    'view engine': '.hbs',
    // 'custom engine': handlebars.create({
    //     layoutsDir: 'templates/views/layouts',
    //     partialsDir: 'templates/views/partials',
    //     defaultLayout: 'default',
    //     helpers: new require('./templates/views/helpers')(),
    //     extname: '.hbs',
    // }).engine,
    'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/hospital',
    'cors allow origin': true,
    'cors allow methods': true,
    'cors allow headers': true,
});
keystone.import('models');
const s3 = new AWS.S3({
    "accessKeyId": process.env.ACCESS_KEY,
    "secretAccessKey": process.env.SECRET,
    "region": "us-west-2"
});
// AWS.config.update({
//     "accessKeyId": process.env.ACCESS_KEY,
//     "secretAccessKey": process.env.SECRET,
//     "region": "us-west-2"
// });
s3.createBucket({Bucket: 'nurse'});

keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    s3:s3,
    utils: keystone.utils,
    editable: keystone.content.editable,
    ga_property: keystone.get('ga property'),
    ga_domain: keystone.get('ga domain'),
    chartbeat_property: keystone.get('chartbeat property'),
    chartbeat_domain: keystone.get('chartbeat domain')
});
function addSafeReadOnlyGlobal(prop, val) {
    Object.defineProperty(global, prop, {
        get: function () {
            return val;
        },
        set: function () {
            console.log('You are trying to set the READONLY GLOBAL variable `', prop, '`. This is not permitted. Ignored!');
        }
    });
}
addSafeReadOnlyGlobal('_s3',s3);
keystone.set('routes', require('./routes'));
keystone.start();
