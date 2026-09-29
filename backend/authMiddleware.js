const jwt = require("jsonwebtoken");

function authMiddleware(request, response, next) {
    if(!request.headers.authorization){
        let newerror = new Error("Invalid")
        newerror.statusCode = 400;
        return next(newerror);
    }

    try {
        let token = request.headers.authorization.slice(7);
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        request.user = payload;
        next();
    } catch (error) {   
        error.statusCode = 401;
        next(error);
        }
}

module.exports = authMiddleware;