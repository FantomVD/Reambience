const Env = use('Env')
const Book = use('App/Models/Book')
const Database = use('Database')
const Drive = use('Drive')

const EPUB = require('epub')
const ebookConverter =  require('node-ebook-converter')
const fs = require('fs')
const mkdirp = require('mkdirp')
const { Readable } = require('stream')

const allowedExtname = ['fb2', 'pdf']

class BookService{
  static async saveBook(filePath, extname, user_id) {
    let relativePath = filePath.replace(`${Env.get('STATIC_PATH')}/`, '')
    let absolutePath = `${Env.get('STATIC_PATH')}/${relativePath}`

    if(allowedExtname.includes(extname)){
      ebookConverter.convert({
        input: absolutePath,
        output: `${Env.get('STATIC_PATH')}/${filePath.split('.')[0]}.epub`,
      }).then((result)=>{
        absolutePath = result.output
        relativePath = absolutePath.replace(`${Env.get('STATIC_PATH')}/`, '')
        return BookService.parseEpub(absolutePath)
      }).then((epubObj)=>{
        return Book.createItem({ author: epubObj.metadata.creator, title: epubObj.metadata.title, path: relativePath })
      }).then((book)=>{
        return BookService.createFavouriteBook(book.id, user_id)
      }).then(()=>{
        return BookService.uploadToS3(absolutePath, 'books', `${filePath.split('.')[0]}.epub`)
      })
      return 'Pasing ebook in progress. Check profile in few minutes'
    }

    const epubObj = await BookService.parseEpub(absolutePath)
    console.log(`Saved to: ${absolutePath}`)
    const book = await Book.createItem({ author: epubObj.metadata.creator, title: epubObj.metadata.title, path: relativePath })
    await BookService.createFavouriteBook(book.id, user_id)
    await BookService.uploadToS3(absolutePath, 'books', filePath)
    return book
  }

  static async download(filename) {
    const folder = 'books'
    const path = Env.get('STATIC_PATH')

    const [exists, s3Object] = await Promise.all([
      Drive.disk('s3').exists(`${folder}/${filename}`),
      Drive.disk('s3').getObject(`${folder}/${filename}`),
    ])

    if (!exists) {
      return response.status(404).send({
        error: {
          message: 'File not found.',
        },
      })
    }

    if (!fs.existsSync(path)) {
      mkdirp(path)
    }

    const pathname = `${path}/${filename}`

    const readableInstanceStream = new Readable({
      read() {
        this.push(s3Object.Body)
        this.push(null)
      },
    })

    await BookService._saveStreamToFile(readableInstanceStream, pathname)

    return pathname
  }

  static async getAllBooks(){
    return Book.all()
  }

  static async _saveStreamToFile(file, pathname) {
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(pathname)

      file.pipe(writer)

      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }

  static async convertBook(){

  }
  static async deleteBookById(id){
    return Book.query().where({id}).delete()
  }

  static async getBookById(id){
    const book = await Book.query().where({id}).first()
    return BookService.download(book.path)
  }

  static async getFavouriteBooks(id) {
    return (await Book.query().innerJoin({_fb: 'favourite_books' }, '_fb.book_id', 'books.id').where('_fb.user_id', id).fetch()).toJSON()
  }

  static async createFavouriteBook(book_id, user_id){
    await Database.query().table('favourite_books').insert({book_id, user_id})

  }

  static async uploadToS3 (filePath, folder='books', fileName) {
    // If oldPath parameter is set then, delete the old picture
    const fileStream = await fs.createReadStream(filePath)

    const s3Path = `${folder}/${fileName}`
    await Drive.disk('s3').put(s3Path, fileStream, { ACL: 'public-read'})
    const fileUrl = await Drive.disk('s3').getUrl(s3Path)

    // Destroy the readable stream and delete the file from tmp path
    await fileStream._destroy()

    return {
      name: fileName,
      path: s3Path,
      url: fileUrl
    }
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
