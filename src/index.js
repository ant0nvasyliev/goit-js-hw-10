import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const el = {
  selector: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
};
const { selector, loader, error, divCatInfo } = el;

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

let arrBreedsId = [];
selector.classList.add('is-hidden');
error.classList.add('is-hidden');
showLoader();

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
    hideLoader(); // Приховуємо лоадер після заповнення селектора
    selector.classList.remove('is-hidden'); // Показуємо заповнений селектор
  })
  .catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  error.classList.add('is-hidden');
  showLoader();
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      divCatInfo.innerHTML = `<div class="box-img">
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        </div>
        <div class="box">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p>
        </div>`;
      divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError(_error) {
  selector.classList.remove('is-hidden');
  hideLoader();

  Notify.warning(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
