import { baseUrl } from '../shared/baseUrl';

export const getPacientes = () => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'pacientes', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}

export const postPaciente = (paciente) => {
  const newPaciente = {
    medico_id: paciente.medico_id,
    barrio_id: paciente.barrio_id,
    ciudad_id: paciente.ciudad_id,
    nombre: paciente.nombre,
    cedula: paciente.cedula,
    edad: paciente.edad,
    direccion: paciente.direccion,
    geolocalizacion: '',
    created_at: new Date().toUTCString(),
  }
  return fetch(baseUrl + 'pacientes', {
    method: "POST",
    body: JSON.stringify(newPaciente),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const putPaciente = (id, paciente) => {
  const newPaciente = {
    id: id,
    medico_id: paciente.medico_id,
    barrio_id: paciente.barrio_id,
    ciudad_id: paciente.ciudad_id,
    nombre: paciente.nombre,
    cedula: paciente.cedula,
    edad: paciente.edad,
    direccion: paciente.direccion,
    geolocalizacion: '',
    created_at: new Date().toUTCString(),
  }
  return fetch(baseUrl + 'pacientes', {
    method: "PUT",
    body: JSON.stringify(newPaciente),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const deletePaciente = (paciente) => {
    const primaryKey = {
      cedula: paciente.cedula
    }
    return fetch(baseUrl + 'pacientes', {
      method: "DELETE",
      body: JSON.stringify(primaryKey),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }