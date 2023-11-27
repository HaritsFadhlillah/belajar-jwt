const sequelize = require('sequelize')
const db = require('../config/db')

const usersmodel = db.define(
    "users",
    {
        username:{type:sequelize.STRING},
        password:{type:sequelize.STRING},
        email:{type:sequelize.STRING}
    }
);


module.exports = usersmodel