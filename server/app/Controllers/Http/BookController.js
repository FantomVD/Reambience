'use strict'

const BookService = use('App/Services/BookService')
const File = use('App/Classes/File')
const HttpException = use('App/Exceptions/HttpException')

const allowedExtname = ['epub', 'fb2', 'pdf']

class BookController {
  async saveFavouriteBook({ request, response, auth }) {
    if(request.file('book') && allowedExtname.includes(request.file('book').extname)){
      const filePath = await File.saveRequestFiles(request, ['book'])
      const extname = request.file('book').extname
      const result = await BookService.saveBook(filePath.book, extname, auth.user.id)
      return response.res(result)
    } else {
      throw new HttpException(400, 'File is not supported')
    }
  }

  async deleteBookById({ request, response }) {
    const {id} = request.all()
    const result = await BookService.deleteBookById(id)
    response.res(result)
  }

  async getBookById({ request, response }) {
    const {id} = request.all()
    const book = await BookService.getBookById(id)
    response.res(book)
  }

  async getFavouriteBooks({ auth, response }) {
    const books = await BookService.getFavouriteBooks(auth.user.id)
    response.res(books)
  }
}

module.exports = BookController
