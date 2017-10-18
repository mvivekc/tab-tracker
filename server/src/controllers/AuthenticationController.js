const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function userToken(userJson) {
  return jwt.sign(userJson, config.authentication.jwtSecret, {
    expiresIn: 24 * 7 * 60 * 60
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: userToken(userJson)
      })
    } catch (error) {
      res.status(403).send({
        error: 'This email account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The account information is incorrect'
        })
      }
      let isPasswordValid = await user.comparePasswords(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The account information is incorrect'
        })
      }
      const userJson = user.toJSON()
      return res.send({
        user: userJson,
        token: userToken(userJson)
      })
    } catch (error) {
      res.status(500).send({
        error: 'Error occurred while db'
      })
    }
  }
}
