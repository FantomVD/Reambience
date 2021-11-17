const User = use('App/Models/User')

class UserService {
  static async createUser(userData) {
    return User.createItem(userData)
  }

  static async updateUser({ id, ...userData }) {
    const user = await User.findOrFail(id)
    await user.updateItem(userData)
    return user
  }
}

module.exports = UserService
