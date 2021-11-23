'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async register({request, auth, response}) {
    const {username, password} = request.all()

    const user = new User()
    user.username = username
    user.password = password

    try{
      await user.save()
    } catch(e){
      return response.status(400).send('User with this credentials already exists')
    }

    const accessToken = await auth.generate(user)
    return response.json({"user": user, "access_token": accessToken})
  }

  // async login({request, auth, response}) {
  //   const {username, password} = request.all()
  //   const user = await User.query().where({username}).first()
  //   if (!(await Hash.verify(user.password, password))) {
  //     return response.badRequest('Invalid credentials')
  //   }
  //     let accessToken = await auth.generate(user)
  //     return response.json({"user":user, "access_token": accessToken})
  // }

  async login({request, auth, response}) {
    const {username, password} = request.all()
    try {
      if (await auth.attempt(username, password)) {
        let user = await User.findBy('username', username)
        let accessToken = await auth.generate(user)
        return response.json({"user":user, "access_token": accessToken})
      }
    }
    catch (e) {
      return response.status(403).json({message: 'You first need to register!'})
    }
  }

  async me({auth, response}){
    return response.res(auth.user)
  }


}

module.exports = AuthController
