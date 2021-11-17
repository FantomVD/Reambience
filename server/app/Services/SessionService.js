const Session = use('App/Models/Session')

class SessionService {
  static async getSessions() {
    return Session.all()
  }

  static async createSession({ film_id, price, date_time }) {
    const session = new Session()

    session.film_id = film_id
    session.price = price
    session.date_time = date_time
    await session.save()

    return session
  }

  static async deleteSessionById(id) {
    return Session.query().where({ id }).delete()
  }
}

module.exports = SessionService
