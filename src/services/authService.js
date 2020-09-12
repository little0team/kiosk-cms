import handlePromise from 'utils/handlePromise';
import login from 'apis/auth/apiLogin';
import apiAxios from 'apis/apiAxios';

class AuthService {
  signIn = async (credentials) => {
    const [loginErr, { accessToken }] = await handlePromise(login(credentials));

    if (loginErr) throw new Error();

    return this.setSession(accessToken);
  };

  signOut = () => {
    this.setSession(null);
  };

  setSession = (accessToken) => {
    if (accessToken) {
      const base64 = accessToken.split('.')[1];
      const tokenPayload = JSON.parse(window.atob(base64));

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('username', tokenPayload.username);

      apiAxios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('access_token');

      delete apiAxios.defaults.headers.common['Authorization'];
    }
  };
}

const instance = new AuthService();

export default instance;
