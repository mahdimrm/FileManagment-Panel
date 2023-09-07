export const baseIdentityUrl = 'http://192.168.35.206:83/api';

export const user = {
  findUser: (id: any) => `${baseIdentityUrl}/User/User?id=${id}`,
  loginUser: () => `${baseIdentityUrl}/Auth/Login`,
  logoutUser: () => `${baseIdentityUrl}/Auth/LogOut`,
};
