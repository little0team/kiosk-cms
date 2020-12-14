import apiAxios from 'apis/apiAxios';

export default function apiPatchStaff(staffId, branchId, data) {
  const { username, firstname, lastname, address } = data;

  return apiAxios
    .patch(`/branch/${branchId}/staff/${staffId}`, {
      password: username,
      firstname,
      lastname,
      address,
    })
    .then((response) => response.data);
}
