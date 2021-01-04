import './styles.css';
import apiService from './js/apiService';

console.log(apiService.accessKey);

fetch(`https://pixabay.com/api/?key=${apiService.accessKey}&q=dog`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
