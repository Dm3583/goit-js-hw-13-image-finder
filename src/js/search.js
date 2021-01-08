import ApiService from './apiService';
import refs from './refs';
import imageCard from '../templates/imageCard.hbs';
import * as basicLightbox from 'basiclightbox';

// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `)

// instance.show()

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

function isShowMore(totalAccessibleImg, shownObj) {
    if (totalAccessibleImg - shownObj <= 0) {
        return false;
    }
    return true;
}

function searchForQuery(e) {

    e.preventDefault();

    clearGallery();

    apiService.query = e.currentTarget.elements.query.value;

    if (!apiService.query
        || apiService.query.match(/\s+/)
        && !apiService.query.match(/\s+\w/)) {



        console.log("enter something...");



        showMoreBtn.classList.add('is-hidden');
        return;
    }
    apiService.resetPage(apiService);
    fetchResults();
}

function fetchResults() {
    apiService.fetchForQuery()
        .then(data => {

            const currentPage = apiService.pageNumber - 1;
            const shownObj = currentPage * apiService.objectsPerQuery;
            if (data.totalHits === 0) {


                console.log("No matches. Try another query.");



                return;
            }
            if (currentPage === 1 && data.totalHits > apiService.objectsPerQuery) {



                console.log(`For your query found ${data.totalHits} results`);



            }




            renderCards(data.hits, imageCard);
            console.log(data);
            // console.log("data.totalHits ", data.totalHits);
            if (isShowMore(data.totalHits, shownObj)) {


                showMoreBtn.classList.remove('is-hidden');


            } else {


                console.log("That is all results!");



                showMoreBtn.classList.add('is-hidden');


            };
            scroll();
        })
        .catch(error => console.log(error));
}

search.addEventListener('submit', searchForQuery);
showMoreBtn.addEventListener('click', fetchResults);

//query test cases: [dat, rat, freezer]