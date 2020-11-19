import { baseUrl } from '../shared/baseUrl';

export const loginUser = (user) => {
    const newUser = {
      username: user.username,
      password: user.password,
    }
    return fetch(baseUrl + 'login', {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });
};