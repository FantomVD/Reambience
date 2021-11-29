'use strict'

const HttpException = use('App/Exceptions/HttpException')
const QuoteService = use('App/Services/QuoteService')

class QuoteController {
  async createQuote({request, response, auth}){
    const { quote} = request.all()
    const quoteObj = await QuoteService.saveQuote({ user_id: auth.user.id, quote})
    response.res(quoteObj)
  }

  async getQuotesByUserId({response, auth}){
    const quotes = await QuoteService.getQuotesByUserId(auth.user.id)
    response.res(quotes)
  }

  async deleteByQuoteId({request, response}){
    const {id} = request.all()
    const quotes = await QuoteService.deleteByQuoteId(id)
    response.res(quotes)
  }
}

module.exports = QuoteController
