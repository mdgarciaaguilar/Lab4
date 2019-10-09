
const credentials = require('./credentials.js')
const request = require('request')



const obtenerLatitud = function(ciudad, data, callback) {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?access_token=' + credentials.MAPBOX_TOKEN

  request({ url, json: true }, function(error, response) {

      const data = response.body
      let longitud = data.features[0].center[0]
      let latitud = data.features[0].center[1]
      if (latitud && longitud)
        obtenerClima(latitud, longitud)


  })
}


const obtenerClima = function(latitud, longitud, data, callback) {
  const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitud + ',' + longitud + '?lang=es&units=si'
  request({ url, json: true }, function(error, response) {

      const data = response.body
      const info = {
        summary: data.currently.summary,
        temperature: data.currently.temperature,
        precipProbability: data.currently.precipProbability
      }

      let resultado = info.summary + ' durante el dia. Actualmente esta a ' + info.temperature + ' C. Hay una ' + info.precipProbability + ' % de posibilidad de lluvia.'
      console.log(resultado)

  })
}



module.exports = {
  obtenerLatitud : obtenerLatitud
}
