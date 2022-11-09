const ApiError = require('../ApiError');
const {Admin} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwt = (id, email) => {
    if (id && email) {
        return jwt.sign(
            {id, email},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
    } else {
        return false;
    }
}

class Login {

    async login(req, res, next) {
        try {
            const {email, password} = JSON.parse(req.body.data);
            let token;
            const user = await Admin.findOne({where: {email}});
            if (!user) {
                return res.status(403).send({ message: "Incorrect Password or Email", status: 'Error' });
            }
            if (!bcrypt.compareSync(password, user.password)) {


                return res.status(403).send({ message: "Incorrect Password or Email", status: 'Error' });
            }
            token = generateJwt(user.id, user.email);
            const dbToken = Admin.update(
                {
                    token
                },
                {
                    where: {email}
                });
            return res.json({token, status: 'ok'})
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getToken(req, res, next) {
        try {
            const {token} = JSON.parse(req.body.data);
            console.log(token)
            const admin = Admin.findOne({where: {token}});
            if (!admin) {
                return res.status(401).send({message: "Incorrect or Invalid Token", status: 'Error'});
            }
            const verify = jwt.verify(token, process.env.SECRET_KEY);
            return res.json({status: 'ok', admin: 'verified'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new Login()
