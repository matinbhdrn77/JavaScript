'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMag = 'Something went wrong') {
  fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMag} ( ${response.status})`);
    return response.json();
  });
};

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest

const renderCountry = function (data, neighbour = '') {
  console.log(data);
  const html = `
    <article class="country ${neighbour}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (name) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     const request1 = new XMLHttpRequest();
//     request1.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request1.send();
//     request1.addEventListener('load', function() {
//         const [data1] = JSON.parse(this.responseText);
//         renderCountry(data1, neighbour);
//     })
//   });
// };

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error("No neighbour found!");
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      renderError(`Error : ${err}`);
    });
};

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');


const whereAmI = function(lat, lng) {
  fetch(`https://geocode.xyz/${lat}},${lng}?geoit=xml`)
  .then(response => console.log(response.json()))
}

whereAmI(52.508, 13.381);
