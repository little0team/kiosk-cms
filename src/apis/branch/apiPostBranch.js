import apiAxios from 'apis/apiAxios';

export default function apiPostBranch(data) {
  return apiAxios.post('/branch', data).then((response) => response.data.data);
}
