import http from './common/api.common';
import { user } from '../ApiUrls/urls';
import { type Response } from '../interfaces/ApiResponse';
import { LoginModel } from '../interfaces/models';

class userDataService {
  login = (login: LoginModel): Promise<Response> =>
    new Promise(async (resolve, reject) => {
      try {
        const request = await http.post(user.loginUser(), login);
        const response = await request.data;
        resolve(response as Response);
      } catch (error) {
        reject(error);
      }
    });
  logout = (): Promise<Response> =>
    new Promise(async (resolve, reject) => {
      try {
        const request = await http.post(user.logoutUser());
        const response = await request.data;
        resolve(response as Response);
      } catch (error) {
        reject(error);
      }
    });
}

export default new userDataService();
