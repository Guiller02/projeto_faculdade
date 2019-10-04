exports.isStudent = async (req, res, next) => {
    const firstRegister = req.userId.charAt(0);
    console.log('está recebendo:' + req.userId)
    if (firstRegister != 'A') {
        res.status(401).send({ error: 'not authorized' });
    }
    else
        next();
}