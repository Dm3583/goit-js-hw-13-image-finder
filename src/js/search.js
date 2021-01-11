import ApiService from './apiService';
import refs from './refs';
import imageCard from '../templates/imageCard.hbs';
import notify from './notify';
import renderService from './renderService';
import ShowMoreBtn from './customBtn';

const apiService = new ApiService();
const showMoreBtn = new ShowMoreBtn({
    selector: '#show-more',
    hidden: true,
    messOnInit: 'Show more',
    messOnStateChange: 'Loading...'
});
// console.log(showMoreBtn);

const search = refs.form;
const gallery = refs.gallery;

function isShowMore(totalAccessibleImg, shownObj) {
    return totalAccessibleImg - shownObj > 0;
};

function isEmptyInput(input) {
    if (!input || input.match(/\s+/) && !input.match(/\s+\w/)) {
        notify.message("Enter something...", 'alert');
        showMoreBtn.hide();
        return true;
    }
    return false;
};

function onErrorHandler(error) {
    console.log(error);
    notify.message(`Something went wrong... .Error ${error}`, 'error');
};

function isEmptyResult(result) {
    if (result === 0) {
        notify.message("No matches. Try another query.", 'alert');
        showMoreBtn.hide();
        return true;
    };
    return false;
};

function resultNotificationHandler(currPage, totalRes, shownRes) {
    if (currPage === 1) {
        notify.message(`Found ${totalRes} results`, 'success');
    }
    if (isShowMore(totalRes, shownRes)) {
        showMoreBtn.show();
        showMoreBtn.disable();
    } else {
        if (currPage !== 1) {
            notify.message("There are all results!", 'info');
        }
        showMoreBtn.hide();
    };
}

function searchForQuery(e) {
    e.preventDefault();
    renderService.clearHTML(gallery);
    notify.close();
    apiService.query = e.currentTarget.elements.query.value;
    if (isEmptyInput(apiService.query)) {
        return;
    }
    apiService.resetPage();
    fetchResults();
};

function fetchResults() {
    showMoreBtn.show();
    showMoreBtn.disable();
    apiService.fetchForQuery()
        .then(data => {

            const currentPage = apiService.pageNumber - 1;
            const shownObj = currentPage * apiService.objectsPerQuery;

            if (isEmptyResult(data.totalHits)) {
                return;
            }
            resultNotificationHandler(currentPage, data.totalHits, shownObj)
            renderService.renderHTML(data.hits, imageCard, gallery);
            renderService.scroll();
            showMoreBtn.enable();
        })
        .catch(onErrorHandler);
}

search.addEventListener('submit', searchForQuery);
showMoreBtn.refs.button.addEventListener('click', fetchResults);
gallery.addEventListener('click', renderService.showBigImg);

//query test cases: [dat, rat, freezer]