import apiAxios from 'apis/apiAxios';

export default function apiPatchStaff(staffId, data) {
  return apiAxios
    .patch(`/staff/${staffId}`, data)
    .then((response) => response.data);
}
