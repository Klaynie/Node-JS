import { CLIENT_ID, CLIENT_SECRET, OPEN_WEATHER_KEY } from './keys.js';
let venuesIds = [];
const VENUES = 0;

// Foursquare API Info
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const url = 'https://api.foursquare.com/v2/venues/';
const versionDate = '20210527';

// OpenWeather Info
const openWeatherKey = OPEN_WEATHER_KEY;
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3")];
const $weatherDiv = $("#weather1");

// AJAX functions:
const getVenues = async() => {
  const city = $input.val();
  const urlToFetch = `${url}explore?near=${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // Extracting venues from jsonResponse
      const result = jsonResponse.response.groups[0].items.map(item => item.venue);
      // Store the id of each venue for a later request
      result.forEach(
        venue => venuesIds.push(venue.id)
      );
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

const getForecast = async() => {
  const city = $input.val();
  const urlToFetch = `${weatherUrl}?&q=${city}&APPID=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

const venuesPhotosUrl = async() => {
  console.log(venuesIds);
  for await (const id of venuesIds) {
    const urlToFetch = `${url}${id}/photos?client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;
    console.log(urlToFetch);
    try {
      const response = await fetch(urlToFetch);
      console.log(response);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error)
    }
  }
}


// Render functions
const renderVenues = async(responses) => {
  venues = responses[VENUES];
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

// Helper functions
const randomizeArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  Promise.all([getVenues(), venuesPhotosUrl()]).then(responses => renderVenues(responses));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

// Event listener
$submit.click(executeSearch);