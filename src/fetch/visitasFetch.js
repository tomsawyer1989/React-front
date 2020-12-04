import { baseUrl } from '../shared/baseUrl';

export const getVisitas = (params) => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'visitas/' + params, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}

export const postVisita = (visita) => {
    const newVisita = {
      paciente_id: visita.paciente_id,                // id del paciente
      temperatura: visita.temperatura,
      fecha: visita.fecha,
      peso: visita.peso,
      presion: visita.presion,
      observaciones: visita.observaciones,
    }
    return fetch(baseUrl + 'visitas', {
      method: "POST",
      body: JSON.stringify(newVisita),
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

export const getVisitasByMes = () => {
  // const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch (baseUrl + 'visitas/informe/mensual', {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          // 'Authorization': bearer
       }
  });
}

export const getVisitasBySemana = () => {
  // const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch (baseUrl + 'visitas/informe/semanal', {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          // 'Authorization': bearer
       }
  });
}