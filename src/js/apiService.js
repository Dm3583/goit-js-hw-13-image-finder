const API_KEY = '19762883-8865d0dea9f1f7e21a434f769';
const BASE_URL = 'https://pixabay.com/api/';


// console.log(API_KEY);

export default class ApiService {
    constructor() {
        this._query = '';
        this._pageNumber = 1;
        this._objectsPerQuery = 12;
    }

    fetchForQuery() {
        return fetch(`${BASE_URL}?image_type=photo&orientation=horisontal&q=${this.query}&page=${this.pageNumber}&per_page=${this.objectsPerQuery}&key=${API_KEY}`)
            .then(this.status)
            .then(res => res.json())
            .then(data => {
                this.incrementPage();
                return data;
            });
    };

    status(response) {
        if (response.ok) {
            return response;
        }
        return response.json().then(res => Promise.reject(res.message));
    };

    get query() {
        return this._query;
    };

    set query(newQuery) {
        this._query = newQuery;
    };

    get pageNumber() {
        return this._pageNumber;
    };

    set pageNumber(newPageNumber) {
        this._pageNumber = newPageNumber;
    };

    get objectsPerQuery() {
        return this._objectsPerQuery;
    };

    set objectsPerQuery(newNumber) {
        this._objectsPerQuery = newNumber;
    };

    incrementPage() {
        this.pageNumber += 1;
    };

    resetPage() {
        this.pageNumber = 1;
    };
}