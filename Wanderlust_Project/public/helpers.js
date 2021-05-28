const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const createVenueHTML = (name, location, iconSource, bestPhotoUrl) => {

  return `<h2>${name}</h2>

  <img class="venueimage" src="${iconSource}"/>

  <h3>Address:</h3>

  <p>${location.address}</p>

  <p>${location.city}</p>

  <p>${location.country}</p>

  <img class="bestphoto" src="${bestPhotoUrl}"/>`

}



const createWeatherHTML = (currentDay) => {

  console.log(currentDay)

  return (

    `

      <ul>

        <li><span>Day:</span>${weekDays[(new Date()).getDay()]}</li>

        <li><span>Temperature:</span>${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</li>

        <li><span>Sky condition:</span>${currentDay.weather[0].description}</li>

      </ul>  

      <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">

    `

  )

}



const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);