import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPatchCategory(categoryId, data) {
  const [error, updateCategory] = await handlePromise(
    apiAxios.patch(`/category/${categoryId}`, data)
  );

  if (error) throw new Error(error);

  return updateCategory.data;
}
