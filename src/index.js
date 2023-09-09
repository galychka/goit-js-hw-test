import SlimSelect from 'slim-select';
import Notiflix, { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './sass/cat-api';
import 'slim-select/dist/slimselect.css';

const refs = {
    container: document.querySelector('.container'),
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
    catPic: document.querySelector('.cat-info-desc-desc'),
    catDesc: document.querySelector('.cat-info-desc-temp'),
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

function renderDesc(breed) {
    if (breed) {
        const picture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
        const descript = `<h2 class="cat-info-desc-title">${breed.name}</h2>
            <p class="cat-info-desc-desc">${breed.description}</p>
            <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.temperament}</p>`;
        refs.catPic.innerHTML = picture;
        refs.catDesc.innerHTML = descript;
    } else {
        refs.catPic.innerHTML = '';
        refs.catDesc.innerHTML = 'Select a breed to see more information.';
    }
}

window.addEventListener('DOMContentLoaded', onChangeSelect);

function onChangeSelect(e) {
    refs.container.classList.remove('invisible');
    refs.catInfo.innerHTML = '';

    const breedId = e.target.value;

    if (breedId) {
        fetchCatByBreed(breedId)
            .then(breed => {
                renderDesc(breed);
            })
            .catch(error => {
                console.error(error);
                Notify.failure('Oops! Something went wrong. Please try again later.');
            })
            .finally(() => refs.container.classList.add('invisible'));
    } else {
        renderDesc(null);
    }
}
