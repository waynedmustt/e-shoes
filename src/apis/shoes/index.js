import { melalieApi } from '../index';
import {coreService} from '../../core/service';

export const getShoes = async () => {
    const apiUrl = coreService.getConfig('apiUrl');
    return melalieApi.get(`${apiUrl}`)
    .then((res) => {return res})
    .catch((err) => {return err})
}