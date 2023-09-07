import axios, { type AxiosInstance } from 'axios';
import { SessionStorage } from 'quasar';
const MAuthVal = SessionStorage.getItem('MAuth')?.toString() ?? '';

const apiClient: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    MAuth: MAuthVal,
    'Control-Allow-Origin': '*',
  },
});

export default apiClient;
