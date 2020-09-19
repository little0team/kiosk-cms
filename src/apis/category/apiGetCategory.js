import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetCategory() {
  const [error, categories] = await handlePromise(apiAxios.get('categories'));

  if (error) throw new Error(error);

  return categories.data;
}
