import { baseUrl } from '../shared/baseUrl';

export const getFormulaciones = (params) => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'formulaciones/' + params, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}

export const postFormulacion = (formulacion) => {
    const newFormulacion = {
      visita_id: formulacion.visita_id,                // id del paciente
      medicamento_id: formulacion.medicamento_id,
      dosis: formulacion.dosis,
    }
    return fetch(baseUrl + 'formulaciones', {
      method: "POST",
      body: JSON.stringify(newFormulacion),
      headers: {
        'Content-Type': 'application/json'
      }
    })
};