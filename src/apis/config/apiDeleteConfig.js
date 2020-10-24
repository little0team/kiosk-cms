import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiDeleteConfig(configId) {
  const [error, result] = await handlePromise(
    apiAxios.delete(`/config/${configId}`)
  );

  if (error) throw new Error(error);

  return result.data;
}
