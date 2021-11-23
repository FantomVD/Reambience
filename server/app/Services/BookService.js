const Env = use('Env')
const Book = use('App/Models/Book')
const Database = use('Database')
const EPUB = require('epub')
const ebookConverter =  require('node-ebook-converter')

const allowedExtname = ['fb2', 'pdf']

class BookService{
  static async saveBook(filePath, extname, user_id) {
    let relativePath = filePath.replace(`${Env.get('STATIC_PATH')}/`, '')
    let absolutePath = `${Env.get('STATIC_PATH')}/${relativePath}`

    if(allowedExtname.includes(extname)){
      const result = await ebookConverter.convert({
        input: absolutePath,
        output: `${Env.get('STATIC_PATH')}/${filePath.split('.')[0]}.epub`,
      })
      absolutePath = result.output
      relativePath = absolutePath.replace(`${Env.get('STATIC_PATH')}/`, '')
    }



    const epubObj = await BookService.parseEpub(absolutePath)

    const book = await Book.createItem({ author: epubObj.metadata.creator, title: epubObj.metadata.title, path: relativePath })
    await BookService.createFavouriteBook(book.id, user_id)
    return book
  }

  static async deleteBookById(id){
    return Book.query().where({id}).delete()
  }

  static async getBookById(id){
    return Book.query().where({id}).first()
  }

  static async getFavouriteBooks(id) {
    return (await Book.query().innerJoin({_fb: 'favourite_books' }, '_fb.book_id', 'books.id').where('_fb.user_id', id).fetch()).toJSON()
  }

  static async createFavouriteBook(book_id, user_id){
    return Database.query().table('favourite_books').insert({book_id, user_id})
  }


  static async parseEpub(filePath){
    const epub = new EPUB(filePath)
    await BookService.readEpub(epub)
    return epub
  }

  static async readEpub(epub){
    return new Promise((resolve,reject)=> {
      epub.on("end", function () {
        resolve()
      })
      epub.parse()
    })
  }
}

module.exports = BookService
