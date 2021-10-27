const setApiKey = (req, res, next) => {
    req.API_KEY = process.env.API_KEY;
    req.API_URL = process.env.API_URL;
    next();
};

module.exports = setApiKey;
