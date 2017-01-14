import axios from 'axios';

const zipAXIOS = axios.create({
  baseURL: 'https://www.zipcodeapi.com/rest/key/',
})

export default zipAXIOS;


// === needs the dumb origin-control header == //
/* successful call

    zipAXIOS.get('radius.json/11727/30/mile?minimal')
      .then((res) => console.log(res.data.zip_codes))
      .catch((err) => console.log(err));

      */
