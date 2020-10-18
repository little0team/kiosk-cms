import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetBannerById(bannerId, data) {
  const [error, category] = await handlePromise(
    apiAxios.get(`/banner/${bannerId}`, data)
  );

  if (error) throw new Error(error);

  return category.data;
}
