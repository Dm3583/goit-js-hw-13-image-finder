const accessKey = '19762883-8865d0dea9f1f7e21a434f769';

// console.log(accessKey);

export default {

    pageNumber: 1,
    objectsPerQuery: 12,

    fetchForQuery(query) {
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horisontal&q=${query}&page=${this.pageNumber}&per_page=${this.objectsPerQuery}&key=${accessKey}`)
            .then(res => res.json());
    },

}