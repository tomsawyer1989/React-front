import { baseUrl } from '../shared/baseUrl';

export const getPacientes = () => {
    return fetch (baseUrl + 'pacientes', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
         }
    })
}

export const postPaciente = (paciente) => {
  const newPaciente = {
    nombre: paciente.nombre,
    cedula: paciente.cedula,
    edad: paciente.edad
  }
  return fetch(baseUrl + 'pacientes', {
    method: "POST",
    body: JSON.stringify(newPaciente),
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const putPaciente = (paciente) => {
  const newPaciente = {
    nombre: paciente.nombre,
    cedula: paciente.cedula
  }
  return fetch(baseUrl + 'pacientes', {
    method: "PUT",
    body: JSON.stringify(newPaciente),
    headers: {
      'Content-Type': 'application/json'
    }
  })
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
    })
  }