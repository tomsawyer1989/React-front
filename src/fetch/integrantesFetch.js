import { baseUrl } from '../shared/baseUrl';

export const getIntegrantes = (params) => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'integrantes/' + params, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}

export const postIntegrante = (integrante) => {
    const newIntegrante = {
      paciente_id: integrante.paciente_id,                // id del paciente
      nombre: integrante.nombre,
      cedula: integrante.cedula,
      parentesco: integrante.parentesco,
    }
    return fetch(baseUrl + 'integrantes', {
      method: "POST",
      body: JSON.stringify(newIntegrante),
      headers: {
        'Content-Type': 'application/json'
      }
    })
};