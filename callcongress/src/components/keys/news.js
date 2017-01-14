import axios from 'axios';

const newsAXIOS = axios.create({
  baseURL: 'https://api.newsapi.aylien.com/api/v1/',
  headers: {
    'X-AYLIEN-NewsAPI-Application-ID': 'dbdeac51',
    'X-AYLIEN-NewsAPI-Application-Key': 'key'
  }
});

export default newsAXIOS;
