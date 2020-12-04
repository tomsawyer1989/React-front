import { baseUrl } from '../shared/baseUrl';

export const getContactos = (params) => {
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch (baseUrl + 'contactos/' + params, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
         }
    });
}

export const postContacto = (contacto) => {
    const newContacto = {
      paciente_id: contacto.paciente_id,                // id del paciente
      nombre: contacto.nombre,
      telefono: contacto.telefono,
      email: contacto.email,
      parentesco: contacto.parentesco,
    }
    return fetch(baseUrl + 'contactos', {
      method: "POST",
      body: JSON.stringify(newContacto),
      headers: {
        'Content-Type': 'application/json'
      }
    })
};