import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPatchConfig(configId, data) {
  const [error, result] = await handlePromise(
    apiAxios.patch(`/config/${configId}`, data)
  );

  if (error) throw new Error(error);

  return result.data;
}
