import { coreService } from '../core/service';
import axios from 'axios';

export const melalieApi = axios.create({
    baseURL: coreService.getConfig('apiUrl'),
    responseType: 'json'
});