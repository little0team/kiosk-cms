import apiAxios from 'apis/apiAxios';

export default function apiGetDashboard(query) {
  const { branchId, startDate, endDate } = query;

  return apiAxios
    .get('/dashboard', { params: { branchId, startDate, endDate } })
    .then((response) => response.data.data.report);
}
