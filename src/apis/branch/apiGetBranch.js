import apiAxios from '../apiAxios';

export default function apiGetBranch(branchId) {
  return apiAxios
    .get(`/branch/${branchId}`)
    .then((response) => response.data.data);
}
