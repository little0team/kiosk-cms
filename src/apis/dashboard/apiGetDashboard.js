import apiAxios from 'apis/apiAxios';

export default function apiGetDashboard(query) {
  const { branchId } = query;

  return apiAxios
    .get('/dashboard', { params: { branchId } })
    .then((response) => response.data.data.report);
}
