'use strict'

const TranslateService = use('App/Services/TranslateService')

class TranslateController {
  async translate({ request, response }) {
    const { text, from, to } = request.all()
    const translated = await TranslateService.translateText({ text, from, to })
    return response.res(translated)
  }
}

module.exports = TranslateController
