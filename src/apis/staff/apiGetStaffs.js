import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetBranchs() {
  const [error, { data }] = await handlePromise(apiAxios.get('staffs'));

  if (error) throw new Error(error);

  return data;
}
