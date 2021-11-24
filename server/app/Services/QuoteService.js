const Quote = use('App/Models/Quote')

class QuoteService{
  static async saveQuote(quoteData){
    return Quote.createItem(quoteData)
  }

  static async getQuotesByUserId(user_id){
    return Quote.query().where({user_id}).fetch()
  }

  static async deleteByQuoteId(id){
    return Quote.query().where({id}).delete()
  }
}

module.exports = QuoteService
