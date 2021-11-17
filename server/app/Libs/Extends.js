'use strict'

const extendsResponse = () => {
  const Response = use('Adonis/Src/Response')

  Response.macro('notFound', function () {
    return this.status(404).json({ error: 'Item not found' })
  })

  Response.macro('res', function (data = null) {
    const response = { status: 'success' }
    if (data !== null) {
      response.data = data
    }
    return this.json(response)
  })
}

module.exports = {
  extendsResponse,
}
