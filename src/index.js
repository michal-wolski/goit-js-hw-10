import './css/styles.css';
import { fetchCountries } from '/fetchCountries.js';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('input#search-box');
const countryListTag = document.querySelector('ul.country-list');
const countryInfoTag = document.querySelector('div.country-info');

const countriesList = countryResults => {
  countryResults.forEach(function (countryResult) {
    const listElem = document.createElement('li');
    const listImg = document.createElement('img');
    listImg.src = countryResult.flags.svg;
    listImg.setAttribute('width', '25px');
    const listParagraph = document.createElement('p');
    listParagraph.textContent = countryResult.name.official;

    countryListTag.classList.add('countryListTag');
    listElem.classList.add('listElem');
    listParagraph.classList.add('listParagraph');

    countryListTag.append(listElem);
    listElem.append(listImg);
    listElem.append(listParagraph);
  });
};

const countryData = countryResults => {
  countryResults.forEach(function (countryResult) {
    const divElem = document.createElement('div');
    divElem.classList.add('divElem');

    const divImg = document.createElement('img');
    divImg.src = countryResult.flags.svg;
    divImg.setAttribute('width', '50px');

    const divParagraph = document.createElement('p');
      divParagraph.textContent = countryResult.name.official;
      divParagraph.classList.add('divParagraph');

    const divUl = document.createElement('ul');
    divUl.classList.add('divUl');

    const divLiFirst = document.createElement('li');
    divLiFirst.textContent = `Capital: ${countryResult.capital}`;

    const divLiSecond = document.createElement('li');
    divLiSecond.textContent = `Poulation: ${countryResult.population}`;

    const divLiThird = document.createElement('li');
    divLiThird.textContent = `Languages: ${Object.values(countryResult.languages).join(', ')}`;

    countryInfoTag.append(divElem);
    divElem.append(divImg);
    divElem.append(divParagraph);
    countryInfoTag.append(divUl);
    divUl.append(divLiFirst);
    divUl.append(divLiSecond);
    divUl.append(divLiThird);
  });
};

const eventHandler = event => {
  event.preventDefault();

  countryListTag.innerHTML = '';
  countryInfoTag.innerHTML = '';

  fetchCountries(inputField.value.trim())
    .then(countryResults => {
      if (countryResults.length > 1 && countryResults.length < 11) {
        countriesList(countryResults);
      } else if (countryResults.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.', {
          position: 'center-top',
          distance: '8px',
        });
      } else if ((countryResults.length = 1)) {
        countryData(countryResults);
      }
    })
    .catch(error => {
      if (inputField.value != '') {
        Notiflix.Notify.failure('Oops, there is no country with that name', {
          position: 'center-top',
          distance: '8px',
        });
      }
    });
};

inputField.addEventListener('input', debounce(eventHandler, 300));
