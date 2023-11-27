const jwt = require('jsonwebtoken')

function auth(req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')

    try {
        const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
        req.user = verifikasi
        next()

    } catch (error) {
       res.stats(400).send('Invalid Token') 
    }
}

module.exports = auth