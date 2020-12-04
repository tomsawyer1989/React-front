import { baseUrl } from '../shared/baseUrl';

export const getLaboratorios = () => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'laboratorios', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}