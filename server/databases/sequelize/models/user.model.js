const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { JWT_EXPIRE, JWT_SECRET } = require('../../../common/config');
const dayjs = require('dayjs');

const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  const userSchema = sequelize.define(
    'user',
    {
      // The following specification of the 'id' attribute could be omitted
      // since it is the default.
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      role: {
        type: DataTypes.ENUM,
        values: ['user', 'publisher', 'admin'],
        defaultValue: 'user'
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpire: DataTypes.DATE
    },
    {
      tableName: 'users',
      underscored: true,
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      instanceMethods: {
        getSignedJwtToken: function () {
          return jwt.sign({ id: this._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE
          });
        },
        matchPassword: async function (enteredPassword) {
          return await bcrypt.compare(enteredPassword, this.password);
        },
        getResetPasswordToken: function () {
          // Generate token
          const resetToken = crypto.randomBytes(20).toString('hex');
          // Hash token and set to resetPasswordToken field
          this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
          // Set expire
          this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
          return resetToken;
        }
      }
    }
  );
};
