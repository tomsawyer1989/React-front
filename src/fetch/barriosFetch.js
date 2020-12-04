import { baseUrl } from '../shared/baseUrl';

export const getBarrios = () => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'barrios', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}

export const getPacientesByBarrios = () => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'barrios/informe', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}