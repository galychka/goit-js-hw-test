import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_oF8LAyBgFl3f7g9EFkLmFYqgNea8M3zFMwBvpi4eyUvi5aVGCfGZZIizcp4KJD30";
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './sass/cat-api';
import 'slim-select/dist/slimselect.css';
import './sass/_example.scss';

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
    catPic: document.querySelector('.cat-info-pict'),
    catDesc: document.querySelector('.cat-info-desc'),
};

refs.select.addEventListener('change', onChangeSelect);

function renderSelect(breeds) {
    const markup = breeds
        .map(breed => {
            return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
        })
        .join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
        select: '#single',
    });
}

(function fetchBreedsRender() {
    refs.loader.classList.remove('invisible');
    fetchBreeds()
        .then(breeds => renderSelect(breeds))
        .catch(error => {
            console.log(error);
            Notify.failure('Oops! Something went wrong. Please try again later.');
        })
        .finally(() => {
            refs.loader.classList.add('invisible');
        });
})();

function renderDesc(breed) {
    const picture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
    const descript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
            <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
            <p class="cat-info-desc-temp"><b>Temperament:</b>${breed.breeds[0].temperament}</p>`;
    refs.catPic.insertAdjacentHTML('beforeend', picture);
    refs.catDesc.insertAdjacentHTML('beforeend', descript);
}

function onChangeSelect(e) {
    refs.loader.classList.remove('invisible');
    refs.catInfo.innerHTML = '';
    refs.catDesc.innerHTML = '';
    const breedId = e.target.value;
    console.log('breedId:', breedId);
    fetchCatByBreed(breedId)
        .then(breed => renderDesc(breed))
        .catch(error => {
            console.log(error);
            Notify.failure('Oops! Something went wrong. Please try again later.');
        })
        .finally(() => refs.loader.classList.add('invisible'));
}
