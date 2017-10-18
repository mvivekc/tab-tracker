const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user){
    if (err || !user) {
      res.status(403).send({
        error: 'you do not have privileges to access the resources'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}