import apiAxios from 'apis/apiAxios';

export default function apiPatchBranch(branchId) {
  return apiAxios
    .patch(`/branch/${branchId}`)
    .then((response) => response.data.data);
}
