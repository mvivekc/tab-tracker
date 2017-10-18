const {Song} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.findAll({
          where: {
            $or: [
              'title', 'author', 'genre', 'album'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send({
        songs: songs
      })

    } catch (error) {
      console.log(error)
      res.status(403).send({
        error: 'This email account is already in use'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send({
        song: song.toJSON()
      })
    } catch (error) {
      res.status(403).send({
        error: 'This email account is already in use'
      })
    }
  },
  async put (req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.send({
        song: req.body
      })
    } catch (error) {
      res.status(403).send({
        error: 'Error while update'
      })
    }
  },
  async song (req, res) {
    try {
      const song = await Song.findById(req.params.id)
      res.send({
        song: song.toJSON()
      })
    } catch (error) {
      res.status(403).send({
        error: 'Song not found'
      })
    }
  }
}
