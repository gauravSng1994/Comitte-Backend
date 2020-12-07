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
    // app.get('/', routes.views.index);
    app.get('/demo',routes.api.index.demo)
    app.get('/jobs',routes.api.jobs.listJobs)

    // auth
    app.post('/login',routes.api.auth.login)
    app.post('/signup',routes.api.auth.signup)
    app.post('/resetPassword',routes.api.auth.resetPassword)
    app.post('/feedback',middleware.isLoggedIn,routes.api.feedback.createFeedback)
    app.post('/referFriend',middleware.isLoggedIn,routes.api.referral.createReferral)



    app.get('/departments',routes.api.department.listDepartments)
    app.get('/hospitals',routes.api.hospital.listHospitals)

    // user
    app.get('/user',middleware.isLoggedIn,routes.api.user.getUser)
    app.get('/nurses',middleware.isLoggedIn,routes.api.user.listNurses)
    app.put('/user',middleware.isLoggedIn,routes.api.user.updateUser)

    // jobAssignments
    app.get('/jobs/nurses', middleware.isLoggedIn, routes.api.jobAssignment.listJobOfNurses)
}
