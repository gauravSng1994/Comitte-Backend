const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
// Common Middleware
// keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
// keystone.set('404', function(req, res, next) {
//     res.notfound();
// });

// Handle other errors
// keystone.set('500', function(err, req, res, next) {
//     let title, message;
//     if (err instanceof Error) {
//         message = err.message;
//         err = err.stack;
//     }
//     res.err(err, title, message);
// });

// Load Routes
const routes = {
    // views: importRoutes('./views'),
    api: importRoutes('./api'),
};

// Bind Routes
exports = module.exports = function(app) {
    // app.get('/', routes.views.index);
    app.get('/demo',routes.api.index.demo)
    app.get('/jobs',routes.api.jobs.listJobs)
    app.post('/login',routes.api.auth.login)
    app.post('/signup',routes.api.auth.signup)
    app.put('/user',routes.api.user.update)
}
