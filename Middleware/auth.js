const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const token = req.headers.authorization
    

    if (!token) {
        return res.status(400).send({ msg: "Login first" })
    }
    const decoded = jwt.verify(token, "secret")
    if (decoded) {
        next()
    } else {
        return res.send({ msg: "login again middleware" })
    }
}
module.exports = { auth }