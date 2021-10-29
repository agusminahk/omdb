const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send('Realiza loggin primero');
};

module.exports = checkAuth;
