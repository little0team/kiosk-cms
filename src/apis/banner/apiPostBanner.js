import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPostBanner(data) {
  const [error, result] = await handlePromise(apiAxios.post('/banner', data));

  if (error) throw new Error(error);

  return result.data;
}
