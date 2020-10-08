import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetCategoryById(categoryId, data) {
  const [error, category] = await handlePromise(
    apiAxios.get(`/category/${categoryId}`, data)
  );

  if (error) throw new Error(error);

  return category.data;
}
