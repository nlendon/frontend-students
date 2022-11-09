const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const bcrypt = require("bcrypt");

const Admin = sequelize.define(
    'users',
    {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        token: DataTypes.STRING
    },
    {
        defaultScope: {
            rawAttributes: {exclude: ['password']}
        }
    });
Admin.beforeCreate(async (admin) => {
    admin.password = await admin.generatePasswordHash(admin);
});
Admin.prototype.generatePasswordHash = function (admin) {
    if (admin.password) {
        return bcrypt.hash(admin.password, 10);
    }
};
const Student = sequelize.define('students', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    lecture: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING}
})

module.exports = {
    Admin, Student
}