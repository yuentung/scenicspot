import axios from 'axios';

export default axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC'
});
