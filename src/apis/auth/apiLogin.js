import handlePromise from 'utils/handlePromise';
import apiAxios from 'apis/apiAxios';

export default async function apiLogin(data) {
  const [error, authResponse] = await handlePromise(
    apiAxios.post('auth/login', data)
  );

  if (error) throw new Error(error);

  return authResponse.data;
}
