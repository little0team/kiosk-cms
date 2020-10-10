import apiAxios from 'apis/apiAxios';

export default function apiDeleteBranch(branchId) {
  return apiAxios
    .delete(`/branch/${branchId}`)
    .then((response) => response.data);
}
