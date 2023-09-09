import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_oF8LAyBgFl3f7g9EFkLmFYqgNea8M3zFMwBvpi4eyUvi5aVGCfGZZIizcp4KJD30";

const API_KEY = 'live_oF8LAyBgFl3f7g9EFkLmFYqgNea8M3zFMwBvpi4eyUvi5aVGCfGZZIizcp4KJD30';
const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlCat = 'https://api.thecatapi.com/v1/images/';

function fetchBreeds() {
    return fetch(`${urlBreeds}?api_key=${API_KEY}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
};

function fetchCatByBreed(breedId) {
    return fetch(`${urlCat}${breedId}?api_key=${API_KEY}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

export { fetchBreeds, fetchCatByBreed };