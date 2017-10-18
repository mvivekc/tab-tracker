const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema =  {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send( {
            error: 'You must provide a valid email'
          })
          break
        case 'password':
          res.status(400).send({
            error: `
            The password needs to be all of the following: 
            <br>
            1: It must be alphanumeric.
            <br>
            2: It must have a range 8-32.
            `
          })
          break
        default:
          res.status(400).send({
            error: 'All form elements are required.'
          })
      }
    } else {
      next()
    }
  }
}
