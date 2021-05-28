const CLIENT_ID = 'BHABVPEZBUWQVOL4F1CYHQ5XICMNGKQA2WVEFXYTWOQ4QNXQ';
const CLIENT_SECRET = 'CNF0FLJB41YDOY3PJCLWBMU2MHVYV4CM0RYFH4R1EHI14GBS';
const OPEN_WEATHER_KEY = 'd7a94428e4db2e3a586f9c581661bc01';
// Foursquare API Info

const clientId = CLIENT_ID;

const clientSecret = CLIENT_SECRET;

const url = 'https://api.foursquare.com/v2/venues/explore?near=';

let venuesIds = [];

let venuesImgs = [];

// const todayDate = new Date();

// const Day = todayDate.getDate();

// const Month = todayDate.getMonth();

// const Year = todayDate.getFullYear();

//get today date as a string formatted as YYYYMMDD

// OpenWeather Info

const openWeatherKey = OPEN_WEATHER_KEY;

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements

const $input = $('#city');

const $submit = $('#button');

const $destination = $('#destination');

const $container = $('.container');

const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6"), $("#venue7")];

const $weatherDiv = $("#weather1");

//get data from Foursquare

async function getVenues() {

  const city = $input.val();

  let limit = 10;

  const and = "&";

  const urlToFetch = url.toString() + city.toString() + and + "limit=" + limit.toString() + and + "client_id=" + clientId.toString() + and + "client_secret=" + clientSecret.toString() + and + "v=20210421";

  try {

    const response = await fetch(urlToFetch);

    if (response.ok) {

      const jsonResponse = await response.json();

      //obtaining array of venues from API response

      const venues = jsonResponse.response.groups[0].items.map(

        item => item.venue

      );

      //storing the id of each venue for a later request

      venues.forEach(

        venue => venuesIds.push(venue.id)

      );

      // console.log(venues);

      // console.log(venuesIds);

      return venues;

    }

  } catch (error) {

    console.log(error)

  }

};

//get bestPhoto urls for each venue obtained with getVenues()

async function venuesPhotosUrl() {

  const and = "&";

  for await (const id of venuesIds) {

    const toFetch = "https://api.foursquare.com/v2/venues/" + id.toString() + "?" + "client_id=" + clientId.toString() + and + "client_secret=" + clientSecret.toString() + and + "v=20210421";

    try {

      const response = await fetch(toFetch);

      if (response.ok) {

        const jsonResponse = await response.json();

        console.log(jsonResponse);

        //obtain bestphoto

        const pathTobestPhoto = jsonResponse.response.venue.bestPhoto;

        console.log(pathTobestPhoto);

        const bestPhotoUrl = pathTobestPhoto.prefix.toString() + pathTobestPhoto.width.toString() + "x" + pathTobestPhoto.height.toString() + pathTobestPhoto.suffix.toString();

        console.log(bestPhotoUrl);

        venuesImgs.push(bestPhotoUrl);

      }

    } catch (error) {

      console.log(error)

    }

  }

};

//get data from OpenWeather

async function getForecast() {

  const city = $input.val();

  const and = "&";

  const urlToFetch = weatherUrl.toString() + "?q=" + city.toString() + and + "APPID=" + openWeatherKey.toString();

  try {

    const response = await fetch(urlToFetch);

    if (response.ok) {

      const jsonResponse = await response.json();

      // console.log(jsonResponse)

      return jsonResponse

    }

  } catch (error) {

    console.log(error)

  }

};

// Render venues from getVenues()

const renderVenues = (venues) => {

  $venueDivs.forEach(($venue, index) => {

    const venue = venues[index];

    const venueIcon = Object.values(venue.categories[0].icon).join("bg_64");

    const bestPhotoUrl = venuesImgs[index];

    // console.log(venueIcon);

    let venueContent = createVenueHTML(venue.name, venue.location, venueIcon, bestPhotoUrl);

    $venue.append(venueContent);

  });

  $destination.append(`<h2>${venues[0].location.city}</h2>`);

};

// Render forecast from getForecast()

const renderForecast = (day) => {

  let weatherContent = createWeatherHTML(day);

  $weatherDiv.append(weatherContent);

};

//listen for submitted button

const executeSearch = () => {

  $venueDivs.forEach(venue => venue.empty());

  $weatherDiv.empty();

  $destination.empty();

  $container.css("visibility", "visible");

  Promise.all([getVenues(), venuesPhotosUrl()]).then(

    venues => renderVenues(venues[0]),

    error => console.log(error)

  );

  getForecast().then(

    forecast => renderForecast(forecast)

  );

  return false;

};

$submit.click(executeSearch);