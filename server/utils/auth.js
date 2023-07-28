//importing json web token
const jwt = require('jsonwebtoken');

//creating secret for json web token
const secret = 'superdupersecret';
const expiration = '24h';

//creating authMiddleware function
module.exports = {
    authMiddleware: function ({ req }) {
    //allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    //separating "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    //if no token, return request object as is
    if (!token) {
        return req;
    }

    try {
        //decode and attach user data to request object
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.log('Invalid token');
    }

    //return updated request object
    return req;
},
//function for creating token
signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
},
};