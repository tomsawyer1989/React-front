import { baseUrl } from '../shared/baseUrl';

export const getMedicos = () => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'medicos', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    })
}

export const postMedico = (medico) => {
  const newMedico = {
    secretario_id: localStorage.getItem('id'),        // id del secretario que registró al médico
    barrio_id: medico.barrio_id,
    nombre: medico.nombre,
    cedula: medico.cedula,
    direccion: medico.direccion,
    eps: medico.eps,
    universidad: medico.universidad,
    created_at: new Date().toUTCString(),
  }
  return fetch(baseUrl + 'medicos', {
    method: "POST",
    body: JSON.stringify(newMedico),
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const putMedico = (id, medico) => {
  const newMedico = {
    id: id,                                     // id del médico
    secretario_id: localStorage.getItem('id'),  // id del secretario que registró al médico
    barrio_id: medico.barrio_id,
    nombre: medico.nombre,
    cedula: medico.cedula,
    direccion: medico.direccion,
    eps: medico.eps,
    universidad: medico.universidad,
    created_at: new Date().toUTCString(),
  }
  return fetch(baseUrl + 'medicos', {
    method: "PUT",
    body: JSON.stringify(newMedico),
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const deleteMedico = (medico) => {
    const primaryKey = {
      cedula: medico.cedula
    }
    return fetch(baseUrl + 'medicos', {
      method: "DELETE",
      body: JSON.stringify(primaryKey),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }