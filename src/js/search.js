import apiService from './apiService';
import refs from './refs';
import imageCard from '../templates/imageCard.hbs'

// console.log('input ', refs.input);
// console.log('searchBtn ', refs.searchBtn);
// console.log('gallery ', refs.gallery);

const inp = refs.input;
const search = refs.form;
const gallery = refs.gallery;

function renderCards(data, template) {
    const markup = template(data);
    gallery.insertAdjacentHTML('beforeend', markup)
};

function clearGallery() {
    console.log('clear');
    gallery.innerHTML = "";
}

function searchForQuery(e) {
    e.preventDefault();
    clearGallery();
    if (inp.value === '') {
        return;
    }
    console.log(inp.value);
    apiService.fetchForQuery(inp.value)
        .then(data => renderCards(data.hits, imageCard))
        .catch(error => console.log(error));
}

search.addEventListener('click', searchForQuery);



