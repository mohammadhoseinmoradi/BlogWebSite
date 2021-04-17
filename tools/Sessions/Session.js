const url = require('url');
const generalTools = {};

generalTools.sessionChecker = function(req, res, next) {

    if (req.cookies.user_sid && req.session.user) {
        console.log(req.session.user);
        return res.redirect(`/DashboardUser/DashboardPage`)
    };
    return next()
};

generalTools.loginChecker = function(req, res, next) {
    if (!req.session.user) {
        console.log("check login User ......................");
        return res.redirect(url.format({
            pathname: "/LoginUser",
        }));
    };
    return next()
};



module.exports = generalTools;