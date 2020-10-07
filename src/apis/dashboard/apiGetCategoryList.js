import apiAxios from 'apis/apiAxios';

export default function apiGetCategoryList() {
  return apiAxios
    .get('/dashboard/category-list')
    .then((response) => response.data.data);
}
