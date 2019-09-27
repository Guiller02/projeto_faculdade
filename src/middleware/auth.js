const jwt = require("jsonwebtoken");

const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ error: "no token provided" });

    const parts = authHeader.split(" ");

    if (!parts.lenght === 2)
        return res.status(401).send({ error: "token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        console.log(scheme);
        return res.status(401).send({ error: "token malformatted" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: "token invalid" });
        // if (req.body.cod_student)
        //     req.cod_student = decoded.id
        // if (req.body.cod_Teacher)
        //     req.cod_Teacher = decoded.id
        req.userId = decoded.id
        console.log(decoded, req.userId);
        return next();
    });
};