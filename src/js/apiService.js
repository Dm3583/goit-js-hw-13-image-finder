const accessKey = '19762883-8865d0dea9f1f7e21a434f769';

console.log(accessKey);

export default {

    query: '',


    fetchForQuery(query) {
        return fetch(`https://pixabay.com/api/?key=${accessKey}&q=${query}`)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    },




}