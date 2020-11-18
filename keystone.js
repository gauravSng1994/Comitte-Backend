var keystone = require('keystone');

keystone.init({
  'name': 'Hospital app',
  'cookie secret': 'secure string goes here',
  'user model': 'User',
  'auto update': true,
  'auth': true,
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': 'public',
  'views': 'templates/views',
  'view engine': 'pug',
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
keystone.start();