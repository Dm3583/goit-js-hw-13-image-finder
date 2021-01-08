import ApiService from './apiService';
import refs from './refs';
import imageCard from '../templates/imageCard.hbs'

const apiService = new ApiService();

const search = refs.form;
const gallery = refs.gallery;
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

    clearGallery();

    if (!e.currentTarget.elements.query.value) {
        showMoreBtn.classList.add('is-hidden');
        return;
    }

    apiService.query = e.currentTarget.elements.query.value;

    apiService.resetPage();

    apiService.fetchForQuery()
        .then(data => {
            renderCards(data.hits, imageCard);
            if (gallery.childElementCount === apiService.objectsPerQuery) {
                showMoreBtn.classList.remove('is-hidden');
            } else {
                showMoreBtn.classList.add('is-hidden');
            }
            scroll();
        })
        .catch(error => console.log(error));
}

function showMore() {

    apiService.fetchForQuery()
        .then(data => {
            if (data.hits.length < apiService.objectsPerQuery) {
                renderCards(data.hits, imageCard);
                showMoreBtn.classList.add('is-hidden');
            } else {
                renderCards(data.hits, imageCard);
            }
            scroll();
        })
        .catch(error => console.log(error));
}

search.addEventListener('submit', searchForQuery);
showMoreBtn.addEventListener('click', showMore);