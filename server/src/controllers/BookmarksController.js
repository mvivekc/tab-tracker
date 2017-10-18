const {Bookmark, Song} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      let where = {
        UserId: userId
      }
      if (req.query.songId)  {
        where.SongId = req.query.songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [{
          model: Song
        }]
      }).map((bookmark) => bookmark.toJSON())
        .map((bookmark) => {
          const toReturn = _.extend({}, bookmark.Song, {id: bookmark.id})
          return toReturn
      })
      res.send(bookmarks)
    } catch (error) {
      res.status(403).send({
        error: `This bookmark had problems: ${error}`
      })
    }
  },
  async post(req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body.params
      const bookmark = await Bookmark.findOne({
        where: req.body.params
      })
      if (!!bookmark) {
        res.status(403).send({
          error: "Bookmark already exist"
        })
      } else {
        const bookmark = await Bookmark.create({
          UserId: userId,
          SongId: songId
        })
        res.send(bookmark)
      }
    } catch(e) {
      res.status(403).send({
        error: `Updating bookmark had problems: ${e}`
      })
    }
  },
  async delete(req, res) {
    try {
      console.log(req.params.id)
      const bookmark = await Bookmark.findById(req.params.id)
      await bookmark.destroy()
      res.status(201).send({})
    } catch(e) {
      res.status(403).send({
        error: "Destroying bookmark had problems"
      })
    }
  }
}
