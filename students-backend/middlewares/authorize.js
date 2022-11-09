const jwt = require('jsonwebtoken');
const url = require('url');

const {SECRET_KEY} = process.env;

const EXCLUDE = [
    'POST:/api/auth/login',
    'POST:/api/student/information',
    'GET:/api/student/export'
];

class Auth {

    async authorize(req, res, next) {
        try {
            const {headers: {authorization}, method} = req;

            if (method === 'OPTIONS') {
                next();
                return;
            }
            const {pathname} = url.parse(req.url);
            const exclude = EXCLUDE.some((exc) => {
                if (exc.includes('*')) {
                    return `${method}:${pathname}`.startsWith(exc.replace('*', ''));
                }
                return exc === `${method}:${pathname}`;
            });
            if (exclude) {
                next();
                return;
            }
            if (!authorization) {
                return res.status(401).send({message: "Authorization key is required", status: 'Error'});

            }
            const token = authorization.replace('Bearer ', '');
            let userId;
            try {
                const data = jwt.verify(token, SECRET_KEY);
                userId = data.id;
            } catch (e) {
                console.log(e)
            }
            if (!userId) {
                return res.status(401).send({message: "Invalid authorization key", status: 'Error'});
            }

            req.userId = userId;
            global.userId = userId;

            next();
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new Auth()
