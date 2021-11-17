'use strict'

const File = use('App/Classes/File')
const UserService = use('App/Services/UserService')

class AuthController {
  async updateUser({ request, auth, response }) {
    const userData = request.all()
    const { avatar } = request.files()
    if (avatar) {
      const savedPath = await File.saveRequestFiles(request, ['avatar'])
      userData.avatar = savedPath['avatar']
    }

    const user = await UserService.updateUser({ id: auth.user.id, ...userData })
    response.res(user)
  }
}

module.exports = AuthController
