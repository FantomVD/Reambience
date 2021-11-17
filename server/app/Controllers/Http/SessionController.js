'use strict'

const SessionService = use('App/Services/SessionService')

class SessionController {
  async getSessions({ response }) {
    const sessions = await SessionService.getSessions()
    response.res(sessions)
  }

  async createSession({ request, response }) {
    const { film_id, price, date_time } = request.all()
    const session = await SessionService.createSession({ film_id, price, date_time })
    response.res(session)
  }

  async deleteSession({ request, response }) {
    const { id } = request.all()
    const result = await SessionService.deleteSessionById(id)
    response.res(result)
  }
}

module.exports = SessionController
