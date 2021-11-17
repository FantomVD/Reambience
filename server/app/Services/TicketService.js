const Database = use('Database')
const P = require('bluebird')

class TicketService {
  /**
   *
   * @param userId
   * @param sessionId
   * @returns {Promise<*>}
   */
  static async getTicketByUserId(userId, sessionId) {
    return Database.query().from('tickets').where({ user_id: userId, session_id: sessionId })
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<*>}
   */
  static async getTicketBySessionId(sessionId) {
    return Database.query().from('tickets').where({ session_id: sessionId })
  }

  /**
   *
   * @param userId
   * @param sessionId
   * @param places
   * @returns {Promise<*>}
   */
  static async createTicket(userId, sessionId, places) {
    return P.map(
      places,
      (place) => {
        return Database.query()
          .insert({ user_id: userId, session_id: sessionId, place })
          .into('tickets')
          .returning('*')
      },
      { concurrency: 5 }
    )
  }
}

module.exports = TicketService
