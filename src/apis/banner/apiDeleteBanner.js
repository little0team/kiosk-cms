import apiAxios from 'apis/apiAxios';

export default async function apiDeleteBanner(bannerId) {
  return apiAxios
    .delete(`/banner/${bannerId}`)
    .then((response) => response.data);
}
