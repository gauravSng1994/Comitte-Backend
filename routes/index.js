const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
// Common Middleware
// keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Load Routes
const routes = {
    // views: importRoutes('./views'),
    api: importRoutes('./api'),
};

// Bind Routes
exports = module.exports = function(app) {
    app.use('*', function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
    app.options('*', function (req, res) {
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Credentials', true);
        res.sendStatus(200);
    });
    // auth
    app.post('/login',routes.api.auth.login)
    app.post('/signup',routes.api.auth.signup)
    // user
    app.get('/user',middleware.isLoggedIn,routes.api.user.getUser)
    // committee
    app.post('/committee',middleware.isLoggedIn,routes.api.committee.createCommittee);
    app.delete('/committee/:id',middleware.isLoggedIn,routes.api.committee.deleteCommittee);
}
