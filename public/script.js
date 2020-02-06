
const weatherStatus = document.querySelector("[data-status]")
const userLocation = document.querySelector("[data-location]")
const windElm = document.querySelector("[data-wind]")
const tempElm = document.querySelector("[data-temp]")
const percipElm = document.querySelector("[data-percip]")
const icon = new Skycons({color: '#222'})
icon.set("icon", "clear-day")
icon.play()
const searchInput = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchInput)

searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0]
  
  if (place === null) {
    return
  } else {

    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
  
    fetch('/weather', {
      method: 'POST',
      headers: {'Content-Type': "application/json", "Accept": "application/json"},
      body: JSON.stringify({
        lat: latitude,
        lng: longitude
      })
    })
    .then(res => res.json())
    .then(data =>  setWeatherData(data, place.formatted_address))
  }
  
})

function setWeatherData(data, place){
  userLocation.textContent = place
  weatherStatus.textContent = data.summary
  windElm.textContent = data.windSpeed
  tempElm.textContent = data.temperature
  percipElm.textContent = `${data.precipProbability * 100}%`
  icon.set("icon", data.icon)
  icon.play()
}