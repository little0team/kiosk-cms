import apiAxios from 'apis/apiAxios';

export default function apiGetStaffById(staffId) {
  return apiAxios
    .get(`/staff/${staffId}`)
    .then((response) => response.data.data);
}
