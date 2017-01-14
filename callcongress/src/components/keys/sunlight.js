import axios from 'axios';

const sunlightAXIOS = axios.create({
  baseURL: `https://congress.api.sunlightfoundation.com/`,
  headers: {'Content-Type': 'application/json'}
})

export default sunlightAXIOS;
