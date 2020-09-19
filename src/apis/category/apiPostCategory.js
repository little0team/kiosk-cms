import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPostCategory(data) {
  const [error, createCategory] = await handlePromise(
    apiAxios.post('category', data)
  );

  if (error) throw new Error(error);

  return createCategory.data;
}
