'use strict'

const TicketService = use('App/Services/TicketService')

class TicketController {
  /**
   *
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<void>}
   */
  async getTicketByUserId({ request, auth, response }) {
    const { id } = request.all()
    const tickets = await TicketService.getTicketByUserId(auth.user.id, id)
    response.res(tickets)
  }

  /**
   *
   * @param request
   * @param response
   * @returns {Promise<void>}
   */
  async getTicketBySessionId({ request, response }) {
    const { id } = request.all()
    const tickets = await TicketService.getTicketBySessionId(id)
    response.res(tickets)
  }

  /**
   *
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<void>}
   */
  async createTicket({ request, auth, response }) {
    const { id, places } = request.all()
    const ticket = await TicketService.createTicket(auth.user.id, id, places)
    response.res(ticket)
  }
}

module.exports = TicketController
