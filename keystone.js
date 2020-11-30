var keystone = require('keystone');
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
});
keystone.import('models');
keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
    ga_property: keystone.get('ga property'),
    ga_domain: keystone.get('ga domain'),
    chartbeat_property: keystone.get('chartbeat property'),
    chartbeat_domain: keystone.get('chartbeat domain')
});
keystone.set('routes', require('./routes'));
keystone.set('cors allow origin', true);
keystone.start();
