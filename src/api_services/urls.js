const baseURL = "http://localhost:8000";
const devUrl = "https://taskify-api.herokuapp.com"

export const apiURLs = {
  login: () => `${baseURL}/user/login`,
  getUser: () => `${baseURL}/user`,
  getTasks: () => `${baseURL}/task/get-all-tasks`,
  toggleTask: () => `${baseURL}/task/toggle-task-status`,
  deleteTask: () => `${baseURL}/task/delete-task`,
  createTask: () => `${baseURL}/task/create`,
  createCategory: () => `${baseURL}/user/create/category`,
};
