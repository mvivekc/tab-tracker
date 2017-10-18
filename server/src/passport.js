const passport = require('passport')
const {User} = require('./models')
const config = require('./config/config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        done(new Error(), false)
      }
      done(null, user)
    } catch (e) {
      done(new Error(), false)
    }
  })
)
module.exports = null
