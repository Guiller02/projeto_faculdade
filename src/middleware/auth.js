const jwt = require("jsonwebtoken");

const env = require('../../.env')



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

    jwt.verify(token, env.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: "token invalid" });
        req.userId = decoded.id
        console.log(decoded, req.userId);
        return next();
    });
};