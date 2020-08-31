import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://restrauntordermenu.firebaseio.com/'
    }
)
export default instance;