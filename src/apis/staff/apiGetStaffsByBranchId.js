import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetStaffByBranchId(branchId) {
  const [error, { data }] = await handlePromise(
    apiAxios.get(`branch/${branchId}/staff`)
  );

  if (error) throw new Error(error);

  return data;
}
