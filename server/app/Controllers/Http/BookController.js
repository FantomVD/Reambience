'use strict'

const { copyFileSync } = require('fs')
const BookService = use('App/Services/BookService')
const File = use('App/Classes/File')
const HttpException = use('App/Exceptions/HttpException')
const Env = use('Env')

const allowedExtname = ['epub', 'fb2', 'pdf']

class BookController {
  async saveFavouriteBook({ request, response, auth }) {
    const book = request.file('book')
    if(book && allowedExtname.includes(book.extname)){
      const extname = book.extname
      const filePath = `${Env.get('STATIC_PATH')}/${book.clientName}`
      console.log('Before move', book.moved())
      await book.move(filePath, {overwrite: true})
      console.log('After move', book.moved())

      // copyFileSync(book.tmpPath, filePath)
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
