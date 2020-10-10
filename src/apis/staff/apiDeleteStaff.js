import apiAxios from 'apis/apiAxios';

export default function apiDeleteStaff(branchId, staffId) {
  return apiAxios
    .delete(`/branch/${branchId}/staff/${staffId}`)
    .then((response) => response.data);
}
