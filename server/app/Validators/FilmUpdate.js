'use strict'

const yup = require('yup')

const Base = require('./Base')

class FilmUpdate extends Base {
  static schema = () =>
    yup.object().shape({
      name: yup.string().trim().min(3).max(100),
      description: yup.string().trim().min(6).max(1024),
      publish_year: yup.number().integer().min(1900).max(new Date().getFullYear()),
      rating: yup.number().min(0).max(10),
      age_restriction: yup.number().min(0).max(21),
      duration: yup
        .mixed()
        .test('is-valid-time', 'Time should includes 0-23 hours, 0-59 minutes', function (value) {
          const [hours, minutes] = value.split(':')
          return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60
        }),
      producer: yup.string().trim().min(4),
      small_image: yup.mixed(),
      big_image: yup.mixed(),
    })
}

module.exports = FilmUpdate
