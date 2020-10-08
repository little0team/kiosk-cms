import apiAxios from 'apis/apiAxios';

export default function apiPostStaff(branchId, data) {
  return apiAxios
    .post(`/branch/${branchId}/staff`, data)
    .then((response) => response.data.data);
}
