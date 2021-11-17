'use strict'

const { each } = require('lodash')

const File = use('App/Classes/File')
const FilmService = use('App/Services/FilmService')

class FilmController {
  async getAllFilms({ response }) {
    const films = await FilmService.getAllFilms()
    response.res(films)
  }

  async getFilm({ request, response }) {
    const { id } = request.all()
    const film = await FilmService.getFilmById(id)
    response.res(film)
  }

  async createFilm({ request, response }) {
    const filmData = request.all()
    const { small_image, large_image } = request.files()
    if (small_image || large_image) {
      const savedPath = await File.saveRequestFiles(request, ['small_image', 'large_image'])
      each(savedPath, (saveImage, key) => (filmData[key] = saveImage))
    }
    const film = await FilmService.createFilm(filmData)
    response.res(film)
  }

  async updateFilm({ request, response }) {
    const { id, ...filmData } = request.all()

    const { small_image, large_image } = request.files()
    if (small_image || large_image) {
      const savedPath = await File.saveRequestFiles(request, ['small_image', 'large_image'])
      each(savedPath, (saveImage, key) => (filmData[key] = saveImage))
    }

    const film = await FilmService.updateFilm({ id, filmData })
    response.res(film)
  }

  async getFilmsByDate({ request, response }) {
    const { date } = request.all()
    const films = await FilmService.getFilmsByDate(date)
    response.res(films)
  }

  async deleteFilm({ request, response }) {
    const { id } = request.all()
    const result = await FilmService.deleteFilmById(id)
    response.res(result)
  }

  async getFilmsView({ request, view }) {
    const films = await FilmService.getAllFilms()
    view.render('')
  }
}

module.exports = FilmController
