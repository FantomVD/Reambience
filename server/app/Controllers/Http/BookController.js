'use strict'

const { copyFileSync } = require('fs')
const BookService = use('App/Services/BookService')
const File = use('App/Classes/File')
const HttpException = use('App/Exceptions/HttpException')
const Env = use('Env')

const allowedExtname = ['epub', 'fb2', 'pdf']

class BookController {
  async saveFavouriteBook({ request, response, auth }) {
    if(request.file('book') && allowedExtname.includes(request.file('book').extname)){
      const extname = request.file('book').extname
      const filePath = `${Env.get('STATIC_PATH')}/${request.file('book').clientName}`
      copyFileSync(request.file('book').tmpPath, filePath)
      // const filePath = await File.saveRequestFiles(request, ['book'])
      const result = await BookService.saveBook(filePath, extname, auth.user.id)
      return response.res(result)
    } else {
      throw new HttpException(400, 'File is not supported')
    }
  }

  async getAllBooks({response}){
    const books = await BookService.getAllBooks()
    response.res(books)
  }

  async deleteBookById({ request, response }) {
    const {id} = request.all()
    const result = await BookService.deleteBookById(id)
    response.res(result)
  }

  async getBookById({ request, response }) {
    const {id} = request.all()
    const book = await BookService.getBookById(id)
    response.download(book)
  }

  async getFavouriteBooks({ auth, response }) {
    const books = await BookService.getFavouriteBooks(auth.user.id)
    response.res(books)
  }
}

module.exports = BookController
