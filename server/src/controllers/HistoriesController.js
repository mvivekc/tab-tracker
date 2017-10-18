const {Histories, Song} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const histories = await Histories.findAll({
        where: {
          UserId: userId
        },
        include: [{
          model: Song
        }]
      }).map((history) => history.toJSON())
        .map((history) => {
          const toReturn = _.extend({historyId: history.id}, history.Song)
          return toReturn
      })
      res.send(_.uniqBy(histories, "id"))
    } catch (error) {
      res.status(403).send({
        error: `This Histories had problems: ${error}`
      })
    }
  },
  async post(req, res) {
    try {
      const {songId} = req.body
      const userId = req.user.id
      const history = await Histories.create({
        UserId: userId,
        SongId: songId
      })
      res.send(history)
    } catch(e) {
      res.status(403).send({
        error: `Updating history had problems: ${e}`
      })
    }
  }
}
