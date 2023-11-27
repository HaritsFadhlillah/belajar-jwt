const usersmodel = require('../models/usersmodel')
const bcrypt = require('bcryptjs');
const {validation} = require('../middleware/validation')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { get } = require('../routes/router');
dotenv.config()


const login = async(req, res) =>{
    try {
        const username = req.body.username
        const password = req.body.password
        const getdata = await usersmodel.findOne({
            where : {username : username}
        })
        
        if(!getdata) res.status(400).send("Username tidak ditemukan")
        const resultLogin = bcrypt.compareSync(password, getdata.password)

        if(!resultLogin) res.status(400).send("Username atau Password tidak sama")

        // Token
        const token = jwt.sign({_username: getdata.username}, process.env.TOKEN_RAHASIA)

        res.header('auth-token', token).send('Berhasil login')

    } catch (error) {
        res.status(400).send("ERROR WOY")
    }
}

const register = async(req, res) =>{
    try {
        const username = req.body.username
        const password = req.body.password
        const email = req.body.email

    // Validasi form
        const {error} = validation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

    // Jika sudah sesuai kriteria
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)

        const users = new usersmodel({
            username:username,
            password:hashedPassword,
            email:email,
        })

        const savedUser = await users.save();
        res.json(savedUser);

    } catch (error) {
        res.status(400).send("ERROR WOY")
    }
}

module.exports ={
    register,
    login
}