import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetConfigById(configId) {
  const [error, config] = await handlePromise(
    apiAxios.get(`/config/${configId}`)
  );

  if (error) throw new Error(error);

  return config.data.data;
}
