import apiAxios from 'apis/apiAxios';

export default async function apiDeleteCategory(categoryId) {
  return apiAxios
    .delete(`/category/${categoryId}`)
    .then((response) => response.data);
}
