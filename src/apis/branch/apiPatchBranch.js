import apiAxios from 'apis/apiAxios';

export default function apiPatchBranch(branchId, data) {
  return apiAxios
    .patch(`/branch/${branchId}`, data)
    .then((response) => response.data.data);
}
