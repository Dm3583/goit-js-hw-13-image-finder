const accessKey = '19762883-8865d0dea9f1f7e21a434f769';
const baseURL = 'https://pixabay.com/api/';


// console.log(accessKey);

export default class ApiService {
    constructor() {
        this._query = '';
        this.pageNumber = 1;
        this.objectsPerQuery = 12;
    }


    fetchForQuery() {
        return fetch(`${baseURL}?image_type=photo&orientation=horisontal&q=${this.query}&page=${this.pageNumber}&per_page=${this.objectsPerQuery}&key=${accessKey}`)
            .then(this.status)
            .then(res => res.json())
            .then(this.incrementPage());
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

    incrementPage() {
        this.pageNumber += 1;
    };

    resetPage() {
        this.pageNumber = 1;
    };
}