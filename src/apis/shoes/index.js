import { melalieApi } from '../index';
import {coreService} from '../../core/service';

export const getShoes = async () => {
    const apiUrl = coreService.getConfig('apiUrl');
    return melalieApi.get(`${apiUrl}`, {
        headers: {
            'Permissions-Policy': 'interest-cohort=()'
        }
    })
    .then((res) => {return res})
    .catch((err) => {return err})
}