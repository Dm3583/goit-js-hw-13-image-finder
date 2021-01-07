import apiService from './apiService';
import refs from './refs';
import imageCard from '../templates/imageCard.hbs'

const inp = refs.input;
const search = refs.form;
const gallery = refs.gallery;
const searchBtn = refs.searchBtn;
const showMoreBtn = refs.showMoreBtn;

function scroll() {
    return window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
};

function renderCards(data, template) {
    const markup = template(data);
    gallery.insertAdjacentHTML('beforeend', markup);
};

function clearGallery() {
    gallery.innerHTML = "";
}

function searchForQuery(e) {
    e.preventDefault();

    if (e.target !== searchBtn) {
        return;
    }
    apiService.pageNumber = 1;
    clearGallery();

    if (!inp.value) {
        showMoreBtn.classList.add('is-hidden');
        return;
    }

    apiService.fetchForQuery(inp.value)
        .then(data => {
            renderCards(data.hits, imageCard);
            if (gallery.childElementCount === 12) {
                showMoreBtn.classList.remove('is-hidden');
            } else {
                showMoreBtn.classList.add('is-hidden');
            }
            scroll();
        })
        .catch(error => console.log(error));
}

function addItems() {

    apiService.pageNumber += 1;

    apiService.fetchForQuery(inp.value)
        .then(data => {
            if (data.hits.length < 12) {
                renderCards(data.hits, imageCard);
                showMoreBtn.classList.add('is-hidden');
            } else {
                renderCards(data.hits, imageCard);
            }
            scroll();
        })
        .catch(error => console.log(error));
}

search.addEventListener('click', searchForQuery);
showMoreBtn.addEventListener('click', addItems);