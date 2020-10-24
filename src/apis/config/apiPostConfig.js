import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPostConfig(data) {
  const [error, result] = await handlePromise(apiAxios.post('/config', data));

  if (error) throw new Error(error);

  return result.data;
}
