import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPatchBanner(bannerId, data) {
  const [error, updateBanner] = await handlePromise(
    apiAxios.patch(`/banner/${bannerId}`, data)
  );

  if (error) throw new Error(error);

  return updateBanner.data;
}
