const baseURL = "https://taskify-api.herokuapp.com";

export const apiURLs = {
  login: () => `${baseURL}/user/login`,
  getUser: () => `${baseURL}/user`,
};
