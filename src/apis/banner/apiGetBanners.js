import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetBanners() {
  const [error, banners] = await handlePromise(
    apiAxios.get('banners', { params: { type: 'banner' } })
  );

  if (error) throw new Error(error);

  return banners.data.data;
}
