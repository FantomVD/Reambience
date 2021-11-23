const FileType = require('file-type')
const uuid = require('uuid')
const P = require('bluebird')
const { isEmpty, trimStart, trimEnd } = require('lodash')

const Env = use('Env')
const Drive = use('Drive')

const staticUrl = Env.get('STATIC_URL')

/**
 *
 */
class File {
  /**
   *
   */
  static getStaticUrl(filePath) {
    return trimStart(staticUrl, '/') + '/' + trimEnd(filePath, '/')
  }

  /**
   *
   */
  static async saveRequestFiles(request, fields = [], dest = '') {
    if (isEmpty(fields)) {
      return {}
    }

    const saveFile = async (field) => {
      const file = request.file(field)
      if (!file) {
        return null
      }
      const path = await File.saveToLocalDisk(file, dest)

      return { field, path }
    }
    const files = await P.map(fields, saveFile)

    return files.reduce((n, v) => (v ? { ...n, [v.field]: v.path } : n), {})
  }

  /**
   *
   */
  static async saveToLocalDisk(file, dest = '') {
    let { ext } = (await FileType.fromFile(file.tmpPath)) || {}
    const filePathName = trimStart(`${dest}/${uuid.v4()}.${file.extname}`, '/')
    await Drive.disk('local').put(filePathName, await Drive.getStream(file.tmpPath))

    return filePathName
  }
}

module.exports = File
