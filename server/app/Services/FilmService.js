const moment = require('moment')

const Film = use('App/Models/Film')
const Database = use('Database')

class FilmService {
  /**
   *
   * @returns {Promise<*>}
   */
  static async getAllFilms() {
    return Film.query().fetch()
  }

  /**
   *
   * @param filmData
   * @returns {Promise<*>}
   */
  static async createFilm(filmData) {
    return Film.createItem(filmData)
  }

  /**
   *
   * @param id
   * @param filmData
   * @returns {Promise<*|undefined>}
   */
  static async updateFilm({ id, filmData }) {
    const film = await Film.findOrFail(id)
    await film.updateItem(filmData)
    return film
  }

  static async getFilmsByDate(date) {
    const nextDate = new Date(moment(date).add(1, 'day'))
    return Film.query()
      .with('sessions')
      .whereHas('sessions', async (builder) => {
        builder.whereBetween('date_time', [
          moment(date).format('MM-DD-yyyy'),
          moment(nextDate).format('MM-DD-yyyy'),
        ])
      })
      .fetch()
  }

  /**
   *
   * @param id
   * @returns {Promise<*>}
   */
  static async deleteFilmById(id) {
    return Film.query().where({ id }).delete()
  }

  /**
   *
   * @param id
   * @returns {Promise<*>}
   */
  static async getFilmById(id) {
    return Film.query().where({ id }).first()
  }
}

module.exports = FilmService
